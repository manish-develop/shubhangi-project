import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const PrivacyPolicyPage = () => {
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
        <title>Privacy Policy | Maharana's Homoeopathy Clinic</title>
        <meta name="description" content="Read the privacy policy of Maharana's Clinic by Dr. Shubhangi Maharana." />
      </Helmet>

      <Header />

      <main className="bg-background min-h-screen">
        <section className="page-header">
          <div className="container-custom">
            <h1 className="section-title heading-serif mb-4">Privacy Policy</h1>
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
                We really value your decision for considering us. We at Maharana's assure you that all your personal information (name, e-mail, address) remains confidential with us.
              </p>
              
              <p className="mb-4 text-muted-foreground body-text leading-relaxed">
                Your personal information, treatment details and reports are only available with your attending physician and will also be completely secure in our patient database system, once you have started with the treatment.
              </p>
              
              <p className="mb-4 text-muted-foreground body-text leading-relaxed">
                Any information shared by you through mail, e-mail or phone will never be disclosed to any other patient, person or company without your consent.
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

export default PrivacyPolicyPage;