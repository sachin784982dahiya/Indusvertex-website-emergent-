'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Building2, Briefcase, MapPin, CheckCircle2, Handshake } from 'lucide-react';

const TRADE_CATEGORIES = [
  'Electrical (HT/LT Works)', 'Civil & Structural', 'Mechanical & HVAC',
  'IT & Networking', 'Solar & Renewable Energy', 'EV Infrastructure',
  'ETP / STP / ZLD', 'Fire & Safety Systems', 'Supply of Electrical Equipment',
  'Supply of Civil Materials', 'Manpower / Labour Contractor', 'Testing & Commissioning', 'Other',
];

const WHY = [
  { icon: Briefcase, title: 'Steady Project Pipeline', text: '150+ projects across power, data centres, EV and environment — consistent work for empanelled vendors.' },
  { icon: Handshake, title: 'Fair & Timely Payments', text: 'Structured payment milestones tied to project progress. No unnecessary delays.' },
  { icon: CheckCircle2, title: 'Long-Term Partnership', text: 'We build relationships, not just transactions. Performing vendors get repeat work across projects.' },
  { icon: MapPin, title: 'Pan-India Reach', text: 'Projects across UP, Delhi NCR, Rajasthan, Maharashtra and growing. Work close to home or expand your reach.' },
];

