import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '@/components/LazyImage.jsx';

const BlogCard = ({ id, image, category, title, excerpt, readTime, author, date }) => {
	return (
		<Link
			to={`/article/${id}`}
			className="group flex flex-col gap-3 rounded-lg p-2 duration-200 hover:bg-accent/60 active:bg-accent"
		>
			<div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border">
				<LazyImage
					src={image}
					alt={title}
					className="transition-transform duration-500 group-hover:scale-105"
				/>
				<span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-primary-foreground shadow-sm">
					{category}
				</span>
			</div>

			<div className="space-y-2 px-2 pb-2">
				<div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground sm:text-xs">
					{author && <p>by {author}</p>}
					{author && <span className="h-1 w-1 rounded-full bg-muted-foreground" />}
					{date && <p>{date}</p>}
					{date && <span className="h-1 w-1 rounded-full bg-muted-foreground" />}
					<p>{readTime} min read</p>
				</div>
				<h3 className="line-clamp-2 text-lg font-semibold leading-tight tracking-tight text-foreground heading-sans group-hover:text-primary transition-colors">
					{title}
				</h3>
				<p className="line-clamp-2 text-sm text-muted-foreground">
					{excerpt}
				</p>
			</div>
		</Link>
	);
};

export default BlogCard;
