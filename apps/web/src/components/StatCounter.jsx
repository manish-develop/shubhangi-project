import React, { useState, useEffect } from 'react';

const StatCounter = ({ end, suffix = '', label, icon: Icon }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = end / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 50);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
      </div>
      <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
        {count}{suffix}
      </div>
      <div className="text-sm md:text-base font-medium text-primary">
        {label}
      </div>
    </div>
  );
};

export default StatCounter;