export default function Vendor() {
  const [form, setForm] = useState({
    companyName: '', contactPerson: '', phone: '', email: '',
    tradeCategory: '', gst: '', experience: '', areasOfOperation: '', message: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Refs for required fields
  const refs = {
    companyName: useRef(), contactPerson: useRef(),
    phone: useRef(), email: useRef(), tradeCategory: useRef(),
  };

  const REQUIRED = [
    { key: 'companyName', label: 'Company / Firm Name' },
    { key: 'contactPerson', label: 'Contact Person' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'tradeCategory', label: 'Trade / Service Category' },
  ];

  const validate = () => {
    const newErrors = {};
    let firstErrorRef = null;
    for (const { key, label } of REQUIRED) {
      if (!form[key].trim()) {
        newErrors[key] = `${label} is required`;
        if (!firstErrorRef) firstErrorRef = refs[key];
      }
    }
    // Phone format check — min 10 digits
    if (form.phone && form.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
      if (!firstErrorRef) firstErrorRef = refs.phone;
    }
    // Email format check
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
      if (!firstErrorRef) firstErrorRef = refs.email;
    }
    setErrors(newErrors);
    if (firstErrorRef?.current) {
      firstErrorRef.current.focus();
      firstErrorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return Object.keys(newErrors).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/vendor-inquiry', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      const d = await res.json();
      if (d.success) { toast.success(d.message); setSubmitted(true); }
      else toast.error(d.error || 'Could not submit. Please try again.');
    } catch { toast.error('Network error. Please email us at business@indusvertex.com'); }
    setLoading(false);
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(er => ({ ...er, [key]: '' })); },
  });

  const ErrorMsg = ({ k }) => errors[k] ? <p className="text-xs text-red-500 mt-1">{errors[k]}</p> : null;
  const inputClass = (k) => `mt-1 h-9 text-sm ${errors[k] ? 'border-red-400 focus:ring-red-300' : ''}`;

  return (
    <div>
      <section className="gradient-navy text-white relative overflow-hidden py-20 pt-36">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-3">Work With Us</div>
          <h1 className="text-4xl lg:text-5xl font-bold max-w-3xl leading-tight">Become an Empanelled Vendor</h1>
          <p className="mt-4 text-base text-white/70 max-w-2xl">IndusVertex is always looking for reliable subcontractors, suppliers and service partners. Register your firm and our procurement team will reach out.</p>
        </div>
      </section>

      <section className="py-14 bg-white dark:bg-[#0a1628]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY.map((w, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-slate-50 dark:bg-[#0d1f3c] rounded-xl p-6 border border-slate-100 dark:border-white/10">
                <div className="w-10 h-10 rounded-lg bg-[#0a1628] dark:bg-[#d4af37]/10 flex items-center justify-center mb-4">
                  <w.icon className="w-5 h-5 text-[#d4af37]" />
                </div>
                <h3 className="font-bold text-sm mb-2">{w.title}</h3>
                <p className="text-xs text-slate-500 dark:text-white/60 leading-relaxed">{w.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-slate-50 dark:bg-[#0d1f3c]">
        <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-[#0a1628] rounded-2xl shadow-xl p-10 text-center border border-slate-100 dark:border-white/10">
              <div className="w-16 h-16 rounded-full bg-[#16a34a]/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-[#16a34a]" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Registration Received!</h2>
              <p className="text-slate-500 dark:text-white/60 text-sm max-w-sm mx-auto">Our procurement team will review your profile and get in touch within 48 working hours.</p>
            </motion.div>
          ) : (
            <div className="bg-white dark:bg-[#0a1628] rounded-2xl shadow-xl p-8 border border-slate-100 dark:border-white/10">
              <div className="mb-6">
                <div className="text-[10px] uppercase tracking-[0.2em] font-black text-[#16a34a] mb-1">Vendor Registration</div>
                <h2 className="text-2xl font-black text-[#0a1628] dark:text-white">Register Your Firm</h2>
                <p className="text-slate-500 text-xs mt-1">Fields marked * are required.</p>
              </div>

              <form onSubmit={submit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-slate-600">Company / Firm Name *</Label>
                    <Input ref={refs.companyName} {...field('companyName')} className={inputClass('companyName')} placeholder="Your registered firm name" />
                    <ErrorMsg k="companyName" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-600">Contact Person *</Label>
                    <Input ref={refs.contactPerson} {...field('contactPerson')} className={inputClass('contactPerson')} placeholder="Owner / Director name" />
                    <ErrorMsg k="contactPerson" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-slate-600">Phone *</Label>
                    <Input ref={refs.phone} {...field('phone')} className={inputClass('phone')} placeholder="+91 XXXXX XXXXX" />
                    <ErrorMsg k="phone" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-600">Email *</Label>
                    <Input ref={refs.email} type="email" {...field('email')} className={inputClass('email')} placeholder="company@email.com" />
                    <ErrorMsg k="email" />
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-slate-600">Trade / Service Category *</Label>
                  <select ref={refs.tradeCategory} value={form.tradeCategory}
                    onChange={e => { setForm(f => ({ ...f, tradeCategory: e.target.value })); setErrors(er => ({ ...er, tradeCategory: '' })); }}
                    className={`mt-1 w-full h-9 px-3 text-sm rounded-md border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring ${errors.tradeCategory ? 'border-red-400' : 'border-input'}`}>
                    <option value="">Select category…</option>
                    {TRADE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ErrorMsg k="tradeCategory" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-slate-600">GST Number</Label>
                    <Input {...field('gst')} className="mt-1 h-9 text-sm" placeholder="15-digit GSTIN" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-600">Years of Experience</Label>
                    <Input {...field('experience')} className="mt-1 h-9 text-sm" placeholder="e.g. 8 years" />
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-slate-600">Areas of Operation</Label>
                  <Input {...field('areasOfOperation')} className="mt-1 h-9 text-sm" placeholder="e.g. Delhi NCR, UP, Rajasthan" />
                </div>

                <div>
                  <Label className="text-xs font-semibold text-slate-600">Additional Details</Label>
                  <Textarea rows={3} {...field('message')} placeholder="Brief description of capabilities, past projects, certifications, etc." className="mt-1 text-sm resize-none" />
                </div>

                <Button type="submit" disabled={loading} className="w-full font-bold text-sm" style={{ backgroundColor: '#d4af37', color: '#0a1628', height: '42px' }}>
                  {loading ? 'Submitting…' : 'Submit Vendor Registration'}
                </Button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
