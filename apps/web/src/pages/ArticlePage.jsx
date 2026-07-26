import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO.jsx';
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import LazyImage from '@/components/LazyImage.jsx';
import { blogArticles } from '@/data/blogArticles.js';
import { fetchBlogBySlug } from '@/lib/blogs.js';

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const staticArticle = blogArticles.find(a => a.id === id);
  const [dbArticle, setDbArticle] = useState(null);
  const [checkedDb, setCheckedDb] = useState(false);

  const article = staticArticle || dbArticle;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (staticArticle) return;
    setCheckedDb(false);
    fetchBlogBySlug(id).then((blog) => {
      setDbArticle(blog);
      setCheckedDb(true);
    });
  }, [id, staticArticle]);

  if (!article) {
    if (!checkedDb) return null;
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
      <SEO
        title={`${article.title} | Maharana Wellness Clinic Blog`}
        description={article.excerpt}
        image={article.image}
        type="article"
        path={`/article/${id}`}
      />

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
              src={article.image}
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
            <div className="flex-grow article-content space-y-8">
              {article.sections ? (
                <>
                  <p className="text-lg text-foreground/90 leading-relaxed">{article.introduction}</p>

                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-3 heading-serif">What Is It?</h2>
                    <p className="text-muted-foreground leading-relaxed">{article.sections.whatIs}</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-3 heading-serif">Common Signs to Watch For</h2>
                    <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                      {article.sections.symptoms.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-3 heading-serif">The Homoeopathic Approach</h2>
                    <p className="text-muted-foreground leading-relaxed">{article.sections.approach}</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-3 heading-serif">Commonly Used Remedies</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {article.sections.remedies.map((r, i) => (
                        <div key={i} className="rounded-xl border border-border bg-card p-4">
                          <div className="font-semibold text-foreground">{r.name}</div>
                          <div className="text-sm text-muted-foreground mt-1">{r.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-3 heading-serif">When to See a Homoeopath</h2>
                    <p className="text-muted-foreground leading-relaxed">{article.sections.whenToSee}</p>
                  </div>
                </>
              ) : (
                article.content.split(/\n+/).filter(Boolean).map((para, i) => (
                  <p key={i} className="text-lg text-foreground/90 leading-relaxed">{para}</p>
                ))
              )}
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-16 p-6 md:p-8 bg-muted rounded-2xl border border-border flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-background shadow-sm bg-white flex items-center justify-center">
              <LazyImage 
                src="https://gvmdrttrwesitnqgaedl.supabase.co/storage/v1/object/public/media/clinic/shubhangi-potrait.jpeg" 
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