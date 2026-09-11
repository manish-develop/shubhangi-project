// One-time migration: push existing Supabase blogs + testimonials into
// WordPress (blog.drmaharanas.com) via the REST API, using a WordPress
// Application Password for auth. Safe to re-run — it skips any post whose
// title already exists in WordPress instead of creating a duplicate.
//
// Usage:
//   node scripts/migrate-to-wordpress.js              (dry run — logs what would happen)
//   node scripts/migrate-to-wordpress.js --apply       (actually creates the posts)
//
// Requires WP_USERNAME and WP_APP_PASSWORD in apps/api/.env.

import 'dotenv/config';
import supabase from '../src/lib/supabase.js';

const WP_BASE = 'https://blog.drmaharanas.com/wp-json/wp/v2';
const APPLY = process.argv.includes('--apply');

const WP_USERNAME = process.env.WP_USERNAME;
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD;

if (!WP_USERNAME || !WP_APP_PASSWORD) {
	console.error('Missing WP_USERNAME / WP_APP_PASSWORD in apps/api/.env — aborting.');
	process.exit(1);
}

const authHeader = 'Basic ' + Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString('base64');

async function wpFetch(path, options = {}) {
	const res = await fetch(`${WP_BASE}${path}`, {
		...options,
		headers: {
			Authorization: authHeader,
			...(options.headers || {}),
		},
	});
	if (!res.ok) {
		const body = await res.text().catch(() => '');
		throw new Error(`WP API ${path} -> ${res.status}: ${body.slice(0, 300)}`);
	}
	return res.json();
}

async function uploadImageToWp(imageUrl, filename) {
	if (!imageUrl) return null;
	try {
		const imgRes = await fetch(imageUrl);
		if (!imgRes.ok) return null;
		const buffer = Buffer.from(await imgRes.arrayBuffer());
		const contentType = imgRes.headers.get('content-type') || 'image/jpeg';

		const media = await wpFetch('/media', {
			method: 'POST',
			headers: {
				'Content-Type': contentType,
				'Content-Disposition': `attachment; filename="${filename}"`,
			},
			body: buffer,
		});
		return media.id;
	} catch (err) {
		console.warn(`  ! image upload failed for ${imageUrl}: ${err.message}`);
		return null;
	}
}

async function getExistingTitles(postType) {
	const titles = new Set();
	let page = 1;
	while (true) {
		const res = await fetch(`${WP_BASE}/${postType}?per_page=100&page=${page}&status=publish,draft,pending,private`, {
			headers: { Authorization: authHeader },
		});
		if (!res.ok) break;
		const items = await res.json();
		if (!Array.isArray(items) || items.length === 0) break;
		items.forEach((item) => titles.add(item.title.rendered.trim().toLowerCase()));
		if (items.length < 100) break;
		page += 1;
	}
	return titles;
}

async function ensureCategory(name) {
	if (!name) return null;
	const existing = await wpFetch(`/categories?search=${encodeURIComponent(name)}`);
	const match = existing.find((c) => c.name.toLowerCase() === name.toLowerCase());
	if (match) return match.id;
	const created = await wpFetch('/categories', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name }),
	});
	return created.id;
}

async function migrateBlogs() {
	console.log('\n=== Blogs ===');
	const { data: blogs, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: true });
	if (error) throw error;

	console.log(`Found ${blogs.length} blog(s) in Supabase.`);

	const existingTitles = APPLY ? await getExistingTitles('posts') : new Set();

	for (const blog of blogs) {
		const key = (blog.title || '').trim().toLowerCase();
		if (existingTitles.has(key)) {
			console.log(`  - skip (already in WP): "${blog.title}"`);
			continue;
		}

		console.log(`  - ${APPLY ? 'creating' : '[dry run] would create'}: "${blog.title}"`);
		if (!APPLY) continue;

		const categoryId = await ensureCategory(blog.category);
		const mediaId = await uploadImageToWp(blog.cover_image, `${blog.slug || 'blog'}.jpg`);

		const payload = {
			title: blog.title,
			slug: blog.slug || undefined,
			content: blog.content || '',
			excerpt: blog.excerpt || '',
			status: blog.published ? 'publish' : 'draft',
			date: blog.created_at || undefined,
			categories: categoryId ? [categoryId] : undefined,
			featured_media: mediaId || undefined,
		};

		const created = await wpFetch('/posts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});
		console.log(`    -> created post #${created.id} (${created.link})`);
	}
}

async function migrateTestimonials() {
	console.log('\n=== Testimonials ===');
	const { data: testimonials, error } = await supabase.from('testimonials').select('*').order('display_order', { ascending: true });
	if (error) throw error;

	console.log(`Found ${testimonials.length} testimonial(s) in Supabase.`);

	const existingTitles = APPLY ? await getExistingTitles('testimonials') : new Set();

	for (const t of testimonials) {
		const title = t.title || t.patient_name || 'Testimonial';
		const key = title.trim().toLowerCase();
		if (existingTitles.has(key)) {
			console.log(`  - skip (already in WP): "${title}"`);
			continue;
		}

		console.log(`  - ${APPLY ? 'creating' : '[dry run] would create'}: "${title}" (${t.patient_name})`);
		if (!APPLY) continue;

		const mediaId = await uploadImageToWp(t.before_image || t.after_image, `${t.id || 'testimonial'}.jpg`);

		const payload = {
			title,
			content: t.description || '',
			status: t.published ? 'publish' : 'draft',
			featured_media: mediaId || undefined,
			meta: {
				patient_name: t.patient_name || '',
				rating: t.rating || 5,
				condition: t.category || '',
			},
		};

		const created = await wpFetch('/testimonials', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});
		console.log(`    -> created testimonial #${created.id} (${created.link})`);
	}
}

async function main() {
	console.log(APPLY ? 'Running migration in APPLY mode — this will create content in WordPress.' : 'Running migration in DRY RUN mode — pass --apply to actually create content.');
	await migrateBlogs();
	await migrateTestimonials();
	console.log('\nDone.');
}

main().catch((err) => {
	console.error('Migration failed:', err);
	process.exit(1);
});
