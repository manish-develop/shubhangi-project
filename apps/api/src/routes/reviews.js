import { Router } from 'express';
import supabase from '../lib/supabase.js';
import { requireAdmin } from '../middleware/index.js';

const publicRouter = Router();
const adminRouter = Router();

publicRouter.get('/', async (req, res, next) => {
	try {
		const { data, error } = await supabase
			.from('reviews')
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
		const { data, error } = await supabase.from('reviews').select('*').order('display_order', { ascending: true });
		if (error) throw error;
		res.json(data);
	} catch (err) {
		next(err);
	}
});

adminRouter.post('/', async (req, res, next) => {
	try {
		const { reviewer_name, location, rating, review_text, published, display_order } = req.body;

		if (!reviewer_name || !review_text) {
			return res.status(400).json({ error: 'Reviewer name and review text are required' });
		}

		const { data, error } = await supabase
			.from('reviews')
			.insert({
				reviewer_name,
				location,
				rating: rating ? Number(rating) : 5,
				review_text,
				display_order: display_order ? Number(display_order) : 0,
				published: published === false ? false : true,
			})
			.select()
			.single();

		if (error) throw error;
		res.status(201).json(data);
	} catch (err) {
		next(err);
	}
});

adminRouter.put('/:id', async (req, res, next) => {
	try {
		const { reviewer_name, location, rating, review_text, published, display_order } = req.body;
		const updates = { reviewer_name, location, review_text };

		if (rating !== undefined) updates.rating = Number(rating);
		if (display_order !== undefined) updates.display_order = Number(display_order);
		if (published !== undefined) updates.published = !!published;

		const { data, error } = await supabase
			.from('reviews')
			.update(updates)
			.eq('id', req.params.id)
			.select()
			.maybeSingle();

		if (error) throw error;
		if (!data) return res.status(404).json({ error: 'Review not found' });
		res.json(data);
	} catch (err) {
		next(err);
	}
});

adminRouter.delete('/:id', async (req, res, next) => {
	try {
		const { error } = await supabase.from('reviews').delete().eq('id', req.params.id);
		if (error) throw error;
		res.status(204).end();
	} catch (err) {
		next(err);
	}
});

export { publicRouter, adminRouter };
