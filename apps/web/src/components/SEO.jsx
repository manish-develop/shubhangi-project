import { useEffect } from 'react';
import { SITE_URL, SITE_NAME } from '@/constants/site.js';
import { ClinicImages } from '@/constants/clinicImages.js';
import { setDocumentTitle, setMetaTag, setLinkTag } from '@/lib/seo.js';

const SEO = ({ title, description, path = '/', image, type = 'website' }) => {
	useEffect(() => {
		const url = `${SITE_URL}${path === '/' ? '' : path}`;
		const ogImage = image || ClinicImages.heroSection;

		setDocumentTitle(title);
		setMetaTag('name', 'description', description);
		setMetaTag('name', 'author', 'Dr. Shubhangi Maharana');
		setLinkTag('canonical', url);

		setMetaTag('property', 'og:type', type);
		setMetaTag('property', 'og:site_name', SITE_NAME);
		setMetaTag('property', 'og:title', title);
		setMetaTag('property', 'og:description', description);
		setMetaTag('property', 'og:url', url);
		setMetaTag('property', 'og:image', ogImage);

		setMetaTag('name', 'twitter:card', 'summary_large_image');
		setMetaTag('name', 'twitter:title', title);
		setMetaTag('name', 'twitter:description', description);
		setMetaTag('name', 'twitter:image', ogImage);
	}, [title, description, path, image, type]);

	return null;
};

export default SEO;
