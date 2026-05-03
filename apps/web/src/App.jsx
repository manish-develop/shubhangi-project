import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from 'sonner';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ServiceArticlePage from './pages/ServiceArticlePage.jsx';
import DiseasesPage from './pages/DiseasesPage.jsx';
import DiseaseArticlePage from './pages/DiseaseArticlePage.jsx';
import SpecializationArticlePage from './pages/SpecializationArticlePage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import TestimonialsPage from './pages/TestimonialsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AppointmentPage from './pages/AppointmentPage.jsx';
import DisclaimerPage from './pages/DisclaimerPage.jsx';
import SideEffectsPage from './pages/SideEffectsPage.jsx';
import ScientificBasisPage from './pages/ScientificBasisPage.jsx';
import CriticismPage from './pages/CriticismPage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';

function App() {
  return (
    <Router>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Maharana's - The House of Homoeopathy & Facial Aesthetics",
            "image": "https://images.unsplash.com/photo-1675270714610-11a5cadcc7b3",
            "description": "Homoeopathy clinic specializing in chronic diseases, women's health, and facial aesthetics. 8+ years experience, 500+ patients treated.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Wellness Street, Green Park",
              "addressLocality": "Mumbai",
              "addressRegion": "Maharashtra",
              "postalCode": "400001",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 19.0344,
              "longitude": 72.8456
            },
            "telephone": "+919876543210",
            "email": "drshubhangi@example.com",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "10:00",
                "closes": "19:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "10:00",
                "closes": "17:00"
              }
            ],
            "priceRange": "₹₹",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "500"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Physician",
            "name": "Dr. Shubhangi Maharana",
            "medicalSpecialty": "Homoeopathy",
            "description": "BHMS, MD Homoeopathy specialist with 8+ years experience in homoeopathy",
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "Mumbai Homoeopathic Medical College"
            },
            "memberOf": {
              "@type": "Organization",
              "name": "Central Council of Homoeopathy"
            }
          })}
        </script>
      </Helmet>
      <ScrollToTop />
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/service/:serviceId" element={<ServiceArticlePage />} />
        <Route path="/diseases" element={<DiseasesPage />} />
        <Route path="/disease/:diseaseId" element={<DiseaseArticlePage />} />
        <Route path="/specialization/:slug" element={<SpecializationArticlePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        
        {/* Legal Pages */}
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/side-effects" element={<SideEffectsPage />} />
        <Route path="/scientific-basis" element={<ScientificBasisPage />} />
        <Route path="/criticism" element={<CriticismPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
              <p className="text-xl text-muted-foreground mb-8">Page not found</p>
              <a href="/" className="btn-primary">Back to Home</a>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;