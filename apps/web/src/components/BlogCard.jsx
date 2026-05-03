import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import LazyImage from '@/components/LazyImage.jsx';

const BlogCard = ({ id, image, category, title, excerpt, readTime }) => {
  return (
    <Link
      to={`/article/${id}`}
      className="group block bg-card rounded-xl overflow-hidden card-shadow hover:card-shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full"
    >
      <div className="relative h-40 md:h-48 overflow-hidden flex-shrink-0">
        <LazyImage
          src={image}
          alt={title}
          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 md:top-4 md:left-4">
          <span className="text-[10px] md:text-xs font-medium text-white bg-primary px-2 md:px-3 py-1 rounded-full shadow-sm">
            {category}
          </span>
        </div>
      </div>
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed line-clamp-2 flex-grow">
          {excerpt}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-muted-foreground">
            <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>{readTime} min read</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 text-sm md:text-base text-primary font-medium group-hover:gap-3 transition-all duration-300">
            Read Article
            <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;