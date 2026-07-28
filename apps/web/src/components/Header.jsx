import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight, Home as HomeIcon, User, Stethoscope, Activity, FileText, Star, Phone as PhoneIcon, Scale } from 'lucide-react';
import InteractiveHoverButton from './InteractiveHoverButton.jsx';
import { ClinicImages } from '@/constants/clinicImages.js';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu.jsx';

const navLinks = [
	{ path: '/', label: 'Home', icon: HomeIcon },
	{ path: '/about', label: 'About', icon: User },
	{ path: '/services', label: 'Services', icon: Stethoscope },
	{ path: '/diseases', label: 'Diseases', icon: Activity },
	{ path: '/blog', label: 'Blog', icon: FileText },
	{ path: '/testimonials', label: 'Testimonials', icon: Star },
	{ path: '/contact', label: 'Contact', icon: PhoneIcon },
];

const legalLinks = [
	{ path: '/disclaimer', label: 'Disclaimer' },
	{ path: '/scientific-basis', label: 'Scientific Basis of Homoeopathy' },
	{ path: '/criticism', label: 'Criticism of Homoeopathy' },
	{ path: '/privacy-policy', label: 'Privacy Policy' },
];

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const location = useLocation();

	const dragX = useMotionValue(0);
	const dragOpacity = useTransform(dragX, [0, 260], [1, 0]);

	useEffect(() => {
		setMenuOpen(false);
	}, [location.pathname]);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [menuOpen]);

	const handleDragEnd = (_e, info) => {
		if (info.offset.x > 80) setMenuOpen(false);
		dragX.set(0);
	};

	const menuVariants = {
		closed: { x: '100%', transition: { type: 'spring', stiffness: 260, damping: 30, mass: 0.8 } },
		open: { x: 0, transition: { type: 'spring', stiffness: 260, damping: 30, mass: 0.8 } },
	};

	const itemVariants = {
		closed: { x: 30, opacity: 0 },
		open: (i) => ({
			x: 0,
			opacity: 1,
			transition: { delay: 0.08 + i * 0.06, type: 'spring', stiffness: 260, damping: 26 },
		}),
	};

	return (
		<>
			<header
				className={cn(
					'fixed top-0 inset-x-0 z-50 w-full transition-[padding] duration-300',
					scrolled ? 'px-2 pt-2 md:px-4 md:pt-3' : 'px-0 pt-0'
				)}
			>
				<nav
					className={cn(
						'mx-auto flex w-full items-center justify-between gap-3 overflow-hidden px-4 transition-all duration-300 md:gap-4 md:px-8',
						scrolled
							? 'h-14 max-w-6xl rounded-2xl bg-primary/85 shadow-2xl backdrop-blur-xl md:h-16'
							: 'h-16 max-w-7xl rounded-b-3xl bg-primary shadow-md md:h-20'
					)}
				>
					<Link to="/" className="flex items-center gap-3 shrink-0">
						<img
							src={ClinicImages.logo}
							alt="Maharana Wellness Clinic"
							className={cn(
								'rounded-full bg-white/10 object-contain p-0.5 transition-all duration-300 shrink-0',
								scrolled ? 'h-11 w-11 md:h-12 md:w-12' : 'h-12 w-12 md:h-14 md:w-14'
							)}
						/>
						<span
							className={cn(
								'flex flex-col leading-tight overflow-hidden transition-all duration-300',
								scrolled && 'lg:w-0 lg:opacity-0'
							)}
						>
							<span className="text-xl md:text-2xl font-bold text-white tracking-tight whitespace-nowrap" style={{ fontFamily: 'Merriweather, serif' }}>
								Maharana
							</span>
							<span className="text-xs md:text-sm font-medium text-white/80 tracking-wide -mt-0.5 whitespace-nowrap">
								Wellness Clinic
							</span>
						</span>
					</Link>

					<div className="hidden lg:flex items-center gap-1 shrink">
						{navLinks.map((link) => (
							<Link
								key={link.path}
								to={link.path}
								className={`px-4 py-2.5 rounded-md text-base font-medium whitespace-nowrap transition-colors ${
									location.pathname === link.path ? 'text-white bg-white/15' : 'text-white/80 hover:text-white hover:bg-white/10'
								}`}
							>
								{link.label}
							</Link>
						))}

						<DropdownMenu>
							<DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2.5 rounded-md text-base font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors outline-none whitespace-nowrap">
								Legal <ChevronDown className="w-4 h-4" />
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-64">
								{legalLinks.map((link) => (
									<DropdownMenuItem key={link.path} asChild>
										<Link to={link.path}>{link.label}</Link>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					<div className="flex items-center gap-3">
						<InteractiveHoverButton to="/appointment" className="hidden md:inline-flex h-10 min-w-[10rem] !py-0 text-sm shrink-0">
							Book Appointment
						</InteractiveHoverButton>

						<button
							onClick={() => setMenuOpen((v) => !v)}
							aria-label={menuOpen ? 'Close menu' : 'Open menu'}
							className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md border border-white/30 text-white"
						>
							{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
						</button>
					</div>
				</nav>
			</header>

			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						onClick={() => setMenuOpen(false)}
						className="fixed inset-0 bg-black/50 z-[85] lg:hidden"
					/>
				)}
			</AnimatePresence>

			<motion.nav
				variants={menuVariants}
				initial="closed"
				animate={menuOpen ? 'open' : 'closed'}
				drag="x"
				dragConstraints={{ left: 0, right: 320 }}
				dragElastic={0.2}
				onDragEnd={handleDragEnd}
				style={{ x: dragX }}
				className="fixed top-0 right-0 h-full w-80 max-w-[85vw] z-[90] shadow-2xl lg:hidden bg-primary flex flex-col pb-safe"
			>
				<button
					onClick={() => setMenuOpen(false)}
					className="absolute top-5 left-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 hover:rotate-90 transition-all duration-300"
					aria-label="Close menu"
				>
					<X className="w-5 h-5" />
				</button>

				<motion.div style={{ opacity: dragOpacity }} className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
					<ChevronDown className="w-6 h-6 text-white/30 rotate-90" />
				</motion.div>

				<div className="flex-1 overflow-y-auto pt-20 pb-6 px-5">
					<div className="mb-8">
						<h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Merriweather, serif' }}>Navigation</h2>
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: menuOpen ? 64 : 0 }}
							transition={{ delay: 0.25, duration: 0.5, ease: 'easeOut' }}
							className="h-1 mt-2 rounded bg-white"
						/>
					</div>

					<ul className="space-y-1.5">
						{navLinks.map((link, index) => {
							const Icon = link.icon;
							const active = location.pathname === link.path;
							return (
								<motion.li key={link.path} custom={index} variants={itemVariants} initial="closed" animate={menuOpen ? 'open' : 'closed'}>
									<Link
										to={link.path}
										onClick={() => setMenuOpen(false)}
										className={`group flex items-center gap-3 p-3 rounded-lg transition-colors ${active ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
									>
										<span className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 group-hover:bg-white group-hover:text-primary transition-all duration-300 shrink-0">
											<Icon className="w-4.5 h-4.5" />
										</span>
										<span className="text-base font-medium">{link.label}</span>
									</Link>
								</motion.li>
							);
						})}
					</ul>

					<div className="mt-6 pt-4 border-t border-white/10">
						<h3 className="text-xs font-semibold uppercase tracking-wider text-white/50 px-3 mb-2">Legal</h3>
						<ul className="space-y-0.5">
							{legalLinks.map((link) => (
								<li key={link.path}>
									<Link
										to={link.path}
										onClick={() => setMenuOpen(false)}
										className="block px-3 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="px-5 pb-6 pt-3">
					<Link
						to="/appointment"
						onClick={() => setMenuOpen(false)}
						className="w-full text-center min-h-[52px] text-base font-semibold flex items-center justify-center gap-2 rounded-full bg-white text-primary hover:bg-white/90 transition-colors"
					>
						Book Appointment <ArrowRight className="w-4 h-4" />
					</Link>
				</div>
			</motion.nav>
		</>
	);
};

export default Header;
