import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const ScientificBasisPage = () => {
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
        <title>Scientific Basis | Maharana's Homoeopathy Clinic</title>
        <meta name="description" content="Read about the scientific basis of homoeopathy at Maharana's Clinic by Dr. Shubhangi Maharana." />
      </Helmet>

      <Header />

      <main className="bg-background min-h-screen">
        <section className="page-header">
          <div className="container-custom">
            <h1 className="section-title heading-serif mb-4">Scientific Basis Of Homoeopathy</h1>
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
                Homoeopathy has always struggled with the modern medicine faculty's claim that homoeopathic medicines are mere placebos and high dilutions are not effective. Here is research and scientific perspective on how homoeopathy works even in high dilutions. This research has been taken from the website of the Faculty of Homoeopathy, UK.
              </p>
              
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-4 w-full text-center">Homoeopathic Dilutions</h2>
              <p className="mb-4 text-muted-foreground body-text leading-relaxed">
                Although the basic idea of homoeopathy is similarity, its most controversial claim concerns the properties of ultra-molecular dilutions. Avogadro's Constant, the number of particles in a gram mole of a substance, is of the order of 10²³. In homoeopathic terminology, 10²³ corresponds to a 23X or approximately 12C dilution. Homoeopathic preparations in dilutions less than those contain material traces of the original substance; those in high (ultra-molecular) dilution are unlikely to do so.
              </p>
              
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-4 w-full text-center">The 'Memory of Water' Theory</h2>
              <p className="mb-4 text-muted-foreground body-text leading-relaxed">
                The most widespread hypothesis to explain the mechanism of action of homoeopathic dilutions refers to 'memory of water' effects: 'Under appropriate circumstances, water retains information about substances with which it has previously been in contact and may then transmit that information to pre-sensitised biosystems.' Standard physico-chemical techniques, thermoluminescence, Raman and UV–VIS spectroscopy and other methods have shown that water displays large changes in its physico-chemical properties as a function of its history.
              </p>
              
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-4 w-full text-center">Molecular Clusters and Other Theories</h2>
              <p className="mb-4 text-muted-foreground body-text leading-relaxed">
                An alternative mechanism is suggested by the results of research on molecular clustering in water solutions, which has shown that as a solution is made more and more dilute, very stable and larger 'clumps' of material develop in dilute solutions rather than in more concentrated solutions. This means that residual molecular clusters of the original substance might be present in homoeopathic dilutions.
              </p>
              
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mt-8 mb-4 w-full text-center">High-Potency Effects in Biological Experiments</h2>
              <p className="mb-4 text-muted-foreground body-text leading-relaxed">
                A recent meta-analysis evaluated 67 in-vitro biological experiments in 75 research publications and found that high-potency effects were reported in nearly 75% of all replicated studies; however, no positive result was stable enough to be reproduced by all investigators.
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

export default ScientificBasisPage;