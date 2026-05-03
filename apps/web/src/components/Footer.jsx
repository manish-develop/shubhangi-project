import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Linkedin, Phone, Mail, Clock } from 'lucide-react';
import LegalDisclaimer from './LegalDisclaimer.jsx';

const Footer = () => {
  const quickLinks = [{
    path: '/',
    label: 'Home'
  }, {
    path: '/about',
    label: 'About'
  }, {
    path: '/services',
    label: 'Services'
  }, {
    path: '/testimonials',
    label: 'Testimonials'
  }, {
    path: '/blog',
    label: 'Blog'
  }, {
    path: '/contact',
    label: 'Contact'
  }];
  const conditions = ['Skin Disorders', "Women's Health", 'Child Health', 'Thyroid', 'Joint Pain', 'Anxiety'];
  const socialLinks = [{
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/dr-shubhangi-maharana-a90538213',
    label: 'LinkedIn'
  }, {
    icon: Youtube,
    href: 'https://youtube.com/@dr.shubhangimaharana',
    label: 'YouTube'
  }];
  return <footer className="bg-[#154360] text-white">
      <div className="container-custom py-12 md:py-16">
        
        {/* Mobile Format Native Structure */}
        <div className="md:hidden">
          <div className="footer-brand">
            <Link to="/" className="inline-block">
              <img src="https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/ba2251e0bacb65c428be0ab880a6e708.png" alt="Maharana's Logo" />
              <p>The House of Homoeopathy & Facial Aesthetics</p>
            </Link>
          </div>

          <div className="footer-links-row">
            <div className="footer-column footer-quick-links">
              <h3 className="footer-column-title">Quick Links</h3>
              {quickLinks.map((link, index) => <Link key={index} to={link.path}>{link.label}</Link>)}
            </div>
            <div className="footer-column footer-conditions">
              <h3 className="footer-column-title">Conditions</h3>
              {conditions.map((condition, index) => <Link key={index} to="/diseases">{condition}</Link>)}
            </div>
          </div>

          <div className="footer-contact">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Phone className="w-4 h-4 text-white/80" />
              <a href="tel:+919625030958">9625030958</a>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-white/80" />
              <a href="mailto:drshubhangi.econsultation@gmail.com">drshubhangi.econsultation@gmail.com</a>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-white/80" />
              <span>Mon-Sat: 10:00 AM - 7:00 PM</span>
            </div>
          </div>

          <div className="footer-social">
            {socialLinks.map((social, index) => <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                <social.icon />
              </a>)}
          </div>

          <div className="footer-copyright flex flex-col gap-4">
            <div className="flex justify-center gap-4 mb-2">
              <Link to="/privacy-policy" className="text-white/80 hover:text-white underline">Privacy Policy</Link>
              <Link to="/disclaimer" className="text-white/80 hover:text-white underline">Disclaimer</Link>
            </div>
            <div className="flex flex-col gap-3 text-white/80">
              <p className="text-center">&copy; 2026 Maharana's. All rights reserved.</p>
              <p className="text-center">All treatments are performed by a qualified Homoeopathic physician Dr. Shubhangi Maharana trained in medical cosmetology. Procedures are selected based on patient suitability and within the practitioner's scope of practice.</p>
            </div>
          </div>
        </div>

        {/* Desktop Layout Preserved */}
        <div className="hidden md:grid md:grid-cols-4 gap-12">
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src="https://horizons-cdn.hostinger.com/f2268395-5bcb-4cfc-98ed-965a4845c225/ba2251e0bacb65c428be0ab880a6e708.png" alt="Maharana's Logo" className="h-[60px] w-auto object-contain" />
              <div className="flex flex-col justify-center">
                <div className="text-2xl font-bold text-white" style={{
                fontFamily: 'Playfair Display, serif'
              }}>
                  Maharana's
                </div>
                <div className="text-xs font-medium tracking-wide text-white/90 leading-tight">
                  The House of Homoeopathy<br />& Facial Aesthetics
                </div>
              </div>
            </Link>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social, index) => <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all text-white" aria-label={social.label}>
                  <social.icon className="w-5 h-5" />
                </a>)}
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wider" style={{
            fontFamily: 'Playfair Display, serif'
          }}>Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => <li key={index}>
                  <Link to={link.path} className="text-white/80 hover:text-white transition-colors">{link.label}</Link>
                </li>)}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wider" style={{
            fontFamily: 'Playfair Display, serif'
          }}>Conditions</h3>
            <ul className="space-y-3">
              {conditions.map((condition, index) => <li key={index}>
                  <Link to="/diseases" className="text-white/80 hover:text-white transition-colors">{condition}</Link>
                </li>)}
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wider" style={{
            fontFamily: 'Playfair Display, serif'
          }}>Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/80">
                <Phone className="w-5 h-5 flex-shrink-0 text-white" />
                <a href="tel:+919625030958" className="hover:text-white">9625030958</a>
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <Mail className="w-5 h-5 flex-shrink-0 text-white" />
                <a href="mailto:drshubhangi.econsultation@gmail.com" className="hover:text-white break-all">drshubhangi.econsultation@gmail.com</a>
              </li>
              <li className="flex items-start gap-3 text-white/80">
                <Clock className="w-5 h-5 mt-0.5 flex-shrink-0 text-white" />
                <div>
                  <div>Mon-Sat: 10:00 AM - 7:00 PM</div>
                  <div>Sunday: Closed</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop Copyright */}
        <div className="hidden md:flex mt-12 pt-8 border-t border-white/10 items-start justify-between text-sm text-white/80">
          <div className="flex flex-col gap-3 flex-grow pr-8">
            <p>&copy; 2026 Maharana's. All rights reserved.</p>
            <p>All treatments are performed by a qualified Homoeopathic physician Dr. Shubhangi Maharana trained in medical cosmetology. Procedures are selected based on patient suitability and within the practitioner's scope of practice.</p>
          </div>
          <div className="flex gap-6 flex-shrink-0 ml-6 items-center">
            <Link to="/privacy-policy" className="hover:text-white whitespace-nowrap">Privacy Policy</Link>
            <Link to="/disclaimer" className="hover:text-white whitespace-nowrap">Disclaimer</Link>
          </div>
        </div>
      </div>
      
      <LegalDisclaimer />
    </footer>;
};
export default Footer;