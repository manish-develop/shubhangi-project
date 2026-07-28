import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const getIstParts = () => {
	const parts = new Intl.DateTimeFormat('en-GB', {
		timeZone: 'Asia/Kolkata',
		weekday: 'short',
		day: '2-digit',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	}).formatToParts(new Date());
	const get = (type) => parts.find((p) => p.type === type)?.value || '';
	return {
		time: `${get('hour')}:${get('minute')}`,
		date: `${get('weekday')} | ${get('month')} ${get('day')}`,
	};
};

export function GlassTimeCard({ className }) {
	const [{ time, date }, setNow] = useState(getIstParts);

	useEffect(() => {
		const timer = setInterval(() => setNow(getIstParts()), 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<div
			className={cn(
				'w-full max-w-xs rounded-2xl border border-primary/15 bg-primary/5 px-6 py-5 text-center shadow-sm backdrop-blur-sm',
				className
			)}
		>
			<div className="text-4xl font-bold tabular-nums tracking-tight text-foreground">{time}</div>
			<div className="mt-1 text-sm text-muted-foreground">{date}</div>
		</div>
	);
}

export default GlassTimeCard;
