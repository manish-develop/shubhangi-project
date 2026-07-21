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

const emptyForm = { video_id: '', title: '', description: '', featured: false, display_order: 0 };

const extractVideoId = (input) => {
	const match = input.match(/(?:youtu\.be\/|v=|embed\/)([a-zA-Z0-9_-]{11})/);
	return match ? match[1] : input.trim();
};

export default function VideosAdminPage() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editing, setEditing] = useState(null);
	const [form, setForm] = useState(emptyForm);
	const [submitting, setSubmitting] = useState(false);

	const load = () => {
		setLoading(true);
		adminApi
			.get('/admin/youtube-videos')
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
		setForm({ video_id: item.video_id, title: item.title || '', description: item.description || '', featured: item.featured, display_order: item.display_order });
		setDialogOpen(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		const payload = { ...form, video_id: extractVideoId(form.video_id) };

		try {
			if (editing) {
				await adminApi.put(`/admin/youtube-videos/${editing.id}`, payload);
				toast.success('Video updated');
			} else {
				await adminApi.post('/admin/youtube-videos', payload);
				toast.success('Video added');
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
		if (!window.confirm(`Remove "${item.title || item.video_id}"?`)) return;

		try {
			await adminApi.del(`/admin/youtube-videos/${item.id}`);
			toast.success('Video removed');
			load();
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<div>
					<h1 className="text-2xl font-bold text-foreground">YouTube Videos</h1>
					<p className="text-muted-foreground">Paste a YouTube link or video ID, toggle Featured to show it on the site</p>
				</div>
				<Button onClick={openCreate}>
					<Plus className="h-4 w-4" /> Add Video
				</Button>
			</div>

			<div className="bg-card border border-border rounded-2xl overflow-hidden">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead>Video ID</TableHead>
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
							<TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No videos yet</TableCell></TableRow>
						)}
						{items.map((item) => (
							<TableRow key={item.id}>
								<TableCell className="font-medium">{item.title || '-'}</TableCell>
								<TableCell className="text-muted-foreground">{item.video_id}</TableCell>
								<TableCell>{item.display_order}</TableCell>
								<TableCell>
									<Badge variant={item.featured ? 'default' : 'secondary'}>
										{item.featured ? 'Featured' : 'Hidden'}
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
				<DialogContent className="max-w-lg">
					<DialogHeader>
						<DialogTitle>{editing ? 'Edit Video' : 'Add Video'}</DialogTitle>
					</DialogHeader>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-1.5">
							<Label>YouTube Link or Video ID</Label>
							<Input
								value={form.video_id}
								onChange={(e) => setForm({ ...form, video_id: e.target.value })}
								placeholder="https://www.youtube.com/watch?v=..."
								required
							/>
						</div>

						<div className="space-y-1.5">
							<Label>Title</Label>
							<Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
						</div>

						<div className="space-y-1.5">
							<Label>Description</Label>
							<Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
						</div>

						<div className="space-y-1.5">
							<Label>Display Order</Label>
							<Input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: e.target.value })} />
						</div>

						<div className="flex items-center gap-3">
							<Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
							<Label>Featured (visible on website)</Label>
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
