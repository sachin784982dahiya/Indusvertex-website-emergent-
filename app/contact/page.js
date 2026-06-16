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
    e.preventDefault();
    // Validate
    if (!form.name.trim()) { toast.error('Full name is required'); return; }
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) { toast.error('Enter a valid 10-digit phone number'); return; }
    if (!form.company.trim()) { toast.error('Company name is required'); return; }
    if (!form.message.trim()) { toast.error('Message is required'); return; }
    setLoading(true);
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
      <section id="inquiry" className="pt-32 pb-16 bg-slate-50 dark:bg-[#0d1f3c]">
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
                  <Label className="text-xs font-semibold text-slate-600">Phone *</Label>
                  <Input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="mt-1 h-9 text-sm" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-slate-600">Company *</Label>
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
            {/* Head Office card — special layout with map thumbnail */}
            <a href={COMPANY.mapUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-4 bg-white dark:bg-[#0a1628] rounded-xl p-4 border border-slate-100 dark:border-white/10 shadow-sm hover:border-[#d4af37] transition-colors">
              <div className="w-9 h-9 rounded-lg bg-[#0a1628] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-[#d4af37]" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-0.5">Head Office</div>
                <div className="text-sm text-slate-700 dark:text-white/75 leading-relaxed">
                  IndusVertex House, Plot No 8, Kh No 579,<br />
                  Avantika Phase 2, Shastri Nagar, Ghaziabad – 201002
                </div>
              </div>
              <a href={COMPANY.mapUrl} target="_blank" rel="noopener noreferrer"
                className="flex-shrink-0 rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 hover:border-[#d4af37] transition-colors"
                onClick={e => e.stopPropagation()}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.8!2d77.4896617!3d28.675974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf30075a339f9%3A0x5a1486982497e362!2sIndusVertex%20Law%20Firm!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin"
                  width="110" height="80" style={{border:0, pointerEvents:'none'}} loading="lazy"
                />
              </a>
            </a>

            {/* Other contact cards */}
            {[
              { icon: Phone,    title: 'Mobile',             content: COMPANY.phone, href: `tel:${COMPANY.phoneRaw}` },
              { icon: Phone,    title: 'Landline',           content: COMPANY.landline, href: `tel:${COMPANY.landlineRaw}` },
              { icon: Mail,     title: 'Email',              content: `${COMPANY.emails.business}\n${COMPANY.emails.info}` },
              { icon: Clock,    title: 'Working Hours',      content: 'Mon – Sat: 10:00 AM – 7:00 PM' },
              { icon: Building2,title: 'Corporate Identity', content: `CIN: ${COMPANY.cin}  ·  GSTIN: ${COMPANY.gstin}` },
            ].map((c, i) => {
              const inner = (
                <>
                  <div className="w-9 h-9 rounded-lg bg-[#0a1628] flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-4 h-4 text-[#d4af37]" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-0.5">{c.title}</div>
                    <div className="text-sm text-slate-700 dark:text-white/75 leading-relaxed whitespace-pre-line">{c.content}</div>
                  </div>
                </>
              );
              return c.href
                ? <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 bg-white dark:bg-[#0a1628] rounded-xl p-4 border border-slate-100 dark:border-white/10 shadow-sm hover:border-[#d4af37] transition-colors">{inner}</a>
                : <div key={i} className="flex items-start gap-4 bg-white dark:bg-[#0a1628] rounded-xl p-4 border border-slate-100 dark:border-white/10 shadow-sm">{inner}</div>;
            })}
          </div>

        </div>
      </section>
    </div>
  );
}
