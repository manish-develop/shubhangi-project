import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { adminApi } from '../lib/adminApi';

const emptyForm = {
	patient_name: '',
	category: '',
	title: '',
	description: '',
	youtube_url: '',
	published: true,
	image_url: '',
};

export default function TestimonialsAdminPage() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editing, setEditing] = useState(null);
	const [form, setForm] = useState(emptyForm);
	const [image, setImage] = useState(null);
	const [submitting, setSubmitting] = useState(false);

	const load = () => {
		setLoading(true);
		adminApi
			.get('/admin/testimonials')
			.then(setItems)
			.catch((err) => toast.error(err.message))
			.finally(() => setLoading(false));
	};

	useEffect(load, []);

	const openCreate = () => {
		setEditing(null);
		setForm(emptyForm);
		setImage(null);
		setDialogOpen(true);
	};

	const openEdit = (item) => {
		setEditing(item);
		setForm({
			patient_name: item.patient_name || '',
			category: item.category || '',
			title: item.title || '',
			description: item.description || '',
			youtube_url: item.youtube_url || '',
			published: item.published,
			image_url: '',
		});
		setImage(null);
		setDialogOpen(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		const fd = new FormData();
		Object.entries(form).forEach(([key, value]) => fd.append(key, value));
		if (image) fd.append('image', image);

		try {
			if (editing) {
				await adminApi.put(`/admin/testimonials/${editing.id}`, fd);
				toast.success('Testimonial updated');
			} else {
				await adminApi.post('/admin/testimonials', fd);
				toast.success('Testimonial created');
			}
			setDialogOpen(false);
			load();
		} catch (err) {
			toast.error(err.message);
		} finally {
			setSubmitting(false);
		}
	};

	const handleDelete = async (item) => {
		if (!window.confirm(`Delete "${item.title}"?`)) return;

		try {
			await adminApi.del(`/admin/testimonials/${item.id}`);
			toast.success('Testimonial deleted');
			load();
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<div>
					<h1 className="text-2xl font-bold text-foreground">Testimonials</h1>
					<p className="text-muted-foreground">Manage patient success story cases</p>
				</div>
				<Button onClick={openCreate}>
					<Plus className="h-4 w-4" /> New Testimonial
				</Button>
			</div>

			<div className="bg-card border border-border rounded-2xl overflow-hidden">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading && (
							<TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">Loading...</TableCell></TableRow>
						)}
						{!loading && items.length === 0 && (
							<TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No testimonials yet</TableCell></TableRow>
						)}
						{items.map((item) => (
							<TableRow key={item.id}>
								<TableCell className="font-medium">{item.title}</TableCell>
								<TableCell>{item.category || '-'}</TableCell>
								<TableCell>
									<Badge variant={item.published ? 'default' : 'secondary'}>
										{item.published ? 'Shown' : 'Hidden'}
									</Badge>
								</TableCell>
								<TableCell className="text-right space-x-1">
									<Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
										<Pencil className="h-4 w-4" />
									</Button>
									<Button variant="ghost" size="icon" onClick={() => handleDelete(item)}>
										<Trash2 className="h-4 w-4" />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>{editing ? 'Edit Testimonial' : 'New Testimonial'}</DialogTitle>
					</DialogHeader>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-1.5">
								<Label>Title</Label>
								<Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
							</div>
							<div className="space-y-1.5">
								<Label>Category</Label>
								<Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Skin, Hair, Other..." />
							</div>
						</div>

						<div className="space-y-1.5">
							<Label>Patient Name (optional)</Label>
							<Input value={form.patient_name} onChange={(e) => setForm({ ...form, patient_name: e.target.value })} />
						</div>

						<div className="space-y-1.5">
							<Label>Description</Label>
							<Textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
						</div>

						<div className="space-y-1.5">
							<Label>Testimonial Picture {editing?.before_image && '(leave empty to keep current)'}</Label>
							<Tabs defaultValue="upload">
								<TabsList>
									<TabsTrigger value="upload">Upload a Photo</TabsTrigger>
									<TabsTrigger value="link">Paste Image Link</TabsTrigger>
								</TabsList>
								<TabsContent value="upload" className="pt-2">
									<Input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
								</TabsContent>
								<TabsContent value="link" className="pt-2">
									<Input
										type="url"
										placeholder="https://..."
										value={form.image_url}
										onChange={(e) => setForm({ ...form, image_url: e.target.value })}
									/>
								</TabsContent>
							</Tabs>
						</div>

						<div className="space-y-1.5">
							<Label>YouTube Link (optional)</Label>
							<Input
								type="url"
								value={form.youtube_url}
								onChange={(e) => setForm({ ...form, youtube_url: e.target.value })}
								placeholder="https://youtube.com/watch?v=..."
							/>
						</div>

						<div className="flex items-center gap-3">
							<Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
							<Label>Shown on website</Label>
						</div>

						<DialogFooter>
							<Button type="submit" disabled={submitting}>
								{submitting ? 'Saving...' : 'Save'}
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
