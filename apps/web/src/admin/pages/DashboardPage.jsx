import React, { useEffect, useState } from 'react';
import { FileText, Star, Quote, Stethoscope, Youtube, Users } from 'lucide-react';
import { adminApi } from '../lib/adminApi';

const cards = [
	{ key: 'blogs', label: 'Blogs', icon: FileText, path: '/admin/blogs' },
	{ key: 'testimonials', label: 'Testimonials', icon: Star, path: '/admin/testimonials' },
	{ key: 'reviews', label: 'Reviews', icon: Quote, path: '/admin/reviews' },
	{ key: 'diseases', label: 'Diseases', icon: Stethoscope, path: '/admin/diseases' },
	{ key: 'youtube-videos', label: 'Videos', icon: Youtube, path: '/admin/youtube-videos' },
	{ key: 'patients', label: 'Patients', icon: Users, path: '/admin/patients' },
];

export default function DashboardPage() {
	const [counts, setCounts] = useState({});

	useEffect(() => {
		cards.forEach(({ key }) => {
			adminApi
				.get(`/admin/${key}`)
				.then((data) => setCounts((prev) => ({ ...prev, [key]: data.length })))
				.catch(() => setCounts((prev) => ({ ...prev, [key]: '-' })));
		});
	}, []);

	return (
		<div>
			<h1 className="text-2xl font-bold text-foreground mb-1">Dashboard</h1>
			<p className="text-muted-foreground mb-6">Welcome back, Dr. Shubhangi Maharana</p>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
				{cards.map(({ key, label, icon: Icon }) => (
					<div key={key} className="bg-card border border-border rounded-2xl p-5">
						<Icon className="h-5 w-5 text-primary mb-3" />
						<p className="text-2xl font-bold text-foreground">{counts[key] ?? '...'}</p>
						<p className="text-sm text-muted-foreground">{label}</p>
					</div>
				))}
			</div>
		</div>
	);
}
