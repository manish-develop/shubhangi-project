import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import {
	Layers,
	Sparkles,
	Droplet,
	Scissors,
	ScanFace,
	CircleDot,
	Bug,
	Hand,
	Scale,
	Baby,
	Check,
	ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

function useClickAway(ref, handler) {
	useEffect(() => {
		const listener = (event) => {
			if (!ref.current || ref.current.contains(event.target)) return;
			handler(event);
		};
		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);
		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [ref, handler]);
}

// Best-effort icon for a category label. Categories are real, admin-entered
// strings (Skin, Hair, Acne, Vitiligo, Fungal Infection, Other, ...) so we
// match on keywords and fall back to a generic sparkle icon when unsure.
function getCategoryIcon(category) {
	const key = (category || '').toLowerCase();
	if (key === 'all') return Layers;
	if (key.includes('hair')) return Scissors;
	if (key.includes('nail')) return Hand;
	if (key.includes('acne')) return ScanFace;
	if (key.includes('vitiligo')) return CircleDot;
	if (key.includes('fungal') || key.includes('infection')) return Bug;
	if (key.includes('weight')) return Scale;
	if (key.includes('child') || key.includes('pediatric')) return Baby;
	if (key.includes('skin') || key.includes('eczema') || key.includes('psoriasis')) return Droplet;
	return Sparkles;
}

/**
 * FluidDropdown — an animated dropdown selector.
 * Shows the selected category with its icon and a chevron; clicking opens an
 * animated list of options where the hovered row gets a sliding highlight
 * (shared layoutId). Click outside or Escape closes it.
 *
 * Props: { categories: string[], value: string, onChange: (val: string) => void }
 */
export const FluidDropdown = ({ categories = [], value, onChange, className }) => {
	const [open, setOpen] = useState(false);
	const [hovered, setHovered] = useState(null);
	const wrapperRef = useRef(null);

	useClickAway(wrapperRef, () => setOpen(false));

	const handleKeyDown = useCallback((e) => {
		if (e.key === 'Escape') setOpen(false);
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

	const SelectedIcon = getCategoryIcon(value);

	return (
		<MotionConfig transition={{ duration: 0.25, ease: 'easeOut' }}>
			<div ref={wrapperRef} className={cn('relative inline-block w-full text-left sm:w-auto', className)}>
				<button
					type="button"
					onClick={() => setOpen((o) => !o)}
					aria-haspopup="listbox"
					aria-expanded={open}
					className={cn(
						'flex w-full items-center justify-between gap-2 rounded-full border-2 bg-card px-5 py-2.5 text-sm font-medium shadow-sm transition-colors duration-200 sm:w-56',
						open ? 'border-primary text-primary' : 'border-border text-foreground hover:border-primary/40'
					)}
				>
					<span className="flex min-w-0 items-center gap-2">
						<SelectedIcon className="h-4 w-4 shrink-0" />
						<span className="truncate">{value}</span>
					</span>
					<motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
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
							role="listbox"
							onMouseLeave={() => setHovered(null)}
							className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-2xl border border-border bg-card p-1.5 shadow-xl sm:w-56"
						>
							{categories.map((cat) => {
								const Icon = getCategoryIcon(cat);
								const active = cat === value;
								return (
									<button
										key={cat}
										type="button"
										role="option"
										aria-selected={active}
										onMouseEnter={() => setHovered(cat)}
										onClick={() => {
											onChange(cat);
											setOpen(false);
										}}
										className="relative flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-left text-sm transition-colors"
									>
										{hovered === cat && (
											<motion.span
												layoutId="hover-highlight"
												className="absolute inset-0 rounded-xl bg-primary/10"
												transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
											/>
										)}
										<Icon className={cn('relative z-10 h-4 w-4 shrink-0', active ? 'text-primary' : 'text-muted-foreground')} />
										<span className={cn('relative z-10 flex-1 truncate', active ? 'font-semibold text-primary' : 'text-foreground')}>
											{cat}
										</span>
										{active && <Check className="relative z-10 h-4 w-4 shrink-0 text-primary" />}
									</button>
								);
							})}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</MotionConfig>
	);
};

export default FluidDropdown;
