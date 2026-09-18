// Post-build static prerendering.
//
// This is a Vite + React SPA (client-side rendered only) — a cold visit
// currently has to download the JS bundle, run it, THEN fetch content from
// WordPress/Supabase before anything paints. That's the actual cause of
// the mobile PageSpeed score staying stuck (LCP ~8.7s) despite earlier
// lazy-loading/code-splitting work.
//
// This script runs after `vite build`, using a real headless browser to
// visit every route against the freshly-built dist/ (served locally),
// wait for it to fully load real content (same fetches a visitor's
// browser would make), and save the resulting HTML as a static file at
// the matching path (dist/diseases/index.html, dist/disease/acne/index.html,
// etc.) — so Apache serves real, already-painted content on the first
// request. The existing SPA fallback in .htaccess (`RewriteRule ^ index.html`)
// only kicks in when no matching file/directory exists, so this doesn't
// change how any route not covered here behaves, and doesn't touch how
// the app itself renders or hydrates.
//
// Route list is built by fetching live from WordPress/Supabase at build
// time (same sources the app itself uses), so a new blog post or disease
// is covered automatically next time this runs — no hardcoding here.

import puppeteer from 'puppeteer';
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync, statSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');
// Port 3000 specifically: the API's CORS allowlist already includes
// http://localhost:3000 (the normal Vite dev origin), so prerendering
// against this port means the same diseases/etc. fetches the app makes
// at runtime work here too, with no separate CORS carve-out needed.
const PORT = 3000;
const LOCAL_ORIGIN = `http://localhost:${PORT}`;
const API_URL = process.env.VITE_API_URL || 'http://localhost:3001';
const WP_BASE = 'https://blog.drmaharanas.com/wp-json/wp/v2';
const CONCURRENCY = 5;

const MIME = {
	'.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
	'.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
	'.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.txt': 'text/plain',
	'.xml': 'application/xml', '.webp': 'image/webp', '.woff2': 'font/woff2',
};

// Minimal static server that mirrors the production .htaccess SPA
// fallback (serve the file if it exists, else index.html) — so Puppeteer
// sees the same routing behavior it will get in production.
function startServer() {
	return new Promise((resolve) => {
		const server = http.createServer((req, res) => {
			const urlPath = req.url.split('?')[0];
			let filePath = join(DIST_DIR, decodeURIComponent(urlPath));
			if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
				filePath = existsSync(filePath) ? join(filePath, 'index.html') : join(DIST_DIR, 'index.html');
			}
			if (!existsSync(filePath)) filePath = join(DIST_DIR, 'index.html');
			const ext = extname(filePath);
			res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
			res.end(readFileSync(filePath));
		});
		server.listen(PORT, () => resolve(server));
	});
}

async function fetchJson(url) {
	try {
		const res = await fetch(url);
		if (!res.ok) return null;
		return await res.json();
	} catch {
		return null;
	}
}

async function buildRouteList() {
	const routes = [
		'/', '/about', '/services', '/diseases', '/testimonials',
		'/contact', '/appointment', '/disclaimer', '/scientific-basis',
		'/criticism', '/privacy-policy', '/blogs',
	];

	const diseases = (await fetchJson(`${API_URL}/diseases`)) || [];
	for (const d of diseases) {
		if (d.slug) routes.push(`/disease/${d.slug}`);
	}

	const posts = (await fetchJson(`${WP_BASE}/posts?per_page=100`)) || [];
	for (const p of posts) {
		if (p.slug) routes.push(`/blogs/${p.slug}`);
	}

	// Service detail content is hand-authored directly in
	// ServiceArticlePage.jsx, not an API — same two entries as
	// bot-prerender.php mirrors.
	routes.push('/service/chronic-disease-management', '/service/womens-health');

	return routes;
}

function routeToFilePath(route) {
	const clean = route === '/' ? '/index' : `${route.replace(/\/$/, '')}/index`;
	return join(DIST_DIR, `${clean}.html`);
}

// A handful of routes reliably time out under full concurrency (external
// WordPress/Supabase calls getting slow when many pages fetch them at
// once) but succeed in isolation — one retry, alone, clears those. A
// route that still fails just doesn't get a prerendered file; the
// existing SPA fallback serves it exactly as it does today, so this never
// makes a page worse, only sometimes misses the speed-up.
async function prerenderRoute(browser, route, attempt = 1) {
	const page = await browser.newPage();
	try {
		await page.goto(`${LOCAL_ORIGIN}${route}`, { waitUntil: 'networkidle0', timeout: 45000 });
		// Small buffer past network-idle for any final React re-render
		// (e.g. a state update that lands just after the last fetch resolves).
		await new Promise((r) => setTimeout(r, 300));
		const html = await page.content();
		const filePath = routeToFilePath(route);
		mkdirSync(dirname(filePath), { recursive: true });
		writeFileSync(filePath, html);
		console.log(`  ✓ ${route}`);
		return true;
	} catch (err) {
		if (attempt < 2) {
			await page.close().catch(() => {});
			return prerenderRoute(browser, route, attempt + 1);
		}
		console.warn(`  ✗ ${route} — ${err.message}`);
		return false;
	} finally {
		await page.close().catch(() => {});
	}
}

async function run() {
	console.log('Starting local server for prerendering...');
	const server = await startServer();

	console.log('Building route list from WordPress/Supabase...');
	const routes = await buildRouteList();
	console.log(`${routes.length} routes to prerender.`);

	console.log('Launching headless browser...');
	const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });

	let index = 0;
	async function worker() {
		while (index < routes.length) {
			const route = routes[index++];
			await prerenderRoute(browser, route);
		}
	}
	await Promise.all(Array.from({ length: CONCURRENCY }, worker));

	await browser.close();
	server.close();
	console.log('Prerendering complete.');
}

run().catch((err) => {
	console.error('Prerendering failed:', err);
	process.exit(1);
});
