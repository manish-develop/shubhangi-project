import { Router } from 'express';
import supabase from '../lib/supabase.js';
import { generatePrescriptionPdf } from '../lib/pdf.js';
import { requireAdmin } from '../middleware/index.js';

const router = Router();
router.use(requireAdmin);

const PDF_SIGNED_URL_TTL = 60 * 10; // 10 minutes

const withSignedUrl = async (prescription) => {
	if (!prescription.pdf_path) return prescription;

	const { data } = await supabase.storage
		.from('prescriptions')
		.createSignedUrl(prescription.pdf_path, PDF_SIGNED_URL_TTL);

	return { ...prescription, pdf_url: data?.signedUrl || null };
};

router.get('/', async (req, res, next) => {
	try {
		const { patient_id } = req.query;
		let query = supabase.from('prescriptions').select('*').order('date', { ascending: false });

		if (patient_id) query = query.eq('patient_id', patient_id);

		const { data, error } = await query;
		if (error) throw error;

		const withUrls = await Promise.all(data.map(withSignedUrl));
		res.json(withUrls);
	} catch (err) {
		next(err);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		const { data, error } = await supabase.from('prescriptions').select('*').eq('id', req.params.id).maybeSingle();
		if (error) throw error;
		if (!data) return res.status(404).json({ error: 'Prescription not found' });
		res.json(await withSignedUrl(data));
	} catch (err) {
		next(err);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const { patient_id, date, diagnosis, medicines, notes } = req.body;

		if (!patient_id) {
			return res.status(400).json({ error: 'patient_id is required' });
		}

		const { data: patient, error: patientError } = await supabase
			.from('patients')
			.select('*')
			.eq('id', patient_id)
			.maybeSingle();

		if (patientError) throw patientError;
		if (!patient) return res.status(404).json({ error: 'Patient not found' });

		const prescriptionDraft = {
			date: date || new Date().toISOString().slice(0, 10),
			diagnosis,
			medicines: medicines || [],
			notes,
		};

		const pdfBytes = await generatePrescriptionPdf({ patient, prescription: prescriptionDraft });
		const pdf_path = `${patient_id}/${Date.now()}.pdf`;

		const { error: uploadError } = await supabase.storage
			.from('prescriptions')
			.upload(pdf_path, Buffer.from(pdfBytes), { contentType: 'application/pdf' });

		if (uploadError) throw uploadError;

		const { data, error } = await supabase
			.from('prescriptions')
			.insert({ patient_id, ...prescriptionDraft, pdf_path })
			.select()
			.single();

		if (error) throw error;
		res.status(201).json(await withSignedUrl(data));
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		const { data: existing } = await supabase.from('prescriptions').select('pdf_path').eq('id', req.params.id).maybeSingle();

		if (existing?.pdf_path) {
			await supabase.storage.from('prescriptions').remove([existing.pdf_path]);
		}

		const { error } = await supabase.from('prescriptions').delete().eq('id', req.params.id);
		if (error) throw error;
		res.status(204).end();
	} catch (err) {
		next(err);
	}
});

export default () => router;
