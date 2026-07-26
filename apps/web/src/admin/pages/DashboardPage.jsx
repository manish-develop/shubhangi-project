import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Star, Quote, Stethoscope, Youtube, Users, CalendarClock, CalendarDays } from 'lucide-react';
import { adminApi } from '../lib/adminApi';
import { DashboardClock } from '../components/DashboardClock.jsx';

const cards = [
	{ key: 'events', label: 'Schedule', icon: CalendarDays, path: '/admin/events' },
	{ key: 'blogs', label: 'Blogs', icon: FileText, path: '/admin/blogs' },
	{ key: 'testimonials', label: 'Testimonials', icon: Star, path: '/admin/testimonials' },
	{ key: 'reviews', label: 'Reviews', icon: Quote, path: '/admin/reviews' },
	{ key: 'diseases', label: 'Diseases', icon: Stethoscope, path: '/admin/diseases' },
	{ key: 'youtube-videos', label: 'Videos', icon: Youtube, path: '/admin/videos' },
	{ key: 'patients', label: 'Patients', icon: Users, path: '/admin/patients' },
];

export default function DashboardPage() {
	const [counts, setCounts] = useState({});
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		cards.forEach(({ key }) => {
			adminApi
				.get(`/admin/${key}`)
				.then((data) => setCounts((prev) => ({ ...prev, [key]: data.length })))
				.catch(() => setCounts((prev) => ({ ...prev, [key]: '-' })));
		});

		adminApi.get('/admin/notifications').then(setNotifications).catch(() => setNotifications([]));
	}, []);

	return (
		<div>
			<h1 className="text-2xl font-bold text-foreground mb-1">Dashboard</h1>
			<p className="text-muted-foreground mb-6">Welcome back, Dr. Shubhangi Maharana</p>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2">
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						{cards.map(({ key, label, icon: Icon, path }) => (
							<Link
								key={key}
								to={path}
								className="bg-card border border-border rounded-2xl p-5 transition-all hover:border-primary hover:shadow-md hover:-translate-y-0.5"
							>
								<Icon className="h-5 w-5 text-primary mb-3" />
								<p className="text-2xl font-bold text-foreground">{counts[key] ?? '...'}</p>
								<p className="text-sm text-muted-foreground">{label}</p>
							</Link>
						))}
					</div>
				</div>

				<div className="lg:col-span-1 flex flex-col gap-6">
					<div className="bg-card border border-border rounded-2xl p-5">
						<div className="flex items-center gap-2 mb-4">
							<CalendarClock className="h-4 w-4 text-primary" />
							<h3 className="font-semibold text-foreground">Reminders</h3>
						</div>
						{notifications.length === 0 && (
							<p className="text-sm text-muted-foreground">No upcoming follow-ups or events in the next 7 days</p>
						)}
						<ul className="space-y-2">
							{notifications.map((n) => (
								<li key={n.id}>
									<Link
										to={n.type === 'event' ? '/admin/events' : `/admin/patients/${n.patient_id}`}
										className="flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:border-primary hover:bg-accent"
									>
										<div className="min-w-0">
											<p className="font-medium text-foreground truncate">
												{n.type === 'event' ? n.title : n.patient_name}
											</p>
											<p className="text-xs text-muted-foreground">
												{n.type === 'event'
													? new Date(n.start_time).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
													: new Date(n.follow_up_date).toLocaleDateString('en-GB')}
											</p>
										</div>
										{(n.is_today || n.is_soon) && (
											<span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
												{n.type === 'event' ? 'Soon' : 'Today'}
											</span>
										)}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div className="bg-card border border-border rounded-2xl p-5 flex items-center justify-center">
						<DashboardClock />
					</div>
				</div>
			</div>
		</div>
	);
}
