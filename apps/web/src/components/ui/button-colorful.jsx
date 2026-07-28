import React from 'react';
import { Button } from '@/components/ui/button.jsx';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

export const ButtonColorful = React.forwardRef(({ className, label = 'Explore Components', ...props }, ref) => {
	return (
		<Button
			ref={ref}
			className={cn('group relative h-11 overflow-hidden px-6 transition-all duration-200', 'bg-zinc-900 dark:bg-zinc-100', className)}
			{...props}
		>
			<div
				className={cn(
					'absolute inset-0',
					'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
					'opacity-40 group-hover:opacity-80',
					'blur transition-opacity duration-500'
				)}
			/>

			<div className="relative flex items-center justify-center gap-2">
				<span className="text-white dark:text-zinc-900">{label}</span>
				<ArrowUpRight className="h-3.5 w-3.5 text-white/90 dark:text-zinc-900/90" />
			</div>
		</Button>
	);
});
ButtonColorful.displayName = 'ButtonColorful';

export default ButtonColorful;
