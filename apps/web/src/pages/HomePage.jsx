import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { Award, Users, Heart, Star, Phone, Mail, ChevronLeft, ChevronRight, Search, Sparkles, Shield, Baby, Activity, CheckCircle2, Package, Video } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import StatCounter from '@/components/StatCounter.jsx';
import BlogCard from '@/components/BlogCard.jsx';
import TestimonialCard from '@/components/TestimonialCard.jsx';
import LazyImage from '@/components/LazyImage.jsx';
import BeforeAfterSlideshow from '@/components/BeforeAfterSlideshow.jsx';
import { useScrollAnimation } from '@/hooks/useScrollAnimation.js';
import { validateEmail, validatePhone, validateRequired } from '@/utils/validation.js';
import { toast } from 'sonner';
import { blogArticles } from '@/data/blogArticles.js';
import { diseaseDatabase } from '@/data/diseaseDatabase.js';
import { specializationDatabase } from '@/data/specializationDatabase.js';
import { sendAppointmentEmail } from '@/utils/emailService.js';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const navigate = useNavigate();
  const [heroRef, heroVisible] = useScrollAnimation(0.2);
  const [conditionsRef, conditionsVisible] = useScrollAnimation(0.2);
  const [aboutRef, aboutVisible] = useScrollAnimation(0.2);
  const [specializationsRef, specializationsVisible] = useScrollAnimation(0.2);
  const [appointmentRef, appointmentVisible] = useScrollAnimation(0.2);
  const [blogRef, blogVisible] = useScrollAnimation(0.2);
  const [testimonialsRef, testimonialsVisible] = useScrollAnimation(0.2);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  handleResize();
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  // Updated state keys to perfectly match EmailJS template variables
  const [formData, setFormData] = useState({
    consultation_type: 'Online Consultation',
    patient_name: '',
    phone: '',
    email: '',
    city: '',
    age: '',
    health_concern: '',
    problem_duration: '',
    preferred_date: '',
    preferred_time: '',
    heard_from: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [diseaseSearch, setDiseaseSearch] = useState('');
  const [testimonialItemsPerView, setTestimonialItemsPerView] = useState(3);

  const updateTestimonialView = useCallback(() => {
    if (window.innerWidth >= 1024) {
      setTestimonialItemsPerView(3);
    } else if (window.innerWidth >= 768) {
      setTestimonialItemsPerView(2);
    } else {
      setTestimonialItemsPerView(1);
    }
  }, []);

  useEffect(() => {
    updateTestimonialView();
    window.addEventListener('resize', updateTestimonialView);
    return () => window.removeEventListener('resize', updateTestimonialView);
  }, [updateTestimonialView]);

  const testimonials = [
    { name: 'Priya Sharma', city: 'Delhi', rating: 5, testimonial: 'I had been struggling with PCOS for over 3 years. The irregular cycles and weight gain were taking a toll on me. Dr. Shubhangi\'s homoeopathic treatment brought my cycles back to normal within 4 months.', condition: 'PCOS' },
    { name: 'Neha Kapoor', city: 'Gurgaon', rating: 5, testimonial: 'My acne and dark spots were affecting my confidence. I tried many creams but nothing worked permanently. The holistic approach here cleared my skin from within. Highly recommended!', condition: 'Acne & Pigmentation' },
    { name: 'Rajesh Verma', city: 'Ludhiana', rating: 5, testimonial: 'I suffered from psoriasis for 7 years. The itching and scaling were unbearable during winters. After starting treatment at Maharana\'s, I have seen a 90% reduction in my patches.', condition: 'Psoriasis' },
    { name: 'Simran Kaur', city: 'Chandigarh', rating: 5, testimonial: 'I was losing hair rapidly after my pregnancy. The customized homoeopathic medicines stopped my hair fall completely in just 2 months and I can see new growth now.', condition: 'Hair Fall' },
    { name: 'Amit Joshi', city: 'Mumbai', rating: 5, testimonial: 'Living with vitiligo was emotionally difficult. Dr. Shubhangi was very patient and her treatment has successfully stopped the spread. Some patches have even started regaining color.', condition: 'Vitiligo' },
    { name: 'Kavita Mehra', city: 'Pune', rating: 5, testimonial: 'Dr. Shubhangi helped me with my hypothyroidism. My energy levels are back, my weight is stable, and my recent reports show perfectly normal TSH levels. Thank you doctor!', condition: 'Thyroid & Weight Management' },
  ];

  const maxTestimonialIndex = Math.max(0, testimonials.length - testimonialItemsPerView);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev >= maxTestimonialIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [maxTestimonialIndex]);

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();

    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!validateRequired(formData.patient_name) || !validateRequired(formData.city) || !validateRequired(formData.age)) {
        toast.error('Please fill in all required fields');
        return;
      }
      if (!validatePhone(formData.phone)) {
        toast.error('Please enter a valid 10-digit phone number');
        return;
      }
      if (formData.email && !validateEmail(formData.email)) {
        toast.error('Please enter a valid email address');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!validateRequired(formData.health_concern) || !validateRequired(formData.problem_duration)) {
        toast.error('Please provide health details');
        return;
      }
      setCurrentStep(4);
    } else if (currentStep === 4) {
      if (!validateRequired(formData.preferred_date) || !validateRequired(formData.preferred_time) || !validateRequired(formData.heard_from)) {
        toast.error('Please complete all preference selections');
        return;
      }

      setIsSubmitting(true);
      try {
        await sendAppointmentEmail(formData);
        
        setShowSuccess(true);
        toast.success('Appointment request sent successfully!');
      } catch (error) {
        toast.error('Failed to send appointment request. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleAgeChange = (e) => {
    let val = e.target.value;
    if (val === '') {
      setFormData({...formData, age: ''});
      return;
    }
    let num = parseInt(val, 10);
    if (!isNaN(num)) {
      if (num < 1) num = 1;
      if (num > 120) num = 120;
      setFormData({...formData, age: num.toString()});
    }
  };

  const filteredDiseases = diseaseDatabase.filter((disease) => 
    disease.name.toLowerCase().includes(diseaseSearch.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Maharana's — The House of Homoeopathy & Facial Aesthetics | Dr. Shubhangi Maharana</title>
        <meta name="description" content="Welcome to Maharana's — Expert homoeopathic treatment and facial aesthetics by Dr. Shubhangi Maharana (BHMS, MD Hom., DNHE, MPMU, FMC Germany). 8+ years experience. Online & in-clinic consultations available. Book your appointment today." />
      </Helmet>

      <Header />

      <main>
        {/* 1. Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-[100dvh] flex items-center pt-[80px]"
          style={{
          backgroundImage: isMobile
          ? 'linear-gradient(rgba(rgba(255,255,255,0.20), rgba(rgba(255,255,255,0.20)), url("https://i.pinimg.com/736x/51/f0/9a/51f09aa54ab809c11c73279f02889b79.jpg")'
          : 'linear-gradient(rgba(255,255,255,0.20), rgba(255,255,255,0.20)), url("https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/780897d1452054cf07dbbf10bd981152.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: isMobile ? 'top' : 'center',
          }}
        >
          <div className="absolute inset-0 backdrop-blur-sm bg-black/30"></div>
          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
              <div className={`order-2 lg:order-1 hero-content ${heroVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
                <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6 border border-primary/20 heading-sans backdrop-blur-sm">
                  ⚕️ The House of Homoeopathy & Facial Aesthetics
                </div>
                <h1 className="mb-4 md:mb-6 text-primary heading-serif">
                  Heal Naturally.<br className="hidden md:block" /> Live Fully.
                </h1>
                <p className="text-lg md:text-xl text-foreground font-medium mb-6 md:mb-8 leading-relaxed max-w-lg body-text">
                  Experience the gentle power of Homoeopathy with <span className="doctor-name font-semibold text-primary">Dr. Shubhangi Maharana</span>. Personalized treatment for chronic conditions, women's health, and holistic wellness.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8">
                  <Link to="/appointment" className="btn-primary w-full sm:w-auto">
                    Book Consultation
                  </Link>
                  <Link to="/about" className="btn-outline w-full sm:w-auto bg-white/50 backdrop-blur-sm">
                    Learn More
                  </Link>
                </div>
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 md:gap-6 text-xs md:text-sm text-foreground font-medium heading-sans">
                  <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <Award className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    <span>8+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <Users className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    <span>500+ Happy Patients</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 fill-yellow-500" />
                    <span>4.9 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Conditions Strip */}
        <section ref={conditionsRef} className="section-white relative search-bar-section">
          <div className="container-custom">
            <div className={`flex flex-col md:flex-row items-center gap-6 ${conditionsVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="w-full md:w-1/3 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={diseaseSearch}
                  onChange={(e) => setDiseaseSearch(e.target.value)}
                  placeholder="Search a condition..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 body-text"
                />
              </div>
              <div className="w-full md:w-2/3 flex flex-wrap gap-3 justify-center md:justify-start">
                {filteredDiseases.slice(0, 8).map((disease) => (
                  <button
                    key={disease.id}
                    onClick={() => navigate(`/disease/${disease.id}`)}
                    className="pill-tag text-sm font-medium px-4 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 border border-border"
                  >
                    {disease.name}
                  </button>
                ))}
                {filteredDiseases.length > 8 && (
                  <button onClick={() => navigate('/diseases')} className="pill-tag text-sm font-medium px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                    View All +
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="section-light">
          <BeforeAfterSlideshow />
        </section>

        <section className="stats-strip">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <StatCounter end={8} suffix="+" label="Years Experience" icon={Award} />
              <StatCounter end={500} suffix="+" label="Patients Treated" icon={Users} />
              <StatCounter end={100} suffix="+" label="Conditions Treated" icon={Heart} />
              <StatCounter end={4.9} label="Average Rating" icon={Star} suffix="★" />
            </div>
          </div>
        </section>

        <section ref={aboutRef} className="section-white">
          <div className="container-custom">
            <div className="about-preview-section flex flex-col lg:grid lg:grid-cols-2 gap-10 md:gap-12 items-center">
              <div className={`about-intro order-1 lg:order-2 ${aboutVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
                <div className="mb-4 md:mb-6 text-center lg:text-left">
                  <span className="text-lg md:text-xl font-medium text-muted-foreground block mb-2 heading-sans">About</span>
                  <h2 className="font-bold text-primary heading-serif doctor-name">Dr. Shubhangi Maharana</h2>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed body-text text-center lg:text-left">
                  With over 8+ years of dedicated practice in Homoeopathy, <span className="doctor-name font-medium">Dr. Shubhangi Maharana</span> has helped hundreds of patients achieve lasting health through gentle, natural treatment.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed body-text text-center lg:text-left">
                  Her approach combines deep understanding of homoeopathic principles with modern diagnostic methods, ensuring comprehensive care tailored to each individual's unique constitution.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 md:mb-8 text-left">
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold mb-1 text-sm md:text-base text-foreground heading-sans">BHMS Degree</div>
                      <div className="text-xs md:text-sm text-muted-foreground body-text">Bachelor of Homoeopathic Medicine</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold mb-1 text-sm md:text-base text-foreground heading-sans">MD Homoeopathy</div>
                      <div className="text-xs md:text-sm text-muted-foreground body-text">Post-graduate specialization</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold mb-1 text-sm md:text-base text-foreground heading-sans">Council Registered</div>
                      <div className="text-xs md:text-sm text-muted-foreground body-text">Licensed practitioner</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold mb-1 text-sm md:text-base text-foreground heading-sans">8+ Years</div>
                      <div className="text-xs md:text-sm text-muted-foreground body-text">Clinical experience</div>
                    </div>
                  </div>
                </div>
                
                <div className="hidden lg:block">
                  <Link to="/about" className="btn-primary w-full sm:w-auto">
                    Know More About Me
                  </Link>
                </div>
              </div>

              <div className={`about-image order-2 lg:order-1 ${aboutVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
                <div className="relative w-full flex justify-center">
                  <div className="absolute -inset-4 bg-primary/10 rounded-full blur-3xl" />
                  <div className="relative rounded-2xl overflow-hidden card-shadow-xl border border-border w-full flex justify-center bg-white p-4">
                    <LazyImage
                      src="https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/eb0cd3d7f6f74bf598708e9dd019dd35.jpg"
                      alt="Dr. Shubhangi Maharana - Homoeopathic Physician"
                      className="doctor-image max-h-[600px] object-contain rounded-xl w-full"
                    />
                  </div>
                  <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-card p-3 md:p-4 rounded-xl card-shadow-lg border border-border">
                    <div className="text-xs md:text-sm font-medium text-muted-foreground mb-1 heading-sans">Qualified</div>
                    <div className="text-base md:text-lg font-bold text-primary heading-sans">BHMS, MD</div>
                  </div>
                </div>
              </div>

              <div className="about-cta-btn order-3 lg:hidden w-full">
                <Link to="/about" className="btn-primary w-full">
                  Know More About Me
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section ref={specializationsRef} className="section-light">
          <div className="container-custom">
            <h2 className="section-title heading-serif">Areas of Specialization</h2>
            <p className="section-subtitle text-lg md:text-xl text-muted-foreground body-text">
              Expert care in conditions where homoeopathy and holistic aesthetics excel
            </p>

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${specializationsVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              {specializationDatabase.map((spec, index) => {
                const icons = [Heart, Sparkles, Activity, Shield, Baby];
                const Icon = icons[index % icons.length];
                
                return (
                  <div
                    key={spec.slug}
                    style={{ animationDelay: `${index * 100}ms` }}
                    className={`card hover-lift cursor-pointer ${specializationsVisible ? 'animate-slide-up' : 'opacity-0'}`}
                    onClick={() => navigate(`/specialization/${spec.slug}`)}
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    </div>
                    <h3 className="card-title text-xl font-semibold mb-3 text-foreground heading-sans">{spec.title}</h3>
                    <p className="card-description text-muted-foreground leading-relaxed mb-6 flex-grow body-text">
                      {spec.introduction.substring(0, 100)}...
                    </p>
                    <div className="mt-auto text-primary font-medium flex items-center justify-center w-full gap-2 group heading-sans">
                      Read More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section ref={testimonialsRef} className="section-medium">
          <div className="container-custom">
            <h2 className="section-title heading-serif">What Our Patients Say</h2>
            <p className="section-subtitle text-lg md:text-xl text-muted-foreground body-text">
              Real stories from real people who found healing through homoeopathy
            </p>

            <div className="relative max-w-6xl mx-auto px-0 md:px-12">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentTestimonial * (100 / testimonialItemsPerView)}%)` }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div 
                      key={index} 
                      className="flex-shrink-0 px-4 md:px-3"
                      style={{ width: `${100 / testimonialItemsPerView}%` }}
                    >
                      <TestimonialCard {...testimonial} />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? maxTestimonialIndex : prev - 1))}
                className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-card card-shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 z-10 border border-border"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
              </button>

              <button
                onClick={() => setCurrentTestimonial((prev) => (prev >= maxTestimonialIndex ? 0 : prev + 1))}
                className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-card card-shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 z-10 border border-border"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
              </button>

              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: maxTestimonialIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentTestimonial === index ? 'bg-primary w-8' : 'bg-primary/20 hover:bg-primary/50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section ref={blogRef} className="section-white">
          <div className="container-custom">
            <h2 className="section-title heading-serif">Latest from Our Blog</h2>
            <p className="section-subtitle text-lg md:text-xl text-muted-foreground body-text">
              Expert insights on health, wellness, and homoeopathy
            </p>

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ${blogVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              {blogArticles.slice(0, 3).map((blog, index) => (
                <div
                  key={index}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className={blogVisible ? 'animate-slide-up' : 'opacity-0'}
                >
                  <BlogCard {...blog} />
                </div>
              ))}
            </div>

            <div className="text-center mt-10 md:mt-12">
              <Link to="/blog" className="btn-primary w-full sm:w-auto">
                View All Articles
              </Link>
            </div>
          </div>
        </section>

        <section ref={appointmentRef} className="section-light">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-10 md:gap-12">
              <div className="lg:col-span-2">
                <h2 className="section-title heading-serif mb-6 md:mb-8">Book Your Appointment</h2>

                {!showSuccess ? (
                  <form onSubmit={handleAppointmentSubmit} className="card">
                    <div className="flex items-center gap-1 md:gap-2 mb-6 md:mb-8 w-full">
                      {[1, 2, 3, 4].map((step) => (
                        <React.Fragment key={step}>
                          <div
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold text-sm md:text-base transition-all duration-300 flex-shrink-0 heading-sans ${
                              step <= currentStep
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {step}
                          </div>
                          {step < 4 && (
                            <div
                              className={`flex-1 h-1 rounded transition-all duration-300 ${
                                step < currentStep ? 'bg-primary' : 'bg-muted'
                              }`}
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {currentStep === 1 && (
                      <div className="space-y-6 animate-fade-in w-full">
                        <h3 className="card-title text-xl font-semibold mb-4 text-foreground">Step 1: Consultation Type</h3>
                        <RadioGroup 
                          value={formData.consultation_type} 
                          onValueChange={(val) => setFormData({...formData, consultation_type: val})}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                          {['Online Consultation', 'First Consultation', 'Follow-up Visit', 'Emergency'].map((type) => (
                            <div key={type}>
                              <RadioGroupItem value={type} id={`type-${type.replace(/\s+/g, '-')}`} name="consultation_type" className="peer sr-only" />
                              <Label
                                htmlFor={`type-${type.replace(/\s+/g, '-')}`}
                                className="flex flex-col items-center justify-between rounded-xl border-2 border-border bg-background p-4 hover:bg-muted hover:text-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer text-center min-h-[60px]"
                              >
                                <span className="font-semibold text-base">{type}</span>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6 animate-fade-in w-full">
                        <h3 className="card-title text-xl font-semibold mb-4 text-foreground">Step 2: Personal Details</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="form-label" htmlFor="patient_name">Full Name*</Label>
                            <Input id="patient_name" name="patient_name" value={formData.patient_name} onChange={(e) => setFormData({...formData, patient_name: e.target.value})} placeholder="Your full name" required />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="form-label" htmlFor="phone">Phone Number* (WhatsApp preferred)</Label>
                              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="10-digit mobile number" required />
                            </div>
                            <div className="space-y-2">
                              <Label className="form-label" htmlFor="email">Email Address</Label>
                              <Input id="email" name="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Email Address (Optional)" />
                              <p className="text-xs text-muted-foreground mt-1">Optional — form can be submitted without email</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="form-label" htmlFor="city">City / State*</Label>
                              <Input id="city" name="city" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} placeholder="Your city" required />
                            </div>
                            <div className="space-y-2">
                              <Label className="form-label" htmlFor="age">Age*</Label>
                              <Input 
                                id="age" 
                                name="age"
                                type="number" 
                                min="1" 
                                max="120" 
                                step="1"
                                value={formData.age} 
                                onChange={handleAgeChange}
                                onKeyDown={(e) => {
                                  if (e.key === '.' || e.key === '-' || e.key === 'e' || e.key === 'E') {
                                    e.preventDefault();
                                  }
                                }}
                                placeholder="Your age" 
                                required 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-6 animate-fade-in w-full">
                        <h3 className="card-title text-xl font-semibold mb-4 text-foreground">Step 3: Health Details</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="form-label" htmlFor="health_concern">Describe Your Health Concern*</Label>
                            <textarea
                              id="health_concern"
                              name="health_concern"
                              value={formData.health_concern}
                              onChange={(e) => setFormData({...formData, health_concern: e.target.value})}
                              className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[100px] resize-y"
                              placeholder="Please describe your symptoms..."
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="form-label">How Long Have You Had This Problem?*</Label>
                            <Select value={formData.problem_duration} onValueChange={(val) => setFormData({...formData, problem_duration: val})}>
                              <SelectTrigger name="problem_duration">
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Less than 1 month">Less than 1 month</SelectItem>
                                <SelectItem value="1-6 months">1-6 months</SelectItem>
                                <SelectItem value="6 months - 1 year">6 months - 1 year</SelectItem>
                                <SelectItem value="More than 1 year">More than 1 year</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="space-y-6 animate-fade-in w-full">
                        <h3 className="card-title text-xl font-semibold mb-4 text-foreground">Step 4: Preferred Time</h3>
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label className="form-label" htmlFor="preferred_date">Preferred Date*</Label>
                            <Input id="preferred_date" name="preferred_date" type="date" value={formData.preferred_date} onChange={(e) => setFormData({...formData, preferred_date: e.target.value})} required />
                          </div>
                          <div className="space-y-3">
                            <Label className="form-label">Preferred Time Slot*</Label>
                            <RadioGroup value={formData.preferred_time} onValueChange={(val) => setFormData({...formData, preferred_time: val})} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              {['Morning (10AM–12PM)', 'Afternoon (12PM–5PM)', 'Evening (5PM–7PM)'].map((slot) => (
                                <div key={slot}>
                                  <RadioGroupItem value={slot} id={`slot-${slot.replace(/\s+/g, '-')}`} name="preferred_time" className="peer sr-only" />
                                  <Label
                                    htmlFor={`slot-${slot.replace(/\s+/g, '-')}`}
                                    className="flex items-center justify-center rounded-xl border-2 border-border bg-background px-3 py-3 hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer text-center text-sm"
                                  >
                                    <span className="font-medium">{slot}</span>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                          <div className="space-y-3">
                            <Label className="form-label">How Did You Hear About Us?</Label>
                            <RadioGroup value={formData.heard_from} onValueChange={(val) => setFormData({...formData, heard_from: val})} className="grid grid-cols-2 gap-3">
                              {['Google Search', 'Social Media', 'Friend / Family', 'Doctor Referral'].map((source) => (
                                <div key={source}>
                                  <RadioGroupItem value={source} id={`source-${source.replace(/\s+/g, '-')}`} name="heard_from" className="peer sr-only" />
                                  <Label
                                    htmlFor={`source-${source.replace(/\s+/g, '-')}`}
                                    className="flex items-center justify-center rounded-xl border-2 border-border bg-background px-3 py-3 hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer text-center text-sm"
                                  >
                                    <span className="font-medium">{source}</span>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-8 w-full">
                      {currentStep > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCurrentStep(currentStep - 1)}
                          className="w-full sm:w-auto h-[44px]"
                          disabled={isSubmitting}
                        >
                          Previous
                        </Button>
                      )}
                      <Button 
                        type="submit" 
                        className="flex-1 w-full h-[44px] bg-primary hover:bg-secondary text-primary-foreground"
                        disabled={isSubmitting}
                      >
                        {currentStep === 4 ? (isSubmitting ? 'Sending...' : 'Book Online Consultation →') : 'Next Step'}
                      </Button>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border/50 flex flex-col gap-2 text-sm text-muted-foreground font-medium justify-center items-center text-center w-full">
                      <div className="flex items-center gap-2"><Video className="w-4 h-4 text-primary" /> Consultation via Video Call</div>
                      <div className="flex items-center gap-2"><Package className="w-4 h-4 text-primary" /> Medicines delivered to your doorstep anywhere in India</div>
                    </div>
                  </form>
                ) : (
                  <div className="card text-center items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 md:mb-6">
                      <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-green-600" />
                    </div>
                    <h3 className="card-title text-xl md:text-2xl font-semibold mb-4 text-foreground heading-sans text-center w-full">✅ Thank You for Booking!</h3>
                    <div className="card-description text-sm md:text-base text-muted-foreground mb-6 body-text leading-relaxed whitespace-pre-line text-center w-full">
                      Your online consultation request{"\n"}has been received. We will contact{"\n"}you on WhatsApp/Email within{"\n"}24 hours to confirm your appointment.
                    </div>
                    <p className="text-sm md:text-base font-semibold text-foreground mb-8">
                      — <span className="doctor-name">Dr. Shubhangi Maharana</span>
                    </p>
                    <button
                      onClick={() => {
                        setShowSuccess(false);
                        setCurrentStep(1);
                        setFormData({ consultation_type: 'Online Consultation', patient_name: '', phone: '', email: '', city: '', age: '', health_concern: '', problem_duration: '', preferred_date: '', preferred_time: '', heard_from: '' });
                      }}
                      className="btn-primary w-full sm:w-auto"
                    >
                      Book Another Appointment
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="card">
                  <h3 className="card-title text-lg font-semibold mb-4 text-foreground heading-sans">Clinic Timings</h3>
                  <div className="card-content space-y-3 text-sm md:text-base body-text">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span className="font-medium text-foreground">10:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-medium text-foreground">10:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-medium text-destructive">Closed</span>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="card-title text-lg font-semibold mb-4 text-foreground heading-sans">Contact Information</h3>
                  <div className="card-content space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm md:text-base body-text">
                        <div className="font-medium mb-1 text-foreground">Phone</div>
                        <a href="tel:+919625030958" className="text-muted-foreground hover:text-primary transition-colors duration-300 py-1 inline-block">
                          9625030958
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm md:text-base body-text">
                        <div className="font-medium mb-1 text-foreground">Email</div>
                        <a href="mailto:drshubhangi.econsultation@gmail.com" className="text-muted-foreground hover:text-primary transition-colors duration-300 py-1 inline-block break-all">
                          drshubhangi.econsultation@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="https://wa.me/919625030958"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#075E54] text-white py-3 rounded-xl font-medium text-center hover:bg-[#128C7E] transition-all duration-300 active:scale-[0.98] min-h-[44px] flex items-center justify-center shadow-md heading-sans"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default HomePage;