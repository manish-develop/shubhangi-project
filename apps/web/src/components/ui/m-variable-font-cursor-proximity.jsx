import React, { useCallback, useRef, useState } from 'react';

export const VariableFontCursorProximity = ({
	label,
	className,
	fromWeight = 400,
	toWeight = 800,
	radius = 220,
	as: Tag = 'span',
	style,
}) => {
	const wordRefs = useRef([]);
	const [weights, setWeights] = useState([]);
	const words = label.split(' ');

	const handleMouseMove = useCallback(
		(e) => {
			const next = wordRefs.current.map((el) => {
				if (!el) return fromWeight;
				const rect = el.getBoundingClientRect();
				const cx = rect.left + rect.width / 2;
				const cy = rect.top + rect.height / 2;
				const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
				const t = Math.max(0, 1 - dist / radius);
				return Math.round(fromWeight + (toWeight - fromWeight) * t);
			});
			setWeights(next);
		},
		[fromWeight, toWeight, radius]
	);

	const handleMouseLeave = useCallback(() => {
		setWeights(words.map(() => fromWeight));
	}, [words.length, fromWeight]);

	return (
		<Tag className={className} style={style} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
			{words.map((word, i) => (
				<span
					key={i}
					ref={(el) => (wordRefs.current[i] = el)}
					style={{ fontWeight: weights[i] ?? fromWeight, transition: 'font-weight 0.15s ease-out', display: 'inline-block' }}
				>
					{word}
					{i < words.length - 1 ? ' ' : ''}
				</span>
			))}
		</Tag>
	);
};

export default VariableFontCursorProximity;
