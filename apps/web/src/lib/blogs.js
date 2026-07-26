import { blogArticles } from '@/data/blogArticles.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800&h=500';

const estimateReadTime = (text = '') => {
	const words = text.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
};

const formatDate = (iso) => {
	try {
		return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
	} catch {
		return '';
	}
};

export const normalizeDbBlog = (b) => ({
	id: b.slug,
	slug: b.slug,
	title: b.title,
	excerpt: b.excerpt || '',
	image: b.cover_image || FALLBACK_IMAGE,
	category: b.category || 'Wellness',
	author: b.author || 'Dr. Shubhangi Maharana',
	date: formatDate(b.created_at),
	sortDate: b.created_at,
	readTime: estimateReadTime(b.content),
	content: b.content,
	isStatic: false,
});

export const getAllStaticArticles = () =>
	blogArticles.map((a) => ({ ...a, slug: a.id, sortDate: a.date, isStatic: true }));

export async function fetchPublishedBlogs() {
	try {
		const res = await fetch(`${API_URL}/blogs`);
		if (!res.ok) return [];
		const data = await res.json();
		return Array.isArray(data) ? data.map(normalizeDbBlog) : [];
	} catch {
		return [];
	}
}

export async function fetchBlogBySlug(slug) {
	try {
		const res = await fetch(`${API_URL}/blogs/${slug}`);
		if (!res.ok) return null;
		const data = await res.json();
		return normalizeDbBlog(data);
	} catch {
		return null;
	}
}
