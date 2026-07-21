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
import { adminApi } from '../lib/adminApi';

const emptyForm = { reviewer_name: '', location: '', rating: 5, review_text: '', published: true, display_order: 0 };

export default function ReviewsAdminPage() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editing, setEditing] = useState(null);
	const [form, setForm] = useState(emptyForm);
	const [submitting, setSubmitting] = useState(false);

	const load = () => {
		setLoading(true);
		adminApi
			.get('/admin/reviews')
			.then(setItems)
			.catch((err) => toast.error(err.message))
			.finally(() => setLoading(false));
	};

	useEffect(load, []);

	const openCreate = () => {
		setEditing(null);
		setForm(emptyForm);
		setDialogOpen(true);
	};

	const openEdit = (item) => {
		setEditing(item);
		setForm({
			reviewer_name: item.reviewer_name,
			location: item.location || '',
			rating: item.rating,
			review_text: item.review_text,
			published: item.published,
			display_order: item.display_order,
		});
		setDialogOpen(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			if (editing) {
				await adminApi.put(`/admin/reviews/${editing.id}`, form);
				toast.success('Review updated');
			} else {
				await adminApi.post('/admin/reviews', form);
				toast.success('Review added');
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
		if (!window.confirm(`Delete review from "${item.reviewer_name}"?`)) return;

		try {
			await adminApi.del(`/admin/reviews/${item.id}`);
			toast.success('Review deleted');
			load();
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<div>
					<h1 className="text-2xl font-bold text-foreground">Reviews</h1>
					<p className="text-muted-foreground">Copy real reviews from your Google Business listing and add them here</p>
				</div>
				<Button onClick={openCreate}>
					<Plus className="h-4 w-4" /> New Review
				</Button>
			</div>

			<div className="bg-card border border-border rounded-2xl overflow-hidden">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Reviewer</TableHead>
							<TableHead>Rating</TableHead>
							<TableHead>Order</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading && (
							<TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Loading...</TableCell></TableRow>
						)}
						{!loading && items.length === 0 && (
							<TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No reviews yet</TableCell></TableRow>
						)}
						{items.map((item) => (
							<TableRow key={item.id}>
								<TableCell className="font-medium">{item.reviewer_name}</TableCell>
								<TableCell>{item.rating}★</TableCell>
								<TableCell>{item.display_order}</TableCell>
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
				<DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>{editing ? 'Edit Review' : 'New Review'}</DialogTitle>
					</DialogHeader>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-1.5">
								<Label>Reviewer Name</Label>
								<Input value={form.reviewer_name} onChange={(e) => setForm({ ...form, reviewer_name: e.target.value })} required />
							</div>
							<div className="space-y-1.5">
								<Label>Location</Label>
								<Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="City" />
							</div>
						</div>

						<div className="space-y-1.5">
							<Label>Review Text</Label>
							<Textarea rows={4} value={form.review_text} onChange={(e) => setForm({ ...form, review_text: e.target.value })} required />
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-1.5">
								<Label>Rating (1-5)</Label>
								<Input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />
							</div>
							<div className="space-y-1.5">
								<Label>Display Order</Label>
								<Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: e.target.value })} />
							</div>
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
