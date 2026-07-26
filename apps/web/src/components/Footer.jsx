import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Linkedin, Instagram, Facebook } from 'lucide-react';
import LegalDisclaimer from './LegalDisclaimer.jsx';

const company = [
  { path: '/', title: 'Home' },
  { path: '/about', title: 'About' },
  { path: '/services', title: 'Services' },
  { path: '/testimonials', title: 'Testimonials' },
  { path: '/contact', title: 'Contact' },
];

const conditions = [
  { title: 'Skin Disorders' },
  { title: "Women's Health" },
  { title: 'Child Health' },
  { title: 'Thyroid' },
  { title: 'Joint Pain' },
  { title: 'Anxiety' },
];

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/dr.shubhangimaharana?utm_source=qr', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/share/1BanKaCwyb/?mibextid=wwXIfr', label: 'Facebook' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/dr-shubhangi-maharana-a90538213', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@dr.shubhangimaharana', label: 'YouTube' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative" style={{ backgroundColor: 'hsl(var(--footer-bg))' }}>
      <div className="relative mx-auto max-w-4xl">
        <div className="absolute inset-x-0 top-0 h-px w-full bg-white/10" />

        <div className="grid grid-cols-6 gap-6 px-4 py-8 md:py-10">
          <div className="col-span-6 flex flex-col gap-5 md:col-span-4">
            <Link to="/" className="flex w-max items-center gap-3">
              <img
                src="https://gvmdrttrwesitnqgaedl.supabase.co/storage/v1/object/public/media/clinic/maharana-logo-khaki.png"
                alt="Maharana Wellness Clinic Logo"
                className="h-11 w-auto object-contain"
              />
              <div className="flex flex-col justify-center">
                <div className="text-lg font-bold text-white leading-tight" style={{ fontFamily: 'Merriweather, serif' }}>
                  Maharana
                </div>
                <div className="text-xs font-medium tracking-wide text-white/80 leading-tight">
                  Wellness Clinic
                </div>
              </div>
            </Link>

            <p className="max-w-sm text-sm text-white/60">
              Homoeopathic treatment for chronic conditions, women's health, and facial aesthetics by Dr. Shubhangi Maharana.
            </p>

            <div className="flex flex-col gap-1 text-sm text-white/70">
              <a href="tel:+919625030958" className="w-max hover:text-white transition-colors">9625030958</a>
              <a href="mailto:drshubhangi.econsultation@gmail.com" className="w-max hover:text-white transition-colors">drshubhangi.econsultation@gmail.com</a>
              <span>Mon–Sun: 11:00 AM – 8:00 PM</span>
            </div>

            <div className="flex gap-2">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="rounded-md border border-white/15 p-1.5 text-white hover:bg-white/10 transition-colors"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-3 w-full md:col-span-1">
            <span className="mb-1 text-xs text-white/50">Conditions</span>
            <div className="flex flex-col gap-1">
              {conditions.map(({ title }, i) => (
                <Link key={i} to="/diseases" className="w-max py-1 text-sm text-white/70 duration-200 hover:text-white hover:underline">
                  {title}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-3 w-full md:col-span-1">
            <span className="mb-1 text-xs text-white/50">Company</span>
            <div className="flex flex-col gap-1">
              {company.map(({ path, title }, i) => (
                <Link key={i} to={path} className="w-max py-1 text-sm text-white/70 duration-200 hover:text-white hover:underline">
                  {title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-3 px-4 pb-6 pt-4 text-xs text-white/50 sm:flex-row">
          <p>&copy; {year} Maharana Wellness Clinic. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>

      <LegalDisclaimer />
    </footer>
  );
};

export default Footer;
