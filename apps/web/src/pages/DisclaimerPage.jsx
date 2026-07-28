import React, { useEffect } from 'react';
import SEO from '@/components/SEO.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const DisclaimerPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Disclaimer | Maharana Wellness Clinic"
        description="Read the legal disclaimer, privacy policy, scientific basis and criticism of homoeopathy at Maharana Wellness Clinic by Dr. Shubhangi Maharana."
        path="/disclaimer"
      />

      <Header />

      <main className="bg-background min-h-screen">
        <section className="page-header">
          <div className="container-custom">
            <h1 className="section-title heading-serif mb-4">Legal Disclaimer</h1>
          </div>
        </section>

        <section className="section-white">
          <div className="container-custom max-w-4xl mx-auto">
            <button 
              onClick={() => navigate(-1)} 
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="card p-8">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 text-center w-full">Medical Disclaimer</h2>

              <p className="mb-4 text-muted-foreground body-text leading-relaxed">
                At Maharana's, we are committed to helping you achieve lasting wellness through the gentle, holistic approach of homoeopathy. While we take pride in the results our patients have experienced, homoeopathy — like all forms of medicine — works differently for each individual, and outcomes depend on your unique constitution and condition.
              </p>

              <p className="mb-4 text-muted-foreground body-text leading-relaxed">
                The information shared on this website is meant to educate and inspire, and is not intended to replace a personal consultation with a qualified physician. We encourage you to consult Dr. Shubhangi Maharana or your healthcare provider before starting any treatment or medication mentioned on this site, so we can guide you with a plan best suited to you.
              </p>

              <h2 className="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-4 text-center w-full">Testimonials</h2>

              <p className="mb-4 text-muted-foreground body-text leading-relaxed">
                We're grateful to share the real stories and experiences of our patients who have trusted us with their health journey. These testimonials reflect genuine outcomes achieved through homoeopathic treatment at our clinic. As every individual responds differently to treatment, these stories are shared to showcase what's possible with dedicated homoeopathic care — and we'd love the opportunity to understand your condition and discuss what may be possible for you.
              </p>

              <p className="mt-8 font-medium text-foreground text-center w-full">
                — <span className="doctor-name">Dr. Shubhangi Maharana</span>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default DisclaimerPage;