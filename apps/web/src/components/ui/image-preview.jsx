import React, { useState } from 'react';
import { X } from 'lucide-react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

export default function ImagePreview({ src, alt = 'Preview image', className }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<img
				src={src}
				alt={alt}
				onClick={() => setIsOpen(true)}
				className={cn('cursor-pointer rounded-lg transition-opacity hover:opacity-90', className)}
			/>

			<DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
				<DialogPrimitive.Portal>
					<DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm" />
					<DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-[100] w-auto h-auto max-w-[90vw] max-h-[90vh] -translate-x-1/2 -translate-y-1/2 border-0 bg-transparent p-0">
						<DialogPrimitive.Title className="sr-only">{alt}</DialogPrimitive.Title>
						<button
							onClick={() => setIsOpen(false)}
							className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/75 focus:outline-none"
						>
							<X className="h-6 w-6" />
							<span className="sr-only">Close</span>
						</button>
						<img src={src} alt={alt} className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain" />
					</DialogPrimitive.Content>
				</DialogPrimitive.Portal>
			</DialogPrimitive.Root>
		</>
	);
}
