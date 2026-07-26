import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';

const DiseaseCard = ({ id, name, category, image, className }) => {
	return (
		<Link
			to={`/disease/${id}`}
			className={cn(
				'group relative block h-72 w-full overflow-hidden rounded-xl border border-border shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl',
				className
			)}
		>
			<img
				src={image}
				alt={name}
				className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

			<div className="relative flex h-full flex-col justify-between p-5">
				<div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/50 bg-black/20 backdrop-blur-sm">
					<Stethoscope className="h-5 w-5 text-white/90" />
				</div>

				<div className="space-y-1 transition-transform duration-500 ease-in-out group-hover:-translate-y-10">
					<span className="text-xs font-semibold uppercase tracking-wide text-white/70">{category}</span>
					<h3 className="text-xl font-bold text-white heading-sans">{name}</h3>
				</div>

				<div className="absolute inset-x-0 -bottom-14 flex items-center justify-between p-5 opacity-0 transition-all duration-500 ease-in-out group-hover:bottom-0 group-hover:opacity-100">
					<span className="text-sm text-white/80">Homoeopathic treatment available</span>
					<span className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-primary">
						Learn More <ArrowRight className="h-3.5 w-3.5" />
					</span>
				</div>
			</div>
		</Link>
	);
};

export default DiseaseCard;
