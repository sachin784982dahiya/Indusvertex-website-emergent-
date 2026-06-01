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
      <section className="pt-36 pb-20 gradient-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">Get in Touch</div>
          <h1 className="text-5xl lg:text-6xl font-bold max-w-4xl leading-tight">Let’s build something exceptional together.</h1>
          <p className="mt-6 text-lg text-white/75 max-w-3xl">Whether it’s a new project, regulatory advisory, or a partnership opportunity — our team will respond within 24 hours.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-5">
            {[
              { icon: MapPin, title:'Head Office', text: COMPANY.address },
              { icon: Phone, title:'Phone', text: COMPANY.phone, href:`tel:${COMPANY.phoneRaw}` },
              { icon: Mail, title:'Email', text: <div className="space-y-1"><div>{COMPANY.emails.info}</div><div className="text-muted-foreground text-xs">Business: {COMPANY.emails.business}</div><div className="text-muted-foreground text-xs">Legal: {COMPANY.emails.legal}</div></div> },
              { icon: Clock, title:'Working Hours', text: 'Mon – Sat: 10:00 AM – 7:00 PM' },
              { icon: Building2, title:'Corporate Identity', text: <div><div>CIN: {COMPANY.cin}</div><div>GSTIN: {COMPANY.gstin}</div></div> }
            ].map((c, i) => (
              <Card key={i} className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-lg gradient-navy flex items-center justify-center flex-shrink-0"><c.icon className="w-5 h-5 text-gold" /></div>
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">{c.title}</div>
                    {c.href ? <a href={c.href} className="text-foreground font-semibold hover:text-accent">{c.text}</a> : <div className="text-foreground/85 text-sm leading-relaxed">{c.text}</div>}
                  </div>
                </div>
              </Card>
            ))}
            <Card className="overflow-hidden p-0">
              <iframe src="https://www.google.com/maps?q=Shastri+Nagar+Ghaziabad+Uttar+Pradesh+201002&output=embed" width="100%" height="250" style={{border:0}} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
            </Card>
          </div>
          <div className="lg:col-span-3">
            <Card className="p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-2">Business Inquiry</h2>
              <p className="text-foreground/70 text-sm mb-6">Share your requirement and our team will revert with a tailored response.</p>
              <form onSubmit={submit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div><Label>Full Name *</Label><Input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="mt-1.5" /></div>
                  <div><Label>Email *</Label><Input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="mt-1.5" /></div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div><Label>Phone</Label><Input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="mt-1.5" /></div>
                  <div><Label>Company / Organization</Label><Input value={form.company} onChange={e=>setForm({...form,company:e.target.value})} className="mt-1.5" /></div>
                </div>
                <div><Label>Subject</Label><Input value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} placeholder="e.g. Data Centre project, Solar+BESS RFQ…" className="mt-1.5" /></div>
                <div><Label>Message *</Label><Textarea required rows={6} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell us about your requirement…" className="mt-1.5" /></div>
                <Button type="submit" disabled={loading} size="lg" className="w-full font-semibold text-base" style={{backgroundColor:'#d4af37', color:'#0a1628', height:'52px'}}>{loading ? 'Sending…' : 'Send Message'}</Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
