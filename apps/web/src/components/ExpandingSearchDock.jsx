import React, { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const ExpandingSearchDock = ({
	value,
	onChange,
	onFocus,
	onBlur,
	placeholder = 'Search...',
	className,
	inputClassName,
	children,
	defaultExpanded = false,
}) => {
	const [expanded, setExpanded] = useState(defaultExpanded);
	const inputRef = useRef(null);
	const wrapperRef = useRef(null);

	useEffect(() => {
		if (expanded) inputRef.current?.focus();
	}, [expanded]);

	useEffect(() => {
		if (!expanded) return;

		const handleClickOutside = (e) => {
			if (wrapperRef.current && !wrapperRef.current.contains(e.target) && !value) {
				setExpanded(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [expanded, value]);

	const handleClear = () => {
		onChange({ target: { value: '' } });
		setExpanded(false);
	};

	return (
		<div ref={wrapperRef} className={cn('relative', className)}>
			<div
				onClick={() => !expanded && setExpanded(true)}
				role={expanded ? undefined : 'button'}
				tabIndex={expanded ? undefined : 0}
				aria-label={expanded ? undefined : 'Open search'}
				onKeyDown={(e) => {
					if (!expanded && (e.key === 'Enter' || e.key === ' ')) {
						e.preventDefault();
						setExpanded(true);
					}
				}}
				className={cn(
					'flex items-center rounded-full shadow-lg transition-all duration-300 ease-out overflow-hidden',
					expanded
						? 'w-full bg-card border-2 border-primary px-5 py-3 gap-3 cursor-text'
						: 'w-14 h-14 bg-primary justify-center cursor-pointer hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
				)}
			>
				<Search className={cn('shrink-0 transition-all duration-300', expanded ? 'w-5 h-5 text-primary' : 'w-6 h-6 text-primary-foreground')} />
				<input
					ref={inputRef}
					type="text"
					value={value}
					onChange={onChange}
					onFocus={onFocus}
					placeholder={placeholder}
					className={cn(
						'bg-transparent outline-none text-foreground placeholder:text-muted-foreground transition-all duration-300',
						expanded ? 'flex-1 opacity-100' : 'w-0 opacity-0 pointer-events-none',
						inputClassName
					)}
				/>
				{expanded && (
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							handleClear();
							onBlur?.();
						}}
						aria-label="Close search"
						className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
					>
						<X className="w-5 h-5" />
					</button>
				)}
			</div>

			{expanded && children}
		</div>
	);
};

export default ExpandingSearchDock;
