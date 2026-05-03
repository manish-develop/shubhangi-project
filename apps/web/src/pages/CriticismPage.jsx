import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const CriticismPage = () => {
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
        <title>Criticism | Maharana's Homoeopathy Clinic</title>
        <meta name="description" content="Read about the criticism of homoeopathy at Maharana's Clinic." />
      </Helmet>

      <Header />

      <main className="bg-background min-h-screen">
        <section className="page-header">
          <div className="container-custom">
            <h1 className="section-title heading-serif mb-4">Criticism Of Homoeopathy</h1>
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
              <p className="italic text-sm mb-6 text-center w-full text-muted-foreground">The following text is taken from the NCCAM website.</p>
              
              <p className="mb-4 text-muted-foreground body-text leading-relaxed">
                Homoeopathy is a controversial topic in complementary medicine research. A number of the key concepts of homoeopathy are not consistent with fundamental concepts of chemistry and physics. For example, it is not possible to explain in scientific terms how a remedy containing little or no active ingredient can have any effect.
              </p>
              
              <p className="mb-4 text-muted-foreground body-text leading-relaxed">
                This, in turn, creates major challenges to rigorous clinical investigation of homoeopathic remedies. For example, one cannot confirm that an extremely dilute remedy contains what is listed on the label, or develop objective measures that show effects of extremely dilute remedies in the human body.
              </p>
              
              <p className="mb-4 text-muted-foreground body-text leading-relaxed">
                Another research challenge is that homoeopathic treatments are highly individualized, and there is no uniform prescribing standard for homoeopaths. There are hundreds of different homoeopathic remedies, which can be prescribed in a variety of different dilutions to treat thousands of symptoms.
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

export default CriticismPage;