import { Router } from 'express';
import supabase from '../lib/supabase.js';
import { requireAdmin } from '../middleware/index.js';

const publicRouter = Router();
const adminRouter = Router();

publicRouter.get('/', async (req, res, next) => {
	try {
		const { data, error } = await supabase
			.from('youtube_videos')
			.select('*')
			.eq('featured', true)
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
			.from('youtube_videos')
			.select('*')
			.order('display_order', { ascending: true });
		if (error) throw error;
		res.json(data);
	} catch (err) {
		next(err);
	}
});

adminRouter.post('/', async (req, res, next) => {
	try {
		const { video_id, title, description, featured, display_order } = req.body;

		if (!video_id) {
			return res.status(400).json({ error: 'video_id is required' });
		}

		const { data, error } = await supabase
			.from('youtube_videos')
			.insert({
				video_id,
				title,
				description,
				featured: !!featured,
				display_order: display_order ? Number(display_order) : 0,
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
		const { video_id, title, description, featured, display_order } = req.body;
		const updates = { video_id, title, description };

		if (featured !== undefined) updates.featured = !!featured;
		if (display_order !== undefined) updates.display_order = Number(display_order);

		const { data, error } = await supabase
			.from('youtube_videos')
			.update(updates)
			.eq('id', req.params.id)
			.select()
			.maybeSingle();

		if (error) throw error;
		if (!data) return res.status(404).json({ error: 'Video not found' });
		res.json(data);
	} catch (err) {
		next(err);
	}
});

adminRouter.delete('/:id', async (req, res, next) => {
	try {
		const { error } = await supabase.from('youtube_videos').delete().eq('id', req.params.id);
		if (error) throw error;
		res.status(204).end();
	} catch (err) {
		next(err);
	}
});

export { publicRouter, adminRouter };
