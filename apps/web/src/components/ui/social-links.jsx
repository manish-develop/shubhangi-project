import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone, Linkedin, Youtube, Instagram, Facebook, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const WHATSAPP_ICON = 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg';

const links = [
	{
		id: 'whatsapp',
		label: 'WhatsApp',
		href: 'https://wa.me/919625030958?text=' + encodeURIComponent('Hello Dr. Shubhangi Maharana, I would like to book an appointment.'),
		color: '#25D366',
		icon: <img src={WHATSAPP_ICON} alt="" className="h-5 w-5" />,
	},
	{
		id: 'call',
		label: 'Call Us',
		href: 'tel:+919625030958',
		color: 'hsl(var(--primary))',
		icon: <Phone className="h-5 w-5" />,
	},
	{
		id: 'youtube',
		label: 'YouTube',
		href: 'https://www.youtube.com/@dr.shubhangimaharana',
		color: '#FF0000',
		icon: <Youtube className="h-5 w-5" />,
	},
	{
		id: 'linkedin',
		label: 'LinkedIn',
		href: 'https://www.linkedin.com/in/dr-shubhangi-maharana-a90538213',
		color: '#0A66C2',
		icon: <Linkedin className="h-5 w-5" />,
	},
	{
		id: 'instagram',
		label: 'Instagram',
		href: 'https://www.instagram.com/dr.shubhangimaharana?utm_source=qr',
		color: '#E1306C',
		icon: <Instagram className="h-5 w-5" />,
	},
	{
		id: 'facebook',
		label: 'Facebook',
		href: 'https://www.facebook.com/share/1BanKaCwyb/?mibextid=wwXIfr',
		color: '#1877F2',
		icon: <Facebook className="h-5 w-5" />,
	},
];

export const SocialLinks = () => {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<>
			{/* Desktop: vertical sliding tabs from the left edge */}
			<div className="fixed left-0 top-[35vh] z-40 hidden flex-col items-start gap-2 md:flex">
				{links.map((link) => (
					<a
						key={link.id}
						href={link.href}
						target={link.href.startsWith('http') ? '_blank' : undefined}
						rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
						aria-label={link.label}
						className="group flex items-center overflow-hidden rounded-r-full shadow-lg transition-[width] duration-300 ease-out"
						style={{ backgroundColor: link.color, width: '3rem' }}
						onMouseEnter={(e) => (e.currentTarget.style.width = '10.5rem')}
						onMouseLeave={(e) => (e.currentTarget.style.width = '3rem')}
					>
						<span className="flex h-12 w-12 shrink-0 items-center justify-center text-white">{link.icon}</span>
						<span className="whitespace-nowrap pr-4 text-sm font-medium text-white">{link.label}</span>
					</a>
				))}
			</div>

			{/* Mobile: expandable floating dock, bottom-right */}
			<div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 md:hidden">
				<AnimatePresence>
					{mobileOpen &&
						links.map((link, i) => (
							<motion.a
								key={link.id}
								href={link.href}
								target={link.href.startsWith('http') ? '_blank' : undefined}
								rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
								aria-label={link.label}
								initial={{ opacity: 0, y: 10, scale: 0.8 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: 10, scale: 0.8 }}
								transition={{ duration: 0.15, delay: i * 0.04 }}
								className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg"
								style={{ backgroundColor: link.color }}
							>
								{link.icon}
							</motion.a>
						))}
				</AnimatePresence>

				<button
					type="button"
					onClick={() => setMobileOpen((o) => !o)}
					aria-label={mobileOpen ? 'Close quick contact menu' : 'Open quick contact menu'}
					className={cn(
						'flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform duration-300',
						mobileOpen && 'rotate-45'
					)}
				>
					{mobileOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
				</button>
			</div>
		</>
	);
};

export default SocialLinks;
