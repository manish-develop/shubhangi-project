import React, { useState, useMemo, useEffect } from 'react';
import SEO from '@/components/SEO.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import BlogCard from '@/components/BlogCard.jsx';
import { FluidDropdown } from '@/components/ui/fluid-dropdown.jsx';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination.jsx';
import { useScrollAnimation } from '@/hooks/useScrollAnimation.js';
import { fetchPublishedBlogs, getAllStaticArticles } from '@/lib/blogs.js';

const PER_PAGE = 9;

const BlogPage = () => {
  const [heroRef, heroVisible] = useScrollAnimation(0.2);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [dbBlogs, setDbBlogs] = useState([]);

  useEffect(() => {
    fetchPublishedBlogs().then(setDbBlogs);
  }, []);

  const sortedBlogs = useMemo(
    () => [...dbBlogs, ...getAllStaticArticles()].sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate)),
    [dbBlogs]
  );

  const categories = ['All', ...new Set(sortedBlogs.map((blog) => blog.category))];

  const filteredBlogs = useMemo(
    () => sortedBlogs.filter((blog) => categoryFilter === 'All' || blog.category === categoryFilter),
    [sortedBlogs, categoryFilter]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / PER_PAGE));

  const pagedBlogs = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return filteredBlogs.slice(start, start + PER_PAGE);
  }, [filteredBlogs, currentPage]);

  const goToPage = (page) => {
    const clamped = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(clamped);
    const listEl = document.getElementById('blog-list');
    if (listEl) {
      const y = listEl.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const pageNumbers = useMemo(() => {
    const pages = [];
    const windowSize = 2;
    for (let p = 1; p <= totalPages; p++) {
      if (p === 1 || p === totalPages || (p >= currentPage - windowSize && p <= currentPage + windowSize)) {
        pages.push(p);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  }, [totalPages, currentPage]);

  return (
    <>
      <SEO
        title="Homoeopathy Health Blog | Articles by Dr. Shubhangi Maharana"
        description="Read expert health articles and insights by Dr. Shubhangi Maharana on homoeopathic treatments, women's health, skin care, hair care, chronic diseases and holistic wellness."
        path="/blog"
      />

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

        <section id="blog-list" className="section-white min-h-[50vh] scroll-mt-24">
          <div className="container-custom">
            <div className="flex justify-center sm:justify-end mb-10">
              <FluidDropdown categories={categories} value={categoryFilter} onChange={setCategoryFilter} />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pagedBlogs.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
              ))}
            </div>

            {filteredBlogs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">No articles found in this category.</p>
              </div>
            )}

            {totalPages > 1 && (
              <Pagination className="mt-14">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#blog-list"
                      onClick={(e) => { e.preventDefault(); goToPage(currentPage - 1); }}
                      className={currentPage === 1 ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  {pageNumbers.map((p, i) =>
                    p === '...' ? (
                      <PaginationItem key={`ellipsis-${i}`}>
                        <span className="flex h-9 w-9 items-center justify-center text-muted-foreground">…</span>
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={p}>
                        <PaginationLink
                          href="#blog-list"
                          isActive={p === currentPage}
                          onClick={(e) => { e.preventDefault(); goToPage(p); }}
                          className="cursor-pointer"
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}
                  <PaginationItem>
                    <PaginationNext
                      href="#blog-list"
                      onClick={(e) => { e.preventDefault(); goToPage(currentPage + 1); }}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default BlogPage;
