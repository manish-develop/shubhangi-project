import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Frown, Meh, Smile, Laugh } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const RATINGS = [
	{ id: 'terrible', label: 'Terrible', icon: Frown },
	{ id: 'bad', label: 'Bad', icon: Meh },
	{ id: 'okay', label: 'Okay', icon: Smile },
	{ id: 'amazing', label: 'Amazing', icon: Laugh },
];

export function FeedbackWidget({ blogId }) {
	const [selected, setSelected] = useState(null);
	const [feedback, setFeedback] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	const expanded = Boolean(selected) && !submitted;

	const handleSelect = (id) => {
		setSubmitted(false);
		setSelected(id);
	};

	const handleSubmit = async () => {
		if (!feedback.trim() || submitting) return;
		setSubmitting(true);

		try {
			const res = await fetch(`${API_URL}/blog-feedback`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ blog_id: blogId, rating: selected, feedback: feedback.trim() }),
			});

			if (!res.ok) throw new Error('Failed to send feedback');

			toast.success('Thanks for your feedback!');
			setFeedback('');
			setSubmitted(true);
			setSelected(null);
		} catch (err) {
			toast.error('Could not send feedback. Please try again.');
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<motion.div layout className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
			<motion.div layout="position" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
				<div>
					<h3 className="text-lg font-semibold text-foreground heading-sans">Was this article helpful?</h3>
					<p className="text-sm text-muted-foreground mt-1">Your feedback helps us write better content.</p>
				</div>

				<div className="flex items-center gap-2 flex-wrap">
					{RATINGS.map((r) => {
						const Icon = r.icon;
						const active = selected === r.id;
						return (
							<button
								key={r.id}
								type="button"
								onClick={() => handleSelect(r.id)}
								aria-label={r.label}
								aria-pressed={active}
								className={cn(
									'flex flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs font-medium border transition-colors',
									active
										? 'bg-primary text-primary-foreground border-primary'
										: 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground'
								)}
							>
								<Icon className="w-5 h-5" />
								{r.label}
							</button>
						);
					})}
				</div>
			</motion.div>

			<AnimatePresence>
				{expanded && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.25, ease: 'easeInOut' }}
						className="overflow-hidden"
					>
						<div className="pt-5 mt-5 border-t border-border">
							<Textarea
								value={feedback}
								onChange={(e) => setFeedback(e.target.value)}
								placeholder="Tell us a bit more (what worked, what didn't)..."
								rows={4}
								className="bg-background"
								autoFocus
							/>
							<div className="flex justify-end mt-3">
								<Button type="button" onClick={handleSubmit} disabled={!feedback.trim() || submitting}>
									{submitting ? 'Sending...' : 'Send Feedback'}
								</Button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{submitted && <p className="text-sm text-primary mt-4">Thanks for sharing your thoughts!</p>}
		</motion.div>
	);
}

export default FeedbackWidget;
