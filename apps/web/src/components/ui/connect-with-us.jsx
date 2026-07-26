import React from 'react';
import { Phone, Mail, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

const WHATSAPP_ICON = 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg';

const channels = [
	{
		id: 'call',
		label: 'Call Us',
		value: '+91 96250 30958',
		href: 'tel:+919625030958',
		cta: 'Call Now',
		icon: <Phone className="h-6 w-6" />,
		accent: '#2563eb',
	},
	{
		id: 'email',
		label: 'Email Us',
		value: 'drshubhangi.econsultation@gmail.com',
		href: 'mailto:drshubhangi.econsultation@gmail.com',
		cta: 'Send Email',
		icon: <Mail className="h-6 w-6" />,
		accent: '#2563eb',
	},
	{
		id: 'whatsapp',
		label: 'Chat on WhatsApp',
		value: '+91 96250 30958',
		href: 'https://wa.me/919625030958',
		cta: 'Chat Now',
		icon: <img src={WHATSAPP_ICON} alt="" className="h-6 w-6" />,
		accent: '#25D366',
	},
	{
		id: 'linkedin',
		label: 'Connect on LinkedIn',
		value: 'Dr. Shubhangi Maharana',
		href: 'https://www.linkedin.com/in/dr-shubhangi-maharana-a90538213',
		cta: 'View Profile',
		icon: <Linkedin className="h-6 w-6" />,
		accent: '#0A66C2',
	},
];

export const SocialConnect = () => {
	return (
		<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{channels.map((c) => (
				<a
					key={c.id}
					href={c.href}
					target={c.href.startsWith('http') ? '_blank' : undefined}
					rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
					className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
				>
					<div
						className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
						style={{ backgroundColor: c.accent }}
					/>
					<div
						className="flex h-14 w-14 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:scale-110"
						style={{ backgroundColor: c.accent }}
					>
						{c.icon}
					</div>
					<h3 className="font-semibold text-foreground">{c.label}</h3>
					<p className={cn('text-sm text-muted-foreground', c.id === 'email' && 'break-all')}>{c.value}</p>
					<span
						className="mt-1 rounded-full px-4 py-1.5 text-sm font-medium text-white transition-opacity"
						style={{ backgroundColor: c.accent }}
					>
						{c.cta}
					</span>
				</a>
			))}
		</div>
	);
};

export default SocialConnect;
