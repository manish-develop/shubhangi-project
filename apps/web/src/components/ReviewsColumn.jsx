import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const initialsOf = (name = '') =>
	name
		.split(' ')
		.map((n) => n[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);

const ReviewsColumn = ({ className, reviews, duration = 15 }) => {
	return (
		<div className={className}>
			<motion.div
				animate={{ translateY: '-50%' }}
				transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
				className="flex flex-col gap-5 pb-5"
			>
				{[...new Array(2).fill(0)].map((_, dup) => (
					<React.Fragment key={dup}>
						{reviews.map((r, i) => (
							<div
								key={`${dup}-${i}`}
								className="p-6 rounded-2xl border border-border bg-card card-shadow-lg max-w-xs w-full"
							>
								<div className="flex gap-0.5 mb-3">
									{[...Array(r.rating || 5)].map((_, idx) => (
										<Star key={idx} className="w-3.5 h-3.5 fill-accent text-accent" />
									))}
								</div>
								<p className="text-sm text-foreground body-text leading-relaxed">{r.review_text}</p>
								<div className="flex items-center gap-3 mt-5">
									<div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-sm shrink-0">
										{initialsOf(r.reviewer_name)}
									</div>
									<div className="flex flex-col min-w-0">
										<div className="font-medium tracking-tight leading-5 text-foreground truncate">{r.reviewer_name}</div>
										{r.location && <div className="leading-5 text-xs text-muted-foreground truncate">{r.location}</div>}
									</div>
								</div>
							</div>
						))}
					</React.Fragment>
				))}
			</motion.div>
		</div>
	);
};

export default ReviewsColumn;
