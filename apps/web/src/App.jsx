import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router, Outlet, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { setJsonLd } from '@/lib/seo.js';
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
const AdminBlogFeedbackPage = lazy(() => import('./admin/pages/BlogFeedbackPage.jsx'));
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
const BlogsPage = lazy(() => import('./pages/BlogsPage.jsx'));
const BlogArticlePage = lazy(() => import('./pages/BlogArticlePage.jsx'));
const BlogCategoryPage = lazy(() => import('./pages/BlogCategoryPage.jsx'));
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

const CLINIC_ADDRESS = {
  "@type": "PostalAddress",
  "streetAddress": "F-42, Block F, Kirti Nagar",
  "addressLocality": "New Delhi",
  "addressRegion": "Delhi",
  "postalCode": "110015",
  "addressCountry": "IN"
};
const CLINIC_IMAGE = "https://gvmdrttrwesitnqgaedl.supabase.co/storage/v1/object/public/media/clinic/shubhangi-potrait.jpeg";
const CLINIC_TELEPHONE = "+919625030958";
const CLINIC_PRICE_RANGE = "₹₹";

function App() {
  useEffect(() => {
    setJsonLd('schema-local-business', {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Maharana Wellness Clinic",
      "image": CLINIC_IMAGE,
      "description": "Homoeopathy clinic specializing in chronic diseases, women's health, and facial aesthetics. 8+ years experience, 1000+ patients treated.",
      "address": CLINIC_ADDRESS,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.6519,
        "longitude": 77.1414
      },
      "telephone": CLINIC_TELEPHONE,
      "email": "drshubhangi.econsultation@gmail.com",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "11:00",
          "closes": "20:00"
        }
      ],
      "priceRange": CLINIC_PRICE_RANGE
    });

    setJsonLd('schema-physician', {
      "@context": "https://schema.org",
      "@type": "Physician",
      "name": "Dr. Shubhangi Maharana",
      "medicalSpecialty": "Homoeopathy",
      "description": "BHMS, MD Homoeopathy specialist with 8+ years experience in homoeopathy",
      "image": CLINIC_IMAGE,
      "telephone": CLINIC_TELEPHONE,
      "address": CLINIC_ADDRESS,
      "priceRange": CLINIC_PRICE_RANGE,
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Mumbai Homoeopathic Medical College"
      },
      "memberOf": {
        "@type": "Organization",
        "name": "Central Council of Homoeopathy"
      }
    });
  }, []);

  return (
      <Router>
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
        <Route path="/blog" element={<Navigate to="/blogs" replace />} />
        <Route path="/article/:id" element={<Navigate to="/blogs" replace />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/category/:slug" element={<BlogCategoryPage taxonomy="category" />} />
        <Route path="/blogs/tag/:slug" element={<BlogCategoryPage taxonomy="tag" />} />
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
            <Route path="blog-feedback" element={<AdminBlogFeedbackPage />} />
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
