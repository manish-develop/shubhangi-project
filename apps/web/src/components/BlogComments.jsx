import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { fetchWpComments, submitWpComment } from '@/lib/wordpress.js';

// Native WordPress comments, fetched/posted straight against the WP REST
// API for the given post. New comments may need approval in WordPress
// before they show up here, depending on the site's discussion settings.
const BlogComments = ({ postId }) => {
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [form, setForm] = useState({ name: '', email: '', content: '' });
	const [status, setStatus] = useState('idle'); // idle | submitting | submitted | error
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		if (!postId) return;
		setLoading(true);
		fetchWpComments(postId).then((data) => {
			setComments(data);
			setLoading(false);
		});
	}, [postId]);

	const topLevel = comments.filter((c) => !c.parent);
	const repliesTo = (id) => comments.filter((c) => c.parent === id);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!form.name.trim() || !form.email.trim() || !form.content.trim()) return;

		setStatus('submitting');
		setErrorMessage('');
		try {
			const created = await submitWpComment({
				postId,
				authorName: form.name.trim(),
				authorEmail: form.email.trim(),
				content: form.content.trim(),
			});
			// A pending (unapproved) comment won't come back on a public GET,
			// so show it immediately for the person who just posted it.
			setComments((prev) => [...prev, created]);
			setForm({ name: '', email: '', content: '' });
			setStatus('submitted');
		} catch (err) {
			setStatus('error');
			setErrorMessage(err.message || 'Could not post your comment. Please try again.');
		}
	};

	return (
		<div className="mt-16">
			<h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-foreground heading-serif">
				<MessageCircle className="h-5 w-5" />
				Comments {comments.length > 0 && <span className="text-muted-foreground text-lg font-normal">({comments.length})</span>}
			</h2>

			{!loading && topLevel.length === 0 && (
				<p className="text-muted-foreground mb-8">Be the first to comment on this article.</p>
			)}

			<div className="space-y-6 mb-10">
				{topLevel.map((comment) => (
					<div key={comment.id} className="flex gap-4">
						<div className="h-11 w-11 flex-shrink-0 overflow-hidden rounded-full bg-muted">
							{comment.avatar && <img src={comment.avatar} alt="" className="h-full w-full object-cover" />}
						</div>
						<div className="flex-grow">
							<div className="rounded-2xl border border-border bg-card p-4">
								<div className="mb-1 flex items-center gap-3">
									<span className="font-semibold text-foreground">{comment.author}</span>
									<span className="text-xs text-muted-foreground">{comment.date}</span>
								</div>
								<p className="text-sm text-foreground/90 leading-relaxed">{comment.content}</p>
							</div>

							{repliesTo(comment.id).length > 0 && (
								<div className="mt-3 ml-6 space-y-3 border-l-2 border-border pl-4">
									{repliesTo(comment.id).map((reply) => (
										<div key={reply.id} className="rounded-2xl border border-border bg-muted/50 p-4">
											<div className="mb-1 flex items-center gap-3">
												<span className="font-semibold text-foreground text-sm">{reply.author}</span>
												<span className="text-xs text-muted-foreground">{reply.date}</span>
											</div>
											<p className="text-sm text-foreground/90 leading-relaxed">{reply.content}</p>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				))}
			</div>

			<form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-muted/40 p-6">
				<h3 className="mb-4 text-lg font-semibold text-foreground">Leave a comment</h3>
				<div className="grid gap-4 sm:grid-cols-2 mb-4">
					<input
						type="text"
						placeholder="Your name"
						required
						value={form.name}
						onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
						className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
					/>
					<input
						type="email"
						placeholder="Your email (not published)"
						required
						value={form.email}
						onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
						className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
					/>
				</div>
				<textarea
					placeholder="Write your comment..."
					required
					rows={4}
					value={form.content}
					onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
					className="mb-4 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
				/>
				<div className="flex items-center gap-4">
					<button type="submit" disabled={status === 'submitting'} className="btn-primary disabled:opacity-60">
						{status === 'submitting' ? 'Posting…' : 'Post Comment'}
					</button>
					{status === 'submitted' && <span className="text-sm text-primary">Thanks! Your comment has been posted.</span>}
					{status === 'error' && <span className="text-sm text-destructive">{errorMessage}</span>}
				</div>
			</form>
		</div>
	);
};

export default BlogComments;
