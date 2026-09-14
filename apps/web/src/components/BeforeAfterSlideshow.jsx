import React, { useEffect, useState } from 'react';
import LazyImage from './LazyImage.jsx';
import { fetchWpTestimonials } from '@/lib/wordpress.js';

const BeforeAfterSlideshow = () => {
	const [cases, setCases] = useState([]);

	useEffect(() => {
		// This section sits high enough on the homepage that LazySection's
		// generous rootMargin mounts it almost immediately, so without this
		// the WP testimonials fetch was landing on the page's critical
		// network path (see PageSpeed report, Sep 13 2026). Idle-defer it —
		// nothing above the fold depends on this data.
		const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
		const cancelIdle = window.cancelIdleCallback || clearTimeout;
		const handle = idle(() => {
			fetchWpTestimonials().then(setCases);
		});
		return () => cancelIdle(handle);
	}, []);

	if (cases.length === 0) return null;

	const track = [...cases, ...cases];
	const duration = Math.max(cases.length * 3, 18);

	return (
		<section className="relative overflow-hidden py-16 md:py-24" style={{ backgroundColor: 'hsl(var(--footer-bg))' }}>
			<style>{`
				@keyframes clinic-scroll-right {
					0% { transform: translateX(0); }
					100% { transform: translateX(-50%); }
				}
				.clinic-infinite-scroll {
					animation: clinic-scroll-right ${duration}s linear infinite;
				}
				.clinic-scroll-mask {
					mask: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
					-webkit-mask: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
				}
			`}</style>

			<div className="container-custom relative z-10 mb-10 text-center">
				<h2 className="heading-serif text-white text-3xl md:text-4xl">Real Results</h2>
				<p className="text-white/70 mt-2 body-text">Witness the healing power of homeopathy through our successful cases</p>
			</div>

			<div className="clinic-scroll-mask relative w-full flex items-center justify-center py-4">
				<div className="clinic-infinite-scroll flex gap-6 w-max">
					{track.map((item, index) => (
						<div
							key={`${item.id}-${index}`}
							className="flex-shrink-0 w-48 h-48 md:w-64 md:h-64 rounded-xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105"
						>
							<LazyImage
								src={item.image}
								alt={item.title}
								className="w-full h-full object-cover"
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default BeforeAfterSlideshow;
