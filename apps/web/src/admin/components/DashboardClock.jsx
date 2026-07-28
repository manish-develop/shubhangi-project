import React, { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.jsx';
import { Calendar } from '@/components/ui/calendar.jsx';
import { GlassTimeCard } from '@/components/ui/glass-time-card.jsx';

const getIstDate = () => {
	const parts = new Intl.DateTimeFormat('en-GB', {
		timeZone: 'Asia/Kolkata',
		day: '2-digit',
		month: '2-digit',
		year: '2-digit',
	}).formatToParts(new Date());
	const get = (type) => parts.find((p) => p.type === type)?.value || '';
	return `${get('day')}-${get('month')}-${get('year')}`;
};

export function DashboardClock() {
	const [dateStr, setDateStr] = useState(getIstDate());

	useEffect(() => {
		const timer = setInterval(() => setDateStr(getIstDate()), 60 * 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<div className="flex flex-col items-center gap-2">
			<GlassTimeCard />
			<Popover>
				<PopoverTrigger asChild>
					<button
						type="button"
						className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors underline decoration-dotted underline-offset-4"
					>
						{dateStr}
					</button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="end">
					<Calendar mode="single" selected={new Date()} className="rounded-lg border-0" />
				</PopoverContent>
			</Popover>
			<p className="text-[11px] text-muted-foreground">IST · New Delhi</p>
		</div>
	);
}

export default DashboardClock;
