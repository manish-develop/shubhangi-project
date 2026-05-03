import React, { useEffect } from 'react';

const LightboxModal = ({ isOpen, onClose, imageSrc, altText }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="lightbox-close"
        aria-label="Close lightbox"
      >
        ×
      </button>
      <img
        src={imageSrc}
        alt={altText || "Enlarged view"}
        onClick={(e) => e.stopPropagation()}
      />
      {altText && (
        <div className="lightbox-title" onClick={(e) => e.stopPropagation()}>
          {altText}
        </div>
      )}
    </div>
  );
};

export default LightboxModal;