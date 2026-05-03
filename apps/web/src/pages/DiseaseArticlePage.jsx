import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import LazyImage from '@/components/LazyImage.jsx';
import { diseaseDatabase } from '@/data/diseaseDatabase.js';

const DiseaseArticlePage = () => {
  const { diseaseId } = useParams();
  const navigate = useNavigate();
  
  const disease = diseaseDatabase.find(d => d.id === diseaseId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [diseaseId]);

  if (!disease) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Condition Not Found</h1>
            <p className="text-muted-foreground mb-8">The condition you are looking for does not exist in our database.</p>
            <button onClick={() => navigate('/diseases')} className="btn-primary">
              Browse All Conditions
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Generate generic content based on disease name and category
  const generateContent = () => {
    return `
      <p class="lead text-xl text-muted-foreground mb-8">
        Homoeopathy offers a gentle, effective, and holistic approach to treating ${disease.name}. Unlike conventional treatments that often focus merely on suppressing symptoms, homoeopathic remedies aim to address the root cause of the condition, stimulating the body's natural healing mechanisms.
      </p>

      <h2>Understanding ${disease.name}</h2>
      <p>
        ${disease.name} is a condition that falls under the category of ${disease.category}. It can significantly impact a person's quality of life, causing various physical and sometimes emotional symptoms. The manifestation of this condition can vary greatly from person to person, which is why a personalized treatment approach is essential.
      </p>

      <h2>The Homoeopathic Approach to ${disease.name}</h2>
      <p>
        In homoeopathy, we do not just treat the disease name; we treat the individual experiencing the disease. When addressing ${disease.name}, a homoeopathic physician will consider:
      </p>
      <ul>
        <li>The specific nature and modalities of your symptoms (what makes them better or worse)</li>
        <li>Your overall physical constitution and medical history</li>
        <li>Your emotional state and stress levels</li>
        <li>Lifestyle factors, diet, and environmental influences</li>
      </ul>

      <h2>Why Choose Homoeopathy for ${disease.name}?</h2>
      <p>
        Many patients turn to homoeopathy for ${disease.name} because it offers several distinct advantages:
      </p>
      <ul>
        <li><strong>Safe and Natural:</strong> Homoeopathic remedies are highly diluted natural substances, making them safe, non-toxic, and free from harmful side effects.</li>
        <li><strong>Holistic Healing:</strong> It treats the whole person, often resulting in improvements in overall health and well-being, not just the primary complaint.</li>
        <li><strong>No Dependency:</strong> The goal is to cure the condition so that continuous medication is eventually no longer needed.</li>
        <li><strong>Safe for All Ages:</strong> Suitable for children, pregnant women, and the elderly.</li>
      </ul>

      <h2>Treatment Process at Maharana's Clinic</h2>
      <p>
        Under the expert care of <span class="doctor-name">Dr. Shubhangi Maharana</span>, your treatment for ${disease.name} will begin with a comprehensive consultation. This detailed case-taking allows for the selection of a constitutional remedy perfectly matched to your unique symptom profile.
      </p>
      <p>
        Follow-up appointments will track your progress, and the remedy or potency may be adjusted as your body responds and heals. Alongside the homoeopathic medication, Dr. Maharana may also provide guidance on diet, lifestyle modifications, and stress management to support your recovery.
      </p>
    `;
  };

  return (
    <>
      <Helmet>
        <title>{`Homoeopathic Treatment for ${disease.name} | Maharana's Clinic`}</title>
        <meta name="description" content={`Learn about the effective, natural homoeopathic treatment for ${disease.name} by Dr. Shubhangi Maharana. Safe, holistic care without side effects.`} />
      </Helmet>

      <Header />

      <main className="pt-24 md:pt-32 pb-16 md:pb-24 bg-background min-h-screen">
        <article className="container-custom max-w-4xl">
          <button 
            onClick={() => navigate('/diseases')} 
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Diseases A-Z
          </button>

          <div className="mb-8">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {disease.category}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight heading-serif">
              Homoeopathic Treatment for {disease.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground border-b border-border pb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="doctor-name">Dr. Shubhangi Maharana</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>3 min read</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden mb-10 card-shadow-lg bg-muted">
            <LazyImage 
              src={disease.image || `https://loremflickr.com/800/500/medical,health/all?lock=${disease.id.length}`} 
              alt={`${disease.name} treatment`} 
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Social Share Sidebar */}
            <div className="md:w-16 flex-shrink-0">
              <div className="sticky top-32 flex flex-row md:flex-col gap-4">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider md:mb-2 hidden md:block">Share</span>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#1877F2] hover:text-white transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=Homoeopathic Treatment for ${disease.name}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#1DA1F2] hover:text-white transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=Homoeopathic Treatment for ${disease.name}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#0A66C2] hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Article Content */}
            <div className="flex-grow">
              <div className="article-content" dangerouslySetInnerHTML={{ __html: generateContent() }} />
              
              {/* CTA Section */}
              <div className="info-box mt-12 p-8 bg-primary/5 rounded-2xl border border-primary/20 text-center">
                <h3 className="card-title text-2xl font-bold text-primary mb-4 heading-serif text-center w-full">Struggling with {disease.name}?</h3>
                <p className="card-description text-muted-foreground mb-6 max-w-lg mx-auto text-center w-full">
                  Don't let {disease.name} control your life. Book a consultation with <span className="doctor-name font-medium">Dr. Shubhangi Maharana</span> for a personalized, natural treatment plan.
                </p>
                <Link to="/contact" className="btn-primary">
                  Book a Consultation Today
                </Link>
              </div>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-16 p-6 md:p-8 bg-muted rounded-2xl border border-border flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-background shadow-sm bg-white flex items-center justify-center">
              <LazyImage 
                src="https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/eb0cd3d7f6f74bf598708e9dd019dd35.jpg" 
                alt="Dr. Shubhangi Maharana" 
                className="doctor-image"
              />
            </div>
            <div>
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

export default DiseaseArticlePage;