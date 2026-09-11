import React, { lazy, Suspense } from 'react';
import { Route, Routes, BrowserRouter as Router, Outlet, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import ScrollToTop from './components/ScrollToTop.jsx';
import { SocialLinks } from './components/ui/social-links.jsx';
import { FloatingAppointmentButton } from './components/FloatingAppointmentButton.jsx';
import { AdminAuthProvider } from './admin/context/AdminAuthContext.jsx';
import { ProtectedRoute } from './admin/components/ProtectedRoute.jsx';
import { AdminLayout } from './admin/components/AdminLayout.jsx';
// Home is the most common landing page — load it eagerly so the very first
// paint isn't waiting on an extra chunk round-trip. Everything else below
// (including the whole admin panel, which visitors never touch) is
// lazy-loaded, so it's not part of the public bundle at all.
import HomePage from './pages/HomePage.jsx';

const AdminLoginPage = lazy(() => import('./admin/pages/LoginPage.jsx'));
const AdminDashboardPage = lazy(() => import('./admin/pages/DashboardPage.jsx'));
const AdminEventManagerPage = lazy(() => import('./admin/pages/EventManagerPage.jsx'));
const AdminBlogsPage = lazy(() => import('./admin/pages/BlogsPage.jsx'));
const AdminBlogFeedbackPage = lazy(() => import('./admin/pages/BlogFeedbackPage.jsx'));
const AdminTestimonialsPage = lazy(() => import('./admin/pages/TestimonialsAdminPage.jsx'));
const AdminReviewsPage = lazy(() => import('./admin/pages/ReviewsAdminPage.jsx'));
const AdminDiseasesPage = lazy(() => import('./admin/pages/DiseasesAdminPage.jsx'));
const AdminVideosPage = lazy(() => import('./admin/pages/VideosAdminPage.jsx'));
const AdminPatientsPage = lazy(() => import('./admin/pages/PatientsPage.jsx'));
const AdminPatientDetailPage = lazy(() => import('./admin/pages/PatientDetailPage.jsx'));

const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const ServicesPage = lazy(() => import('./pages/ServicesPage.jsx'));
const ServiceArticlePage = lazy(() => import('./pages/ServiceArticlePage.jsx'));
const DiseasesPage = lazy(() => import('./pages/DiseasesPage.jsx'));
const DiseaseArticlePage = lazy(() => import('./pages/DiseaseArticlePage.jsx'));
const SpecializationArticlePage = lazy(() => import('./pages/SpecializationArticlePage.jsx'));
const BlogPage = lazy(() => import('./pages/BlogPage.jsx'));
const ArticlePage = lazy(() => import('./pages/ArticlePage.jsx'));
const BlogsPage = lazy(() => import('./pages/BlogsPage.jsx'));
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage.jsx'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const AppointmentPage = lazy(() => import('./pages/AppointmentPage.jsx'));
const DisclaimerPage = lazy(() => import('./pages/DisclaimerPage.jsx'));
const ScientificBasisPage = lazy(() => import('./pages/ScientificBasisPage.jsx'));
const CriticismPage = lazy(() => import('./pages/CriticismPage.jsx'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage.jsx'));

function RouteLoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

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
      <Suspense fallback={<RouteLoadingFallback />}>
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
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogArticlePage />} />
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
            <Route path="blog-feedback" element={<AdminBlogFeedbackPage />} />
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
      </Suspense>
      </Router>
    </HelmetProvider>
  );
}

function PublicSocialLinks() {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;
  return (
    <>
      <SocialLinks />
      <FloatingAppointmentButton />
    </>
  );
}

export default App;
