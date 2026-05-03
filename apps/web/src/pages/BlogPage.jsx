import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import BlogCard from '@/components/BlogCard.jsx';
import { useScrollAnimation } from '@/hooks/useScrollAnimation.js';
import { blogArticles } from '@/data/blogArticles.js';

const BlogPage = () => {
  const [heroRef, heroVisible] = useScrollAnimation(0.2);
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', ...new Set(blogArticles.map(blog => blog.category))];

  const filteredBlogs = blogArticles.filter((blog) => {
    const matchesCategory = categoryFilter === 'All' || blog.category === categoryFilter;
    return matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Homoeopathy Health Blog | Articles by Dr. Shubhangi Maharana</title>
        <meta name="description" content="Read expert health articles and insights by Dr. Shubhangi Maharana on homoeopathic treatments, women's health, skin care, hair care, chronic diseases and holistic wellness." />
      </Helmet>

      <Header />

      <main>
        <section ref={heroRef} className="page-header">
          <div className="container-custom">
            <div className={`max-w-3xl mx-auto ${heroVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <h1 className="section-title mb-6">Health & Wellness Blog</h1>
              <p className="section-subtitle text-xl leading-relaxed mx-auto">
                Expert insights on homoeopathy, natural healing, and holistic wellness from <span className="doctor-name font-medium">Dr. Shubhangi Maharana</span>
              </p>
            </div>
          </div>
        </section>

        <section className="section-white min-h-[50vh]">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 w-full sm:w-auto ${
                    categoryFilter === category
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-background text-foreground hover:bg-primary/10 border border-border'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <BlogCard key={index} {...blog} />
              ))}
            </div>

            {filteredBlogs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">No articles found in this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default BlogPage;