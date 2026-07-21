import React, { useEffect, useState } from 'react';
import LazyImage from './LazyImage.jsx';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const BeforeAfterSlideshow = () => {
	const [cases, setCases] = useState([]);

	useEffect(() => {
		fetch(`${API_URL}/testimonials`)
			.then((res) => (res.ok ? res.json() : []))
			.then((data) => setCases(Array.isArray(data) ? data : []))
			.catch(() => setCases([]));
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
								src={item.before_image || item.after_image}
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
