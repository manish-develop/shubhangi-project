import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Baby, Shield, Activity, Brain, Bone, Stethoscope, Check, X } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ServiceCard from '@/components/ServiceCard.jsx';
import { useScrollAnimation } from '@/hooks/useScrollAnimation.js';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ServicesPage = () => {
  const [heroRef, heroVisible] = useScrollAnimation(0.2);
  const [servicesRef, servicesVisible] = useScrollAnimation(0.2);
  const [comparisonRef, comparisonVisible] = useScrollAnimation(0.2);
  const [faqRef, faqVisible] = useScrollAnimation(0.2);

  const services = [
    { id: 'chronic-disease-management', icon: Sparkles, title: 'Chronic Disease Management', description: 'Comprehensive treatment for diabetes, hypertension, autoimmune disorders, and other long-term conditions using constitutional homoeopathic remedies.' },
    { id: 'womens-health', icon: Heart, title: "Women's Health", description: 'Specialized care for PCOD/PCOS, menstrual irregularities, menopause symptoms, fertility issues, and hormonal imbalances.' },
    { id: 'child-health', icon: Baby, title: 'Child Health & Development', description: 'Gentle, safe treatment for common childhood ailments, developmental concerns, behavioral issues, and immunity building.' },
    { id: 'skin-disorders', icon: Shield, title: 'Skin Disorders', description: 'Effective solutions for eczema, psoriasis, acne, urticaria, vitiligo, and other dermatological conditions.' },
    { id: 'thyroid-management', icon: Activity, title: 'Thyroid Management', description: 'Natural approach to hypothyroidism, hyperthyroidism, thyroid nodules, and related metabolic disorders.' },
    { id: 'mental-health', icon: Brain, title: 'Mental Health Support', description: 'Compassionate care for anxiety, depression, stress disorders, insomnia, OCD, and other psychological conditions.' },
    { id: 'joint-bone-health', icon: Bone, title: 'Joint & Bone Health', description: 'Relief from arthritis, osteoporosis, gout, sciatica, and musculoskeletal pain without side effects.' },
    { id: 'respiratory-conditions', icon: Stethoscope, title: 'Respiratory Conditions', description: 'Treatment for asthma, allergic rhinitis, sinusitis, bronchitis, and recurrent respiratory infections.' },
    { id: 'digestive-disorders', icon: Heart, title: 'Digestive Disorders', description: 'Solutions for IBS, acidity, GERD, constipation, colitis, and other gastrointestinal issues.' },
    { id: 'autoimmune-diseases', icon: Sparkles, title: 'Autoimmune Diseases', description: 'Comprehensive care for lupus, rheumatoid arthritis, Hashimoto thyroiditis, and other autoimmune conditions.' },
    { id: 'allergies-immunity', icon: Shield, title: 'Allergies & Immunity', description: 'Strengthen immune system and manage allergic reactions, food allergies, and seasonal allergies naturally.' },
    { id: 'lifestyle-diseases', icon: Activity, title: 'Lifestyle Diseases', description: 'Holistic approach to obesity, metabolic syndrome, fatty liver, and other lifestyle-related conditions.' },
  ];

  const comparisonData = [
    {
      aspect: 'Approach',
      homeopathy: 'Treats the whole person - physical, mental, emotional',
      conventional: 'Focuses primarily on physical symptoms',
    },
    {
      aspect: 'Side Effects',
      homeopathy: 'No side effects, safe for all ages',
      conventional: 'May have significant side effects',
    },
    {
      aspect: 'Treatment Duration',
      homeopathy: 'Longer initial period, but lasting results',
      conventional: 'Quick symptom relief, may need ongoing medication',
    },
    {
      aspect: 'Root Cause',
      homeopathy: 'Addresses underlying imbalance',
      conventional: 'Often suppresses symptoms',
    },
    {
      aspect: 'Individualization',
      homeopathy: 'Highly personalized based on constitution',
      conventional: 'Standardized protocols for conditions',
    },
  ];

  const faqs = [
    {
      question: 'How long does homoeopathic treatment take to show results?',
      answer: 'The timeline varies depending on the condition and individual. Acute conditions may show improvement within days, while chronic conditions typically require 3-6 months for significant improvement. Constitutional treatment works gradually but provides lasting results.',
    },
    {
      question: 'Is homoeopathy safe for children and pregnant women?',
      answer: 'Yes, homoeopathy is completely safe for children, pregnant women, and nursing mothers. The remedies are non-toxic, have no side effects, and work gently with the body natural healing mechanisms.',
    },
    {
      question: 'Can I take homoeopathic remedies alongside conventional medicine?',
      answer: 'In most cases, yes. Homoeopathic remedies can be taken alongside conventional medications. However, it important to inform both your homoeopath and conventional doctor about all treatments you are receiving.',
    },
    {
      question: 'What should I expect during my first consultation?',
      answer: 'The first consultation typically lasts 60-90 minutes. I will take a detailed case history covering your physical symptoms, emotional state, lifestyle, family history, and overall constitution. This comprehensive understanding helps me select the most appropriate remedy for you.',
    },
    {
      question: 'Do I need to follow any dietary restrictions during treatment?',
      answer: 'Generally, no strict dietary restrictions are required. However, I may recommend avoiding certain foods or substances that interfere with remedy action, such as coffee, mint, or strong-smelling substances around the time of taking remedies.',
    },
    {
      question: 'How often will I need follow-up appointments?',
      answer: 'Follow-up frequency depends on your condition. For chronic cases, follow-ups are typically scheduled every 4-6 weeks initially, then extended as improvement occurs. Acute conditions may require more frequent monitoring.',
    },
  ];

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Dr. Shubhangi Maharana" />
        <title>Homoeopathy Services & Facial Aesthetics Treatments | Maharana's Clinic</title>
        <meta name="description" content="Explore our specialized services — Women's Health, Facial Aesthetics, Chronic Diseases, Skin Disorders, Hair Treatments, Diet & Nutrition. Expert homoeopathic care by Dr. Shubhangi Maharana." />
      </Helmet>

      <Header />

      <main>
        <section ref={heroRef} className="page-header">
          <div className="container-custom">
            <div className={`max-w-3xl mx-auto ${heroVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <h1 className="section-title mb-4 md:mb-6">Our Services</h1>
              <p className="section-subtitle text-lg md:text-xl leading-relaxed mx-auto">
                Comprehensive homoeopathic care by <span className="doctor-name font-medium">Dr. Shubhangi Maharana</span> for a wide range of health conditions, delivered with expertise and compassion
              </p>
            </div>
          </div>
        </section>

        <section ref={servicesRef} className="section-white">
          <div className="container-custom text-center">
            <h2 className="section-title mb-3 md:mb-4">What We Treat</h2>
            <p className="section-subtitle text-lg md:text-xl text-muted-foreground mx-auto">
              Specialized homoeopathic treatment for diverse health conditions
            </p>

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${servicesVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              {services.map((service, index) => (
                <div
                  key={index}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={servicesVisible ? 'animate-slide-up' : 'opacity-0'}
                >
                  <ServiceCard {...service} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={comparisonRef} className="section-light">
          <div className="container-custom text-center">
            <h2 className="section-title mb-3 md:mb-4">Homoeopathy vs Conventional Medicine</h2>
            <p className="section-subtitle text-lg md:text-xl text-muted-foreground mx-auto">
              Understanding the differences in approach and philosophy
            </p>

            <div className={`max-w-5xl mx-auto ${comparisonVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="bg-card rounded-2xl overflow-hidden card-shadow-xl border border-border text-left">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="bg-primary text-primary-foreground">
                        <th className="px-4 md:px-6 py-3 md:py-4 text-left font-semibold text-sm md:text-base">Aspect</th>
                        <th className="px-4 md:px-6 py-3 md:py-4 text-left font-semibold text-sm md:text-base">Homoeopathy</th>
                        <th className="px-4 md:px-6 py-3 md:py-4 text-left font-semibold text-sm md:text-base">Conventional Medicine</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonData.map((row, index) => (
                        <tr key={index} className="border-b border-border last:border-0">
                          <td className="px-4 md:px-6 py-3 md:py-4 font-medium text-sm md:text-base text-foreground">{row.aspect}</td>
                          <td className="px-4 md:px-6 py-3 md:py-4">
                            <div className="flex items-start gap-2">
                              <Check className="w-4 h-4 md:w-5 md:h-5 text-accent flex-shrink-0 mt-0.5" />
                              <span className="text-sm md:text-base text-muted-foreground">{row.homeopathy}</span>
                            </div>
                          </td>
                          <td className="px-4 md:px-6 py-3 md:py-4">
                            <div className="flex items-start gap-2">
                              <X className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                              <span className="text-sm md:text-base text-muted-foreground">{row.conventional}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 md:mt-8 bg-primary/5 border border-primary/20 rounded-xl p-4 md:p-6 text-left">
                <p className="text-xs md:text-sm text-foreground leading-relaxed">
                  <strong>Note:</strong> This comparison is for educational purposes. Both systems have their place in healthcare. Homoeopathy excels in chronic conditions and constitutional treatment, while conventional medicine is essential for emergencies and acute life-threatening situations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section ref={faqRef} className="section-medium">
          <div className="container-custom text-center">
            <h2 className="section-title mb-3 md:mb-4">Frequently Asked Questions</h2>
            <p className="section-subtitle text-lg md:text-xl text-muted-foreground mx-auto">
              Common questions about homoeopathic treatment
            </p>

            <div className={`max-w-3xl mx-auto ${faqVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card rounded-xl px-4 md:px-6 card-shadow border border-border"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-4 md:py-6 text-sm md:text-base text-foreground">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed pb-4 md:pb-6 text-left">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="container-custom text-center">
            <h2 className="section-title mb-4 md:mb-6 text-white">Ready to Experience Natural Healing?</h2>
            <p className="section-subtitle text-lg md:text-xl text-white/90 mb-6 md:mb-8 mx-auto">
              Book a consultation today and take the first step towards holistic wellness
            </p>
            <Link to="/contact" className="btn-secondary w-full sm:w-auto bg-white text-[#154360] hover:bg-gray-100 hover:text-[#154360]">
              Book Consultation
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ServicesPage;