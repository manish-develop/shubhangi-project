import React, { useCallback, useContext, useEffect, useId, useMemo, useRef, useState, forwardRef } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { cn } from '@/lib/utils';
import { XIcon, Plus } from 'lucide-react';

const DialogContext = React.createContext(null);

function useDialog() {
	const context = useContext(DialogContext);
	if (!context) {
		throw new Error('useDialog must be used within a DialogProvider');
	}
	return context;
}

function DialogProvider({ children, transition }) {
	const [isOpen, setIsOpen] = useState(false);
	const uniqueId = useId();
	const triggerRef = useRef(null);

	const contextValue = useMemo(() => ({ isOpen, setIsOpen, uniqueId, triggerRef }), [isOpen, uniqueId]);

	return (
		<DialogContext.Provider value={contextValue}>
			<MotionConfig transition={transition}>{children}</MotionConfig>
		</DialogContext.Provider>
	);
}

export function Dialog({ children, transition }) {
	return (
		<DialogProvider>
			<MotionConfig transition={transition}>{children}</MotionConfig>
		</DialogProvider>
	);
}

export function DialogTrigger({ children, className, style }) {
	const { setIsOpen, isOpen, uniqueId, triggerRef } = useDialog();

	const handleClick = useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);
	const handleKeyDown = useCallback(
		(event) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				setIsOpen(!isOpen);
			}
		},
		[isOpen, setIsOpen]
	);

	return (
		<motion.div
			ref={triggerRef}
			layoutId={`dialog-${uniqueId}`}
			className={cn('relative cursor-pointer', className)}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			style={style}
			role="button"
			tabIndex={0}
			aria-haspopup="dialog"
			aria-expanded={isOpen}
			aria-controls={`dialog-content-${uniqueId}`}
		>
			{children}
		</motion.div>
	);
}

export function DialogContent({ children, className, style }) {
	const { setIsOpen, isOpen, triggerRef } = useDialog();
	const containerRef = useRef(null);
	const [firstFocusableElement, setFirstFocusableElement] = useState(null);
	const [lastFocusableElement, setLastFocusableElement] = useState(null);

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === 'Escape') setIsOpen(false);
			if (event.key === 'Tab') {
				if (!firstFocusableElement || !lastFocusableElement) return;
				if (event.shiftKey) {
					if (document.activeElement === firstFocusableElement) {
						event.preventDefault();
						lastFocusableElement.focus();
					}
				} else if (document.activeElement === lastFocusableElement) {
					event.preventDefault();
					firstFocusableElement.focus();
				}
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [setIsOpen, firstFocusableElement, lastFocusableElement]);

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('overflow-hidden');
			const focusableElements = containerRef.current?.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);
			if (focusableElements && focusableElements.length > 0) {
				setFirstFocusableElement(focusableElements[0]);
				setLastFocusableElement(focusableElements[focusableElements.length - 1]);
				focusableElements[0].focus();
			}
			if (containerRef.current) containerRef.current.scrollTop = 0;
		} else {
			document.body.classList.remove('overflow-hidden');
			triggerRef.current?.focus();
		}
	}, [isOpen, triggerRef]);

	const { uniqueId } = useDialog();

	return (
		<motion.div
			ref={containerRef}
			layoutId={`dialog-${uniqueId}`}
			className={cn('overflow-hidden', className)}
			style={style}
			role="dialog"
			aria-modal="true"
			aria-labelledby={`dialog-title-${uniqueId}`}
		>
			{children}
		</motion.div>
	);
}

export function DialogContainer({ children, className }) {
	const { isOpen, setIsOpen, uniqueId } = useDialog();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		if (isOpen) window.scrollTo(0, 0);
		setMounted(true);
		return () => setMounted(false);
	}, [isOpen]);

	if (!mounted) return null;
	return (
		<AnimatePresence initial={false} mode="sync">
			{isOpen && (
				<>
					<motion.div
						key={`backdrop-${uniqueId}`}
						className="fixed inset-0 h-full z-50 w-full bg-black/60 backdrop-blur-sm"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setIsOpen(false)}
					/>
					<div className={cn('fixed inset-0 z-50 w-fit mx-auto', className)}>{children}</div>
				</>
			)}
		</AnimatePresence>
	);
}

