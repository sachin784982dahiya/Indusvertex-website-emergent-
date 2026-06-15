'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { COMPANY } from '@/lib/services-data';

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', company:'', subject:'', message:'' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
      const d = await res.json();
      if (d.success) { toast.success(d.message); setForm({ name:'', email:'', phone:'', company:'', subject:'', message:'' }); }
      else toast.error(d.error || 'Could not submit');
    } catch { toast.error('Network error'); }
    setLoading(false);
  };

  return (
    <div>
      <section className="flex items-center gradient-navy text-white relative overflow-hidden py-16 pt-28">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">Get in Touch</div>
          <h1 className="text-4xl lg:text-5xl font-bold max-w-3xl leading-tight">Let’s build something exceptional together.</h1>
          <p className="mt-4 text-base text-white/70 max-w-2xl">Whether it’s a new project, regulatory advisory, or a partnership opportunity — our team will respond within 24 hours.</p>
        </div>
      </section>

      <section id="inquiry" className="py-16 bg-slate-50 dark:bg-[#0d1f3c]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">

          {/* LEFT — Business Inquiry Form */}
          <div className="bg-white dark:bg-[#0a1628] rounded-2xl shadow-xl p-7 border border-slate-100 dark:border-white/10">
            <div className="mb-5">
              <div className="text-[10px] uppercase tracking-[0.2em] font-black text-[#16a34a] mb-1">Contact Us</div>
              <h2 className="text-xl font-black text-[#0a1628] dark:text-white">Business Inquiry</h2>
              <p className="text-slate-500 text-xs mt-1">Our team will respond within 24 hours with a tailored reply.</p>
            </div>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <Label className="text-xs font-semibold text-slate-600">Full Name *</Label>
                <Input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="mt-1 h-9 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold text-slate-600">Phone</Label>
                  <Input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="mt-1 h-9 text-sm" />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-slate-600">Company</Label>
                  <Input value={form.company} onChange={e=>setForm({...form,company:e.target.value})} className="mt-1 h-9 text-sm" />
                </div>
              </div>
              <div>
                <Label className="text-xs font-semibold text-slate-600">Subject</Label>
                <Input value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} placeholder="e.g. HT Line project, ETP installation…" className="mt-1 h-9 text-sm" />
              </div>
              <div>
                <Label className="text-xs font-semibold text-slate-600">Message *</Label>
                <Textarea required rows={4} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Describe your requirement, location and timeline…" className="mt-1 text-sm resize-none" />
              </div>
              <Button type="submit" disabled={loading} className="w-full font-bold text-sm" style={{backgroundColor:'#d4af37', color:'#0a1628', height:'42px'}}>
                {loading ? 'Sending…' : 'Send Message'}
              </Button>
            </form>
          </div>

          {/* RIGHT — Company Info + Map */}
          <div className="space-y-4">
            {[
              { icon: MapPin,   title: 'Head Office',        content: COMPANY.address },
              { icon: Phone,    title: 'Phone',              content: COMPANY.phone, href: `tel:${COMPANY.phoneRaw}` },
              { icon: Mail,     title: 'Email',              content: COMPANY.emails.business },
              { icon: Clock,    title: 'Working Hours',      content: 'Mon – Sat: 10:00 AM – 7:00 PM' },
              { icon: Building2,title: 'Corporate Identity', content: `CIN: ${COMPANY.cin}  ·  GSTIN: ${COMPANY.gstin}` },
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-4 bg-white dark:bg-[#0a1628] rounded-xl p-4 border border-slate-100 dark:border-white/10 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-[#0a1628] flex items-center justify-center flex-shrink-0">
                  <c.icon className="w-4 h-4 text-[#d4af37]" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-0.5">{c.title}</div>
                  {c.href
                    ? <a href={c.href} className="text-sm font-bold text-[#0a1628] dark:text-white hover:text-[#16a34a]">{c.content}</a>
                    : <div className="text-sm text-slate-700 dark:text-white/75 leading-relaxed">{c.content}</div>
                  }
                </div>
              </div>
            ))}
            <div className="rounded-xl overflow-hidden border border-slate-100 dark:border-white/10 shadow-sm">
              <iframe src="https://www.google.com/maps?q=Shastri+Nagar+Ghaziabad+Uttar+Pradesh+201002&output=embed" width="100%" height="220" style={{border:0}} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
