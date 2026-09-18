// Live sync with the WordPress blog at blog.drmaharanas.com via its REST
// API — this is the single source of truth for /blogs content (no manual
// copy-paste step; the doctor posts in WordPress and it appears here).
const WP_BASE = 'https://blog.drmaharanas.com/wp-json/wp/v2';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800&h=500';

// Decodes HTML entities the reliable way — via the browser's own parser —
// rather than a hand-maintained list of entity codes, so every named entity
// (&amp;, &hellip;, &#8217;...) and every numeric one (&#8211;...) that WP
// puts in title.rendered/excerpt.rendered comes out as the real character.
const decodeEntities = (html = '') => {
	const el = document.createElement('textarea');
	el.innerHTML = html;
	return el.value;
};

const stripHtml = (html = '') => decodeEntities(html.replace(/<[^>]*>/g, '')).trim();

const estimateReadTime = (html = '') => {
	const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
};

const formatDate = (iso) => {
	try {
		return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
	} catch {
		return '';
	}
};

const normalizeWpPost = (post) => {
	const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
	const terms = post._embedded?.['wp:term']?.[0] || [];
	const category = terms[0]?.name || 'Wellness';
	const rawAuthor = post._embedded?.author?.[0]?.name || '';
	// WordPress falls back to the login email as the display name if the
	// account's "Display name publicly as" field was never set — never show
	// that on the public site.
	const author = rawAuthor && !rawAuthor.includes('@') ? rawAuthor : 'Dr. Shubhangi Maharana';

	// Yoast SEO exposes its computed title/description/schema for this exact
	// post on every REST response (yoast_head_json) — this is what lets the
	// per-post SEO tags stay live and correct for any future post with zero
	// extra code, instead of us re-deriving/hardcoding them.
	const yoast = post.yoast_head_json || null;

	return {
		id: post.slug,
		wpId: post.id,
		slug: post.slug,
		title: stripHtml(post.title?.rendered || ''),
		// Yoast's computed description reflects whatever the doctor actually
		// set in the Yoast metabox for this post (or Yoast's own excerpt
		// fallback logic) — prefer it over the raw WP excerpt when present.
		excerpt: yoast?.og_description || stripHtml(post.excerpt?.rendered || ''),
		content: post.content?.rendered || '',
		image: yoast?.og_image?.[0]?.url || featuredMedia?.source_url || FALLBACK_IMAGE,
		category,
		author,
		date: formatDate(post.date),
		sortDate: post.date,
		modified: post.modified,
		readTime: estimateReadTime(post.content?.rendered),
		isStatic: false,
		yoast,
	};
};

// Builds a self-contained BlogPosting JSON-LD block from Yoast's live data
// for this post, pointed at our own URL (drmaharanas.com/blogs/:slug) —
// not blog.drmaharanas.com's. Yoast's own graph cross-references other
// nodes (author, publisher, image) by @id on its own domain, which would
// be dangling references here, so this pulls just the fields and rebuilds
// a flat, self-contained node instead of re-emitting that graph as-is.
export function buildBlogArticleSchema(post, url) {
	const article = post.yoast?.schema?.['@graph']?.find((n) => n['@type'] === 'Article');

	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		'headline': article?.headline || post.title,
		'description': post.excerpt,
		'datePublished': article?.datePublished || post.sortDate,
		'dateModified': post.modified || article?.datePublished || post.sortDate,
		'author': { '@type': 'Person', 'name': post.author },
		'publisher': { '@type': 'Organization', 'name': 'Maharana Wellness Clinic' },
		'image': post.image,
		'mainEntityOfPage': { '@type': 'WebPage', '@id': url },
		'url': url,
		...(article?.wordCount ? { wordCount: article.wordCount } : {}),
		...(article?.articleSection ? { articleSection: article.articleSection } : {}),
		'inLanguage': 'en-US',
	};
}

export async function fetchWpPosts({ perPage = 30 } = {}) {
	try {
		const res = await fetch(`${WP_BASE}/posts?_embed&per_page=${perPage}`);
		if (!res.ok) return [];
		const data = await res.json();
		return Array.isArray(data) ? data.map(normalizeWpPost) : [];
	} catch {
		return [];
	}
}

