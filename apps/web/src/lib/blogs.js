import { blogArticles } from '@/data/blogArticles.js';

export const getAllStaticArticles = () =>
	blogArticles.map((a) => ({ ...a, slug: a.id, sortDate: a.date, isStatic: true }));
