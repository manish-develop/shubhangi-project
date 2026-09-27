import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import ReviewsColumn from './ReviewsColumn.jsx';
import ReviewFeedbackDialog from './ReviewFeedbackDialog.jsx';
import { fetchWpReviews } from '@/lib/wordpress.js';

const ReviewsSection = () => {
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		fetchWpReviews().then(setReviews);
	}, []);

	if (reviews.length === 0) return null;

	const avgRating = (reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / reviews.length).toFixed(1);

	const columnCount = reviews.length >= 6 ? 3 : reviews.length >= 3 ? 2 : 1;
	const columns = Array.from({ length: columnCount }, (_, i) =>
		reviews.filter((_, idx) => idx % columnCount === i)
	);
	const durations = [15, 19, 17];

	return (
		<section className="section-medium">
			<div className="container-custom">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
					viewport={{ once: true }}
					className="flex flex-col items-center text-center max-w-xl mx-auto mb-10"
				>
					<div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
						<div className="flex gap-0.5">
							{[...Array(5)].map((_, i) => (
								<Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
							))}
						</div>
						{avgRating} rating from real patients
					</div>
					<h2 className="section-title heading-serif">What Our Patients Say</h2>
					<p className="section-subtitle text-lg md:text-xl text-muted-foreground body-text">
						Real stories from real people who found healing through homoeopathy
					</p>
				</motion.div>

				<div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[600px] overflow-hidden">
					{columns.map((col, i) => (
						<ReviewsColumn
							key={i}
							reviews={col}
							duration={durations[i % durations.length]}
							className={i === 1 ? 'hidden md:block' : i === 2 ? 'hidden lg:block' : ''}
						/>
					))}
				</div>

				<div className="mt-10 flex justify-center">
					<ReviewFeedbackDialog />
				</div>
			</div>
		</section>
	);
};

export default ReviewsSection;
