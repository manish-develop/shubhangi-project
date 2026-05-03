import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Search, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { diseaseDatabase } from '@/data/diseaseDatabase.js';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const DiseasesPage = () => {
  const [diseaseSearch, setDiseaseSearch] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [activeLetter, setActiveLetter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Group diseases by first letter
  const groupedDiseases = useMemo(() => {
    const groups = {};
    alphabet.forEach(letter => {
      groups[letter] = [];
    });
    
    diseaseDatabase.forEach(disease => {
      const firstLetter = disease.name.charAt(0).toUpperCase();
      if (groups[firstLetter]) {
        groups[firstLetter].push(disease);
      }
    });
    
    // Sort diseases within each group
    Object.keys(groups).forEach(letter => {
      groups[letter].sort((a, b) => a.name.localeCompare(b.name));
    });
    
    return groups;
  }, []);

  // Filter for search dropdown
  const searchResults = useMemo(() => {
    if (!diseaseSearch.trim()) return [];
    const searchLower = diseaseSearch.toLowerCase();
    return diseaseDatabase.filter(disease => 
      disease.name.toLowerCase().includes(searchLower) || 
      disease.category.toLowerCase().includes(searchLower)
    ).slice(0, 10); // Limit dropdown results
  }, [diseaseSearch]);

  const scrollToLetter = (letter) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      const yOffset = -140; // Adjust for sticky header and alphabet bar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveLetter(letter);
    }
  };

  // Update active letter on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = alphabet.map(letter => document.getElementById(`letter-${letter}`)).filter(Boolean);
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const rect = section.getBoundingClientRect();
        if (rect.top <= 160) { // 160px offset
          setActiveLetter(section.id.replace('letter-', ''));
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const highlightMatch = (text, query) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <span key={index} className="bg-primary/20 text-primary font-semibold px-1 rounded">{part}</span> : 
        part
    );
  };

  return (
    <>
      <Helmet>
        <title>Diseases Treated with Homoeopathy A-Z | Maharana's Clinic</title>
        <meta name="description" content="Browse our complete A-Z list of 300+ diseases and conditions treated with homoeopathy by Dr. Shubhangi Maharana. Search your condition and learn about homoeopathic treatment options." />
      </Helmet>

      <Header />

      <main className="bg-background min-h-screen">
        
        <section className="page-header">
          <div className="container-custom">
            <h1 className="section-title heading-serif mb-4">Diseases</h1>
            <p className="section-subtitle mb-8 mx-auto">
              Comprehensive homoeopathic treatment by <span className="doctor-name font-medium">Dr. Shubhangi Maharana</span>
            </p>
          </div>
        </section>

        <section className="section-white">
          <div className="container-custom">
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mb-10 relative z-50">
              <div className={`relative transition-all duration-300 ${isFocused ? 'scale-[1.02] shadow-lg' : 'shadow-sm'}`}>
                <Search className={`absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 transition-colors ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} />
                <input
                  type="text"
                  value={diseaseSearch}
                  onChange={(e) => setDiseaseSearch(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                  placeholder="🔍 Search any condition..."
                  className="w-full pl-14 pr-6 py-4 rounded-2xl border-2 border-border bg-card text-lg text-foreground focus:outline-none focus:border-primary transition-all duration-300"
                />
                
                {isFocused && diseaseSearch.trim() && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden max-h-80 overflow-y-auto">
                    {searchResults.length > 0 ? (
                      searchResults.map(disease => (
                        <button
                          key={`suggest-${disease.id}`}
                          onClick={() => navigate(`/disease/${disease.id}`)}
                          className="w-full text-left px-6 py-4 hover:bg-muted border-b border-border last:border-0 flex items-center justify-between group transition-colors"
                        >
                          <div>
                            <div className="font-medium text-lg text-foreground">{highlightMatch(disease.name, diseaseSearch)}</div>
                            <div className="text-sm text-muted-foreground">{disease.category}</div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </button>
                      ))
                    ) : (
                      <div className="px-6 py-8 text-center text-muted-foreground">
                        No conditions found matching "{diseaseSearch}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Alphabet Navigation */}
        <div className="sticky top-[64px] md:top-[80px] z-40 bg-background/90 backdrop-blur-md border-y border-border py-3 shadow-sm">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-1 md:gap-2">
              {alphabet.map(letter => {
                const hasDiseases = groupedDiseases[letter].length > 0;
                return (
                  <button
                    key={letter}
                    onClick={() => hasDiseases && scrollToLetter(letter)}
                    disabled={!hasDiseases}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-sm md:text-base font-semibold transition-all duration-200 ${
                      !hasDiseases 
                        ? 'text-muted-foreground/40 cursor-not-allowed' 
                        : activeLetter === letter
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'text-foreground hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* A-Z Disease Sections */}
        <section className="section-light min-h-[50vh]">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto space-y-12 md:space-y-16">
              {alphabet.map(letter => {
                const diseases = groupedDiseases[letter];
                if (diseases.length === 0) return null;

                return (
                  <div key={letter} id={`letter-${letter}`} className="scroll-mt-40 section">
                    <div className="flex items-center gap-4 mb-6">
                      <h2 className="text-4xl md:text-5xl font-bold text-primary heading-serif m-0">{letter}</h2>
                      <div className="h-px bg-border flex-grow"></div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 md:gap-4">
                      {diseases.map(disease => (
                        <Link
                          key={disease.id}
                          to={`/disease/${disease.id}`}
                          className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 bg-card text-primary border border-primary hover:bg-primary hover:text-primary-foreground shadow-sm hover:shadow-md heading-sans w-full sm:w-auto"
                        >
                          {disease.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default DiseasesPage;