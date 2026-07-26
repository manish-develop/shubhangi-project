import React from 'react';
import SEO from '@/components/SEO.jsx';
import { Award, Mic, Medal } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import AboutSection from '@/components/ui/about-section.jsx';
import { TiltCard } from '@/components/ui/tilt-card.jsx';
import { LinearCardGrid } from '@/components/ui/linear-card.jsx';
import { ParallaxFeatureSection } from '@/components/ui/parallax-scroll-feature-section.jsx';
import { useScrollAnimation } from '@/hooks/useScrollAnimation.js';

const AboutPage = () => {
  const [qualRef, qualVisible] = useScrollAnimation(0.2);
  const [pubRef, pubVisible] = useScrollAnimation(0.2);
  const [achieveRef, achVisible] = useScrollAnimation(0.2);

  return (
    <>
      <SEO
        title="About Dr. Shubhangi Maharana | BHMS MD Hom. Homoeopathic Doctor"
        description="Learn about Dr. Shubhangi Maharana — a qualified homoeopathic physician with BHMS, MD (Hom.), DNHE, MPMU & FMC (Germany). 8+ years of experience in homoeopathy and facial aesthetics."
        path="/about"
      />

      <Header />

      <main className="about-page-wrapper">
        <AboutSection />

        <section ref={qualRef} className="section-light about-qualifications">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="section-title heading-serif">Qualifications & Credentials</h2>
              <p className="section-subtitle text-lg md:text-xl text-muted-foreground mx-auto">
                A strong foundation in medical science and homoeopathy
              </p>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto ${qualVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              {[
                { title: 'BHMS', desc: 'Bachelor of Homoeopathic Medicine and Surgery' },
                { title: 'MD (Hom.)', desc: 'Doctor of Medicine in Homoeopathy' },
                { title: 'DNHE', desc: 'Diploma in Nutrition and Health Education' },
                { title: 'FMC (Germany)', desc: 'Fellowship in Medical Cosmetology' },
              ].map((q) => (
                <TiltCard key={q.title} className="bg-card p-6 flex flex-col items-center text-center gap-2 border border-border border-t-4 border-t-primary shadow-sm">
                  <Award className="w-8 h-8 text-primary mb-2" />
                  <h3 className="text-xl font-semibold text-foreground heading-sans">{q.title}</h3>
                  <p className="text-muted-foreground text-sm">{q.desc}</p>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        <section ref={pubRef} className="section-medium about-publications">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="section-title heading-serif">🔬 Research & Publications</h2>
              <p className="section-subtitle text-lg md:text-xl text-muted-foreground mx-auto">
                Advancing the field of homoeopathy through peer-reviewed research and clinical studies
              </p>
            </div>

            <div className={`max-w-3xl mx-auto ${pubVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <LinearCardGrid
                items={[
                  {
                    id: 1,
                    url: 'https://gvmdrttrwesitnqgaedl.supabase.co/storage/v1/object/public/media/clinic/shubhangi-article.jpeg',
                    title: 'Bhandarkar Institute',
                    subtitle: 'Published Research · 2025',
                    description: 'Annals of the Bhandarkar Oriental Research Institute — 2025.',
                  },
                  {
                    id: 2,
                    url: 'https://gvmdrttrwesitnqgaedl.supabase.co/storage/v1/object/public/media/clinic/shubhangi-article1.jpeg',
                    title: 'Intl. Journal of Applied Science',
                    subtitle: 'Published Research · 2025',
                    description: 'International Journal of Applied Science — 2025.',
                  },
                ]}
              />
            </div>
          </div>
        </section>

        <section ref={achieveRef} className="section-light about-achievements">
          <div className="container-custom">
            <div className="text-center">
              <h2 className="section-title heading-serif">🏆 Achievements & Recognition</h2>
              <p className="section-subtitle text-lg md:text-xl text-muted-foreground mx-auto">
                Honored for excellence and dedication in the field of homoeopathic medicine
              </p>
            </div>

            <div className={`max-w-5xl mx-auto ${achVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <ParallaxFeatureSection
                items={[
                  {
                    id: 1,
                    icon: Mic,
                    title: 'Invited as Guest Speaker',
                    description: (
                      <>
                        <span className="doctor-name font-medium">Dr. Shubhangi Maharana</span> was honored as a Guest Speaker at the JBM Group Corporate Wellness Session, where she conducted a Holistic Wellness Session for 64+ corporate professionals, sharing insights on homoeopathy and preventive health.
                      </>
                    ),
                    reverse: false,
                    images: [
                      { src: 'https://gvmdrttrwesitnqgaedl.supabase.co/storage/v1/object/public/media/clinic/invitedasaguest.jpeg', alt: 'Invited as Guest Speaker — JBM Group 2025' },
                      { src: 'https://gvmdrttrwesitnqgaedl.supabase.co/storage/v1/object/public/media/clinic/invitedasaguest1.jpeg', alt: 'Invited as Guest Speaker — JBM Group 2025' },
                    ],
                  },
                  {
                    id: 2,
                    icon: Medal,
                    title: 'Homoeopathic Award of the Year 2022',
                    description: (
                      <>
                        <span className="doctor-name font-medium">Dr. Shubhangi Maharana</span> was awarded the prestigious Homoeopathic Award of the Year 2022 at the EL Homoeo Recognition ceremony, recognizing her outstanding contribution and excellence in the field of homoeopathic medicine.
                      </>
                    ),
                    reverse: true,
                    images: [
                      { src: 'https://gvmdrttrwesitnqgaedl.supabase.co/storage/v1/object/public/media/clinic/homeopathicaward-2022.jpeg', alt: 'Homoeopathic Award of the Year 2022' },
                    ],
                  },
                ]}
              />
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};
export default AboutPage;