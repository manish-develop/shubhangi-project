import React from 'react';
import LazyImage from './LazyImage.jsx';

const BeforeAfterCard = ({ imageUrl, caseTitle, onImageClick }) => {
  return (
    <div className="card overflow-hidden !p-0 hover-lift border border-border">
      <div 
        className="relative h-48 md:h-56 w-full overflow-hidden bg-muted cursor-pointer lightbox-trigger"
        onClick={() => onImageClick(imageUrl, caseTitle)}
      >
        <LazyImage 
          src={imageUrl} 
          alt={caseTitle} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
        />
      </div>
      <div className="p-4 md:p-5 text-center w-full">
        <h3 className="font-semibold text-foreground text-lg m-0">{caseTitle}</h3>
      </div>
    </div>
  );
};

export default BeforeAfterCard;