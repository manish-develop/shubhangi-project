import React from 'react';
import { Link } from 'react-router-dom';
import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const cardVariants = cva(
	'group relative flex min-h-[220px] w-full flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-xl',
	{
		variants: {
			variant: {
				default: 'bg-card text-card-foreground border border-border',
				primary: 'bg-primary text-primary-foreground',
				accent: 'bg-accent text-accent-foreground',
				muted: 'bg-muted text-foreground',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	}
);

const iconTintByVariant = {
	default: 'text-primary/15',
	primary: 'text-white/20',
	accent: 'text-primary/15',
	muted: 'text-primary/15',
};

const cardAnimation = {
	hover: { scale: 1.02, transition: { duration: 0.3 } },
};

const iconAnimation = {
	hover: { scale: 1.12, rotate: 6, transition: { duration: 0.4, ease: 'easeInOut' } },
};

const arrowAnimation = {
	hover: { x: 5, transition: { duration: 0.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' } },
};

const ServiceCard = ({ id, icon: Icon, title, description, variant = 'default', className }) => {
	return (
		<motion.div
			className={cn(cardVariants({ variant }), className)}
			variants={cardAnimation}
			whileHover="hover"
		>
			<div className="relative z-10 flex h-full flex-col">
				<h3
					className={cn(
						'text-xl font-bold tracking-tight heading-sans',
						variant === 'primary' ? 'text-white' : 'text-primary'
					)}
				>
					{title}
				</h3>
				<p
					className={cn(
						'mt-3 text-sm leading-relaxed',
						variant === 'primary' ? 'text-primary-foreground/85' : 'text-muted-foreground'
					)}
				>
					{description}
				</p>
				<Link
					to={`/service/${id}`}
					aria-label={`Learn more about ${title}`}
					className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold uppercase tracking-wide group-hover:underline"
				>
					Learn More
					<motion.span variants={arrowAnimation} className="inline-flex">
						<ArrowRight className="h-4 w-4" />
					</motion.span>
				</Link>
			</div>

			{Icon && (
				<motion.div
					variants={iconAnimation}
					className={cn('pointer-events-none absolute -right-6 -bottom-6', iconTintByVariant[variant])}
				>
					<Icon className="h-32 w-32" strokeWidth={1.25} />
				</motion.div>
			)}
		</motion.div>
	);
};

export default ServiceCard;
