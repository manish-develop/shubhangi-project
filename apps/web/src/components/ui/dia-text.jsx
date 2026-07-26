import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const DiaTextReveal = ({ words = [], interval = 2200, className }) => {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (words.length <= 1) return;
		const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
		return () => clearInterval(id);
	}, [words.length, interval]);

	return (
		<span className="inline-grid overflow-hidden align-bottom">
			<AnimatePresence mode="wait">
				<motion.span
					key={words[index]}
					initial={{ clipPath: 'inset(0 100% 0 0)' }}
					animate={{ clipPath: 'inset(0 0% 0 0)' }}
					exit={{ clipPath: 'inset(0 0 0 100%)' }}
					transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
					style={{ gridArea: '1 / 1' }}
					className={cn(
						'whitespace-nowrap bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent',
						className
					)}
				>
					{words[index]}
				</motion.span>
			</AnimatePresence>
		</span>
	);
};

export default DiaTextReveal;
