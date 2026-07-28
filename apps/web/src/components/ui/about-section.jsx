import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { TimelineContent } from '@/components/ui/timeline-animation.jsx';
import { VerticalCutReveal } from '@/components/ui/vertical-cut-reveal.jsx';
import { ClinicImages } from '@/constants/clinicImages.js';

const socialLinks = [
	{ id: 'facebook', href: 'https://www.facebook.com/share/1BanKaCwyb/?mibextid=wwXIfr', icon: Facebook },
	{ id: 'instagram', href: 'https://www.instagram.com/dr.shubhangimaharana?utm_source=qr', icon: Instagram },
	{ id: 'linkedin', href: 'https://www.linkedin.com/in/dr-shubhangi-maharana-a90538213', icon: Linkedin },
	{ id: 'youtube', href: 'https://www.youtube.com/@dr.shubhangimaharana', icon: Youtube },
];

const revealVariants = {
	visible: (i) => ({
		y: 0,
		opacity: 1,
		filter: 'blur(0px)',
		transition: { delay: i * 0.15, duration: 0.5 },
	}),
	hidden: { filter: 'blur(10px)', y: -20, opacity: 0 },
};

const scaleVariants = {
	visible: (i) => ({
		opacity: 1,
		filter: 'blur(0px)',
		transition: { delay: i * 0.15, duration: 0.5 },
	}),
	hidden: { filter: 'blur(10px)', opacity: 0 },
};

export default function AboutSection() {
	const heroRef = useRef(null);

	return (
		<section
			className="relative overflow-hidden pt-28 pb-12 md:pt-36 md:pb-16"
			ref={heroRef}
		>
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{ backgroundImage: `url(${ClinicImages.aboutSectionBg})`, filter: 'blur(6px)', transform: 'scale(1.08)' }}
			/>
			<div className="absolute inset-0 bg-white/85" />

			<div className="relative max-w-6xl mx-auto px-4">
				<div className="flex items-center justify-between mb-6">
					<TimelineContent
						as="div"
						animationNum={0}
						timelineRef={heroRef}
						customVariants={revealVariants}
						className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
					>
						<span className="text-primary animate-spin">✱</span>
						WHO I AM
					</TimelineContent>

					<div className="flex gap-3">
						{socialLinks.map((social, i) => (
							<TimelineContent
								key={social.id}
								as="a"
								animationNum={i + 1}
								timelineRef={heroRef}
								customVariants={revealVariants}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={social.id}
								className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-foreground hover:text-primary transition-colors"
							>
								<social.icon className="h-4 w-4" />
							</TimelineContent>
						))}
					</div>
				</div>

				<TimelineContent
					as="figure"
					animationNum={5}
					timelineRef={heroRef}
					customVariants={scaleVariants}
					className="rounded-2xl overflow-hidden shadow-lg mb-6"
				>
					<img
						src={ClinicImages.aboutConsultation}
						alt="Dr. Shubhangi Maharana consulting a patient"
						className="w-full h-auto"
					/>
				</TimelineContent>

				<TimelineContent
					as="div"
					animationNum={6}
					timelineRef={heroRef}
					customVariants={revealVariants}
					className="flex flex-wrap items-center gap-x-8 gap-y-2 mb-8 text-sm"
				>
					<div className="flex items-center gap-2">
						<span className="text-primary font-bold text-lg">8+</span>
						<span className="text-muted-foreground">years of experience</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-primary font-bold text-lg">1000+</span>
						<span className="text-muted-foreground">patients treated</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-primary font-bold text-lg">100+</span>
						<span className="text-muted-foreground">conditions treated</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-primary font-bold text-lg">4.9★</span>
						<span className="text-muted-foreground">average rating</span>
					</div>
				</TimelineContent>

				<div className="grid md:grid-cols-3 gap-8">
					<div className="md:col-span-2">
						<h1 className="sm:text-4xl md:text-5xl text-2xl !leading-[110%] font-bold text-foreground heading-serif mb-6">
							<VerticalCutReveal
								splitBy="words"
								staggerDuration={0.08}
								staggerFrom="first"
								transition={{ type: 'spring', stiffness: 250, damping: 30, delay: 0.6 }}
							>
								Healing With Compassion, Rooted in Science.
							</VerticalCutReveal>
						</h1>

						<TimelineContent
							as="div"
							animationNum={7}
							timelineRef={heroRef}
							customVariants={revealVariants}
							className="grid sm:grid-cols-2 gap-6 text-muted-foreground"
						>
							<p className="leading-relaxed">
								My journey in homoeopathy began with a deep curiosity about holistic healing and evolved into a
								dedicated clinical practice. I hold a BHMS, MD (Hom.), DNHE, MPMU, and FMC (Germany) — blending
								classical training with international medical exposure.
							</p>
							<p className="leading-relaxed">
								Every patient's story is unique, and I treat the person, not just the disease — addressing
								physical, emotional, and mental health together. This individualized approach is at the heart
								of everything I do at Maharana Wellness Clinic.
							</p>
						</TimelineContent>
					</div>

					<div className="md:col-span-1 text-left md:text-right">
						<TimelineContent
							as="div"
							animationNum={8}
							timelineRef={heroRef}
							customVariants={revealVariants}
							className="text-primary text-2xl font-bold mb-1 doctor-name"
						>
							Dr. Shubhangi Maharana
						</TimelineContent>
						<TimelineContent
							as="div"
							animationNum={9}
							timelineRef={heroRef}
							customVariants={revealVariants}
							className="text-muted-foreground text-sm mb-6"
						>
							BHMS, MD (Hom.) — Homoeopathic Physician
						</TimelineContent>

						<TimelineContent
							as="div"
							animationNum={10}
							timelineRef={heroRef}
							customVariants={revealVariants}
						>
							<p className="text-foreground font-medium mb-4">
								Ready to begin your healing journey?
							</p>
							<Link
								to="/appointment"
								className="btn-primary inline-flex w-fit md:ml-auto"
							>
								Book a Consultation
							</Link>
						</TimelineContent>
					</div>
				</div>
			</div>
		</section>
	);
}