export async function fetchWpPostBySlug(slug) {
	try {
		const res = await fetch(`${WP_BASE}/posts?_embed&slug=${encodeURIComponent(slug)}`);
		if (!res.ok) return null;
		const data = await res.json();
		return Array.isArray(data) && data.length > 0 ? normalizeWpPost(data[0]) : null;
	} catch {
		return null;
	}
}

// Resolves a taxonomy term's slug (as it appears in the URL,
// /blogs/category/<slug>) to WordPress's numeric term id, which the posts
// endpoint filters by.
async function resolveTermId(taxonomy, slug) {
	try {
		const res = await fetch(`${WP_BASE}/${taxonomy}?slug=${encodeURIComponent(slug)}`);
		if (!res.ok) return null;
		const data = await res.json();
		return Array.isArray(data) && data.length > 0 ? data[0] : null;
	} catch {
		return null;
	}
}

export async function fetchWpPostsByCategory(categorySlug, { perPage = 30 } = {}) {
	const term = await resolveTermId('categories', categorySlug);
	if (!term) return { term: null, posts: [] };
	try {
		const res = await fetch(`${WP_BASE}/posts?_embed&categories=${term.id}&per_page=${perPage}`);
		if (!res.ok) return { term, posts: [] };
		const data = await res.json();
		return { term, posts: Array.isArray(data) ? data.map(normalizeWpPost) : [] };
	} catch {
		return { term, posts: [] };
	}
}

export async function fetchWpPostsByTag(tagSlug, { perPage = 30 } = {}) {
	const term = await resolveTermId('tags', tagSlug);
	if (!term) return { term: null, posts: [] };
	try {
		const res = await fetch(`${WP_BASE}/posts?_embed&tags=${term.id}&per_page=${perPage}`);
		if (!res.ok) return { term, posts: [] };
		const data = await res.json();
		return { term, posts: Array.isArray(data) ? data.map(normalizeWpPost) : [] };
	} catch {
		return { term, posts: [] };
	}
}

const normalizeWpTestimonial = (post) => {
	const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
	return {
		id: post.slug,
		title: stripHtml(post.title?.rendered || ''),
		content: stripHtml(post.content?.rendered || post.excerpt?.rendered || ''),
		image: featuredMedia?.source_url || null,
		patientName: post.meta?.patient_name || stripHtml(post.title?.rendered || ''),
		rating: Number(post.meta?.rating) || 5,
		condition: post.meta?.condition || '',
		date: formatDate(post.date),
		sortDate: post.date,
	};
};

const normalizeWpComment = (c) => ({
	id: c.id,
	parent: c.parent || 0,
	author: c.author_name || 'Anonymous',
	avatar: c.author_avatar_urls?.['48'] || null,
	content: stripHtml(c.content?.rendered || ''),
	date: formatDate(c.date),
});

export async function fetchWpComments(postId) {
	try {
		const res = await fetch(`${WP_BASE}/comments?post=${postId}&per_page=100&order=asc`);
		if (!res.ok) return [];
		const data = await res.json();
		return Array.isArray(data) ? data.map(normalizeWpComment) : [];
	} catch {
		return [];
	}
}

// This WordPress install requires an authenticated request to create a
// comment, so anonymous visitors can't post straight to the WP REST API —
// and the Application Password that could authenticate can never be
// shipped to the browser. Instead this goes through our own backend
// (apps/api/src/routes/wp-comments.js), which holds that credential and
// proxies the request server-side.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function submitWpComment({ postId, authorName, authorEmail, content }) {
	const res = await fetch(`${API_URL}/wp-comments`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ postId, name: authorName, email: authorEmail, content }),
	});
	const data = await res.json();
	if (!res.ok) {
		throw new Error(data?.error || 'Could not post comment');
	}
	return data;
}

export async function fetchWpTestimonials({ perPage = 30 } = {}) {
	try {
		const res = await fetch(`${WP_BASE}/testimonials?_embed&per_page=${perPage}`);
		if (!res.ok) return [];
		const data = await res.json();
		return Array.isArray(data) ? data.map(normalizeWpTestimonial) : [];
	} catch {
		return [];
	}
}
