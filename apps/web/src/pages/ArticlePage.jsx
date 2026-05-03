import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import LazyImage from '@/components/LazyImage.jsx';
import { blogArticles } from '@/data/blogArticles.js';

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const article = blogArticles.find(a => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you are looking for does not exist.</p>
            <button onClick={() => navigate('/blog')} className="btn-primary">
              Back to Blog
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
        <title>{`${article.title} | Maharana's Clinic Blog`}</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.imageUrl} />
        <meta property="og:type" content="article" />
      </Helmet>

      <Header />

      <main className="pt-24 md:pt-32 pb-16 md:pb-24 bg-background min-h-screen">
        <article className="container-custom max-w-4xl">
          <button 
            onClick={() => navigate('/blog')} 
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>

          <div className="mb-8">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {article.category}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight heading-serif">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground border-b border-border pb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="doctor-name">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden mb-10 card-shadow-lg">
            <LazyImage 
              src={article.imageUrl} 
              alt={article.title} 
              className="w-full h-[300px] md:h-[500px] object-cover"
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
                <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${article.title}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#1DA1F2] hover:text-white transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${article.title}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-[#0A66C2] hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Article Content */}
            <div className="flex-grow article-content" dangerouslySetInnerHTML={{ __html: article.content.replace(/Homeopathy/gi, 'Homoeopathy').replace(/homeopathy/gi, 'homoeopathy') }} />
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

export default ArticlePage;