import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import BeforeAfterCard from '@/components/BeforeAfterCard.jsx';
import LightboxModal from '@/components/LightboxModal.jsx';
import { useScrollAnimation } from '@/hooks/useScrollAnimation.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const TestimonialsPage = () => {
  const [heroRef, heroVisible] = useScrollAnimation(0.2);
  const [galleryRef, galleryVisible] = useScrollAnimation(0.2);

  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  const [lightboxTitle, setLightboxTitle] = useState('');
  const [cases, setCases] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/testimonials`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setCases(Array.isArray(data) ? data : []))
      .catch(() => setCases([]));
  }, []);

  const filters = ['All', ...new Set(cases.map((c) => c.category).filter(Boolean))];

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
        <title>Patient Success Stories & Before After Results | Maharana Wellness Clinic</title>
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
                    beforeImage={caseItem.before_image}
                    afterImage={caseItem.after_image}
                    caseTitle={caseItem.title}
                    onImageClick={handleImageClick}
                  />
                </div>
              ))}
            </div>

            {filteredCases.length === 0 && (
              <div className="text-center py-20 text-muted-foreground body-text">
                {cases.length === 0 ? 'No success stories added yet.' : 'No cases found for this category.'}
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-16 p-6 bg-muted rounded-xl border border-border text-center max-w-4xl mx-auto">
              <p className="text-sm text-muted-foreground body-text mb-0">
                <strong>Disclaimer:</strong> Results may vary. These are real patients treated at Maharana Wellness Clinic. Testimonials are not claimed to represent typical results.
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