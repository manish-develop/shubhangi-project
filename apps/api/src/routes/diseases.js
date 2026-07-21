import { Router } from 'express';
import supabase from '../lib/supabase.js';
import { upload, uploadToMedia } from '../lib/upload.js';
import { ensureUniqueSlug } from '../lib/slug.js';
import { requireAdmin } from '../middleware/index.js';

const publicRouter = Router();
const adminRouter = Router();

publicRouter.get('/', async (req, res, next) => {
	try {
		const { data, error } = await supabase
			.from('diseases')
			.select('*')
			.eq('published', true)
			.order('name', { ascending: true });

		if (error) throw error;
		res.json(data);
	} catch (err) {
		next(err);
	}
});

publicRouter.get('/:slug', async (req, res, next) => {
	try {
		const { data, error } = await supabase
			.from('diseases')
			.select('*')
			.eq('slug', req.params.slug)
			.eq('published', true)
			.maybeSingle();

		if (error) throw error;
		if (!data) return res.status(404).json({ error: 'Disease not found' });
		res.json(data);
	} catch (err) {
		next(err);
	}
});

adminRouter.use(requireAdmin);

adminRouter.get('/', async (req, res, next) => {
	try {
		const { data, error } = await supabase.from('diseases').select('*').order('name', { ascending: true });
		if (error) throw error;
		res.json(data);
	} catch (err) {
		next(err);
	}
});

adminRouter.get('/:id', async (req, res, next) => {
	try {
		const { data, error } = await supabase.from('diseases').select('*').eq('id', req.params.id).maybeSingle();
		if (error) throw error;
		if (!data) return res.status(404).json({ error: 'Disease not found' });
		res.json(data);
	} catch (err) {
		next(err);
	}
});

adminRouter.post('/', upload.single('image'), async (req, res, next) => {
	try {
		const { name, short_description, full_description, category, published } = req.body;

		if (!name || !full_description) {
			return res.status(400).json({ error: 'Name and full description are required' });
		}

		const slug = await ensureUniqueSlug('diseases', name);
		const image = req.file ? await uploadToMedia(req.file, 'diseases') : null;

		const { data, error } = await supabase
			.from('diseases')
			.insert({
				name,
				slug,
				short_description,
				full_description,
				category,
				image,
				published: published === 'false' ? false : true,
			})
			.select()
			.single();

		if (error) throw error;
		res.status(201).json(data);
	} catch (err) {
		next(err);
	}
});

adminRouter.put('/:id', upload.single('image'), async (req, res, next) => {
	try {
		const { name, short_description, full_description, category, published } = req.body;
		const updates = { name, short_description, full_description, category };

		if (published !== undefined) updates.published = published === 'false' ? false : true;
		if (req.file) updates.image = await uploadToMedia(req.file, 'diseases');

		const { data, error } = await supabase
			.from('diseases')
			.update(updates)
			.eq('id', req.params.id)
			.select()
			.maybeSingle();

		if (error) throw error;
		if (!data) return res.status(404).json({ error: 'Disease not found' });
		res.json(data);
	} catch (err) {
		next(err);
	}
});

adminRouter.delete('/:id', async (req, res, next) => {
	try {
		const { error } = await supabase.from('diseases').delete().eq('id', req.params.id);
		if (error) throw error;
		res.status(204).end();
	} catch (err) {
		next(err);
	}
});

export { publicRouter, adminRouter };
