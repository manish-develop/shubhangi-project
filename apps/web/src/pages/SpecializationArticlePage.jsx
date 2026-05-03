import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin, CheckCircle2, Activity } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import LazyImage from '@/components/LazyImage.jsx';
import { specializationDatabase } from '@/data/specializationDatabase.js';

const SpecializationArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const specialization = specializationDatabase.find(s => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!specialization) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Specialization Not Found</h1>
            <p className="text-muted-foreground mb-8">The specialization you are looking for does not exist or has been removed.</p>
            <button onClick={() => navigate('/')} className="btn-primary">
              Back to Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <Helmet>
        <title>{`${specialization?.title || 'Specialization'} | Maharana's Clinic`}</title>
        <meta name="description" content={specialization?.introduction || 'Specialization details'} />
      </Helmet>

      <Header />

      <main className="pt-24 md:pt-32 pb-16 md:pb-24 bg-background min-h-screen">
        <article className="container-custom max-w-4xl">
          <button 
            onClick={() => navigate(-1)} 
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="mb-8">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {specialization?.category || 'Specialization'}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight heading-serif">
              {specialization?.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground border-b border-border pb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="doctor-name">{specialization?.author || 'Dr. Shubhangi Maharana'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>5 min read</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Social Share Sidebar */}
            <div className="md:w-16 flex-shrink-0">
              <div className="sticky top-32 flex flex-row md:flex-col gap-4">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider md:mb-2 hidden md:block">Share</span>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#1877F2] hover:text-white transition-colors" aria-label="Share on Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${specialization?.title}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#1DA1F2] hover:text-white transition-colors" aria-label="Share on Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${specialization?.title}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#0A66C2] hover:text-white transition-colors" aria-label="Share on LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Article Content */}
            <div className="flex-grow">
              <div className="article-content">
                {specialization?.introduction && (
                  <p className="lead text-xl text-muted-foreground mb-8">
                    {specialization.introduction.replace(/Homeopathy/gi, 'Homoeopathy').replace(/homeopathy/gi, 'homoeopathy')}
                  </p>
                )}

                {specialization?.whatIs && (
                  <>
                    <h2>Understanding the Condition</h2>
                    <p>{specialization.whatIs.replace(/Homeopathy/gi, 'Homoeopathy').replace(/homeopathy/gi, 'homoeopathy')}</p>
                  </>
                )}

                {specialization?.approach && (
                  <>
                    <h2>The Homoeopathic Approach</h2>
                    <p>{specialization.approach.replace(/Homeopathy/gi, 'Homoeopathy').replace(/homeopathy/gi, 'homoeopathy')}</p>
                  </>
                )}

                {specialization?.symptoms && specialization.symptoms.length > 0 && (
                  <div className="bg-muted p-6 md:p-8 rounded-2xl my-8 border border-border">
                    <h3 className="text-xl font-bold text-foreground mb-4 mt-0 flex items-center gap-2">
                      <Activity className="w-6 h-6 text-primary" />
                      Common Symptoms & Signs
                    </h3>
                    <ul className="space-y-3 m-0 p-0 list-none">
                      {specialization.symptoms.map((symptom, index) => (
                        <li key={index} className="flex items-start gap-3 text-muted-foreground">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {specialization?.remedies && specialization.remedies.length > 0 && (
                  <>
                    <h2>Key Focus Areas & Treatment</h2>
                    <p>While treatment is always highly individualized to match your specific constitution, our approach generally focuses on:</p>
                    <div className="grid sm:grid-cols-2 gap-4 my-6">
                      {specialization.remedies.map((remedy, index) => (
                        <div key={index} className="bg-card p-5 rounded-xl border border-border shadow-sm flex flex-col h-full">
                          <span className="font-semibold text-primary block mb-2 text-lg">{remedy?.name || 'Remedy'}</span>
                          <span className="text-sm text-muted-foreground leading-relaxed flex-grow">{remedy?.description || ''}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm italic text-muted-foreground mt-4">
                      *Note: Homoeopathic remedies are prescribed based on individual constitutional profiles. A professional consultation is required to determine the correct remedy, potency, and dosage for your specific case.
                    </p>
                  </>
                )}

                {specialization?.whenToSee && (
                  <>
                    <h2>When to See Us</h2>
                    <p>{specialization.whenToSee.replace(/Homeopathy/gi, 'Homoeopathy').replace(/homeopathy/gi, 'homoeopathy')}</p>
                  </>
                )}
              </div>
              
              {/* CTA Section */}
              <div className="info-box mt-12 p-8 bg-primary/5 rounded-2xl border border-primary/20 text-center">
                <h3 className="card-title text-2xl font-bold text-primary mb-4 heading-serif text-center w-full">Need Expert Care?</h3>
                <p className="card-description text-muted-foreground mb-6 max-w-lg mx-auto text-center w-full">
                  Book a consultation with <span className="doctor-name font-medium">Dr. Shubhangi Maharana</span> for a personalized treatment plan tailored to your specific needs.
                </p>
                <Link to="/contact" className="btn-primary">
                  {specialization?.ctaText || 'Book a Consultation Today'}
                </Link>
              </div>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-16p-6 md:p-8 bg-muted rounded-2xl border border-border flex flex-col sm:flex-row gap-6 items-center sm:items-start info-box">
            <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-background shadow-sm bg-white flex items-center justify-center">
              <LazyImage 
                src="https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/eb0cd3d7f6f74bf598708e9dd019dd35.jpg" 
                alt="Dr. Shubhangi Maharana" 
                className="doctor-image"
              />
            </div>
            <div className="text-center sm:text-left card-content">
              <h3 className="text-xl font-bold text-foreground mb-2"><span className="doctor-name">Dr. Shubhangi Maharana</span></h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
                BHMS, MD (Hom.), DNHE, MPMU, FMC (Germany). With over 8+ years of experience, she specializes in chronic diseases, women's health, and facial aesthetics using holistic homoeopathic approaches.
              </p>
              <Link to="/about" className="text-primary font-medium hover:underline text-sm">
                Read full bio →
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
};

export default SpecializationArticlePage;