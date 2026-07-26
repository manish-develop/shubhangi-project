import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_URL, SITE_NAME } from '@/constants/site.js';
import { ClinicImages } from '@/constants/clinicImages.js';

const SEO = ({ title, description, path = '/', image, type = 'website' }) => {
	const url = `${SITE_URL}${path === '/' ? '' : path}`;
	const ogImage = image || ClinicImages.heroSection;

	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="author" content="Dr. Shubhangi Maharana" />
			<link rel="canonical" href={url} />

			<meta property="og:type" content={type} />
			<meta property="og:site_name" content={SITE_NAME} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={url} />
			<meta property="og:image" content={ogImage} />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={ogImage} />
		</Helmet>
	);
};

export default SEO;
