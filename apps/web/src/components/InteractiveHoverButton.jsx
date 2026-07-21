import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const InteractiveHoverButton = ({ to, href, children, className, ...props }) => {
	const Comp = to ? Link : 'a';
	const linkProps = to ? { to } : { href };

	return (
		<Comp
			{...linkProps}
			className={cn(
				'group relative w-fit cursor-pointer overflow-hidden rounded-full border border-primary bg-background px-6 py-3 text-center font-semibold',
				className
			)}
			{...props}
		>
			<span className="inline-flex items-center gap-2 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
				{children}
			</span>
			<div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
				<span>{children}</span>
				<ArrowRight className="h-4 w-4" />
			</div>
			<div className="absolute left-[20%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-primary transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:bg-primary" />
		</Comp>
	);
};

export default InteractiveHoverButton;
