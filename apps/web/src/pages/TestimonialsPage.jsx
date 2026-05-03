import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import BeforeAfterCard from '@/components/BeforeAfterCard.jsx';
import LightboxModal from '@/components/LightboxModal.jsx';
import { useScrollAnimation } from '@/hooks/useScrollAnimation.js';

const TestimonialsPage = () => {
  const [heroRef, heroVisible] = useScrollAnimation(0.2);
  const [galleryRef, galleryVisible] = useScrollAnimation(0.2);
  
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  const [lightboxTitle, setLightboxTitle] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cases = [
    { id: 1, category: 'Skin', title: 'Hands Eczema', imageUrl: 'https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/88f86967f7d6de5b4df8fdf523b8c55a.jpg' },
    { id: 2, category: 'Skin', title: 'Fungal Infection', imageUrl: 'https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/b93f55647dd94c0bae30645b583ffae2.jpg' },
    { id: 3, category: 'Skin', title: 'Alopecia Areata', imageUrl: 'https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/06d57561588ea3b14fbb3a39f48f99a0.jpg' },
    { id: 4, category: 'Skin', title: 'Wart Removal', imageUrl: 'https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/32d9f39391678d4dc1e1a512b8ea77b0.jpg' },
    { id: 5, category: 'Skin', title: 'Ganglion Cyst', imageUrl: 'https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/e39e09d60554ffcf82ce9d3e5ff16e7b.jpg' },
    { id: 6, category: 'Skin', title: 'Urticaria Case', imageUrl: 'https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/c7107cbdb99668da421db3652dfe060c.jpg' },
    { id: 7, category: 'Skin', title: 'Hyperpigmentation', imageUrl: 'https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/1fdc590a5bf8c39c68163fdc96ab6d49.jpg' },
    { id: 8, category: 'Hair', title: 'Hair Fall Case', imageUrl: 'https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/d154ae7305269e2d28c1ff073d1d9ea1.jpg' },
    { id: 9, category: 'Other', title: 'Varicose Veins', imageUrl: 'https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/1ef62e5c55e6be714f78fb25df78baff.jpg' },
    { id: 10, category: 'Skin', title: 'Acne Case', imageUrl: 'https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/a3f20bd0009e9be45a009f61bc7ace34.jpg' },
    { id: 11, category: 'Skin', title: 'Hands Psoriasis', imageUrl: 'https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/96e4a4d259952f90cf3396ad5a109d60.jpg' },
    { id: 12, category: 'Skin', title: 'Vitiligo Case', imageUrl: 'https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/f1d2a139d050c230fbbc409bd5ce02b7.jpg' },
  ];

  const filters = ['All', 'Skin', 'Hair', 'Other'];

  const filteredCases = activeFilter === 'All' 
    ? cases 
    : cases.filter(c => c.category === activeFilter);

  const handleImageClick = (url, title) => {
    setLightboxImage(url);
    setLightboxTitle(title);
    setLightboxOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Patient Success Stories & Before After Results | Maharana's Clinic</title>
        <meta name="description" content="See real before & after results of patients treated by Dr. Shubhangi Maharana. Cases include Eczema, Psoriasis, Acne, Vitiligo, Hair Fall, Fungal Infection and more. Real patients, real results." />
      </Helmet>

      <Header />

      <main className="bg-background min-h-screen">
        <section ref={heroRef} className="page-header">
          <div className="container-custom">
            <div className={`max-w-3xl mx-auto ${heroVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <h1 className="section-title mb-4 heading-serif">Patient Success Stories</h1>
              <p className="section-subtitle text-xl leading-relaxed body-text mx-auto">
                Real patients. Real results. Treated by <span className="doctor-name font-semibold">Dr. Shubhangi Maharana</span>.
              </p>
            </div>
          </div>
        </section>

        <section ref={galleryRef} className="section-white">
          <div className="container-custom">
            {/* Filters */}
            <div className={`flex flex-wrap justify-center gap-3 mb-12 ${galleryVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 w-full sm:w-auto ${
                    activeFilter === filter 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ${galleryVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              {filteredCases.map((caseItem, index) => (
                <div key={caseItem.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-slide-up w-full">
                  <BeforeAfterCard 
                    imageUrl={caseItem.imageUrl} 
                    caseTitle={caseItem.title} 
                    onImageClick={handleImageClick}
                  />
                </div>
              ))}
            </div>

            {filteredCases.length === 0 && (
              <div className="text-center py-20 text-muted-foreground body-text">
                No cases found for this category.
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-16 p-6 bg-muted rounded-xl border border-border text-center max-w-4xl mx-auto">
              <p className="text-sm text-muted-foreground body-text mb-0">
                <strong>Disclaimer:</strong> Results may vary. These are real patients treated at Maharana's Clinic. Testimonials are not claimed to represent typical results.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <LightboxModal 
        isOpen={lightboxOpen} 
        onClose={() => setLightboxOpen(false)} 
        imageSrc={lightboxImage} 
        altText={lightboxTitle} 
      />
    </>
  );
};

export default TestimonialsPage;