import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialCard = ({ name, city, rating = 5, testimonial, condition, avatar }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-card rounded-xl p-4 md:p-8 card-shadow-lg border border-border/50 h-full flex flex-col w-full">
      <Quote className="w-8 h-8 text-primary/20 mb-4" />
      <p className="body-text text-foreground italic mb-6 flex-grow">
        "{testimonial}"
      </p>
      <div className="flex items-center gap-4 pt-5 border-t border-border">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-lg flex-shrink-0 shadow-sm">
          {initials}
        </div>
        <div className="flex-grow min-w-0">
          <div className="heading-serif text-foreground mobile-name md:text-lg truncate">{name}</div>
          <div className="body-text mobile-secondary md:text-sm text-muted-foreground truncate">{city}</div>
        </div>
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <div className="flex gap-0.5">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-accent text-accent" />
            ))}
          </div>
          <div className="body-text text-[11px] md:text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full font-semibold">
            {condition}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;