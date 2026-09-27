// One-time fix: the migration script set `meta` in its create payloads for
// testimonials/diseases/youtube_videos/reviews, but those CPTs didn't have
// 'custom-fields' support declared yet at the time, so WordPress silently
// dropped the meta values on save (the meta *keys* were registered and
// exposed fine, the actual values just never persisted). Fixed the CPT
// declarations first; this backfills the meta on the posts that already
// exist from that first migration run, matched by slug/title — no
// duplicate posts created.
//
// Usage: node scripts/backfill-wp-meta.js --apply

import 'dotenv/config';
import supabase from '../src/lib/supabase.js';

const WP_BASE = 'https://blog.drmaharanas.com/wp-json/wp/v2';
const APPLY = process.argv.includes('--apply');
const authHeader = 'Basic ' + Buffer.from(`${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`).toString('base64');

async function wpFetch(path, options = {}) {
	const res = await fetch(`${WP_BASE}${path}`, { ...options, headers: { Authorization: authHeader, ...(options.headers || {}) } });
	if (!res.ok) throw new Error(`${path} -> ${res.status}: ${(await res.text()).slice(0, 200)}`);
	return res.json();
}

async function findAllBySlug(postType) {
	const bySlug = new Map();
	let page = 1;
	while (true) {
		const items = await wpFetch(`/${postType}?per_page=100&page=${page}&status=publish,draft`);
		if (!Array.isArray(items) || items.length === 0) break;
		items.forEach((item) => bySlug.set(item.slug, item.id));
		if (items.length < 100) break;
		page += 1;
	}
	return bySlug;
}

async function backfillTestimonials() {
	console.log('\n=== Testimonials ===');
	const { data: testimonials, error } = await supabase.from('testimonials').select('*');
	if (error) throw error;
	const bySlug = await findAllBySlug('testimonials');

	for (const t of testimonials) {
		const title = t.title || t.patient_name || 'Testimonial';
		const slug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
		const wpId = bySlug.get(slug);
		if (!wpId) { console.log(`  ! no WP match for "${title}" (slug guess: ${slug})`); continue; }

		console.log(`  - ${APPLY ? 'updating' : '[dry run] would update'} #${wpId}: "${title}"`);
		if (!APPLY) continue;
		await wpFetch(`/testimonials/${wpId}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ meta: { patient_name: t.patient_name || '', rating: t.rating || 5, condition: t.category || '' } }),
		});
	}
}

async function backfillDiseases() {
	console.log('\n=== Diseases ===');
	const { data: diseases, error } = await supabase.from('diseases').select('*');
	if (error) throw error;
	const bySlug = await findAllBySlug('diseases');

	for (const d of diseases) {
		const wpId = bySlug.get(d.slug);
		if (!wpId) { console.log(`  ! no WP match for "${d.name}" (slug: ${d.slug})`); continue; }

		console.log(`  - ${APPLY ? 'updating' : '[dry run] would update'} #${wpId}: "${d.name}"`);
		if (!APPLY) continue;
		await wpFetch(`/diseases/${wpId}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ meta: { category: d.category || '', youtube_url: d.youtube_url || '' } }),
		});
	}
}

async function backfillYoutubeVideos() {
	console.log('\n=== YouTube Videos ===');
	const { data: videos, error } = await supabase.from('youtube_videos').select('*');
	if (error) throw error;
	const bySlug = await findAllBySlug('youtube_videos');
	const allWp = await wpFetch('/youtube_videos?per_page=100');

	for (const v of videos) {
		const title = v.title || v.video_id;
		const match = allWp.find((item) => item.title.rendered.trim() === title.trim());
		if (!match) { console.log(`  ! no WP match for "${title}"`); continue; }

		console.log(`  - ${APPLY ? 'updating' : '[dry run] would update'} #${match.id}: "${title}"`);
		if (!APPLY) continue;
		await wpFetch(`/youtube_videos/${match.id}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ meta: { video_id: v.video_id || '', featured: v.featured ? '1' : '', display_order: v.display_order || 0 } }),
		});
	}
}

async function backfillReviews() {
	console.log('\n=== Reviews ===');
	const { data: reviews, error } = await supabase.from('reviews').select('*');
	if (error) throw error;
	const bySlug = await findAllBySlug('reviews');

	for (const r of reviews) {
		const title = r.reviewer_name || 'Review';
		const slug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
		const wpId = bySlug.get(slug);
		if (!wpId) { console.log(`  ! no WP match for "${title}" (slug guess: ${slug})`); continue; }

		console.log(`  - ${APPLY ? 'updating' : '[dry run] would update'} #${wpId}: "${title}"`);
		if (!APPLY) continue;
		await wpFetch(`/reviews/${wpId}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ meta: { location: r.location || '', rating: r.rating || 5, display_order: r.display_order || 0 } }),
		});
	}
}

async function main() {
	console.log(APPLY ? 'Backfilling meta (APPLY mode).' : 'DRY RUN — pass --apply to actually update.');
	await backfillTestimonials();
	await backfillDiseases();
	await backfillYoutubeVideos();
	await backfillReviews();
	console.log('\nDone.');
}

main().catch((err) => { console.error('Backfill failed:', err); process.exit(1); });
