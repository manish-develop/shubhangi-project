import { Router } from 'express';
import supabase from '../lib/supabase.js';
import { requireAdmin } from '../middleware/index.js';

const publicRouter = Router();
const adminRouter = Router();

publicRouter.post('/', async (req, res, next) => {
	try {
		const { blog_id, rating, feedback } = req.body;

		if (!blog_id || !rating || !feedback) {
			return res.status(400).json({ error: 'blog_id, rating and feedback are required' });
		}

		const { data, error } = await supabase
			.from('blog_feedback')
			.insert({ blog_id, rating, feedback })
			.select()
			.single();

		if (error) throw error;
		res.status(201).json(data);
	} catch (err) {
		next(err);
	}
});

adminRouter.use(requireAdmin);

adminRouter.get('/', async (req, res, next) => {
	try {
		const { data, error } = await supabase
			.from('blog_feedback')
			.select('*, blogs(title)')
			.order('created_at', { ascending: false });

		if (error) throw error;
		res.json(data);
	} catch (err) {
		next(err);
	}
});

adminRouter.delete('/:id', async (req, res, next) => {
	try {
		const { error } = await supabase.from('blog_feedback').delete().eq('id', req.params.id);
		if (error) throw error;
		res.status(204).end();
	} catch (err) {
		next(err);
	}
});

export { publicRouter, adminRouter };
