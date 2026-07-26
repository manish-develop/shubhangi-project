import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import LazyImage from '@/components/LazyImage.jsx';
import { cn } from '@/lib/utils';

export const ExpandableCardGrid = ({ items, className, getKey = (i) => i.id, getImage = (i) => i.image, getTitle = (i) => i.title, getCategory = (i) => i.category, getDescription = (i) => i.description }) => {
	const [active, setActive] = useState(null);

	useEffect(() => {
		const onKeyDown = (e) => {
			if (e.key === 'Escape') setActive(null);
		};
		document.addEventListener('keydown', onKeyDown);
		return () => document.removeEventListener('keydown', onKeyDown);
	}, []);

	useEffect(() => {
		document.body.style.overflow = active ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [active]);

	return (
		<>
			<AnimatePresence>
				{active && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setActive(null)}
						className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
					/>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{active && (
					<div className="fixed inset-0 z-50 grid place-items-center p-4" onClick={() => setActive(null)}>
						<motion.div
							layoutId={`expandable-card-${getKey(active)}`}
							onClick={(e) => e.stopPropagation()}
							className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
						>
							<button
								type="button"
								onClick={() => setActive(null)}
								aria-label="Close"
								className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
							>
								<X className="h-4 w-4" />
							</button>

							<motion.div layoutId={`expandable-image-${getKey(active)}`} className="h-72 w-full md:h-96">
								<LazyImage src={getImage(active)} alt={getTitle(active)} className="h-full w-full object-cover" />
							</motion.div>

							<div className="p-6">
								{getCategory(active) && (
									<span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
										{getCategory(active)}
									</span>
								)}
								<motion.h3 layoutId={`expandable-title-${getKey(active)}`} className="text-xl font-bold text-foreground heading-serif">
									{getTitle(active)}
								</motion.h3>
								{getDescription(active) && (
									<p className="mt-3 text-sm text-muted-foreground leading-relaxed">{getDescription(active)}</p>
								)}
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>

			<div className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8', className)}>
				{items.map((item) => (
					<motion.div
						key={getKey(item)}
						layoutId={`expandable-card-${getKey(item)}`}
						onClick={() => setActive(item)}
						className="card w-full cursor-pointer overflow-hidden !p-0 border border-border hover-lift"
					>
						<motion.div layoutId={`expandable-image-${getKey(item)}`} className="relative h-48 w-full overflow-hidden bg-muted md:h-56">
							<LazyImage
								src={getImage(item)}
								alt={getTitle(item)}
								className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
							/>
						</motion.div>
						<div className="w-full p-4 text-center md:p-5">
							<motion.h3 layoutId={`expandable-title-${getKey(item)}`} className="m-0 text-lg font-semibold text-foreground">
								{getTitle(item)}
							</motion.h3>
						</div>
					</motion.div>
				))}
			</div>
		</>
	);
};

export default ExpandableCardGrid;
