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
				'group relative inline-flex min-w-[11rem] items-center justify-center cursor-pointer overflow-hidden whitespace-nowrap rounded-full border-2 border-primary bg-background px-7 py-3 text-center font-semibold transition-colors duration-300 hover:border-white',
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
			<div className="absolute left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:translate-y-0" />
		</Comp>
	);
};

export default InteractiveHoverButton;
