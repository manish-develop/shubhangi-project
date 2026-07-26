import React, { useState, useRef, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ActionSearchBar = ({
	actions = [],
	placeholder = 'Search...',
	className,
	inputClassName,
	onSelect,
	maxResults = 8,
	getLabel = (a) => a.name,
	getCategory = (a) => a.category,
	getKey = (a) => a.id,
}) => {
	const [query, setQuery] = useState('');
	const [isFocused, setIsFocused] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);
	const wrapperRef = useRef(null);
	const inputRef = useRef(null);

	const results = useMemo(() => {
		if (!query.trim()) return [];
		const q = query.toLowerCase();
		return actions
			.filter((a) => getLabel(a).toLowerCase().includes(q) || getCategory(a)?.toLowerCase().includes(q))
			.slice(0, maxResults);
	}, [query, actions]);

	const isOpen = isFocused && query.trim().length > 0;

	useEffect(() => {
		setActiveIndex(-1);
	}, [query]);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
				setIsFocused(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleSelect = (action) => {
		onSelect?.(action);
		setQuery('');
		setIsFocused(false);
		inputRef.current?.blur();
	};

	const handleKeyDown = (e) => {
		if (!isOpen || results.length === 0) return;
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setActiveIndex((i) => Math.min(i + 1, results.length - 1));
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			setActiveIndex((i) => Math.max(i - 1, 0));
		} else if (e.key === 'Enter') {
			if (activeIndex >= 0 && results[activeIndex]) {
				e.preventDefault();
				handleSelect(results[activeIndex]);
			}
		} else if (e.key === 'Escape') {
			setIsFocused(false);
			inputRef.current?.blur();
		}
	};

	return (
		<div ref={wrapperRef} className={cn('relative w-full', className)}>
			<div
				className={cn(
					'flex items-center gap-3 rounded-full bg-card border-2 px-5 py-3 shadow-sm transition-colors duration-200',
					isFocused ? 'border-primary shadow-lg' : 'border-border'
				)}
			>
				<div className="relative h-5 w-5 shrink-0">
					<AnimatePresence mode="wait" initial={false}>
						{query.trim() ? (
							<motion.span
								key="arrow"
								initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
								animate={{ opacity: 1, rotate: 0, scale: 1 }}
								exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
								transition={{ duration: 0.2 }}
								className="absolute inset-0 flex items-center justify-center text-primary"
							>
								<ArrowRight className="h-5 w-5" />
							</motion.span>
						) : (
							<motion.span
								key="search"
								initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
								animate={{ opacity: 1, rotate: 0, scale: 1 }}
								exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
								transition={{ duration: 0.2 }}
								className="absolute inset-0 flex items-center justify-center text-muted-foreground"
							>
								<Search className="h-5 w-5" />
							</motion.span>
						)}
					</AnimatePresence>
				</div>

				<input
					ref={inputRef}
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onKeyDown={handleKeyDown}
					placeholder={placeholder}
					className={cn(
						'flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground',
						inputClassName
					)}
				/>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.15 }}
						className="absolute left-0 right-0 top-full z-30 mt-2 max-h-80 overflow-y-auto overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
					>
						{results.length > 0 ? (
							results.map((action, i) => (
								<button
									key={getKey(action)}
									type="button"
									onMouseDown={(e) => e.preventDefault()}
									onClick={() => handleSelect(action)}
									onMouseEnter={() => setActiveIndex(i)}
									className={cn(
										'flex w-full items-center justify-between gap-3 border-b border-border px-5 py-3.5 text-left transition-colors last:border-0',
										activeIndex === i ? 'bg-primary/10' : 'hover:bg-muted'
									)}
								>
									<div>
										<div className="font-medium text-foreground">{getLabel(action)}</div>
										{getCategory(action) && (
											<div className="mt-0.5 text-xs text-muted-foreground">{getCategory(action)}</div>
										)}
									</div>
									<ArrowRight
										className={cn(
											'h-4 w-4 shrink-0 transition-colors',
											activeIndex === i ? 'text-primary' : 'text-muted-foreground'
										)}
									/>
								</button>
							))
						) : (
							<div className="px-5 py-8 text-center text-sm text-muted-foreground">
								No conditions found matching "{query}"
							</div>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ActionSearchBar;
