import { diseaseDatabase } from '@/data/diseaseDatabase.js';
import { fetchWpDiseases, fetchWpDiseaseBySlug } from '@/lib/wordpress.js';

// Diseases now live in WordPress (the "disease" custom post type), not the
// old Supabase table — these keep the same names/shapes the pages already
// use, so nothing downstream had to change, just the source.

export async function fetchPublishedDiseases() {
	return fetchWpDiseases();
}

export async function fetchDiseaseBySlug(slug) {
	return fetchWpDiseaseBySlug(slug);
}

// Falls back to the static bundled array if WordPress is unreachable or
// not yet populated, so the site never shows a blank list.
export async function getDiseasesWithFallback() {
	const wpDiseases = await fetchWpDiseases();
	return wpDiseases.length > 0 ? wpDiseases : diseaseDatabase;
}
