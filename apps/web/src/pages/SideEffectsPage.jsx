import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const SideEffectsPage = () => {
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
        <title>Side Effects | Maharana's Homoeopathy Clinic</title>
        <meta name="description" content="Read about side effects and risks of homoeopathy at Maharana's Clinic by Dr. Shubhangi Maharana." />
      </Helmet>

      <Header />

      <main className="bg-background min-h-screen">
        <section className="page-header">
          <div className="container-custom">
            <h1 className="section-title heading-serif mb-4">Side Effects and Risks</h1>
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
              <p className="italic text-sm mb-6 text-center w-full text-muted-foreground">This is an unedited text from the NCCAM website.</p>
              
              <p className="mb-4 text-muted-foreground body-text leading-relaxed">
                Certain homoeopathic products (called 'nosodes' or 'homoeopathic immunizations') have been promoted by some as substitutes for conventional immunizations, but data to support such claims is lacking. The National Center for Complementary and Alternative Medicine (NCCAM) supports the Centers for Disease Control and Prevention's recommendations for immunizations/vaccinations. To learn more about vaccines visit www.vaccines.gov.
              </p>
              
              <p className="mb-4 text-muted-foreground body-text leading-relaxed">
                While many homoeopathic remedies are highly diluted, some products sold or labeled as homoeopathic may not be highly diluted; they can contain substantial amounts of active ingredients. Like any drug or dietary supplement that contains chemical ingredients, these homoeopathic products may cause side effects or drug interactions. Negative health effects from homoeopathic products of this type have been reported.
              </p>
              
              <p className="mb-4 text-muted-foreground body-text leading-relaxed">
                A systematic review found that highly diluted homoeopathic remedies, taken under the supervision of trained professionals, are generally safe and unlikely to cause severe adverse reactions. However, like any drug or dietary supplement, these products could pose risks if they are improperly manufactured (for example, if they are contaminated with microorganisms or incorrectly diluted).
              </p>
              
              <p className="mb-4 text-muted-foreground body-text leading-relaxed">
                Liquid homoeopathic remedies may contain alcohol. The FDA allows higher levels of alcohol in these remedies than it allows in conventional drugs.
              </p>
              
              <p className="mb-4 text-muted-foreground body-text leading-relaxed">
                Homoeopaths expect some of their patients to experience 'homoeopathic aggravation' (a temporary worsening of existing symptoms after taking a homoeopathic prescription). Researchers have not found much evidence of this reaction in clinical studies; however, research on homoeopathic aggravations is scarce.
              </p>
              
              <p className="font-medium text-foreground mt-8 text-center w-full">
                Always discuss changes in your symptoms with your health care provider.
              </p>
              
              <p className="mt-4 font-medium text-foreground text-center w-full">
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

export default SideEffectsPage;