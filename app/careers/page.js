'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CheckCircle2, Briefcase, Users, TrendingUp, Zap, Upload, FileText, X } from 'lucide-react';

const PERKS = [
  { icon: Zap,        text: 'Work on landmark power & infrastructure projects across India' },
  { icon: TrendingUp, text: 'Fast-track growth in a high-performing, expanding firm' },
  { icon: Users,      text: 'Collaborate with experienced engineers, legal & finance professionals' },
  { icon: Briefcase,  text: 'Competitive pay with performance-linked incentives' },
];

export default function Careers() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', position: '',
    experience: '', currentOrg: '', coverLetter: '',
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef();

  // Refs for required fields
  const refs = { name: useRef(), phone: useRef(), email: useRef() };

  const REQUIRED = [
    { key: 'name',  label: 'Full Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
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

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast.error('File too large. Max 2 MB.'); return; }
    const reader = new FileReader();
    reader.onload = () => setResumeFile({ name: file.name, base64: reader.result.split(',')[1], type: file.type });
    reader.readAsDataURL(file);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/career-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, resumeFile }),
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
          <div className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-3">Join Our Team</div>
          <h1 className="text-4xl lg:text-5xl font-bold max-w-3xl leading-tight">Build India's Infrastructure with Us</h1>
          <p className="mt-4 text-base text-white/70 max-w-2xl">We're always looking for talented engineers, project managers and compliance professionals. Send us your details and we'll be in touch.</p>
        </div>
      </section>

      <section className="py-10 bg-white dark:bg-[#0a1628] border-b border-slate-100 dark:border-white/10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PERKS.map((p, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#0a1628] dark:bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                  <p.icon className="w-4 h-4 text-[#d4af37]" />
                </div>
                <p className="text-sm text-slate-600 dark:text-white/70 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 dark:bg-[#0d1f3c]">
        <div className="max-w-screen-sm mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-[#0a1628] rounded-2xl shadow-xl p-10 text-center border border-slate-100 dark:border-white/10">
              <div className="w-16 h-16 rounded-full bg-[#16a34a]/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-[#16a34a]" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Application Received!</h2>
              <p className="text-slate-500 dark:text-white/60 text-sm max-w-xs mx-auto">Our team will review your application and reach out within 5 working days.</p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#0a1628] rounded-2xl shadow-xl p-8 border border-slate-100 dark:border-white/10">
              <div className="mb-6">
                <div className="text-[10px] uppercase tracking-[0.2em] font-black text-[#16a34a] mb-1">Apply Now</div>
                <h2 className="text-2xl font-black text-[#0a1628] dark:text-white">Job Application</h2>
                <p className="text-slate-500 text-xs mt-1">Fields marked * are required.</p>
              </div>

              <form onSubmit={submit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-slate-600">Full Name *</Label>
                    <Input ref={refs.name} {...field('name')} className={inputClass('name')} placeholder="Your full name" />
                    <ErrorMsg k="name" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-600">Phone *</Label>
                    <Input ref={refs.phone} {...field('phone')} className={inputClass('phone')} placeholder="+91 XXXXX XXXXX" />
                    <ErrorMsg k="phone" />
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-slate-600">Email *</Label>
                  <Input ref={refs.email} type="email" {...field('email')} className={inputClass('email')} placeholder="your@email.com" />
                  <ErrorMsg k="email" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-slate-600">Position Applying For</Label>
                    <Input {...field('position')} className="mt-1 h-9 text-sm" placeholder="e.g. Electrical Engineer" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-slate-600">Total Experience</Label>
                    <Input {...field('experience')} className="mt-1 h-9 text-sm" placeholder="e.g. 5 years" />
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-semibold text-slate-600">Current Organisation</Label>
                  <Input {...field('currentOrg')} className="mt-1 h-9 text-sm" placeholder="Where you currently work (if applicable)" />
                </div>

                <div>
                  <Label className="text-xs font-semibold text-slate-600">Upload Resume <span className="text-slate-400 font-normal">(PDF / DOC / DOCX · max 2 MB)</span></Label>
                  <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="hidden" onChange={handleFile} />
                  {resumeFile ? (
                    <div className="mt-1 flex items-center gap-2 px-3 py-2 rounded-md border border-[#16a34a] bg-[#16a34a]/5">
                      <FileText className="w-4 h-4 text-[#16a34a] flex-shrink-0" />
                      <span className="text-sm text-slate-700 dark:text-white/80 truncate flex-1">{resumeFile.name}</span>
                      <button type="button" onClick={() => { setResumeFile(null); fileRef.current.value = ''; }} className="text-slate-400 hover:text-red-500 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => fileRef.current.click()}
                      className="mt-1 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border-2 border-dashed border-slate-300 dark:border-white/20 text-slate-500 dark:text-white/50 hover:border-[#d4af37] hover:text-[#d4af37] transition-colors text-sm font-medium">
                      <Upload className="w-4 h-4" /> Browse & Upload Resume
                    </button>
                  )}
                </div>

                <div>
                  <Label className="text-xs font-semibold text-slate-600">Cover Note</Label>
                  <Textarea rows={4} {...field('coverLetter')} placeholder="Briefly tell us about yourself, your skills and why you want to join IndusVertex…" className="mt-1 text-sm resize-none" />
                </div>

                <Button type="submit" disabled={loading} className="w-full font-bold text-sm" style={{ backgroundColor: '#d4af37', color: '#0a1628', height: '42px' }}>
                  {loading ? 'Submitting…' : 'Submit Application'}
                </Button>
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
