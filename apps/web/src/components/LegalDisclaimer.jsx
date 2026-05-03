import React from 'react';

const LegalDisclaimer = () => {
  return (
    <div className="bg-[hsl(var(--disclaimer-bg))] py-6 mt-12 border-t border-border">
      <div className="container-custom">
        <p className="text-xs md:text-sm text-[hsl(var(--disclaimer-text))] text-center leading-relaxed max-w-5xl mx-auto">
          <strong>Legal Disclaimer</strong> — None of the medicines mentioned including services mentioned at drmaharanas.com should be used without clearance from your physician or health care provider. We do not claim to cure any disease which is considered 'incurable' on the basis of scientific facts by modern medicine. The website's content is not a substitute for direct, personal, professional medical care and diagnosis.
        </p>
      </div>
    </div>
  );
};

export default LegalDisclaimer;