import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DiseaseCard = ({ name, description, category, successRate }) => {
  return (
    <Link
      to="/contact"
      className="group block bg-card rounded-xl p-6 card-shadow hover:card-shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-primary/20"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {name}
        </h3>
        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
      </div>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
        {description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
          {category}
        </span>
        {successRate && (
          <span className="text-xs font-medium text-accent">
            {successRate}% success rate
          </span>
        )}
      </div>
    </Link>
  );
};

export default DiseaseCard;