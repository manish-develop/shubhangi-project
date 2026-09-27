import React, { useState } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, LogOut } from 'lucide-react';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/admin-sidebar.jsx';
import { useAdminAuth } from '../context/AdminAuthContext';
import { ClinicImages } from '@/constants/clinicImages.js';
import { cn } from '@/lib/utils';

// Diseases/Videos/Reviews/Testimonials/Blogs now live in WordPress, not
// here — managed at blog.drmaharanas.com/wp-admin. Patients/Prescriptions/
// Notifications were dropped as unused.
const navItems = [
	{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
	{ href: '/admin/events', label: 'Schedule', icon: CalendarDays },
];

export function AdminLayout() {
	const { admin, logout } = useAdminAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [open, setOpen] = useState(false);

	const isActive = (href, end) => (end ? location.pathname === href : location.pathname.startsWith(href));

	const handleLogout = async () => {
		await logout();
		navigate('/admin/login');
	};

	return (
		<div className="min-h-screen flex flex-col md:flex-row bg-muted">
			<Sidebar open={open} setOpen={setOpen}>
				<SidebarBody className="justify-between gap-10">
					<div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
						<div className="mb-6 flex items-center gap-2.5 px-2">
							<img src={ClinicImages.logo} alt="Maharana Wellness Clinic" className="h-9 w-9 shrink-0 rounded-full object-contain bg-white/10 p-0.5" />
							{open && (
								<div className="min-w-0">
									<p className="truncate font-serif text-base font-bold leading-tight">Maharana Wellness Clinic</p>
									<p className="text-xs text-primary-foreground/70">Admin Panel</p>
								</div>
							)}
						</div>

						<div className="flex flex-col gap-1">
							{navItems.map((item) => (
								<SidebarLink
									key={item.href}
									link={{ ...item, icon: <item.icon className="h-5 w-5 shrink-0" /> }}
									className={cn(
										'transition-colors',
										isActive(item.href, item.end)
											? 'bg-white/15 text-white'
											: 'text-white/75 hover:bg-white/10 hover:text-white'
									)}
								/>
							))}
						</div>
					</div>

					<div className="border-t border-white/15 pt-3">
						{open && <p className="mb-2 truncate px-2 text-xs text-white/60">{admin?.email}</p>}
						<SidebarLink
							link={{ href: '#', label: 'Logout', icon: <LogOut className="h-5 w-5 shrink-0" /> }}
							className="text-white/75 hover:bg-white/10 hover:text-white"
							onClick={(e) => {
								e.preventDefault();
								handleLogout();
							}}
						/>
					</div>
				</SidebarBody>
			</Sidebar>

			<div className="flex min-w-0 flex-1 flex-col">
				<main className="flex-1 min-w-0 p-6 md:p-8">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
