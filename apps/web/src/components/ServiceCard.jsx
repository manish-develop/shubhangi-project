import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const ServiceCard = ({ id, icon: Icon, title, description }) => {
  return (
    <div className="bg-card rounded-2xl p-6 card-shadow-lg hover-lift flex flex-col h-full border border-border">
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-foreground heading-sans">{title}</h3>
      <p className="text-muted-foreground leading-relaxed mb-6 flex-grow body-text">
        {description}
      </p>
      <Link to={`/service/${id}`} className="mt-auto text-primary font-medium flex items-center gap-2 group heading-sans">
        Learn More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};

export default ServiceCard;