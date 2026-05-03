import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LazyImage from './LazyImage.jsx';

const BeforeAfterSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  const images = [
    { url: 'https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/88f86967f7d6de5b4df8fdf523b8c55a.jpg', title: 'Hands Eczema' },
    { url: 'https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/a3f20bd0009e9be45a009f61bc7ace34.jpg', title: 'Acne Case' },
    { url: 'https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/06d57561588ea3b14fbb3a39f48f99a0.jpg', title: 'Alopecia Areata' },
    { url: 'https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/f1d2a139d050c230fbbc409bd5ce02b7.jpg', title: 'Vitiligo Case' },
    { url: 'https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/b93f55647dd94c0bae30645b583ffae2.jpg', title: 'Fungal Infection' },
    { url: 'https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/96e4a4d259952f90cf3396ad5a109d60.jpg', title: 'Hands Psoriasis' },
    { url: 'https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/d154ae7305269e2d28c1ff073d1d9ea1.jpg', title: 'Hair Fall Case' },
    { url: 'https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/1fdc590a5bf8c39c68163fdc96ab6d49.jpg', title: 'Hyperpigmentation' },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(4);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, images.length - itemsPerView);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  const next = () => setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prev = () => setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));

  return (
    <section className="bg-primary/5 py-12 md:py-20 border-y border-border overflow-hidden">
      <div className="container-custom">
        <div className="section-header">
          <h2 className="heading-serif text-primary">Real Results</h2>
          <p className="text-muted-foreground">Witness the healing power of homeopathy through our successful cases</p>
        </div>

        <div className="relative max-w-7xl mx-auto px-8 md:px-12">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {images.map((img, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="aspect-[4/3] rounded-xl overflow-hidden card-shadow-md border-2 border-white bg-muted relative group">
                    <LazyImage
                      src={img.url}
                      alt={`Before and After Treatment - ${img.title}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                      <p className="text-white text-sm md:text-base font-bold text-center">{img.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white card-shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all z-20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white card-shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all z-20"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlideshow;