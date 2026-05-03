import React from 'react';
import { Phone, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileBookingBar = ({ isSidebarOpen }) => {
  return (
    <div className={`mobile-sticky-bar ${isSidebarOpen ? 'hidden' : ''} bg-primary shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-primary-foreground/10 pb-safe`}>
      <div className="grid grid-cols-2 gap-2 p-2 w-full">
        <a
          href="tel:+919625030958"
          className="flex items-center justify-center gap-2 bg-accent text-accent-foreground py-2 rounded-xl font-medium transition-all duration-300 active:scale-95 min-h-[44px]"
        >
          <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Call Now</span>
        </a>
        <Link
          to="/contact"
          className="flex items-center justify-center gap-2 bg-primary-foreground text-primary py-2 rounded-xl font-medium transition-all duration-300 active:scale-95 min-h-[44px]"
        >
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Book Visit</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileBookingBar;