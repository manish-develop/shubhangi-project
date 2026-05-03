import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { 
  Calendar, Clock, CheckCircle2, Lock, 
  Video, Package, Activity, MessageCircle, FileText, ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { sendAppointmentEmail } from '@/utils/emailService.js';
import { validateEmail, validatePhone, validateRequired } from '@/utils/validation.js';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const AppointmentPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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

  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateRequired(formData.patient_name) || !validateRequired(formData.city) || !validateRequired(formData.age)) {
      toast.error('Please fill in all personal details.');
      return;
    }
    if (!validatePhone(formData.phone)) {
      toast.error('Please enter a valid 10-digit phone number.');
      return;
    }
    if (formData.email && !validateEmail(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!formData.health_concern || formData.health_concern.length < 20) {
      toast.error('Please describe your concern (minimum 20 characters).');
      return;
    }
    if (!validateRequired(formData.problem_duration)) {
      toast.error('Please select how long you have had this problem.');
      return;
    }
    if (!validateRequired(formData.preferred_date) || !validateRequired(formData.preferred_time)) {
      toast.error('Please select a preferred date and time slot.');
      return;
    }

    setIsSubmitting(true);
    try {
      await sendAppointmentEmail(formData);
      
      setShowSuccess(true);
      toast.success('Appointment request sent successfully!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      toast.error('Failed to send appointment request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setShowSuccess(false);
    setFormData({
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
  };

  return (
    <>
      <Helmet>
        <title>Book Your Consultation | Maharana's Homeopathy Clinic</title>
        <meta name="description" content="Book an online or in-clinic homeopathy consultation with Dr. Shubhangi Maharana. Secure booking, flexible timings, and medicine delivery across India." />
      </Helmet>

      <Header />

      <main className="bg-background min-h-screen">
        
        <section className="page-header">
          <div className="container-custom max-w-4xl mx-auto">
            <h1 className="section-title heading-serif mb-4">Book Your Consultation</h1>
            <p className="section-subtitle text-lg md:text-xl font-medium body-text mx-auto">
              Online & In-Clinic appointments available
            </p>
          </div>
        </section>

        <section className="section-light">
          {showSuccess ? (
            <div className="container-custom max-w-3xl mx-auto">
              <div className="card text-center flex flex-col items-center p-8 md:p-12 shadow-lg">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-foreground heading-sans">✅ Thank You for Booking!</h2>
                <div className="text-base md:text-lg text-muted-foreground mb-6 body-text leading-relaxed whitespace-pre-line">
                  Your online consultation request{"\n"}has been received. We will contact{"\n"}you on WhatsApp/Email within{"\n"}24 hours to confirm your appointment.
                </div>
                <p className="text-base md:text-lg font-semibold text-foreground mb-8">
                  — <span className="doctor-name">Dr. Shubhangi Maharana</span>
                </p>
                <Button onClick={resetForm} className="btn-primary w-full sm:w-auto h-12 px-8">
                  Book Another Appointment
                </Button>
              </div>
            </div>
          ) : (
            <div className="container-custom max-w-5xl mx-auto">
              
              <div className="mb-12">
                <h2 className="text-center text-sm font-bold text-muted-foreground tracking-widest uppercase mb-6">🌐 How It Works</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  <div className="card p-5 text-center shadow-sm hover:shadow-md transition-all items-center">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 text-center w-full">1️⃣ Book</h3>
                    <p className="text-sm text-muted-foreground text-center mb-0">Fill the form and submit your details</p>
                  </div>
                  <div className="card p-5 text-center shadow-sm hover:shadow-md transition-all items-center">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <MessageCircle className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 text-center w-full">2️⃣ Confirm</h3>
                    <p className="text-sm text-muted-foreground text-center mb-0">We will contact you within 24 hours</p>
                  </div>
                  <div className="card p-5 text-center shadow-sm hover:shadow-md transition-all items-center">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Video className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 text-center w-full">3️⃣ Consult</h3>
                    <p className="text-sm text-muted-foreground text-center mb-0">Video Call with Dr. Shubhangi</p>
                  </div>
                  <div className="card p-5 text-center shadow-sm hover:shadow-md transition-all items-center">
                    <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Package className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 text-center w-full">4️⃣ Medicine</h3>
                    <p className="text-sm text-muted-foreground text-center mb-0">Medicines delivered directly to your home</p>
                  </div>
                </div>
              </div>

              <div className="card shadow-xl p-6 md:p-10 mb-12">
                <form onSubmit={handleSubmit} className="space-y-10 w-full">
                  
                  <div className="space-y-6 pb-8 border-b border-border/50">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex-shrink-0">1</span>
                      <h2 className="text-xl font-semibold text-foreground heading-sans m-0">Select Consultation Type</h2>
                    </div>
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

                  <div className="space-y-6 pb-8 border-b border-border/50">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex-shrink-0">2</span>
                      <h2 className="text-xl font-semibold text-foreground heading-sans m-0">Personal Details</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="patient_name" className="text-sm font-medium">Full Name <span className="text-destructive">*</span></Label>
                        <Input id="patient_name" name="patient_name" value={formData.patient_name} onChange={(e) => setFormData({...formData, patient_name: e.target.value})} placeholder="Your full name" required className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">Phone Number <span className="text-muted-foreground font-normal">(WhatsApp preferred)</span> <span className="text-destructive">*</span></Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="10-digit mobile number" required className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Email Address (Optional)" className="h-12" />
                        <p className="text-xs text-muted-foreground mt-1">Optional — form can be submitted without email</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city" className="text-sm font-medium">City / State <span className="text-destructive">*</span></Label>
                          <Input id="city" name="city" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} placeholder="Your city" required className="h-12" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="age" className="text-sm font-medium">Age <span className="text-destructive">*</span></Label>
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
                            placeholder="Age" 
                            required 
                            className="h-12" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 pb-8 border-b border-border/50">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex-shrink-0">3</span>
                      <h2 className="text-xl font-semibold text-foreground heading-sans m-0">Health Details</h2>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="health_concern" className="text-sm font-medium">Describe Your Health Concern <span className="text-destructive">*</span></Label>
                        <textarea
                          id="health_concern"
                          name="health_concern"
                          value={formData.health_concern}
                          onChange={(e) => setFormData({...formData, health_concern: e.target.value})}
                          className="flex min-h-[120px] w-full rounded-xl border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                          placeholder="Please describe your symptoms and concerns in detail (minimum 20 characters)..."
                          required
                        />
                      </div>
                      <div className="space-y-2 md:w-1/2">
                        <Label className="text-sm font-medium">How Long Have You Had This Problem? <span className="text-destructive">*</span></Label>
                        <Select value={formData.problem_duration} onValueChange={(val) => setFormData({...formData, problem_duration: val})}>
                          <SelectTrigger name="problem_duration" className="h-12 rounded-xl">
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

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex-shrink-0">4</span>
                      <h2 className="text-xl font-semibold text-foreground heading-sans m-0">Preferred Time</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="preferred_date" className="text-sm font-medium">Preferred Date <span className="text-destructive">*</span></Label>
                          <Input 
                            id="preferred_date" 
                            name="preferred_date"
                            type="date" 
                            min={todayStr}
                            value={formData.preferred_date} 
                            onChange={(e) => setFormData({...formData, preferred_date: e.target.value})} 
                            required 
                            className="h-12 w-full block" 
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-sm font-medium">Preferred Time Slot <span className="text-destructive">*</span></Label>
                          <RadioGroup value={formData.preferred_time} onValueChange={(val) => setFormData({...formData, preferred_time: val})} className="grid grid-cols-1 gap-3">
                            {['Morning (10AM–12PM)', 'Afternoon (12PM–5PM)', 'Evening (5PM–7PM)'].map((slot) => (
                              <div key={slot}>
                                <RadioGroupItem value={slot} id={`slot-${slot.replace(/\s+/g, '-')}`} name="preferred_time" className="peer sr-only" />
                                <Label
                                  htmlFor={`slot-${slot.replace(/\s+/g, '-')}`}
                                  className="flex items-center justify-center rounded-xl border-2 border-border bg-background px-4 py-3 hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer text-left text-sm w-full"
                                >
                                  <span className="font-medium w-full">{slot}</span>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label className="text-sm font-medium">How Did You Hear About Us?</Label>
                        <RadioGroup value={formData.heard_from} onValueChange={(val) => setFormData({...formData, heard_from: val})} className="grid grid-cols-1 sm:grid-cols-2 gap-3 h-full content-start">
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

                  <div className="pt-8">
                    <Button 
                      type="submit" 
                      className="w-full h-14 text-lg bg-primary hover:bg-secondary text-primary-foreground font-semibold shadow-md flex items-center justify-center gap-2 rounded-xl transition-all duration-300"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending Request...' : 'Book Online Consultation'}
                      {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                    </Button>
                    
                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-muted-foreground font-medium">
                      <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
                        <Video className="w-4 h-4 text-primary" /> 
                        <span>📱 Consultation via Video Call</span>
                      </div>
                      <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
                        <Package className="w-4 h-4 text-primary" /> 
                        <span>📦 Medicines delivered to your doorstep anywhere in India</span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 pb-8">
                <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-card rounded-lg border border-border shadow-sm">
                  <Lock className="w-4 h-4 text-primary" />
                  <span>100% Private & Secure</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-card rounded-lg border border-border shadow-sm">
                  <Video className="w-4 h-4 text-primary" />
                  <span>Video Call Consultation</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-card rounded-lg border border-border shadow-sm">
                  <Package className="w-4 h-4 text-primary" />
                  <span>Medicine Home Delivery</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-card rounded-lg border border-border shadow-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Flexible Timing</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground bg-card rounded-lg border border-border shadow-sm">
                  <Activity className="w-4 h-4 text-primary" />
                  <span>Personalized Treatment</span>
                </div>
              </div>

            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AppointmentPage;