import React from 'react';
import { cn } from '@/lib/utils';

export const ShiningText = ({ text, className }) => (
	<span
		className={cn(
			'inline-block bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent [animation:shine_3s_linear_infinite]',
			className
		)}
	>
		{text}
	</span>
);

export default ShiningText;
