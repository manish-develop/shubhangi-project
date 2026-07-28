import React from 'react';
import { Route, Routes, BrowserRouter as Router, Outlet, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import ScrollToTop from './components/ScrollToTop.jsx';
import { SocialLinks } from './components/ui/social-links.jsx';
import { AdminAuthProvider } from './admin/context/AdminAuthContext.jsx';
import { ProtectedRoute } from './admin/components/ProtectedRoute.jsx';
import { AdminLayout } from './admin/components/AdminLayout.jsx';
import AdminLoginPage from './admin/pages/LoginPage.jsx';
import AdminDashboardPage from './admin/pages/DashboardPage.jsx';
import AdminEventManagerPage from './admin/pages/EventManagerPage.jsx';
import AdminBlogsPage from './admin/pages/BlogsPage.jsx';
import AdminTestimonialsPage from './admin/pages/TestimonialsAdminPage.jsx';
import AdminReviewsPage from './admin/pages/ReviewsAdminPage.jsx';
import AdminDiseasesPage from './admin/pages/DiseasesAdminPage.jsx';
import AdminVideosPage from './admin/pages/VideosAdminPage.jsx';
import AdminPatientsPage from './admin/pages/PatientsPage.jsx';
import AdminPatientDetailPage from './admin/pages/PatientDetailPage.jsx';
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
import ScientificBasisPage from './pages/ScientificBasisPage.jsx';
import CriticismPage from './pages/CriticismPage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';

function App() {
  return (
    <HelmetProvider>
      <Router>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Maharana Wellness Clinic",
            "image": "https://images.unsplash.com/photo-1675270714610-11a5cadcc7b3",
            "description": "Homoeopathy clinic specializing in chronic diseases, women's health, and facial aesthetics. 8+ years experience, 1000+ patients treated.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "F-42, Block F, Kirti Nagar",
              "addressLocality": "New Delhi",
              "addressRegion": "Delhi",
              "postalCode": "110015",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 28.6519,
              "longitude": 77.1414
            },
            "telephone": "+919625030958",
            "email": "drshubhangi.econsultation@gmail.com",
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "11:00",
                "closes": "20:00"
              }
            ],
            "priceRange": "₹₹"
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
      <PublicSocialLinks />
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
        <Route path="/scientific-basis" element={<ScientificBasisPage />} />
        <Route path="/criticism" element={<CriticismPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminAuthProvider><Outlet /></AdminAuthProvider>}>
          <Route path="login" element={<AdminLoginPage />} />
          <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="events" element={<AdminEventManagerPage />} />
            <Route path="blogs" element={<AdminBlogsPage />} />
            <Route path="testimonials" element={<AdminTestimonialsPage />} />
            <Route path="reviews" element={<AdminReviewsPage />} />
            <Route path="diseases" element={<AdminDiseasesPage />} />
            <Route path="videos" element={<AdminVideosPage />} />
            <Route path="patients" element={<AdminPatientsPage />} />
            <Route path="patients/:id" element={<AdminPatientDetailPage />} />
          </Route>
        </Route>

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
    </HelmetProvider>
  );
}

function PublicSocialLinks() {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;
  return <SocialLinks />;
}

export default App;
