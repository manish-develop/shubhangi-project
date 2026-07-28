import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * A single sticky, centered image card. As the page scrolls past it, the card
 * scales down slightly and the next card slides over it, creating a
 * stacked-deck effect. `progress` is the scroll progress of the whole gallery
 * container; `range` maps this card's slice of that progress to a scale value.
 */
const ImageCard = ({ src, alt, index, progress, range, targetScale }) => {
	const cardRef = useRef(null);

	// Local scroll progress for this card only, used to give the image itself
	// a subtle zoom-out as it enters the sticky position.
	const { scrollYProgress: localProgress } = useScroll({
		target: cardRef,
		offset: ['start end', 'start start'],
	});
	const imageScale = useTransform(localProgress, [0, 1], [1.15, 1]);

	// Global progress for the stacking scale-down effect.
	const scale = useTransform(progress, range, [1, targetScale]);

	return (
		<div ref={cardRef} className="sticky top-32 flex h-[60vh] items-center justify-center md:h-[65vh]">
			<motion.div
				style={{ scale, top: `calc(-4vh + ${index * 18}px)` }}
				className="relative mx-auto aspect-[4/5] w-[280px] origin-top overflow-hidden rounded-2xl border border-border shadow-xl sm:w-[340px] md:w-[380px] lg:w-[420px]"
			>
				<motion.img
					src={src}
					alt={alt}
					loading="lazy"
					style={{ scale: imageScale }}
					className="h-full w-full object-cover"
				/>
			</motion.div>
		</div>
	);
};

/**
 * Vertical sticky-scroll image gallery: a deck of image cards that stack and
 * scale down as the user scrolls past them. Pass any number of images via
 * the `images` prop as [{ src, alt }].
 */
export function ImagesScrollingAnimation({ images = [] }) {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	});

	return (
		<div ref={containerRef} className="relative">
			{images.map((image, index) => {
				const targetScale = 1 - (images.length - index) * 0.05;
				return (
					<ImageCard
						key={image.src || index}
						index={index}
						src={image.src}
						alt={image.alt}
						progress={scrollYProgress}
						range={[index / images.length, 1]}
						targetScale={targetScale}
					/>
				);
			})}
		</div>
	);
}

export default ImagesScrollingAnimation;
