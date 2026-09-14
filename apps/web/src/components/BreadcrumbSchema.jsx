import { useEffect } from 'react';
import { SITE_URL } from '@/constants/site.js';
import { setJsonLd, removeJsonLd } from '@/lib/seo.js';

const SCHEMA_ID = 'schema-breadcrumbs';

// Injects a BreadcrumbList JSON-LD block for the current page's hierarchy.
// `items` is an ordered array of { name, path } from the site root down to
// the current page (path omitted or null for the current page itself,
// matching how Google's own examples represent the last crumb).
const BreadcrumbSchema = ({ items }) => {
	useEffect(() => {
		if (!items || items.length === 0) return;

		setJsonLd(SCHEMA_ID, {
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			"itemListElement": items.map((item, index) => ({
				"@type": "ListItem",
				"position": index + 1,
				"name": item.name,
				...(item.path ? { "item": `${SITE_URL}${item.path}` } : {}),
			})),
		});

		return () => removeJsonLd(SCHEMA_ID);
	}, [items]);

	return null;
};

export default BreadcrumbSchema;
