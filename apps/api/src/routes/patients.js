import { Router } from 'express';
import supabase from '../lib/supabase.js';
import { requireAdmin } from '../middleware/index.js';

const router = Router();
router.use(requireAdmin);

router.get('/', async (req, res, next) => {
	try {
		const { search } = req.query;
		let query = supabase.from('patients').select('*').order('created_at', { ascending: false });

		if (search) query = query.ilike('name', `%${search}%`);

		const { data, error } = await query;
		if (error) throw error;
		res.json(data);
	} catch (err) {
		next(err);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const { data: patient, error } = await supabase.from('patients').select('*').eq('id', req.params.id).maybeSingle();
		if (error) throw error;
		if (!patient) return res.status(404).json({ error: 'Patient not found' });

		const { data: prescriptions, error: prescriptionsError } = await supabase
			.from('prescriptions')
			.select('*')
			.eq('patient_id', req.params.id)
			.order('date', { ascending: false });

		if (prescriptionsError) throw prescriptionsError;

		res.json({ ...patient, prescriptions });
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { name, age, gender, phone, address, email, medical_history } = req.body;

		if (!name) {
			return res.status(400).json({ error: 'Name is required' });
		}

		const { data, error } = await supabase
			.from('patients')
			.insert({ name, age, gender, phone, address, email, medical_history })
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
		const { name, age, gender, phone, address, email, medical_history } = req.body;

		const { data, error } = await supabase
			.from('patients')
			.update({ name, age, gender, phone, address, email, medical_history })
			.eq('id', req.params.id)
			.select()
			.maybeSingle();

		if (error) throw error;
		if (!data) return res.status(404).json({ error: 'Patient not found' });
		res.json(data);
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const { error } = await supabase.from('patients').delete().eq('id', req.params.id);
		if (error) throw error;
		res.status(204).end();
	} catch (err) {
		next(err);
	}
});

export default () => router;
