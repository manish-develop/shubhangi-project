import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import LazyImage from '@/components/LazyImage.jsx';

// Adapted from the shared design reference (a Next.js/shadcn component) to
// this project's Vite + React Router stack: next/image -> LazyImage,
// next/link -> react-router Link.
const WpBlogCard = ({ slug, title, excerpt, image, category, date }) => {
	return (
		<div className="group cursor-pointer border border-border/50 bg-card/50 shadow-none backdrop-blur-sm transition-shadow hover:shadow-md">
			<div className="p-0">
				<Link to={`/blogs/${slug}`} className="relative mb-4 block overflow-hidden sm:mb-6">
					<LazyImage
						src={image}
						alt={title}
						className="aspect-square h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-72 md:h-80"
					/>
					{category && (
						<p className="absolute left-0 top-0 bg-card px-2 py-0.5 text-[10px] font-medium uppercase text-foreground backdrop-blur-sm sm:px-3 sm:py-1 sm:text-xs">
							#{category}
						</p>
					)}
				</Link>
				<div className="px-3 pb-3 sm:px-4 sm:pb-4">
					<h3 className="mb-2 text-base font-normal tracking-tight text-foreground sm:mb-2 sm:text-lg md:text-2xl">
						<Link to={`/blogs/${slug}`} className="hover:text-primary transition-colors">
							{title}
						</Link>
					</h3>
					<p className="mb-4 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:mb-6 sm:text-sm">
						{excerpt}
					</p>
					<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<Link
							to={`/blogs/${slug}`}
							className="group/link relative flex items-center overflow-hidden text-xs font-medium text-foreground transition-colors hover:text-primary sm:text-sm"
						>
							<span className="mr-2 overflow-hidden border border-border p-2 transition-colors duration-300 ease-in group-hover/link:bg-foreground group-hover/link:text-card sm:p-3">
								<ArrowRight className="h-3 w-3 translate-x-0 opacity-100 transition-all duration-500 ease-in group-hover/link:translate-x-8 group-hover/link:opacity-0 sm:h-4 sm:w-4" />
								<ArrowRight className="absolute -left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-all duration-500 ease-in-out group-hover/link:left-2 sm:-left-5 sm:h-4 sm:w-4 sm:group-hover/link:left-3" />
							</span>
							Read more
						</Link>
						<span className="flex items-center gap-2 text-[10px] text-muted-foreground sm:gap-3 sm:text-xs">
							{date}
							<span className="w-6 border-t border-border sm:w-16" />
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WpBlogCard;
