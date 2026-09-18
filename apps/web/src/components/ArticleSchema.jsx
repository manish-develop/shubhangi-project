import { useEffect } from 'react';
import { setJsonLd, removeJsonLd } from '@/lib/seo.js';

const SCHEMA_ID = 'schema-blog-article';

// Injects the BlogPosting JSON-LD block built live from this post's Yoast
// data (see buildBlogArticleSchema in lib/wordpress.js) — any future post
// gets this automatically, no per-post code.
const ArticleSchema = ({ schema }) => {
	useEffect(() => {
		if (!schema) return;
		setJsonLd(SCHEMA_ID, schema);
		return () => removeJsonLd(SCHEMA_ID);
	}, [schema]);

	return null;
};

export default ArticleSchema;
