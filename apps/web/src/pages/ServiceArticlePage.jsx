import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import LazyImage from '@/components/LazyImage.jsx';

const ServiceArticlePage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  // Mock data for services - in a real app this would come from a database
  const serviceData = {
    'chronic-disease-management': {
      title: 'Chronic Disease Management',
      category: 'Medical Service',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000',
      content: `
        <p class="lead text-xl text-muted-foreground mb-8">
          Chronic diseases require a comprehensive, long-term approach that addresses the root cause rather than just suppressing symptoms. Homoeopathy offers a gentle yet powerful way to manage and often reverse chronic conditions.
        </p>
        <h2>Our Approach to Chronic Care</h2>
        <p>At Maharana's Clinic, we believe that chronic diseases are manifestations of a deeper internal imbalance. Our constitutional homoeopathic approach involves:</p>
        <ul>
          <li>Detailed case taking (often lasting 60-90 minutes)</li>
          <li>Understanding your physical, mental, and emotional makeup</li>
          <li>Analyzing past medical history and family genetics</li>
          <li>Selecting a highly individualized remedy</li>
        </ul>
        <h2>Conditions We Treat</h2>
        <p>We have successfully managed numerous chronic conditions including:</p>
        <ul>
          <li>Diabetes and Hypertension</li>
          <li>Autoimmune disorders (Rheumatoid Arthritis, Lupus)</li>
          <li>Chronic respiratory issues (Asthma, COPD)</li>
          <li>Gastrointestinal disorders (IBS, Crohn's disease)</li>
        </ul>
      `
    },
    'womens-health': {
      title: "Women's Health & Wellness",
      category: 'Specialized Care',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1000',
      content: `
        <p class="lead text-xl text-muted-foreground mb-8">
          Women's bodies go through complex hormonal changes throughout their lives. Homoeopathy provides safe, natural, and effective solutions for women's health issues without the side effects of synthetic hormones.
        </p>
        <h2>Holistic Care for Women</h2>
        <p>We offer specialized homoeopathic treatment for various stages of a woman's life, from puberty through menopause.</p>
        <h2>Key Areas of Treatment</h2>
        <ul>
          <li><strong>PCOS/PCOD:</strong> Natural regulation of menstrual cycles and management of associated symptoms like weight gain and acne.</li>
          <li><strong>Menstrual Disorders:</strong> Relief from painful periods (dysmenorrhea), irregular cycles, and PMS.</li>
          <li><strong>Menopause:</strong> Gentle management of hot flashes, mood swings, and bone health.</li>
          <li><strong>Fertility Issues:</strong> Holistic support for conception by addressing underlying hormonal imbalances.</li>
        </ul>
      `
    }
  };

  const service = serviceData[serviceId] || {
    title: 'Specialized Homoeopathic Care',
    category: 'Medical Service',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=1000',
    content: `
      <p class="lead text-xl text-muted-foreground mb-8">
        Experience the gentle healing power of homoeopathy tailored to your specific health needs.
      </p>
      <h2>Comprehensive Treatment</h2>
      <p>Our approach focuses on treating the individual as a whole, addressing the root cause of the illness rather than just the symptoms.</p>
      <ul>
        <li>Personalized constitutional remedies</li>
        <li>No side effects</li>
        <li>Safe for all age groups</li>
        <li>Holistic healing approach</li>
      </ul>
    `
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <Helmet>
        <title>{`${service.title} | Maharana's Clinic`}</title>
        <meta name="description" content={`Learn about our ${service.title} services at Maharana's Homoeopathy Clinic.`} />
      </Helmet>

      <Header />

      <main className="pt-24 md:pt-32 pb-16 md:pb-24 bg-background min-h-screen">
        <article className="container-custom max-w-4xl">
          <button 
            onClick={() => navigate('/services')} 
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </button>

          <div className="mb-8">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {service.category}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight heading-serif">
              {service.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground border-b border-border pb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="doctor-name">Dr. Shubhangi Maharana</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>4 min read</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden mb-10 card-shadow-lg">
            <LazyImage 
              src={service.image} 
              alt={service.title} 
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
                <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${service.title}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#1DA1F2] hover:text-white transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${service.title}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#0A66C2] hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Article Content */}
            <div className="flex-grow">
              <div className="article-content" dangerouslySetInnerHTML={{ __html: service.content }} />
              
              {/* CTA Section */}
              <div className="info-box mt-12 p-8 bg-primary/5 rounded-2xl border border-primary/20 text-center">
                <h3 className="card-title text-2xl font-bold text-primary mb-4 heading-serif text-center w-full">Ready to start your healing journey?</h3>
                <p className="card-description text-muted-foreground mb-6 max-w-lg mx-auto text-center w-full">
                  Book a consultation with <span className="doctor-name font-medium">Dr. Shubhangi Maharana</span> to discuss how our {service.title.toLowerCase()} services can help you.
                </p>
                <Link to="/contact" className="btn-primary">
                  Book a Consultation
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

export default ServiceArticlePage;