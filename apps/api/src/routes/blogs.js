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
			.from('blogs')
			.select('*')
			.eq('published', true)
			.order('created_at', { ascending: false });

		if (error) throw error;
		res.json(data);
	} catch (err) {
		next(err);
	}
});

publicRouter.get('/:slug', async (req, res, next) => {
	try {
		const { data, error } = await supabase
			.from('blogs')
			.select('*')
			.eq('slug', req.params.slug)
			.eq('published', true)
			.maybeSingle();

		if (error) throw error;
		if (!data) return res.status(404).json({ error: 'Blog not found' });
		res.json(data);
	} catch (err) {
		next(err);
	}
});

adminRouter.use(requireAdmin);

adminRouter.get('/', async (req, res, next) => {
	try {
		const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
		if (error) throw error;
		res.json(data);
	} catch (err) {
		next(err);
	}
});

adminRouter.get('/:id', async (req, res, next) => {
	try {
		const { data, error } = await supabase.from('blogs').select('*').eq('id', req.params.id).maybeSingle();
		if (error) throw error;
		if (!data) return res.status(404).json({ error: 'Blog not found' });
		res.json(data);
	} catch (err) {
		next(err);
	}
});

adminRouter.post('/', upload.single('cover_image'), async (req, res, next) => {
	try {
		const { title, excerpt, content, category, author, published, cover_image_url } = req.body;

		if (!title || !content) {
			return res.status(400).json({ error: 'Title and content are required' });
		}

		const slug = await ensureUniqueSlug('blogs', title);
		const cover_image = req.file ? await uploadToMedia(req.file, 'blogs') : (cover_image_url || null);

		const { data, error } = await supabase
			.from('blogs')
			.insert({
				title,
				slug,
				excerpt,
				content,
				category,
				author,
				cover_image,
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

adminRouter.put('/:id', upload.single('cover_image'), async (req, res, next) => {
	try {
		const { title, excerpt, content, category, author, published, cover_image_url } = req.body;
		const updates = { title, excerpt, content, category, author };

		if (published !== undefined) updates.published = published === 'false' ? false : true;
		if (req.file) updates.cover_image = await uploadToMedia(req.file, 'blogs');
		else if (cover_image_url) updates.cover_image = cover_image_url;

		const { data, error } = await supabase
			.from('blogs')
			.update(updates)
			.eq('id', req.params.id)
			.select()
			.maybeSingle();

		if (error) throw error;
		if (!data) return res.status(404).json({ error: 'Blog not found' });
		res.json(data);
	} catch (err) {
		next(err);
	}
});

adminRouter.delete('/:id', async (req, res, next) => {
	try {
		const { error } = await supabase.from('blogs').delete().eq('id', req.params.id);
		if (error) throw error;
		res.status(204).end();
	} catch (err) {
		next(err);
	}
});

export { publicRouter, adminRouter };
