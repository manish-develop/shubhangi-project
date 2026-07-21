import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft, Plus, Trash2, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { adminApi } from '../lib/adminApi';

const emptyMedicine = { name: '', dosage: '', duration: '', instructions: '' };

export default function PatientDetailPage() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [patient, setPatient] = useState(null);
	const [loading, setLoading] = useState(true);
	const [diagnosis, setDiagnosis] = useState('');
	const [notes, setNotes] = useState('');
	const [medicines, setMedicines] = useState([{ ...emptyMedicine }]);
	const [submitting, setSubmitting] = useState(false);

	const load = () => {
		setLoading(true);
		adminApi
			.get(`/admin/patients/${id}`)
			.then(setPatient)
			.catch((err) => toast.error(err.message))
			.finally(() => setLoading(false));
	};

	useEffect(load, [id]);

	const updateMedicine = (index, field, value) => {
		setMedicines((prev) => prev.map((m, i) => (i === index ? { ...m, [field]: value } : m)));
	};

	const addMedicine = () => setMedicines((prev) => [...prev, { ...emptyMedicine }]);
	const removeMedicine = (index) => setMedicines((prev) => prev.filter((_, i) => i !== index));

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			await adminApi.post('/admin/prescriptions', {
				patient_id: id,
				diagnosis,
				notes,
				medicines: medicines.filter((m) => m.name.trim()),
			});
			toast.success('Prescription created');
			setDiagnosis('');
			setNotes('');
			setMedicines([{ ...emptyMedicine }]);
			load();
		} catch (err) {
			toast.error(err.message);
		} finally {
			setSubmitting(false);
		}
	};

	const downloadPdf = async (prescriptionId) => {
		try {
			const fresh = await adminApi.get(`/admin/prescriptions/${prescriptionId}`);
			if (fresh.pdf_url) window.open(fresh.pdf_url, '_blank');
		} catch (err) {
			toast.error(err.message);
		}
	};

	const deletePrescription = async (prescriptionId) => {
		if (!window.confirm('Delete this prescription?')) return;

		try {
			await adminApi.del(`/admin/prescriptions/${prescriptionId}`);
			toast.success('Prescription deleted');
			load();
		} catch (err) {
			toast.error(err.message);
		}
	};

	if (loading) return <p className="text-muted-foreground">Loading...</p>;
	if (!patient) return <p className="text-muted-foreground">Patient not found</p>;

	return (
		<div>
			<Button variant="ghost" size="sm" onClick={() => navigate('/admin/patients')} className="mb-4">
				<ArrowLeft className="h-4 w-4" /> Back to Patients
			</Button>

			<div className="grid lg:grid-cols-3 gap-6">
				<div className="lg:col-span-1 space-y-6">
					<div className="bg-card border border-border rounded-2xl p-5">
						<h2 className="text-lg font-bold text-foreground mb-3">{patient.name}</h2>
						<dl className="space-y-2 text-sm">
							<div className="flex justify-between"><dt className="text-muted-foreground">Age</dt><dd>{patient.age || '-'}</dd></div>
							<div className="flex justify-between"><dt className="text-muted-foreground">Gender</dt><dd>{patient.gender || '-'}</dd></div>
							<div className="flex justify-between"><dt className="text-muted-foreground">Phone</dt><dd>{patient.phone || '-'}</dd></div>
							<div className="flex justify-between"><dt className="text-muted-foreground">Email</dt><dd>{patient.email || '-'}</dd></div>
							<div className="flex justify-between"><dt className="text-muted-foreground">Address</dt><dd className="text-right">{patient.address || '-'}</dd></div>
						</dl>
						{patient.medical_history && (
							<div className="mt-3 pt-3 border-t border-border">
								<p className="text-xs text-muted-foreground mb-1">Medical History</p>
								<p className="text-sm">{patient.medical_history}</p>
							</div>
						)}
					</div>

					<div className="bg-card border border-border rounded-2xl p-5">
						<h3 className="font-semibold text-foreground mb-3">Prescription History</h3>
						{patient.prescriptions?.length === 0 && <p className="text-sm text-muted-foreground">No prescriptions yet</p>}
						<ul className="space-y-2">
							{patient.prescriptions?.map((p) => (
								<li key={p.id} className="flex items-center justify-between text-sm border border-border rounded-lg px-3 py-2">
									<div className="flex items-center gap-2 min-w-0">
										<FileText className="h-4 w-4 text-primary shrink-0" />
										<span className="truncate">{p.date} — {p.diagnosis || 'No diagnosis'}</span>
									</div>
									<div className="flex items-center gap-1 shrink-0">
										<Button variant="ghost" size="icon" onClick={() => downloadPdf(p.id)}><Download className="h-4 w-4" /></Button>
										<Button variant="ghost" size="icon" onClick={() => deletePrescription(p.id)}><Trash2 className="h-4 w-4" /></Button>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="lg:col-span-2">
					<div className="bg-card border border-border rounded-2xl p-6">
						<h3 className="font-semibold text-foreground mb-4">New Prescription</h3>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-1.5">
								<Label>Diagnosis</Label>
								<Input value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
							</div>

							<div>
								<div className="flex items-center justify-between mb-2">
									<Label>Medicines</Label>
									<Button type="button" variant="outline" size="sm" onClick={addMedicine}>
										<Plus className="h-4 w-4" /> Add Medicine
									</Button>
								</div>

								<div className="space-y-2">
									{medicines.map((med, index) => (
										<div key={index} className="grid grid-cols-[2fr_1fr_1fr_2fr_auto] gap-2 items-center">
											<Input placeholder="Medicine name" value={med.name} onChange={(e) => updateMedicine(index, 'name', e.target.value)} />
											<Input placeholder="Dosage" value={med.dosage} onChange={(e) => updateMedicine(index, 'dosage', e.target.value)} />
											<Input placeholder="Duration" value={med.duration} onChange={(e) => updateMedicine(index, 'duration', e.target.value)} />
											<Input placeholder="Instructions" value={med.instructions} onChange={(e) => updateMedicine(index, 'instructions', e.target.value)} />
											<Button type="button" variant="ghost" size="icon" onClick={() => removeMedicine(index)} disabled={medicines.length === 1}>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									))}
								</div>
							</div>

							<div className="space-y-1.5">
								<Label>Notes</Label>
								<Textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
							</div>

							<Button type="submit" disabled={submitting}>
								{submitting ? 'Generating PDF...' : 'Create Prescription & Generate PDF'}
							</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
