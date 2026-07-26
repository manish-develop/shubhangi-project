import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ImagePreview from '@/components/ui/image-preview.jsx';

export const ParallaxFeatureSection = ({ items }) => {
	const sectionRefs = items.map(() => useRef(null));

	const scrollYProgress = items.map((_, index) =>
		useScroll({ target: sectionRefs[index], offset: ['start end', 'center center'] }).scrollYProgress
	);

	const opacityContents = scrollYProgress.map((progress) => useTransform(progress, [0, 0.8], [0, 1]));
	const clipProgresses = scrollYProgress.map((progress) =>
		useTransform(progress, [0, 0.8], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'])
	);
	const translateContents = scrollYProgress.map((progress) => useTransform(progress, [0, 1], [-40, 0]));

	return (
		<div className="flex flex-col gap-10 md:gap-16">
			{items.map((item, index) => (
				<div
					key={item.id}
					ref={sectionRefs[index]}
					className={`flex flex-col items-center gap-8 md:gap-16 ${
						item.reverse ? 'md:flex-row-reverse' : 'md:flex-row'
					}`}
				>
					<motion.div style={{ y: translateContents[index] }} className="flex-1 text-center md:text-left">
						<div className="mx-auto md:mx-0 mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-primary">
							<item.icon className="h-8 w-8" />
						</div>
						<h3 className="text-3xl md:text-4xl font-bold text-foreground heading-serif">{item.title}</h3>
						<motion.p style={{ y: translateContents[index] }} className="mt-5 max-w-lg mx-auto md:mx-0 text-base md:text-lg text-muted-foreground leading-relaxed">
							{item.description}
						</motion.p>
					</motion.div>

					<motion.div
						style={{ opacity: opacityContents[index], clipPath: clipProgresses[index] }}
						className="relative flex-1 flex flex-col gap-4 max-w-xl w-full"
					>
						{item.images.map((img, i) => (
							<ImagePreview key={i} src={img.src} alt={img.alt} className="w-full h-64 md:h-80 object-cover shadow-lg" />
						))}
					</motion.div>
				</div>
			))}
		</div>
	);
};

export default ParallaxFeatureSection;
