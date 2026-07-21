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

const emptyForm = { title: '', excerpt: '', content: '', category: '', published: true };

export default function BlogsPage() {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [editing, setEditing] = useState(null);
	const [form, setForm] = useState(emptyForm);
	const [coverImage, setCoverImage] = useState(null);
	const [submitting, setSubmitting] = useState(false);

	const load = () => {
		setLoading(true);
		adminApi
			.get('/admin/blogs')
			.then(setBlogs)
			.catch((err) => toast.error(err.message))
			.finally(() => setLoading(false));
	};

	useEffect(load, []);

	const openCreate = () => {
		setEditing(null);
		setForm(emptyForm);
		setCoverImage(null);
		setDialogOpen(true);
	};

	const openEdit = (blog) => {
		setEditing(blog);
		setForm({
			title: blog.title,
			excerpt: blog.excerpt || '',
			content: blog.content,
			category: blog.category || '',
			published: blog.published,
		});
		setCoverImage(null);
		setDialogOpen(true);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		const fd = new FormData();
		Object.entries(form).forEach(([key, value]) => fd.append(key, value));
		if (coverImage) fd.append('cover_image', coverImage);

		try {
			if (editing) {
				await adminApi.put(`/admin/blogs/${editing.id}`, fd);
				toast.success('Blog updated');
			} else {
				await adminApi.post('/admin/blogs', fd);
				toast.success('Blog created');
			}
			setDialogOpen(false);
			load();
		} catch (err) {
			toast.error(err.message);
		} finally {
			setSubmitting(false);
		}
	};

	const handleDelete = async (blog) => {
		if (!window.confirm(`Delete "${blog.title}"?`)) return;

		try {
			await adminApi.del(`/admin/blogs/${blog.id}`);
			toast.success('Blog deleted');
			load();
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<div>
					<h1 className="text-2xl font-bold text-foreground">Blogs</h1>
					<p className="text-muted-foreground">Write and manage blog articles</p>
				</div>
				<Button onClick={openCreate}>
					<Plus className="h-4 w-4" /> New Blog
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
						{!loading && blogs.length === 0 && (
							<TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No blogs yet</TableCell></TableRow>
						)}
						{blogs.map((blog) => (
							<TableRow key={blog.id}>
								<TableCell className="font-medium">{blog.title}</TableCell>
								<TableCell>{blog.category || '-'}</TableCell>
								<TableCell>
									<Badge variant={blog.published ? 'default' : 'secondary'}>
										{blog.published ? 'Published' : 'Draft'}
									</Badge>
								</TableCell>
								<TableCell className="text-right space-x-1">
									<Button variant="ghost" size="icon" onClick={() => openEdit(blog)}>
										<Pencil className="h-4 w-4" />
									</Button>
									<Button variant="ghost" size="icon" onClick={() => handleDelete(blog)}>
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
						<DialogTitle>{editing ? 'Edit Blog' : 'New Blog'}</DialogTitle>
					</DialogHeader>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-1.5">
							<Label>Title</Label>
							<Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
						</div>

						<div className="space-y-1.5">
							<Label>Category</Label>
							<Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
						</div>

						<div className="space-y-1.5">
							<Label>Excerpt</Label>
							<Textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
						</div>

						<div className="space-y-1.5">
							<Label>Content</Label>
							<Textarea rows={10} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
						</div>

						<div className="space-y-1.5">
							<Label>Cover Image {editing?.cover_image && '(leave empty to keep current)'}</Label>
							<Input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files?.[0] || null)} />
						</div>

						<div className="flex items-center gap-3">
							<Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
							<Label>Published (visible on website)</Label>
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
