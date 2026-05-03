import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
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
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Dr. Shubhangi Maharana" />
        <title>Disclaimer | Maharana's Homoeopathy Clinic</title>
        <meta name="description" content="Read the legal disclaimer, privacy policy, side effects information, scientific basis and criticism of homoeopathy at Maharana's Clinic by Dr. Shubhangi Maharana." />
      </Helmet>

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
              <p className="mb-4 text-muted-foreground body-text leading-relaxed">
                We do not claim to cure any disease which is considered 'incurable' on the basis of scientific facts by modern medicine. The website's content is not a substitute for direct, personal, professional medical care and diagnosis.
              </p>
              
              <p className="mb-4 text-muted-foreground body-text leading-relaxed">
                None of the medicines mentioned in the posts, including services mentioned at Drmaharanas.com should be used without clearance from your physician or health care provider.
              </p>
              
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-4 text-center w-full">Testimonials Disclaimer</h2>
              
              <p className="mb-4 text-muted-foreground body-text leading-relaxed">
                Results may vary, and testimonials are not claimed to represent typical results. The testimonials are real, and these patients have been treated with homoeopathy treatment from our clinic. However, these results are meant as a showcase of what the best homoeopathy can do with their disease conditions and should not be taken as average or typical results.
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