import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Heart, Users, Shield, Sparkles, Award, Mic, Medal, Search } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import LazyImage from '@/components/LazyImage.jsx';
import LightboxModal from '@/components/LightboxModal.jsx';
import { useScrollAnimation } from '@/hooks/useScrollAnimation.js';

const AboutPage = () => {
  const [heroRef, heroVisible] = useScrollAnimation(0.2);
  const [introRef, introVisible] = useScrollAnimation(0.2);
  const [qualRef, qualVisible] = useScrollAnimation(0.2);
  const [pubRef, pubVisible] = useScrollAnimation(0.2);
  const [achieveRef, achVisible] = useScrollAnimation(0.2);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  const [lightboxAlt, setLightboxAlt] = useState('');
  
  const openLightbox = (src, alt) => {
    setLightboxImage(src);
    setLightboxAlt(alt);
    setLightboxOpen(true);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Dr. Shubhangi Maharana" />
        <title>About Dr. Shubhangi Maharana | BHMS MD Hom. Homoeopathic Doctor</title>
        <meta name="description" content="Learn about Dr. Shubhangi Maharana — a qualified homoeopathic physician with BHMS, MD (Hom.), DNHE, MPMU & FMC (Germany). 8+ years of experience in homoeopathy and facial aesthetics." />
      </Helmet>

      <Header />

      <main className="about-page-wrapper">
        <section ref={heroRef} className="page-header about-top-intro">
          <div className="container-custom">
            <div className={`max-w-3xl mx-auto ${heroVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="mb-4 md:mb-6">
                <span className="section-subtitle text-lg md:text-xl font-medium block mb-2 heading-sans">About</span>
                <h1 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold heading-serif doctor-name">Dr. Shubhangi Maharana</h1>
              </div>
              <p className="text-lg md:text-xl leading-relaxed max-w-prose mx-auto">
                Dedicated to healing through homoeopathy with compassion, expertise, and a holistic approach to wellness
              </p>
            </div>
          </div>
        </section>

        <section ref={introRef} className="section-white about-doctor-photo">
          <div className="container-custom">
            <div className={`about-photo-journey-row ${introVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
              
              <div className="doctor-photo relative w-full">
                <div className="absolute -inset-4 bg-primary/10 rounded-full blur-3xl" />
                <div className="relative rounded-2xl overflow-hidden card-shadow-xl border border-border w-full flex justify-center bg-white p-4">
                  <LazyImage src="https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/eb0cd3d7f6f74bf598708e9dd019dd35.jpg" alt="Dr. Shubhangi Maharana - Homoeopathic Physician" className="doctor-image w-full h-auto max-h-[600px] object-contain rounded-xl" />
                </div>
                <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-card p-3 md:p-4 rounded-xl card-shadow-lg border border-border">
                  <div className="text-xs md:text-sm font-medium text-muted-foreground mb-1">Qualified</div>
                  <div className="text-base md:text-lg font-bold text-primary">BHMS, MD</div>
                </div>
              </div>

              <div className="journey-content w-full">
                <h2 className="mb-4 md:mb-6 heading-serif">My Journey in Homoeopathy</h2>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  <span className="doctor-name font-medium">Dr. Shubhangi Maharana</span> is a highly qualified homoeopathic physician holding BHMS, MD (Hom.), DNHE, MPMU, and FMC (Germany) — bringing a rare blend of homoeopathic training and international medical exposure to her practice at Maharana's.
                </p>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  With over 8+ years of clinical experience, she has had the privilege of treating over 500+ patients, witnessing remarkable transformations in their health and well-being. Each patient's journey reinforces her conviction that true healing addresses not just physical symptoms, but the emotional and mental aspects of health as well.
                </p>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  She specializes in chronic diseases, women's health issues, and facial aesthetics, areas where homoeopathy has shown exceptional results. Her approach combines thorough case-taking, constitutional analysis, and individualized remedy selection to ensure the best possible outcomes for each patient.
                </p>

                <p className="text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                  What sets her practice apart is the time and attention given to understanding each patient's unique constitution, lifestyle, and emotional state. She believes that healing is a partnership between doctor and patient, and is committed to empowering her patients with knowledge about their health.
                </p>

                <Link to="/appointment" className="btn-primary w-full sm:w-auto">
                  Book a Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section ref={qualRef} className="section-light about-qualifications">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="section-title heading-serif">Qualifications & Credentials</h2>
              <p className="section-subtitle text-lg md:text-xl text-muted-foreground mx-auto">
                A strong foundation in medical science and homoeopathy
              </p>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${qualVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="card hover-lift border-t-4 border-t-primary items-center text-center">
                <Award className="w-8 h-8 text-primary mb-4" />
                <h3 className="card-title text-xl font-semibold mb-2 text-foreground heading-sans">BHMS</h3>
                <p className="card-description text-muted-foreground text-sm">Bachelor of Homoeopathic Medicine and Surgery</p>
              </div>
              <div className="card hover-lift border-t-4 border-t-primary items-center text-center">
                <Award className="w-8 h-8 text-primary mb-4" />
                <h3 className="card-title text-xl font-semibold mb-2 text-foreground heading-sans">MD (Hom.)</h3>
                <p className="card-description text-muted-foreground text-sm">Doctor of Medicine in Homoeopathy</p>
              </div>
              <div className="card hover-lift border-t-4 border-t-primary items-center text-center">
                <Award className="w-8 h-8 text-primary mb-4" />
                <h3 className="card-title text-xl font-semibold mb-2 text-foreground heading-sans">DNHE</h3>
                <p className="card-description text-muted-foreground text-sm">Diploma in Nutrition and Health Education</p>
              </div>
              <div className="card hover-lift border-t-4 border-t-primary items-center text-center">
                <Award className="w-8 h-8 text-primary mb-4" />
                <h3 className="card-title text-xl font-semibold mb-2 text-foreground heading-sans">FMC (Germany)</h3>
                <p className="card-description text-muted-foreground text-sm">Fellowship in Medical Cosmetology</p>
              </div>
            </div>
          </div>
        </section>

        <section ref={pubRef} className="section-medium about-publications">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="section-title heading-serif">🔬 Research & Publications</h2>
              <p className="section-subtitle text-lg md:text-xl text-muted-foreground mx-auto">
                Advancing the field of homoeopathy through peer-reviewed research and clinical studies
              </p>
            </div>

            <div className={`grid md:grid-cols-2 gap-8 max-w-5xl mx-auto ${pubVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="card !p-0 overflow-hidden hover-lift flex flex-col border border-border">
                <div className="relative h-64 md:h-80 w-full overflow-hidden bg-muted cursor-pointer lightbox-trigger" onClick={() => openLightbox("https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/9fcc68d332b55bafb24f01c47b55eb03.jpg", "Annals of the Bhandarkar Oriental Research Institute — 2025")}>
                  <LazyImage src="https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/9fcc68d332b55bafb24f01c47b55eb03.jpg" alt="Annals of the Bhandarkar Oriental Research Institute — 2025" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="p-6 flex flex-col items-center text-center flex-grow card-content w-full">
                  <span className="text-sm font-medium text-muted-foreground mb-4">Published Research · 2025</span>
                  <button onClick={() => openLightbox("https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/9fcc68d332b55bafb24f01c47b55eb03.jpg", "Annals of the Bhandarkar Oriental Research Institute — 2025")} className="mt-auto btn-outline w-full">
                    View Publication →
                  </button>
                </div>
              </div>

              <div className="card !p-0 overflow-hidden hover-lift flex flex-col border border-border">
                <div className="relative h-64 md:h-80 w-full overflow-hidden bg-muted cursor-pointer lightbox-trigger" onClick={() => openLightbox("https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/fc0e80410cc4c62fa496beef9830e5ea.jpg", "International Journal of Applied Science — 2025")}>
                  <LazyImage src="https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/fc0e80410cc4c62fa496beef9830e5ea.jpg" alt="International Journal of Applied Science — 2025" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <div className="p-6 flex flex-col items-center text-center flex-grow card-content w-full">
                  <span className="text-sm font-medium text-muted-foreground mb-4">Published Research · 2025</span>
                  <button onClick={() => openLightbox("https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/fc0e80410cc4c62fa496beef9830e5ea.jpg", "International Journal of Applied Science — 2025")} className="mt-auto btn-outline w-full">
                    View Publication →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={achieveRef} className="section-light about-achievements">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="section-title heading-serif">🏆 Achievements & Recognition</h2>
              <p className="section-subtitle text-lg md:text-xl text-muted-foreground mx-auto">
                Honored for excellence and dedication in the field of homoeopathic medicine
              </p>
            </div>

            <div className={`grid md:grid-cols-2 gap-8 max-w-5xl mx-auto ${achVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <div className="card hover-lift border-t-4 border-t-accent relative mt-6 items-center">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-md">
                  <Mic className="w-6 h-6" />
                </div>
                <h3 className="card-title text-xl font-semibold text-center mt-6 mb-4 text-foreground heading-sans">Invited as Guest Speaker</h3>
                <div className="rounded-xl overflow-hidden mb-3 h-40 cursor-pointer group relative w-full lightbox-trigger" onClick={() => openLightbox("https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/a908fbfad83d8dfdf8fc76fef836bc32.jpg", "Invited as Guest Speaker — JBM Group 2025")}>
                  <LazyImage src="https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/a908fbfad83d8dfdf8fc76fef836bc32.jpg" alt="Invited as Guest Speaker — JBM Group 2025" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden mb-4 h-24 cursor-pointer group relative w-full lightbox-trigger" onClick={() => openLightbox("https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/3710721f3ec5570d6b0f3561f1827e3c.jpg", "Invited as Guest Speaker — JBM Group 2025")}>
                  <LazyImage src="https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/3710721f3ec5570d6b0f3561f1827e3c.jpg" alt="Invited as Guest Speaker — JBM Group 2025" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="card-description text-sm text-muted-foreground leading-relaxed text-center body-text">
                  <span className="doctor-name font-medium">Dr. Shubhangi Maharana</span> was honored as a Guest Speaker at the JBM Group Corporate Wellness Session, where she conducted a Holistic Wellness Session for 64+ corporate professionals, sharing insights on homoeopathy and preventive health.
                </p>
              </div>

              <div className="card hover-lift border-t-4 border-t-accent relative mt-6 items-center">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-md">
                  <Medal className="w-6 h-6" />
                </div>
                <h3 className="card-title text-xl font-semibold text-center mt-6 mb-4 text-foreground heading-sans">Homoeopathic Award of the Year 2022</h3>
                <div className="rounded-xl overflow-hidden mb-4 h-64 cursor-pointer group relative w-full lightbox-trigger" onClick={() => openLightbox("https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/78455e45874dcba53d5303b91764e6f7.jpg", "Homoeopathic Award of the Year 2022")}>
                  <LazyImage src="https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/78455e45874dcba53d5303b91764e6f7.jpg" alt="Homoeopathic Award of the Year 2022" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                </div>
                <p className="card-description text-sm text-muted-foreground leading-relaxed text-center body-text">
                  <span className="doctor-name font-medium">Dr. Shubhangi Maharana</span> was awarded the prestigious Homoeopathic Award of the Year 2022 at the EL Homoeo Recognition ceremony, recognizing her outstanding contribution and excellence in the field of homoeopathic medicine.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      
      <LightboxModal isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} imageSrc={lightboxImage} altText={lightboxAlt} />
    </>
  );
};
export default AboutPage;