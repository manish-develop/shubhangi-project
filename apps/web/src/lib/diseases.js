import { diseaseDatabase } from '@/data/diseaseDatabase.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const normalizeDbDisease = (d) => ({
	id: d.slug,
	slug: d.slug,
	name: d.name,
	category: d.category || '',
	image: d.image || '',
	short_description: d.short_description || '',
	full_description: d.full_description || '',
	youtube_url: d.youtube_url || null,
	isStatic: false,
});

export async function fetchPublishedDiseases() {
	try {
		const res = await fetch(`${API_URL}/diseases`);
		if (!res.ok) return [];
		const data = await res.json();
		return Array.isArray(data) ? data.map(normalizeDbDisease) : [];
	} catch {
		return [];
	}
}

export async function fetchDiseaseBySlug(slug) {
	try {
		const res = await fetch(`${API_URL}/diseases/${slug}`);
		if (!res.ok) return null;
		const data = await res.json();
		return normalizeDbDisease(data);
	} catch {
		return null;
	}
}

// Fetch from the API, falling back to the static array if the request
// fails or returns no rows (e.g. before the diseases table has been
// migrated/populated), so the site never shows a blank list.
export async function getDiseasesWithFallback() {
	const dbDiseases = await fetchPublishedDiseases();
	return dbDiseases.length > 0 ? dbDiseases : diseaseDatabase;
}
