import { memo, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const sizeClasses = {
	sm: 'w-8 min-w-8 h-11 text-2xl',
	md: 'w-11 min-w-11 h-16 text-4xl',
	lg: 'w-14 min-w-14 h-20 text-5xl',
};

const commonCardStyle = 'absolute inset-x-0 overflow-hidden h-1/2 bg-inherit text-inherit';

const DigitSpan = ({ children, position }) => (
	<span
		className="absolute left-0 right-0 w-full flex items-center justify-center h-[200%]"
		style={{ top: position === 'top' ? '0%' : '-100%' }}
	>
		{children}
	</span>
);

const FlipUnit = memo(function FlipUnit({ digit, size = 'md' }) {
	const [prevDigit, setPrevDigit] = useState(digit);
	const [flipping, setFlipping] = useState(false);

	useEffect(() => {
		if (digit !== prevDigit) {
			setFlipping(true);
			const timer = setTimeout(() => {
				setFlipping(false);
				setPrevDigit(digit);
			}, 550);
			return () => clearTimeout(timer);
		}
	}, [digit, prevDigit]);

	return (
		<div className={cn('relative subpixel-antialiased rounded-md overflow-hidden bg-primary text-primary-foreground', sizeClasses[size])} style={{ perspective: '1000px' }}>
			<div className={cn(commonCardStyle, 'rounded-t-lg top-0')}>
				<DigitSpan position="top">{digit}</DigitSpan>
			</div>
			<div className={cn(commonCardStyle, 'rounded-b-lg translate-y-full')}>
				<DigitSpan position="bottom">{prevDigit}</DigitSpan>
			</div>
			<div className={cn(commonCardStyle, 'z-20 origin-bottom rounded-t-lg', flipping && 'animate-flip-top')} style={{ backfaceVisibility: 'hidden' }}>
				<DigitSpan position="top">{prevDigit}</DigitSpan>
			</div>
			<div
				className={cn(commonCardStyle, 'z-10 origin-top rounded-b-lg translate-y-full', flipping && 'animate-flip-bottom')}
				style={{ backfaceVisibility: 'hidden', transform: 'rotateX(90deg)' }}
			>
				<DigitSpan position="bottom">{digit}</DigitSpan>
			</div>
			<div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-background/50 z-30" />
		</div>
	);
});

const ClockSeparator = ({ size = 'md' }) => (
	<span className={cn('text-center -translate-y-[8%] text-foreground', size === 'sm' ? 'text-2xl' : size === 'lg' ? 'text-5xl' : 'text-4xl')}>:</span>
);

const getIstTime = () => {
	const parts = new Intl.DateTimeFormat('en-GB', {
		timeZone: 'Asia/Kolkata',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
	}).formatToParts(new Date());

	const get = (type) => parts.find((p) => p.type === type)?.value || '00';
	return { hours: get('hour'), minutes: get('minute'), seconds: get('second') };
};

export const FlipClock = ({ size = 'md', className }) => {
	const [time, setTime] = useState(getIstTime());

	useEffect(() => {
		const timer = setInterval(() => {
			setTime((prev) => {
				const next = getIstTime();
				if (prev.seconds === next.seconds) return prev;
				return next;
			});
		}, 250);
		return () => clearInterval(timer);
	}, []);

	return (
		<div className={cn('relative flex justify-center items-center font-mono font-medium gap-1.5', className)} aria-live="polite">
			<span className="sr-only">{`${time.hours}:${time.minutes}:${time.seconds} IST`}</span>
			{time.hours.split('').map((d, i) => (
				<FlipUnit key={`h-${i}`} digit={d} size={size} />
			))}
			<ClockSeparator size={size} />
			{time.minutes.split('').map((d, i) => (
				<FlipUnit key={`m-${i}`} digit={d} size={size} />
			))}
			<ClockSeparator size={size} />
			{time.seconds.split('').map((d, i) => (
				<FlipUnit key={`s-${i}`} digit={d} size={size} />
			))}

			<style>{`
				.animate-flip-top { animation: flip-top-anim 0.6s ease-in forwards; }
				.animate-flip-bottom { animation: flip-bottom-anim 0.6s ease-out forwards; }
				@keyframes flip-top-anim {
					0% { transform: rotateX(0deg); z-index: 30; }
					50%, 100% { transform: rotateX(-90deg); z-index: 10; }
				}
				@keyframes flip-bottom-anim {
					0%, 50% { transform: rotateX(90deg); z-index: 10; }
					100% { transform: rotateX(0deg); z-index: 30; }
				}
			`}</style>
		</div>
	);
};

export default FlipClock;
