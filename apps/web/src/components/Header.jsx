import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton.jsx';
import MobileBookingBar from './MobileBookingBar.jsx';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDisclaimerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('mobile-menu-open');
    }
    
    // Z-index fix for mobile search bar section when sidebar opens
    const searchBarSection = document.querySelector('.search-bar-section');
    if (searchBarSection) {
      searchBarSection.style.zIndex = isMobileMenuOpen ? '1' : '';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('mobile-menu-open');
      if (searchBarSection) {
        searchBarSection.style.zIndex = '';
      }
    };
  }, [isMobileMenuOpen]);

  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/diseases', label: 'Diseases' },
    { path: '/blog', label: 'Blog' },
    { path: '/testimonials', label: 'Testimonials' },
    { path: '/contact', label: 'Contact' },
  ];

  const disclaimerLinks = [
    { path: '/disclaimer', label: 'Disclaimer' },
    { path: '/side-effects', label: 'Side Effects Of Homoeopathy' },
    { path: '/scientific-basis', label: 'Scientific Basis Of Homoeopathy' },
    { path: '/criticism', label: 'Criticism Of Homoeopathy' },
    { path: '/privacy-policy', label: 'Privacy Policy' },
  ];

  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !isScrolled && !isMobileMenuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 transition-all duration-300 z-[100] ${
          isTransparent ? 'bg-transparent' : 'bg-background shadow-md'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" onClick={closeMenu} className="flex items-center gap-3 group relative z-[110]">
              <img 
                src="https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/ba2251e0bacb65c428be0ab880a6e708.png" 
                alt="Maharana's Logo" 
                className="h-[52px] w-auto object-contain"
              />
              <div className="flex flex-col justify-center">
                <div className="text-xl md:text-2xl font-bold text-primary leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Maharana's
                </div>
                <div className="text-[9px] md:text-[11px] text-muted-foreground leading-tight font-medium tracking-wide">
                  The House of Homoeopathy & Facial Aesthetics
                </div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium transition-colors duration-300 py-2 ${
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-foreground hover:text-secondary'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ${
                      location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}
              
              {/* Disclaimer Dropdown */}
              <div className="relative group">
                <button 
                  className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-secondary transition-colors duration-300 py-2"
                  aria-haspopup="true"
                >
                  Legal <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full right-0 nav-dropdown-menu bg-card border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden z-50">
                  <div className="py-2">
                    {disclaimerLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="block nav-dropdown-item text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            <div className="flex items-center gap-4 relative z-[110]">
              <Link
                to="/appointment"
                className="hidden md:flex btn-primary"
              >
                Book Appointment
              </Link>

              <button
                type="button"
                onClick={toggleMenu}
                className="hamburger lg:hidden text-foreground hover:text-primary transition-colors duration-300 p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg cursor-pointer relative"
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <div className="relative w-6 h-6 pointer-events-none">
                  <Menu 
                    className={`absolute inset-0 w-6 h-6 transition-all duration-300 transform ${
                      isMobileMenuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                    }`} 
                  />
                  <X 
                    className={`absolute inset-0 w-6 h-6 transition-all duration-300 transform ${
                      isMobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                    }`} 
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu fixed inset-0 lg:hidden bg-background transition-transform duration-300 ease-in-out z-[90] ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container-custom h-full flex flex-col pt-24 pb-8 overflow-y-auto px-4">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`text-xl font-semibold transition-all duration-300 p-4 rounded-xl min-h-[56px] flex items-center ${
                  location.pathname === link.path
                    ? 'text-primary bg-primary/5'
                    : 'text-foreground hover:text-primary hover:bg-muted'
                }`}
                style={{
                  fontFamily: 'Playfair Display, serif',
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                }}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="mt-4 border-t border-border pt-4">
              <button 
                onClick={() => setIsDisclaimerOpen(!isDisclaimerOpen)}
                className="w-full flex items-center justify-between text-xl font-semibold p-4 rounded-xl text-foreground hover:bg-muted"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Legal <ChevronDown className={`w-5 h-5 transition-transform ${isDisclaimerOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDisclaimerOpen && (
                <div className="pl-4 pr-2 py-2 space-y-1">
                  {disclaimerLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={closeMenu}
                      className="block p-3 text-base text-muted-foreground hover:text-primary rounded-lg hover:bg-muted"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
          <div className="mt-auto pt-8 pb-safe">
            <Link
              to="/appointment"
              onClick={closeMenu}
              className="btn-primary w-full text-center min-h-[56px] text-lg flex items-center justify-center"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>

      {/* Global Elements */}
      <WhatsAppButton />
      <MobileBookingBar isSidebarOpen={isMobileMenuOpen} />
    </>
  );
};

export default Header;