export function DialogTitle({ children, className, style }) {
	const { uniqueId } = useDialog();
	return (
		<motion.div layoutId={`dialog-title-container-${uniqueId}`} className={className} style={style} layout>
			{children}
		</motion.div>
	);
}

export function DialogDescription({ children, className, variants, disableLayoutAnimation }) {
	const { uniqueId } = useDialog();
	return (
		<motion.div
			key={`dialog-description-${uniqueId}`}
			layoutId={disableLayoutAnimation ? undefined : `dialog-description-content-${uniqueId}`}
			variants={variants}
			className={className}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			{children}
		</motion.div>
	);
}

export function DialogImage({ src, alt, className, style }) {
	const { uniqueId } = useDialog();
	return <motion.img src={src} alt={alt} className={cn(className)} layoutId={`dialog-img-${uniqueId}`} style={style} />;
}

export function DialogClose({ children, className, variants }) {
	const { setIsOpen, uniqueId } = useDialog();
	const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

	return (
		<motion.button
			onClick={handleClose}
			type="button"
			aria-label="Close dialog"
			key={`dialog-close-${uniqueId}`}
			className={cn('absolute right-6 top-6', className)}
			initial="initial"
			animate="animate"
			exit="exit"
			variants={variants}
		>
			{children || <XIcon size={24} />}
		</motion.button>
	);
}

const LinearCardGrid = forwardRef(({ items }, ref) => {
	return (
		<div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
			{items.map((item) => (
				<React.Fragment key={item.id}>
					<Dialog transition={{ type: 'spring', bounce: 0.05, duration: 0.5 }}>
						<DialogTrigger
							style={{ borderRadius: '16px' }}
							className="group flex w-full flex-col overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition-shadow"
						>
							<div className="relative">
								<DialogImage src={item.url} alt={item.title} className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
								<button className="absolute bottom-3 right-3 p-2 bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground rounded-full transition-colors">
									<Plus className="w-5 h-5" />
								</button>
							</div>
							<div className="flex flex-grow flex-col items-start justify-center p-4">
								<DialogTitle className="text-foreground text-lg font-semibold heading-sans">{item.title}</DialogTitle>
								<span className="text-sm text-muted-foreground mt-1">{item.subtitle}</span>
							</div>
						</DialogTrigger>
						<DialogContainer className="pt-16 px-4">
							<DialogContent
								style={{ borderRadius: '24px' }}
								className="relative flex h-[85vh] mx-auto flex-col overflow-y-auto border border-border bg-card lg:w-[900px] w-full"
							>
								<DialogImage src={item.url} alt={item.title} className="h-full object-contain w-full sm:w-[70%] mx-auto" />
								<div className="p-6">
									<DialogTitle className="text-2xl md:text-3xl font-bold text-foreground heading-serif">{item.title}</DialogTitle>
									<DialogDescription
										disableLayoutAnimation
										variants={{
											initial: { opacity: 0, y: -20 },
											animate: { opacity: 1, y: 0 },
											exit: { opacity: 0, y: -20 },
										}}
									>
										<p className="mt-2 text-muted-foreground">{item.subtitle}</p>
										<p className="mt-3 text-foreground/80 leading-relaxed">{item.description}</p>
									</DialogDescription>
								</div>
								<DialogClose className="text-white bg-primary hover:bg-secondary hover:text-secondary-foreground p-3 rounded-full transition-colors" />
							</DialogContent>
						</DialogContainer>
					</Dialog>
				</React.Fragment>
			))}
		</div>
	);
});
LinearCardGrid.displayName = 'LinearCardGrid';

export default LinearCardGrid;
export { LinearCardGrid };
