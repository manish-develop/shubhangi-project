import React from 'react';
import { Phone, Mail } from 'lucide-react';

const QuickContactSection = () => {
  return (
    <div className="quick-contact-grid">
      <div className="quick-contact-card">
        <div className="icon">
          <Phone className="w-6 h-6 text-blue-600" />
        </div>
        <h3>Call Us</h3>
        <p>+91 96250 30958</p>
        <a href="tel:+919625030958" className="btn bg-blue-600 text-white hover:bg-blue-700 transition-colors">
          Call Now
        </a>
      </div>
      <div className="quick-contact-card">
        <div className="icon">
          <Mail className="w-6 h-6 text-blue-600" />
        </div>
        <h3>Email Us</h3>
        <p>drshubhangi.econsultation@gmail.com</p>
        <a href="mailto:drshubhangi.econsultation@gmail.com" className="btn bg-blue-600 text-white hover:bg-blue-700 transition-colors">
          Send Email
        </a>
      </div>
      <div className="quick-contact-card">
        <div className="icon">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-7 h-7" />
        </div>
        <h3>Chat on WhatsApp</h3>
        <p>+91 96250 30958</p>
        <a href="https://wa.me/919625030958" target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-white hover:bg-[#1da851] transition-colors">
          Chat Now
        </a>
      </div>
    </div>
  );
};

export default QuickContactSection;