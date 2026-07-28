import React, { useState, useEffect } from 'react';
import { Play, X } from 'lucide-react';
import SEO from '@/components/SEO.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { FluidDropdown } from '@/components/ui/fluid-dropdown.jsx';
import { MasonryGrid } from '@/components/ui/image-testimonial-grid.jsx';
import { useScrollAnimation } from '@/hooks/useScrollAnimation.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Extracts the video ID from either a youtu.be/ID short link or a full
// youtube.com/watch?v=ID (or /embed/ID) link. Returns null when it can't parse.
function getYouTubeId(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');
    if (host === 'youtu.be') {
      return parsed.pathname.slice(1).split(/[/?&]/)[0] || null;
    }
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      if (parsed.pathname === '/watch') return parsed.searchParams.get('v');
      if (parsed.pathname.startsWith('/embed/')) {
        return parsed.pathname.split('/embed/')[1].split(/[/?&]/)[0] || null;
      }
    }
  } catch {
    return null;
  }
  return null;
}

// A single Instagram-style photo card: patient before/after image with a
// bottom gradient overlay carrying the title + category. When the testimonial
// has a linked YouTube video, a play badge overlays the image and expands to
// an inline embed on click.
const TestimonialCard = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoId = getYouTubeId(item.youtube_url);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`block w-full h-auto transition-all duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-black/70" />

        <div className="absolute inset-x-0 bottom-0 p-4">
          {item.category && (
            <span className="mb-1.5 inline-block rounded-full bg-white/15 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-medium text-white">
              {item.category}
            </span>
          )}
          <h3 className="text-base font-semibold leading-snug text-white drop-shadow-sm">{item.title}</h3>
        </div>

        {videoId && (
          <button
            type="button"
            onClick={() => setShowVideo((v) => !v)}
            aria-label={showVideo ? 'Hide video' : 'Play video'}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-primary"
          >
            {showVideo ? <X className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
          </button>
        )}
      </div>

      {videoId && showVideo && (
        <div className="relative aspect-video w-full overflow-hidden border-t border-border">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={item.title || 'Patient testimonial video'}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

const TestimonialsPage = () => {
  const [heroRef, heroVisible] = useScrollAnimation(0.2);
  const [galleryRef, galleryVisible] = useScrollAnimation(0.2);

  const [activeFilter, setActiveFilter] = useState('All');
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

  const cardItems = filteredCases.map((c) => ({
    id: c.id,
    image: c.before_image || c.after_image,
    title: c.title,
    category: c.category,
    description: c.description,
    youtube_url: c.youtube_url,
  }));

  return (
    <>
      <SEO
        title="Patient Success Stories & Before After Results | Maharana Wellness Clinic"
        description="See real before & after results of patients treated by Dr. Shubhangi Maharana. Cases include Eczema, Psoriasis, Acne, Vitiligo, Hair Fall, Fungal Infection and more. Real patients, real results."
        path="/testimonials"
      />

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
            {/* Filter */}
            <div className={`flex justify-center mb-12 ${galleryVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <FluidDropdown categories={filters} value={activeFilter} onChange={setActiveFilter} />
            </div>

            {/* Gallery Grid */}
            <div className={galleryVisible ? 'animate-fade-in' : 'opacity-0'}>
              <MasonryGrid gap={16}>
                {cardItems.map((item) => (
                  <TestimonialCard key={item.id} item={item} />
                ))}
              </MasonryGrid>
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
    </>
  );
};

export default TestimonialsPage;
