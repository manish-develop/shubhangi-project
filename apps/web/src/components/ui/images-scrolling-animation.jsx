import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

const StickyCard = ({ i, src, alt, progress, range, targetScale }) => {
	const scale = useTransform(progress, range, [1, targetScale]);

	return (
		<div className="sticky top-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
			<motion.div
				style={{
					scale,
					top: `calc(-5vh + ${i * 15 + 200}px)`,
				}}
				className="relative -top-1/4 flex h-[200px] w-[280px] origin-top flex-col overflow-hidden rounded-2xl sm:h-[240px] sm:w-[360px] md:h-[280px] md:w-[420px] lg:h-[300px] lg:w-[500px] lg:rounded-3xl"
			>
				<img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
			</motion.div>
		</div>
	);
};

/**
 * Vertical sticky-scroll image gallery: a deck of image cards that stack and
 * scale down as the user scrolls past them. Pass images via the `images`
 * prop as [{ src, alt }].
 */
export function ImagesScrollingAnimation({ images = [] }) {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	return (
		<ReactLenis root>
			<div
				ref={container}
				className="relative flex w-full flex-col items-center justify-center pb-[50vh] pt-[5vh] sm:pb-[60vh] sm:pt-[8vh] lg:pb-[70vh] lg:pt-[10vh]"
			>
				{images.map((image, i) => {
					const targetScale = Math.max(0.6, 1 - (images.length - i - 1) * 0.08);
					return (
						<StickyCard
							key={image.src || i}
							i={i}
							src={image.src}
							alt={image.alt}
							progress={scrollYProgress}
							range={[i * (1 / images.length), 1]}
							targetScale={targetScale}
						/>
					);
				})}
			</div>
		</ReactLenis>
	);
}

export default ImagesScrollingAnimation;
