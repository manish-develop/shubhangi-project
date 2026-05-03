import React, { useState } from 'react';

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    const message = encodeURIComponent("Hello Dr. Shubhangi Maharana, I would like to book an appointment.");
    window.open(`https://wa.me/919625030958?text=${message}`, '_blank');
  };

  return (
    <div className="whatsapp-float fixed z-[999] bottom-[88px] md:bottom-6 left-6">
      <div className="relative">
        <button
          onClick={handleClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="w-[56px] h-[56px] rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110"
          style={{
            backgroundColor: '#25D366',
            boxShadow: '0 4px 16px rgba(37,211,102,0.4)',
          }}
          aria-label="Chat on WhatsApp"
        >
          <i className="fa-brands fa-whatsapp" style={{ color: 'white', fontSize: '30px' }}></i>
        </button>
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-charcoal text-white text-sm rounded-lg whitespace-nowrap animate-fade-in hidden md:block">
            Chat on WhatsApp
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-charcoal" />
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsAppButton;