import React, { useState, useMemo, useEffect } from 'react';
import SEO from '@/components/SEO.jsx';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { ActionSearchBar } from '@/components/ui/action-search-bar.jsx';
import { GradientBarHeroSection } from '@/components/ui/gradient-bar-hero-section.jsx';
import { Search } from 'lucide-react';
import DiseaseCard from '@/components/DiseaseCard.jsx';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination.jsx';
import { diseaseDatabase } from '@/data/diseaseDatabase.js';
import { fetchPublishedDiseases } from '@/lib/diseases.js';

const PER_PAGE = 24;

const DiseasesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [diseases, setDiseases] = useState(diseaseDatabase);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchPublishedDiseases().then((data) => {
      if (data.length > 0) setDiseases(data);
    });
  }, []);

  const sortedDiseases = useMemo(
    () => [...diseases].sort((a, b) => a.name.localeCompare(b.name)),
    [diseases]
  );

  const totalPages = Math.max(1, Math.ceil(sortedDiseases.length / PER_PAGE));

  const pagedDiseases = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return sortedDiseases.slice(start, start + PER_PAGE);
  }, [sortedDiseases, currentPage]);

  const goToPage = (page) => {
    const clamped = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(clamped);
    const listEl = document.getElementById('disease-list');
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
        title="Diseases Treated with Homoeopathy A-Z | Maharana Wellness Clinic"
        description="Browse our complete A-Z list of 300+ diseases and conditions treated with homoeopathy by Dr. Shubhangi Maharana. Search your condition and learn about homoeopathic treatment options."
        path="/diseases"
      />

      <Header />

      <main className="bg-background min-h-screen">

        <GradientBarHeroSection
          eyebrow={(
            <>
              <Search className="w-3.5 h-3.5" />
              {sortedDiseases.length}+ Conditions Treated
            </>
          )}
          title="Diseases"
          subtitle={(
            <>
              Comprehensive homoeopathic treatment by <span className="doctor-name font-medium">Dr. Shubhangi Maharana</span>
            </>
          )}
        >
          <div className="max-w-2xl mx-auto relative z-10">
            <ActionSearchBar
              actions={diseases}
              placeholder="Search any condition..."
              inputClassName="text-lg"
              onSelect={(disease) => navigate(`/disease/${disease.id}`)}
            />
          </div>
        </GradientBarHeroSection>

        {/* All Conditions — paginated card grid */}
        <section id="disease-list" className="section-white scroll-mt-24">
          <div className="container-custom">
            <h2 className="section-title heading-serif">All Conditions</h2>
            <p className="section-subtitle text-lg md:text-xl text-muted-foreground body-text">
              {sortedDiseases.length} conditions treated — browse A-Z or use search above
            </p>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {pagedDiseases.map((disease) => (
                  <DiseaseCard key={disease.id} id={disease.id} name={disease.name} category={disease.category} image={disease.image} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination className="mt-10">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#disease-list"
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
                            href="#disease-list"
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
                        href="#disease-list"
                        onClick={(e) => { e.preventDefault(); goToPage(currentPage + 1); }}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default DiseasesPage;
