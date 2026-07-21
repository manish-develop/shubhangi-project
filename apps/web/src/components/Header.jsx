import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight, Home as HomeIcon, User, Stethoscope, Activity, FileText, Star, Phone as PhoneIcon } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton.jsx';
import MobileBookingBar from './MobileBookingBar.jsx';
import InteractiveHoverButton from './InteractiveHoverButton.jsx';

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
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/about', label: 'About', icon: User },
    { path: '/services', label: 'Services', icon: Stethoscope },
    { path: '/diseases', label: 'Diseases', icon: Activity },
    { path: '/blog', label: 'Blog', icon: FileText },
    { path: '/testimonials', label: 'Testimonials', icon: Star },
    { path: '/contact', label: 'Contact', icon: PhoneIcon },
  ];

  const dragX = useMotionValue(0);
  const dragOpacity = useTransform(dragX, [-260, 0], [0, 1]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -80) {
      closeMenu();
    }
    dragX.set(0);
  };

  const menuVariants = {
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 260, damping: 30, mass: 0.8 } },
    open: { x: 0, transition: { type: 'spring', stiffness: 260, damping: 30, mass: 0.8 } },
  };

  const itemVariants = {
    closed: { x: -30, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: 0.08 + i * 0.06, type: 'spring', stiffness: 260, damping: 26 },
    }),
  };

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
                src="https://gvmdrttrwesitnqgaedl.supabase.co/storage/v1/object/public/media/clinic/maharana-logo-white.jpg"
                alt="Maharana Wellness Clinic Logo"
                className="h-[52px] w-auto object-contain"
              />
              <div className="flex flex-col justify-center">
                <div className="text-xl md:text-2xl font-bold text-primary leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Maharana
                </div>
                <div className="text-[9px] md:text-[11px] text-muted-foreground leading-tight font-medium tracking-wide">
                  Wellness Clinic
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
              <InteractiveHoverButton to="/appointment" className="hidden md:inline-flex">
                Book Appointment
              </InteractiveHoverButton>

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

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeMenu}
            className="fixed inset-0 bg-black/50 z-[85] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Drawer */}
      <motion.nav
        variants={menuVariants}
        initial="closed"
        animate={isMobileMenuOpen ? 'open' : 'closed'}
        drag="x"
        dragConstraints={{ left: -320, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ x: dragX, backgroundColor: 'hsl(var(--footer-bg))' }}
        className="fixed top-0 left-0 h-full w-80 max-w-[85vw] z-[90] shadow-2xl lg:hidden flex flex-col pb-safe"
      >
        <button
          onClick={closeMenu}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 hover:rotate-90 transition-all duration-300"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        <motion.div
          style={{ opacity: dragOpacity }}
          className="absolute inset-y-0 right-3 flex items-center pointer-events-none"
        >
          <ChevronDown className="w-6 h-6 text-white/30 -rotate-90" />
        </motion.div>

        <div className="flex-1 overflow-y-auto pt-20 pb-6 px-5">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>Navigation</h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isMobileMenuOpen ? 64 : 0 }}
              transition={{ delay: 0.25, duration: 0.5, ease: 'easeOut' }}
              className="h-1 mt-2 rounded bg-white"
            />
          </div>

          <ul className="space-y-1.5">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              const active = location.pathname === link.path;
              return (
                <motion.li key={link.path} custom={index} variants={itemVariants} initial="closed" animate={isMobileMenuOpen ? 'open' : 'closed'}>
                  <Link
                    to={link.path}
                    onClick={closeMenu}
                    className={`group flex items-center gap-3 p-3 rounded-lg transition-colors ${active ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 group-hover:bg-white group-hover:text-primary transition-all duration-300 shrink-0">
                      <Icon className="w-4.5 h-4.5" />
                    </span>
                    <span className="text-base font-medium">{link.label}</span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>

          <div className="mt-6 pt-4 border-t border-white/10">
            <button
              onClick={() => setIsDisclaimerOpen(!isDisclaimerOpen)}
              className="w-full flex items-center justify-between p-3 text-sm font-medium text-white/70 hover:text-white"
            >
              Legal & Disclaimers
              <ChevronDown className={`w-4 h-4 transition-transform ${isDisclaimerOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDisclaimerOpen && (
              <div className="space-y-0.5 mt-1">
                {disclaimerLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeMenu}
                    className="block px-3 py-2 text-sm text-white/60 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="px-5 pb-6 pt-3">
          <Link
            to="/appointment"
            onClick={closeMenu}
            className="w-full text-center min-h-[52px] text-base font-semibold flex items-center justify-center gap-2 rounded-full bg-white text-primary hover:bg-white/90 transition-colors"
          >
            Book Appointment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.nav>

      {/* Global Elements */}
      <WhatsAppButton />
      <MobileBookingBar isSidebarOpen={isMobileMenuOpen} />
    </>
  );
};

export default Header;