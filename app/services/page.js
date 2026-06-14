'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, BatteryCharging, Server, Building2, Cpu, Plug, ShieldAlert, Leaf, ClipboardCheck, Network, Scale, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { SERVICES } from '@/lib/services-data';

const ICONS = { Zap, BatteryCharging, Server, Building2, Cpu, Plug, ShieldAlert, Leaf, ClipboardCheck, Network, Scale };

export default function Services() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', service:'', message:'' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await fetch('/api/service-inquiry', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.success) { toast.success(data.message); setForm({ name:'', email:'', phone:'', service:'', message:'' }); }
      else toast.error(data.error || 'Could not submit');
    } catch { toast.error('Network error'); }
    setLoading(false);
  };

  return (
    <div>
      <section className="min-h-[65vh] flex items-center gradient-navy text-white relative overflow-hidden">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?crop=entropy&cs=srgb&fm=jpg&q=70&w=1800"
          alt="Services background"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0.65 }}
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,22,40,0.70) 0%, rgba(10,22,40,0.35) 100%)' }} />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6 pt-24 pb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">Our Services</div>
          <h1 className="text-5xl lg:text-6xl font-bold max-w-4xl leading-tight">Integrated engineering, infrastructure & compliance solutions.</h1>
          <p className="mt-6 text-lg text-white/75 max-w-3xl">11 service verticals — delivered end-to-end with single-partner accountability across the entire project lifecycle.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6 space-y-20">
          {SERVICES.map((s, idx) => {
            const Ic = ICONS[s.icon] || Zap;
            const reverse = idx % 2 === 1;
            return (
              <motion.div key={s.slug} id={s.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="scroll-mt-24">
                <div className={`grid lg:grid-cols-2 gap-10 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden h-80 lg:h-96 shadow-2xl">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="w-14 h-14 rounded-xl gradient-gold flex items-center justify-center mb-3"><Ic className="w-7 h-7 text-navy" style={{color:'#0a1628'}} /></div>
                      <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Service 0{idx+1}</div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">{s.title}</h2>
                    <p className="text-foreground/75 leading-relaxed mb-6">{s.short}</p>
                    <ul className="space-y-3 mb-6">
                      {s.points.map(p => (
                        <li key={p} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" /><span className="text-foreground/80">{p}</span></li>
                      ))}
                    </ul>
                    {s.achievement && (
                      <div className="mb-6 p-4 rounded-xl border border-[#d4af37]/40 bg-[#d4af37]/8" style={{background:'rgba(212,175,55,0.07)'}}>
                        <p className="text-sm text-[#0a1628] font-medium leading-relaxed">{s.achievement}</p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {s.industries.map(i => <span key={i} className="text-xs px-3 py-1 rounded-full bg-muted text-foreground/70 font-medium">{i}</span>)}
                    </div>
                    <Button onClick={() => { setForm(f => ({ ...f, service: s.title })); document.getElementById('inquiry')?.scrollIntoView({ behavior:'smooth' }); }} className="font-semibold" style={{backgroundColor:'#0a1628', color:'#fff'}}>Inquire about this service <ArrowRight className="ml-2 w-4 h-4" /></Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section id="inquiry" className="py-24 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="text-center mb-10">
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Service Inquiry</div>
            <h2 className="text-4xl lg:text-5xl font-bold">Tell us about your project</h2>
            <p className="text-foreground/70 mt-3">Share your requirement — our experts will respond within 24 hours.</p>
          </div>
          <Card className="p-8 shadow-xl">
            <form onSubmit={submit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div><Label>Full Name *</Label><Input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="mt-1.5" /></div>
                <div><Label>Email *</Label><Input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="mt-1.5" /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div><Label>Phone</Label><Input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="mt-1.5" /></div>
                <div><Label>Service of Interest</Label>
                  <select value={form.service} onChange={e=>setForm({...form,service:e.target.value})} className="mt-1.5 w-full h-10 px-3 rounded-md border border-input bg-background text-sm">
                    <option value="">Select a service…</option>
                    {SERVICES.map(s => <option key={s.slug} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
              </div>
              <div><Label>Project Details</Label><Textarea rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Describe your project scope, location, timeline…" className="mt-1.5" /></div>
              <Button type="submit" disabled={loading} size="lg" className="w-full font-semibold text-base" style={{backgroundColor:'#d4af37', color:'#0a1628', height:'52px'}}>{loading ? 'Submitting…' : 'Submit Inquiry'}</Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}
