import React, { useState } from 'react';
import { cn } from '@/lib/utils';

const GradientBars = ({ className }) => {
	const numBars = 20;

	const calculateHeight = (index, total) => {
		const position = index / (total - 1);
		const maxHeight = 100;
		const minHeight = 20;
		const center = 0.5;
		const distanceFromCenter = Math.abs(position - center);
		const heightPercentage = Math.pow(distanceFromCenter * 2, 1.3);
		return minHeight + (maxHeight - minHeight) * heightPercentage;
	};

	return (
		<div className={cn('absolute inset-0 z-0 overflow-hidden', className)}>
			<div className="flex h-full" style={{ width: '100%' }}>
				{Array.from({ length: numBars }).map((_, index) => {
					const height = calculateHeight(index, numBars);
					return (
						<div
							key={index}
							style={{
								flex: '1 0 calc(100% / 20)',
								maxWidth: 'calc(100% / 20)',
								height: '100%',
								background: 'linear-gradient(to top, hsl(var(--primary) / 0.35), transparent)',
								transform: `scaleY(${height / 100})`,
								transformOrigin: 'bottom',
							}}
						/>
					);
				})}
			</div>
		</div>
	);
};

export const GradientBarHeroSection = ({ eyebrow, title, subtitle, children, className }) => {
	return (
		<section className={cn('relative bg-background pt-28 pb-12 md:pt-36 md:pb-16', className)}>
			<GradientBars />
			<div className="relative z-10 container-custom text-center max-w-3xl mx-auto">
				{eyebrow && (
					<div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
						{eyebrow}
					</div>
				)}
				<h1 className="section-title heading-serif mb-4">{title}</h1>
				{subtitle && <p className="section-subtitle mx-auto mb-8">{subtitle}</p>}
				{children}
			</div>
		</section>
	);
};

export default GradientBarHeroSection;
