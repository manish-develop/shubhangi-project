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

const imageFields = upload.fields([
	{ name: 'before_image', maxCount: 1 },
	{ name: 'after_image', maxCount: 1 },
]);

adminRouter.post('/', imageFields, async (req, res, next) => {
	try {
		const { patient_name, category, title, description, rating, published, display_order } = req.body;

		const before_image = req.files?.before_image?.[0]
			? await uploadToMedia(req.files.before_image[0], 'testimonials')
			: null;
		const after_image = req.files?.after_image?.[0]
			? await uploadToMedia(req.files.after_image[0], 'testimonials')
			: null;

		const { data, error } = await supabase
			.from('testimonials')
			.insert({
				patient_name,
				category,
				title,
				description,
				rating: rating ? Number(rating) : 5,
				display_order: display_order ? Number(display_order) : 0,
				before_image,
				after_image,
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
		const { patient_name, category, title, description, rating, published, display_order } = req.body;
		const updates = { patient_name, category, title, description };

		if (rating !== undefined) updates.rating = Number(rating);
		if (display_order !== undefined) updates.display_order = Number(display_order);
		if (published !== undefined) updates.published = published === 'false' ? false : true;
		if (req.files?.before_image?.[0]) updates.before_image = await uploadToMedia(req.files.before_image[0], 'testimonials');
		if (req.files?.after_image?.[0]) updates.after_image = await uploadToMedia(req.files.after_image[0], 'testimonials');

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
