import React from 'react';

const LegalDisclaimer = () => {
  return (
    <div className="bg-[hsl(var(--disclaimer-bg))] py-4 mt-0 border-t border-white/10">
      <div className="container-custom">
        <p className="text-xs md:text-sm text-[hsl(var(--disclaimer-text))] text-center leading-relaxed max-w-5xl mx-auto">
          All treatments are performed by a qualified Homoeopathic physician Dr. Shubhangi Maharana trained in medical cosmetology. Procedures are selected based on patient suitability and within the practitioner's scope of practice.
        </p>
      </div>
    </div>
  );
};

export default LegalDisclaimer;