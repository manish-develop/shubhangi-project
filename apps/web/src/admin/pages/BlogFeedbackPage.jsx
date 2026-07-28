import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { adminApi } from '../lib/adminApi';

const RATING_LABELS = {
	terrible: 'Terrible',
	bad: 'Bad',
	okay: 'Okay',
	amazing: 'Amazing',
};

const formatDate = (iso) => {
	try {
		return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
	} catch {
		return '';
	}
};

export default function BlogFeedbackPage() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);

	const load = () => {
		setLoading(true);
		adminApi
			.get('/admin/blog-feedback')
			.then(setItems)
			.catch((err) => toast.error(err.message))
			.finally(() => setLoading(false));
	};

	useEffect(load, []);

	const handleDelete = async (item) => {
		if (!window.confirm('Delete this feedback entry?')) return;

		try {
			await adminApi.del(`/admin/blog-feedback/${item.id}`);
			toast.success('Feedback deleted');
			load();
		} catch (err) {
			toast.error(err.message);
		}
	};

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<div>
					<h1 className="text-2xl font-bold text-foreground">Blog Feedback</h1>
					<p className="text-muted-foreground">Reader feedback submitted on blog articles</p>
				</div>
			</div>

			<div className="bg-card border border-border rounded-2xl overflow-hidden">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Blog</TableHead>
							<TableHead>Rating</TableHead>
							<TableHead>Feedback</TableHead>
							<TableHead>Date</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{loading && (
							<TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">Loading...</TableCell></TableRow>
						)}
						{!loading && items.length === 0 && (
							<TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No feedback yet.</TableCell></TableRow>
						)}
						{items.map((item) => (
							<TableRow key={item.id}>
								<TableCell className="font-medium">{item.blogs?.title || 'Untitled'}</TableCell>
								<TableCell>
									<Badge variant="secondary">{RATING_LABELS[item.rating] || item.rating}</Badge>
								</TableCell>
								<TableCell className="max-w-md whitespace-pre-wrap text-muted-foreground">{item.feedback}</TableCell>
								<TableCell className="text-muted-foreground whitespace-nowrap">{formatDate(item.created_at)}</TableCell>
								<TableCell className="text-right">
									<Button variant="ghost" size="icon" onClick={() => handleDelete(item)}>
										<Trash2 className="h-4 w-4" />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
