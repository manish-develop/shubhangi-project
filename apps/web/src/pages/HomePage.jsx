import React, { useState, useEffect, useMemo } from 'react';
import SEO from '@/components/SEO.jsx';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Award, Users, Heart, Star, Phone, Mail, ChevronRight, Shield, Clock, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import StatCounter from '@/components/StatCounter.jsx';
import BlogCard from '@/components/BlogCard.jsx';
import ReviewsSection from '@/components/ReviewsSection.jsx';
import DoctorPortrait from '@/components/DoctorPortrait.jsx';
import BeforeAfterSlideshow from '@/components/BeforeAfterSlideshow.jsx';
import YouTubeSection from '@/components/YouTubeSection.jsx';
import { ActionSearchBar } from '@/components/ui/action-search-bar.jsx';
import { DiaTextReveal } from '@/components/ui/dia-text.jsx';
import { VariableFontCursorProximity } from '@/components/ui/m-variable-font-cursor-proximity.jsx';
import { ShiningText } from '@/components/ui/shining-text.jsx';
import InteractiveHoverButton from '@/components/InteractiveHoverButton.jsx';
import { CircularShowcase } from '@/components/ui/circular-showcase.jsx';
import { Button } from '@/components/ui/button.jsx';
import { useScrollAnimation } from '@/hooks/useScrollAnimation.js';
import { fetchPublishedBlogs, getAllStaticArticles } from '@/lib/blogs.js';
import { diseaseDatabase } from '@/data/diseaseDatabase.js';
import { specializationDatabase } from '@/data/specializationDatabase.js';
import { ClinicImages } from '@/constants/clinicImages.js';

