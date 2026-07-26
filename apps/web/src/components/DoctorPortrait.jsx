import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProgressiveBlur } from '@/components/ui/progressive-blur.jsx';
import { ClinicImages } from '@/constants/clinicImages.js';
import { cn } from '@/lib/utils';

const DoctorPortrait = ({ className }) => {
	const [isHover, setIsHover] = useState(false);

	return (
		<div
			className={cn('relative mx-auto overflow-hidden rounded-2xl border border-border shadow-xl', className)}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<img
				src={ClinicImages.doctorPortrait}
				alt="Dr. Shubhangi Maharana - Homoeopathic Physician"
				className="absolute inset-0 h-full w-full object-cover"
			/>

			<ProgressiveBlur
				className="pointer-events-none absolute bottom-0 left-0 h-[45%] w-full"
				blurIntensity={0.5}
				animate={isHover ? 'visible' : 'hidden'}
				variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
				transition={{ duration: 0.2, ease: 'easeOut' }}
			/>
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300" style={{ opacity: isHover ? 1 : 0 }} />

			<motion.div
				className="absolute bottom-0 left-0 right-0"
				animate={isHover ? 'visible' : 'hidden'}
				variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
				transition={{ duration: 0.2, ease: 'easeOut' }}
			>
				<div className="flex flex-col items-start gap-0.5 px-5 py-4">
					<p className="text-lg font-bold text-white heading-serif">Dr. Shubhangi Maharana</p>
					<span className="text-sm text-white/85">BHMS, MD (Hom.), DNHE, MPMU, FMC (Germany)</span>
				</div>
			</motion.div>
		</div>
	);
};

export default DoctorPortrait;
