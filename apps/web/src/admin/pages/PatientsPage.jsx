import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Plus, Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { adminApi } from '../lib/adminApi';

const emptyForm = { name: '', age: '', gender: '', phone: '', address: '', email: '', medical_history: '' };

export default function PatientsPage() {
	const [patients, setPatients] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [dialogOpen, setDialogOpen] = useState(false);
	const [form, setForm] = useState(emptyForm);
	const [submitting, setSubmitting] = useState(false);
	const navigate = useNavigate();

	const load = (query = '') => {
		setLoading(true);
		adminApi
			.get(`/admin/patients${query ? `?search=${encodeURIComponent(query)}` : ''}`)
			.then(setPatients)
			.catch((err) => toast.error(err.message))
			.finally(() => setLoading(false));
	};

	useEffect(load, []);

	const handleSearch = (e) => {
		e.preventDefault();
		load(search);
	};

	const openCreate = () => {
		setForm(emptyForm);
		setDialogOpen(true);
	};

	const handleDelete = async (e, patient) => {
		e.preventDefault();
		e.stopPropagation();
		if (!window.confirm(`Delete patient "${patient.name}"? This will also delete all their prescriptions.`)) return;

		try {
			await adminApi.del(`/admin/patients/${patient.id}`);
			toast.success('Patient deleted');
			load(search);
		} catch (err) {
			toast.error(err.message);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const patient = await adminApi.post('/admin/patients', form);
			toast.success('Patient added');
			setDialogOpen(false);
			navigate(`/admin/patients/${patient.id}`);
		} catch (err) {
			toast.error(err.message);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<div>
					<h1 className="text-2xl font-bold text-foreground">Patients</h1>
					<p className="text-muted-foreground">Patient records and prescription history</p>
				</div>
				<Button onClick={openCreate}>
					<Plus className="h-4 w-4" /> New Patient
				</Button>
			</div>

			<form onSubmit={handleSearch} className="flex gap-2 mb-4 max-w-sm">
				<Input placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} />
				<Button type="submit" variant="outline" size="icon"><Search className="h-4 w-4" /></Button>
			</form>

			<div className="bg-card border border-border rounded-2xl overflow-hidden">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Age</TableHead>
							<TableHead>Gender</TableHead>
							<TableHead>Phone</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading && (
							<TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Loading...</TableCell></TableRow>
						)}
						{!loading && patients.length === 0 && (
							<TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No patients yet</TableCell></TableRow>
						)}
						{patients.map((p) => (
							<TableRow key={p.id} className="cursor-pointer">
								<TableCell className="font-medium">
									<Link to={`/admin/patients/${p.id}`} className="hover:text-primary">{p.name}</Link>
								</TableCell>
								<TableCell>{p.age || '-'}</TableCell>
								<TableCell>{p.gender || '-'}</TableCell>
								<TableCell>{p.phone || '-'}</TableCell>
								<TableCell className="text-right">
									<Button variant="ghost" size="icon" onClick={(e) => handleDelete(e, p)}>
										<Trash2 className="h-4 w-4" />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>New Patient</DialogTitle>
					</DialogHeader>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-1.5">
							<Label>Name</Label>
							<Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-1.5">
								<Label>Age</Label>
								<Input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
							</div>
							<div className="space-y-1.5">
								<Label>Gender</Label>
								<Input value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} />
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-1.5">
								<Label>Phone</Label>
								<Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
							</div>
						</div>

						<div className="space-y-1.5">
							<Label>Email</Label>
							<Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
						</div>

						<div className="space-y-1.5">
							<Label>Address</Label>
							<Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
						</div>

						<div className="space-y-1.5">
							<Label>Medical History</Label>
							<Textarea rows={3} value={form.medical_history} onChange={(e) => setForm({ ...form, medical_history: e.target.value })} />
						</div>

						<DialogFooter>
							<Button type="submit" disabled={submitting}>
								{submitting ? 'Saving...' : 'Save & Open'}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
