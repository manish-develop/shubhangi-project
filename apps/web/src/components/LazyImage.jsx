import React, { useState } from 'react';
import { cn } from '@/lib/utils';

// width/height default to a 1:1 intrinsic box — every call site here sizes
// the image with CSS (aspect-square, object-cover, etc.), so the exact
// numbers don't matter, but Lighthouse's CLS-prevention audit wants the
// attributes present so the browser can reserve space before the image loads.
const LazyImage = ({ src, alt, className, width = 800, height = 800, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden w-full h-full", className)}>
      {!isLoaded && <div className="absolute inset-0 skeleton" />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default LazyImage;