const HomePage = () => {
	const navigate = useNavigate();
	const [conditionsRef, conditionsVisible] = useScrollAnimation(0.2);
	const [aboutRef, aboutVisible] = useScrollAnimation(0.2);
	const [specializationsRef, specializationsVisible] = useScrollAnimation(0.2);
	const [blogRef, blogVisible] = useScrollAnimation(0.2);
	const [dbBlogs, setDbBlogs] = useState([]);

	useEffect(() => {
		fetchPublishedBlogs().then(setDbBlogs);
	}, []);

	const latestBlogs = useMemo(
		() => [...dbBlogs, ...getAllStaticArticles()].sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate)).slice(0, 3),
		[dbBlogs]
	);

	return (
		<>
			<SEO
				title="Maharana Wellness Clinic | Dr. Shubhangi Maharana"
				description="Welcome to Maharana Wellness Clinic — Expert homoeopathic treatment and facial aesthetics by Dr. Shubhangi Maharana. Personalized treatment for chronic conditions, women's health, and holistic wellness."
				path="/"
			/>

			<Header />

			<main className="overflow-x-hidden">
				{/* 1. Hero */}
				<section
					className="relative flex min-h-[92vh] items-center bg-cover bg-center bg-no-repeat !p-0"
					style={{
						backgroundImage: `linear-gradient(rgba(255,255,255,0.82), rgba(255,255,255,0.55)), url(${ClinicImages.heroSection})`,
					}}
				>
					<div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-12">
						<div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-2xl lg:text-left">
							<p className="flex flex-wrap items-baseline justify-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-primary lg:justify-start">
								<span>The House of Homoeopathy &amp;</span>
								<DiaTextReveal words={['Facial Aesthetics', 'Pain Rehabilitation', 'Skin', 'Hair', 'Wellness Care']} />
							</p>
							<VariableFontCursorProximity
								as="h1"
								label="Heal Naturally. Live Fully."
								className="mt-4 max-w-2xl text-balance text-5xl md:text-6xl xl:text-7xl text-foreground"
								fromWeight={400}
								toWeight={800}
								style={{ fontFamily: 'Merriweather, serif' }}
							/>
							<p className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground">
								Experience the gentle power of Homoeopathy with{' '}
								<span className="font-semibold text-primary">Dr. Shubhangi Maharana</span>. Personalized
								treatment for chronic conditions, women's health, and holistic wellness.
							</p>

							<div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
								<Button asChild size="lg" className="h-12 rounded-full pl-5 pr-3 text-base">
									<Link to="/appointment">
										<span className="text-nowrap">Book Consultation</span>
										<ChevronRight className="ml-1" />
									</Link>
								</Button>
								<Button asChild size="lg" variant="ghost" className="h-12 rounded-full px-5 text-base">
									<Link to="/about">
										<span className="text-nowrap">Learn More</span>
									</Link>
								</Button>
							</div>

							<div className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-foreground font-medium heading-sans lg:justify-start">
								<div className="flex items-center gap-2">
									<Award className="w-4 h-4 text-primary" />
									<span>8+ Years Experience</span>
								</div>
								<div className="flex items-center gap-2">
									<Users className="w-4 h-4 text-primary" />
									<span>1000+ Happy Patients</span>
								</div>
								<div className="flex items-center gap-2">
									<Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
									<span>4.9 Rating</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* 2. Conditions Search Strip */}
				<section ref={conditionsRef} className="section-white relative search-bar-section">
					<div className="container-custom">
						<div className={`mx-auto max-w-xl text-center ${conditionsVisible ? 'animate-fade-in' : 'opacity-0'}`}>
							<h2 className="mb-2 text-2xl font-bold text-foreground heading-serif">Looking for a Condition?</h2>
							<p className="mb-6 text-muted-foreground body-text">Search 100+ conditions treated homoeopathically</p>
							<ActionSearchBar
								actions={diseaseDatabase}
								placeholder="Search a condition... (e.g. Migraine, PCOS, Asthma)"
								onSelect={(disease) => navigate(`/disease/${disease.id}`)}
							/>
						</div>
					</div>
				</section>

				{/* 3. Before / After Results */}
				<BeforeAfterSlideshow />

				{/* 4. Stats Strip */}
				<section className="stats-strip">
					<div className="container-custom">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
							<StatCounter end={8} suffix="+" label="Years Experience" icon={Award} />
							<StatCounter end={1000} suffix="+" label="Patients Treated" icon={Users} />
							<StatCounter end={100} suffix="+" label="Conditions Treated" icon={Heart} />
							<StatCounter end={4.9} label="Average Rating" icon={Star} suffix="★" />
						</div>
					</div>
				</section>

				{/* 5. About Preview */}
				<section ref={aboutRef} className="section-white">
					<div className="container-custom">
						<div className="about-preview-section flex flex-col lg:grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
							<div className={`about-intro order-1 lg:order-2 ${aboutVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
								<div className="mb-4 md:mb-6 text-center lg:text-left">
									<span className="text-lg md:text-xl font-medium text-muted-foreground block mb-2 heading-sans">About</span>
									<h2 className="font-bold text-primary heading-serif doctor-name">Dr. Shubhangi Maharana</h2>
								</div>
								<p className="text-muted-foreground mb-4 leading-relaxed body-text text-center lg:text-left">
									With over 8+ years of dedicated practice in Homoeopathy, <span className="doctor-name font-medium">Dr. Shubhangi Maharana</span> has helped hundreds of patients achieve lasting health through gentle, natural treatment.
								</p>
								<p className="text-muted-foreground mb-4 leading-relaxed body-text text-center lg:text-left">
									Her approach combines deep understanding of homoeopathic principles with modern diagnostic methods, ensuring comprehensive care tailored to each individual's unique constitution.
								</p>

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 md:mb-8 text-left">
									<div className="flex items-start gap-3">
										<Award className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-1" />
										<div>
											<div className="font-semibold mb-1 text-sm md:text-base text-foreground heading-sans">BHMS Degree</div>
											<div className="text-xs md:text-sm text-muted-foreground body-text">Bachelor of Homoeopathic Medicine</div>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<Award className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-1" />
										<div>
											<div className="font-semibold mb-1 text-sm md:text-base text-foreground heading-sans">MD Homoeopathy</div>
											<div className="text-xs md:text-sm text-muted-foreground body-text">Post-graduate specialization</div>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<Shield className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-1" />
										<div>
											<div className="font-semibold mb-1 text-sm md:text-base text-foreground heading-sans">Council Registered</div>
											<div className="text-xs md:text-sm text-muted-foreground body-text">Licensed practitioner</div>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<Users className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-1" />
										<div>
											<div className="font-semibold mb-1 text-sm md:text-base text-foreground heading-sans">8+ Years</div>
											<div className="text-xs md:text-sm text-muted-foreground body-text">Clinical experience</div>
										</div>
									</div>
								</div>

								<div className="hidden lg:block">
									<Link to="/about" className="btn-primary w-full sm:w-auto">
										Know More About Me
									</Link>
								</div>
							</div>

							<div className={`about-image order-2 lg:order-1 ${aboutVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
								<div className="relative w-full flex justify-center">
									<div className="absolute -inset-4 bg-primary/10 rounded-full blur-3xl" />
									<DoctorPortrait className="aspect-[3/4] h-[420px] sm:h-[500px] md:h-[600px]" />
								</div>
							</div>

							<div className="about-cta-btn order-3 lg:hidden w-full">
								<Link to="/about" className="btn-primary w-full">
									Know More About Me
								</Link>
							</div>
						</div>
					</div>
				</section>

				{/* 6. Specializations */}
				<section ref={specializationsRef} className="section-light">
					<div className="container-custom">
						<h2 className="section-title heading-serif">Areas of Specialization</h2>
						<p className="section-subtitle text-lg md:text-xl text-muted-foreground body-text">
							Expert care in conditions where homoeopathy and holistic aesthetics excel
						</p>

						<CircularShowcase
							items={specializationDatabase.map((spec) => ({
								slug: spec.slug,
								title: spec.title,
								category: 'Specialization',
								description: spec.introduction.length > 200 ? `${spec.introduction.slice(0, 200)}...` : spec.introduction,
								image: ClinicImages.specializationsBySlug[spec.slug],
							}))}
							onSelect={(item) => navigate(`/specialization/${item.slug}`)}
						/>
					</div>
				</section>

				{/* 7. Reviews */}
				<ReviewsSection />

				{/* 8. YouTube */}
				<YouTubeSection />

				{/* 9. Blog Preview */}
				<section ref={blogRef} className="section-white">
					<div className="container-custom">
						<h2 className="section-title heading-serif">Latest from Our Blog</h2>
						<p className="section-subtitle text-lg md:text-xl text-muted-foreground body-text">
							Expert insights on health, wellness, and homoeopathy
						</p>

						<div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ${blogVisible ? 'animate-fade-in' : 'opacity-0'}`}>
							{latestBlogs.map((blog, index) => (
								<div
									key={blog.id}
									style={{ animationDelay: `${index * 100}ms` }}
									className={blogVisible ? 'animate-slide-up' : 'opacity-0'}
								>
									<BlogCard {...blog} />
								</div>
							))}
						</div>

						<div className="text-center mt-10 md:mt-12">
							<Link to="/blog" className="btn-primary w-full sm:w-auto">
								View All Articles
							</Link>
						</div>
					</div>
				</section>

				{/* 10. Book Appointment CTA */}
				<section className="section-light">
					<div className="container-custom">
						<div className="card md:flex-row md:items-center md:justify-between gap-6 md:gap-10">
							<div className="text-center md:text-left">
								<Sparkles className="mx-auto md:mx-0 mb-2 h-6 w-6 text-primary" />
								<h2 className="section-title md:text-left heading-serif mb-2">
									<ShiningText text="Ready to Start Your Healing Journey?" />
								</h2>
								<p className="text-muted-foreground body-text mb-1 flex items-center justify-center md:justify-start gap-2">
									<Clock className="w-4 h-4 text-primary flex-shrink-0" /> Mon–Sun: 11:00 AM – 8:00 PM
								</p>
								<p className="text-muted-foreground body-text flex items-center justify-center md:justify-start gap-2">
									<Phone className="w-4 h-4 text-primary flex-shrink-0" />
									<a href="tel:+919625030958" className="hover:text-primary transition-colors">9625030958</a>
									<span className="mx-1">·</span>
									<Mail className="w-4 h-4 text-primary flex-shrink-0" />
									<a href="mailto:drshubhangi.econsultation@gmail.com" className="hover:text-primary transition-colors break-all">drshubhangi.econsultation@gmail.com</a>
								</p>
							</div>
							<div className="w-full md:w-auto flex flex-col sm:flex-row gap-3 mt-6 md:mt-0">
								<InteractiveHoverButton to="/appointment" className="w-full sm:w-auto justify-center">
									Book Appointment
								</InteractiveHoverButton>
							</div>
						</div>
					</div>
				</section>
				{/* 11. Location / Map */}
				<section className="section-white">
					<div className="container-custom">
						<div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center max-w-6xl mx-auto">
							<motion.div
								initial={{ opacity: 0, y: 16 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6 }}
								className="text-center md:text-left"
							>
								<div className="flex items-center justify-center md:justify-start gap-2 text-sm font-medium text-muted-foreground mb-3">
									<MapPin className="w-4 h-4 text-primary" />
									<span>Find Us</span>
								</div>
								<h2 className="text-3xl md:text-4xl font-bold text-foreground heading-serif mb-4">
									Visit Our Clinic
								</h2>
								<p className="text-muted-foreground leading-relaxed mb-2">
									F-42, Block F, Kirti Nagar, New Delhi, Delhi 110015
								</p>
								<p className="text-muted-foreground leading-relaxed mb-2">
									Mon–Sun: 11:00 AM – 8:00 PM
								</p>
								<p className="text-muted-foreground leading-relaxed mb-6">
									<a href="tel:+919625030958" className="hover:text-primary transition-colors">9625030958</a>
								</p>
								<a
									href="https://www.google.com/maps/dir/?api=1&destination=F-42,+Block+F,+Kirti+Nagar,+New+Delhi,+Delhi+110015"
									target="_blank"
									rel="noopener noreferrer"
									className="btn-primary inline-flex items-center gap-2"
								>
									Get Directions <ArrowRight className="w-4 h-4" />
								</a>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, scale: 0.96 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.15 }}
								className="rounded-2xl overflow-hidden card-shadow-xl border border-border"
							>
								<iframe
									title="Maharana Wellness Clinic Location"
									src="https://www.google.com/maps?q=Maharana+Wellness+Clinic,+F-42+Block+F+Kirti+Nagar+New+Delhi+110015&output=embed"
									className="w-full h-[350px] md:h-[420px] border-0"
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								/>
							</motion.div>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
};

export default HomePage;
