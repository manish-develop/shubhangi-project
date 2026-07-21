import slugify from 'slugify';
import supabase from './supabase.js';

const toSlug = (text) => slugify(text, { lower: true, strict: true });

const ensureUniqueSlug = async (table, baseText) => {
	const base = toSlug(baseText);
	let slug = base;
	let suffix = 2;

	// eslint-disable-next-line no-constant-condition
	while (true) {
		const { data } = await supabase.from(table).select('id').eq('slug', slug).maybeSingle();
		if (!data) return slug;
		slug = `${base}-${suffix}`;
		suffix += 1;
	}
};

export { toSlug, ensureUniqueSlug };
