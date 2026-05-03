import React, { useState } from 'react';
import { MessageSquare, X, Phone, MessageCircle, Mail } from 'lucide-react';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    {
      icon: MessageCircle,
      label: 'WhatsApp Us',
      action: () => {
        const message = encodeURIComponent("Hello Dr. Shubhangi, I'd like to book an appointment.");
        window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
      },
    },
    {
      icon: Phone,
      label: 'Call Now',
      action: () => {
        window.location.href = 'tel:+919876543210';
      },
    },
    {
      icon: Mail,
      label: 'Email Us',
      action: () => {
        window.location.href = 'mailto:drshubhangi@example.com';
      },
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 bg-card rounded-2xl shadow-xl border border-border overflow-hidden animate-slide-up w-80">
          <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center text-sm font-semibold">
              DS
            </div>
            <div className="flex-grow">
              <div className="font-semibold">Dr. Shubhangi</div>
              <div className="text-xs text-primary-foreground/80">Typically replies in minutes</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4">
            <div className="bg-muted rounded-xl p-3 mb-4">
              <p className="text-sm text-foreground">Hello! How can I help you today? 🌿</p>
            </div>
            <div className="space-y-2">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={option.action}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-background hover:bg-muted transition-all duration-300 border border-border hover:border-primary/20 active:scale-[0.98]"
                >
                  <option.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-foreground">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 active:scale-95"
        aria-label="Open chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default LiveChat;