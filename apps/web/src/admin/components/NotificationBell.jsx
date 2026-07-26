import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, CalendarClock, Stethoscope } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { adminApi } from '../lib/adminApi';

export function NotificationBell() {
	const [notifications, setNotifications] = useState([]);

	const load = () => {
		adminApi.get('/admin/notifications').then(setNotifications).catch(() => setNotifications([]));
	};

	useEffect(() => {
		load();
		const interval = setInterval(load, 60 * 1000);
		return () => clearInterval(interval);
	}, []);

	const urgentCount = notifications.filter((n) => n.is_today || n.is_soon).length;

	return (
		<Popover>
			<PopoverTrigger asChild>
				<button
					type="button"
					aria-label="Notifications"
					className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-accent"
				>
					<Bell className="h-4 w-4" />
					{notifications.length > 0 && (
						<Badge className="absolute -top-2 left-full min-w-5 -translate-x-1/2 px-1">
							{notifications.length > 99 ? '99+' : notifications.length}
						</Badge>
					)}
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-80 p-1" align="end">
				<div className="px-3 py-2">
					<div className="text-sm font-semibold text-foreground">Reminders</div>
					<p className="text-xs text-muted-foreground">
						{urgentCount > 0 ? `${urgentCount} need attention now` : 'Follow-ups & events, next 7 days'}
					</p>
				</div>
				<div className="-mx-1 my-1 h-px bg-border" />
				{notifications.length === 0 && (
					<p className="px-3 py-6 text-center text-sm text-muted-foreground">Nothing upcoming</p>
				)}
				{notifications.map((n) =>
					n.type === 'event' ? (
						<Link
							key={n.id}
							to="/admin/events"
							className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
						>
							<div className="flex items-center justify-between gap-2">
								<span className="flex items-center gap-1.5 font-medium text-foreground">
									<CalendarClock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
									{n.title}
								</span>
								{n.is_soon && (
									<Badge variant="default" className="text-[10px]">
										Starting soon
									</Badge>
								)}
								{n.is_started && !n.is_soon && (
									<Badge variant="secondary" className="text-[10px]">
										Now
									</Badge>
								)}
							</div>
							<div className="text-xs text-muted-foreground">
								{new Date(n.start_time).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
								{n.category ? ` · ${n.category}` : ''}
							</div>
						</Link>
					) : (
						<Link
							key={n.id}
							to={`/admin/patients/${n.patient_id}`}
							className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
						>
							<div className="flex items-center justify-between gap-2">
								<span className="flex items-center gap-1.5 font-medium text-foreground">
									<Stethoscope className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
									{n.patient_name}
								</span>
								{n.is_today && (
									<Badge variant="default" className="text-[10px]">
										Today
									</Badge>
								)}
							</div>
							<div className="text-xs text-muted-foreground">
								Follow-up: {new Date(n.follow_up_date).toLocaleDateString('en-GB')}
								{n.patient_phone ? ` · ${n.patient_phone}` : ''}
							</div>
						</Link>
					)
				)}
			</PopoverContent>
		</Popover>
	);
}

export default NotificationBell;
