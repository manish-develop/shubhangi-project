import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Button } from '@/components/ui/button.jsx';
import { cn } from '@/lib/utils';

const GOOGLE_REVIEW_URL = 'https://search.google.com/local/writereview?placeid=ChIJ1_9GVwEDDTkR9tth_d7368o';

const ReviewFeedbackDialog = ({ trigger }) => {
	const [open, setOpen] = useState(false);
	const [rating, setRating] = useState(0);
	const [hoverRating, setHoverRating] = useState(0);
	const [feedback, setFeedback] = useState('');

	const handleShare = () => {
		window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
		setOpen(false);
		setRating(0);
		setFeedback('');
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{trigger ?? <Button size="lg" className="rounded-full">Share Your Experience</Button>}
			</DialogTrigger>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>How was your experience?</DialogTitle>
					<DialogDescription>
						Your feedback helps other patients find the right care. We'll open Google Reviews in a new tab for you to post it.
					</DialogDescription>
				</DialogHeader>

				<div className="flex justify-center gap-2 py-2">
					{[1, 2, 3, 4, 5].map((n) => (
						<button
							key={n}
							type="button"
							onClick={() => setRating(n)}
							onMouseEnter={() => setHoverRating(n)}
							onMouseLeave={() => setHoverRating(0)}
							aria-label={`${n} star${n > 1 ? 's' : ''}`}
							className="p-1"
						>
							<Star
								className={cn(
									'h-8 w-8 transition-colors',
									(hoverRating || rating) >= n ? 'fill-accent text-accent' : 'text-muted-foreground'
								)}
							/>
						</button>
					))}
				</div>

				<Textarea
					value={feedback}
					onChange={(e) => setFeedback(e.target.value)}
					placeholder="Tell us about your treatment experience..."
					rows={4}
				/>

				<DialogFooter>
					<Button onClick={handleShare} disabled={rating === 0} className="w-full">
						Post on Google Reviews
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ReviewFeedbackDialog;
