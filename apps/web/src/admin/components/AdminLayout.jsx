import React from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, FileText, Star, Quote, Stethoscope, Youtube, Users, LogOut } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { cn } from '@/lib/utils';

const navItems = [
	{ to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
	{ to: '/admin/blogs', label: 'Blogs', icon: FileText },
	{ to: '/admin/testimonials', label: 'Testimonials', icon: Star },
	{ to: '/admin/reviews', label: 'Reviews', icon: Quote },
	{ to: '/admin/diseases', label: 'Diseases', icon: Stethoscope },
	{ to: '/admin/videos', label: 'Videos', icon: Youtube },
	{ to: '/admin/patients', label: 'Patients', icon: Users },
];

export function AdminLayout() {
	const { admin, logout } = useAdminAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate('/admin/login');
	};

	return (
		<div className="min-h-screen flex bg-muted">
			<aside className="w-64 shrink-0 bg-primary text-primary-foreground flex flex-col">
				<div className="px-6 py-6 border-b border-white/15">
					<p className="font-serif font-bold text-lg leading-tight">Maharana Wellness Clinic</p>
					<p className="text-xs text-white/70">Admin Panel</p>
				</div>

				<nav className="flex-1 px-3 py-4 space-y-1">
					{navItems.map(({ to, label, icon: Icon, end }) => (
						<NavLink
							key={to}
							to={to}
							end={end}
							className={({ isActive }) =>
								cn(
									'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
									isActive ? 'bg-white/15 text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'
								)
							}
						>
							<Icon className="h-4 w-4" />
							{label}
						</NavLink>
					))}
				</nav>

				<div className="px-3 py-4 border-t border-white/15">
					<p className="px-3 text-xs text-white/60 mb-2 truncate">{admin?.email}</p>
					<button
						onClick={handleLogout}
						className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/75 hover:bg-white/10 hover:text-white transition-colors"
					>
						<LogOut className="h-4 w-4" />
						Logout
					</button>
				</div>
			</aside>

			<main className="flex-1 min-w-0 p-6 md:p-8">
				<Outlet />
			</main>
		</div>
	);
}
