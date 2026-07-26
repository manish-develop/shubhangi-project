import { Router } from 'express';
import supabase from '../lib/supabase.js';
import { upload, uploadToMedia } from '../lib/upload.js';
import { requireAdmin } from '../middleware/index.js';

const publicRouter = Router();
const adminRouter = Router();

publicRouter.get('/', async (req, res, next) => {
	try {
		const { data, error } = await supabase
			.from('testimonials')
			.select('*')
			.eq('published', true)
			.order('display_order', { ascending: true });

		if (error) throw error;
		res.json(data);
	} catch (err) {
		next(err);
	}
});

adminRouter.use(requireAdmin);

adminRouter.get('/', async (req, res, next) => {
	try {
		const { data, error } = await supabase
			.from('testimonials')
			.select('*')
			.order('display_order', { ascending: true });
		if (error) throw error;
		res.json(data);
	} catch (err) {
		next(err);
	}
});

adminRouter.get('/:id', async (req, res, next) => {
	try {
		const { data, error } = await supabase.from('testimonials').select('*').eq('id', req.params.id).maybeSingle();
		if (error) throw error;
		if (!data) return res.status(404).json({ error: 'Testimonial not found' });
		res.json(data);
	} catch (err) {
		next(err);
	}
});

const imageFields = upload.fields([{ name: 'image', maxCount: 1 }]);

adminRouter.post('/', imageFields, async (req, res, next) => {
	try {
		const { patient_name, category, title, description, published, youtube_url } = req.body;

		const image = req.files?.image?.[0] ? await uploadToMedia(req.files.image[0], 'testimonials') : null;

		const { data, error } = await supabase
			.from('testimonials')
			.insert({
				patient_name,
				category,
				title,
				description,
				youtube_url: youtube_url || null,
				rating: 5,
				display_order: 0,
				before_image: image,
				after_image: image,
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

adminRouter.put('/:id', imageFields, async (req, res, next) => {
	try {
		const { patient_name, category, title, description, published, youtube_url } = req.body;
		const updates = { patient_name, category, title, description, youtube_url: youtube_url || null };

		if (published !== undefined) updates.published = published === 'false' ? false : true;
		if (req.files?.image?.[0]) {
			const image = await uploadToMedia(req.files.image[0], 'testimonials');
			updates.before_image = image;
			updates.after_image = image;
		}

		const { data, error } = await supabase
			.from('testimonials')
			.update(updates)
			.eq('id', req.params.id)
			.select()
			.maybeSingle();

		if (error) throw error;
		if (!data) return res.status(404).json({ error: 'Testimonial not found' });
		res.json(data);
	} catch (err) {
		next(err);
	}
});

adminRouter.delete('/:id', async (req, res, next) => {
	try {
		const { error } = await supabase.from('testimonials').delete().eq('id', req.params.id);
		if (error) throw error;
		res.status(204).end();
	} catch (err) {
		next(err);
	}
});

export { publicRouter, adminRouter };
