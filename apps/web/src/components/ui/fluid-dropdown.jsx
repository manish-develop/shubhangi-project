import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

export const FluidDropdown = ({ categories, value, onChange, className }) => {
	const [open, setOpen] = useState(false);
	const wrapperRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div ref={wrapperRef} className={cn('relative inline-block text-left', className)}>
			<button
				type="button"
				onClick={() => setOpen((o) => !o)}
				className={cn(
					'flex items-center gap-2 rounded-full border-2 bg-card px-5 py-2.5 text-sm font-medium shadow-sm transition-colors duration-200',
					open ? 'border-primary text-primary' : 'border-border text-foreground hover:border-primary/40'
				)}
			>
				<Layers className="h-4 w-4" />
				{value}
				<motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
					<ChevronDown className="h-4 w-4" />
				</motion.span>
			</button>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -8, scale: 0.96 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -8, scale: 0.96 }}
						transition={{ duration: 0.18, ease: 'easeOut' }}
						className="absolute left-0 z-30 mt-2 w-56 overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-xl"
					>
						{categories.map((cat) => {
							const active = cat === value;
							return (
								<button
									key={cat}
									type="button"
									onClick={() => {
										onChange(cat);
										setOpen(false);
									}}
									className="relative flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm transition-colors"
								>
									{active && (
										<motion.span
											layoutId="fluid-dropdown-active"
											className="absolute inset-0 rounded-xl bg-primary/10"
											transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
										/>
									)}
									<span className={cn('relative z-10', active ? 'font-semibold text-primary' : 'text-foreground')}>
										{cat}
									</span>
									{active && <Check className="relative z-10 h-4 w-4 text-primary" />}
								</button>
							);
						})}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default FluidDropdown;
