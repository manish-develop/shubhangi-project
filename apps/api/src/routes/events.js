import { Router } from 'express';
import supabase from '../lib/supabase.js';
import { requireAdmin } from '../middleware/index.js';

const router = Router();
router.use(requireAdmin);

router.get('/', async (req, res, next) => {
	try {
		const { data, error } = await supabase.from('events').select('*').order('start_time', { ascending: true });
		if (error) throw error;
		res.json(data);
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { title, description, start_time, end_time, color, category, tags } = req.body;

		if (!title || !start_time || !end_time) {
			return res.status(400).json({ error: 'title, start_time and end_time are required' });
		}

		const { data, error } = await supabase
			.from('events')
			.insert({ title, description, start_time, end_time, color, category, tags: tags || [] })
			.select()
			.single();

		if (error) throw error;
		res.status(201).json(data);
	} catch (err) {
		next(err);
	}
});

router.put('/:id', async (req, res, next) => {
	try {
		const { title, description, start_time, end_time, color, category, tags } = req.body;

		const { data, error } = await supabase
			.from('events')
			.update({ title, description, start_time, end_time, color, category, tags })
			.eq('id', req.params.id)
			.select()
			.maybeSingle();

		if (error) throw error;
		if (!data) return res.status(404).json({ error: 'Event not found' });
		res.json(data);
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const { error } = await supabase.from('events').delete().eq('id', req.params.id);
		if (error) throw error;
		res.status(204).end();
	} catch (err) {
		next(err);
	}
});

export default () => router;
