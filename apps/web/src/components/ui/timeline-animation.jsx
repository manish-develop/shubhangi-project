import React from 'react';
import { motion, useInView } from 'framer-motion';

export const TimelineContent = ({
	as = 'div',
	children,
	animationNum,
	timelineRef,
	customVariants,
	className,
	...props
}) => {
	const isInView = useInView(timelineRef, { once: true, amount: 0.15 });
	const MotionTag = motion[as] || motion.div;

	return (
		<MotionTag
			custom={animationNum}
			variants={customVariants}
			initial="hidden"
			animate={isInView ? 'visible' : 'hidden'}
			className={className}
			{...props}
		>
			{children}
		</MotionTag>
	);
};

export default TimelineContent;
