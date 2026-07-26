import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function calculateGap(width) {
	const minWidth = 1024;
	const maxWidth = 1456;
	const minGap = 60;
	const maxGap = 86;
	if (width <= minWidth) return minGap;
	if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
	return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularShowcase = ({ items, autoplay = true, onSelect }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [hoverPrev, setHoverPrev] = useState(false);
	const [hoverNext, setHoverNext] = useState(false);
	const [containerWidth, setContainerWidth] = useState(1200);

	const imageContainerRef = useRef(null);
	const autoplayIntervalRef = useRef(null);

	const itemsLength = useMemo(() => items.length, [items]);
	const activeItem = useMemo(() => items[activeIndex], [activeIndex, items]);

	useEffect(() => {
		function handleResize() {
			if (imageContainerRef.current) {
				setContainerWidth(imageContainerRef.current.offsetWidth);
			}
		}
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		if (autoplay) {
			autoplayIntervalRef.current = setInterval(() => {
				setActiveIndex((prev) => (prev + 1) % itemsLength);
			}, 5000);
		}
		return () => {
			if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
		};
	}, [autoplay, itemsLength]);

	const handleNext = useCallback(() => {
		setActiveIndex((prev) => (prev + 1) % itemsLength);
		if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
	}, [itemsLength]);

	const handlePrev = useCallback(() => {
		setActiveIndex((prev) => (prev - 1 + itemsLength) % itemsLength);
		if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
	}, [itemsLength]);

	useEffect(() => {
		const handleKey = (e) => {
			if (e.key === 'ArrowLeft') handlePrev();
			if (e.key === 'ArrowRight') handleNext();
		};
		window.addEventListener('keydown', handleKey);
		return () => window.removeEventListener('keydown', handleKey);
	}, [handlePrev, handleNext]);

	function getImageStyle(index) {
		const gap = calculateGap(containerWidth);
		const maxStickUp = gap * 0.8;
		const isActive = index === activeIndex;
		const isLeft = (activeIndex - 1 + itemsLength) % itemsLength === index;
		const isRight = (activeIndex + 1) % itemsLength === index;
		if (isActive) {
			return {
				zIndex: 3,
				opacity: 1,
				pointerEvents: 'auto',
				transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
				transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
			};
		}
		if (isLeft) {
			return {
				zIndex: 2,
				opacity: 1,
				pointerEvents: 'auto',
				transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
				transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
			};
		}
		if (isRight) {
			return {
				zIndex: 2,
				opacity: 1,
				pointerEvents: 'auto',
				transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
				transition: 'all 0.8s cubic-bezier(.4,2,.3,1)',
			};
		}
		return { zIndex: 1, opacity: 0, pointerEvents: 'none', transition: 'all 0.8s cubic-bezier(.4,2,.3,1)' };
	}

	const contentVariants = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -20 },
	};

	return (
		<div className="mx-auto w-full max-w-6xl p-4 md:p-8">
			<div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
				<div ref={imageContainerRef} className="relative aspect-[4/3] w-full" style={{ perspective: '1000px' }}>
					{items.map((item, index) => (
						<img
							key={item.slug}
							src={item.image}
							alt={item.title}
							className="absolute h-full w-full rounded-2xl object-cover shadow-2xl"
							style={getImageStyle(index)}
						/>
					))}
				</div>

				<div className="flex flex-col justify-between">
					<AnimatePresence mode="wait">
						<motion.div
							key={activeIndex}
							variants={contentVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							transition={{ duration: 0.3, ease: 'easeInOut' }}
						>
							<span className="text-sm font-semibold uppercase tracking-widest text-primary">{activeItem.category}</span>
							<h3 className="mt-3 text-3xl font-bold text-foreground heading-serif md:text-4xl">{activeItem.title}</h3>
							<p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
								{activeItem.description.split(' ').map((word, i) => (
									<motion.span
										key={i}
										initial={{ filter: 'blur(10px)', opacity: 0, y: 5 }}
										animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
										transition={{ duration: 0.22, ease: 'easeInOut', delay: 0.02 * i }}
										style={{ display: 'inline-block' }}
									>
										{word}&nbsp;
									</motion.span>
								))}
							</p>
							{onSelect && (
								<button
									onClick={() => onSelect(activeItem)}
									className="btn-primary mt-8 inline-flex w-fit items-center gap-2 text-base"
								>
									Read More <ArrowRight className="h-4 w-4" />
								</button>
							)}
						</motion.div>
					</AnimatePresence>

					<div className="mt-10 flex gap-4">
						<button
							className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors"
							style={{ backgroundColor: hoverPrev ? 'hsl(var(--secondary))' : 'hsl(var(--primary))' }}
							onClick={handlePrev}
							onMouseEnter={() => setHoverPrev(true)}
							onMouseLeave={() => setHoverPrev(false)}
							aria-label="Previous specialization"
						>
							<ArrowLeft className="h-5 w-5" />
						</button>
						<button
							className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors"
							style={{ backgroundColor: hoverNext ? 'hsl(var(--secondary))' : 'hsl(var(--primary))' }}
							onClick={handleNext}
							onMouseEnter={() => setHoverNext(true)}
							onMouseLeave={() => setHoverNext(false)}
							aria-label="Next specialization"
						>
							<ArrowRight className="h-5 w-5" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CircularShowcase;
