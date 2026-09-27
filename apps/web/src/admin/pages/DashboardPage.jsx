import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';
import { DashboardClock } from '../components/DashboardClock.jsx';

// Blogs, testimonials, diseases, videos and reviews are all managed in
// WordPress now (blog.drmaharanas.com/wp-admin), not here. Patients,
// prescriptions and notifications were dropped as unused.

export default function DashboardPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold text-foreground mb-1">Dashboard</h1>
			<p className="text-muted-foreground mb-6">Welcome back, Dr. Shubhangi Maharana</p>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2">
					<Link
						to="/admin/events"
						className="inline-flex items-center gap-3 bg-card border border-border rounded-2xl p-5 transition-all hover:border-primary hover:shadow-md hover:-translate-y-0.5"
					>
						<CalendarDays className="h-5 w-5 text-primary" />
						<p className="text-sm font-medium text-foreground">Schedule</p>
					</Link>

					<p className="mt-4 text-sm text-muted-foreground">
						Blog, testimonials, diseases, videos and reviews are managed at{' '}
						<a href="https://blog.drmaharanas.com/wp-admin" target="_blank" rel="noopener noreferrer" className="text-primary underline">
							blog.drmaharanas.com/wp-admin
						</a>
						.
					</p>
				</div>

				<div className="lg:col-span-1">
					<div className="bg-card border border-border rounded-2xl p-5 flex items-center justify-center">
						<DashboardClock />
					</div>
				</div>
			</div>
		</div>
	);
}
