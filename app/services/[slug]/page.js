'use client';
import { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Zap, BatteryCharging, Server, Building2, Cpu, Plug, ShieldAlert, Leaf, ClipboardCheck, Network, Scale, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { SERVICES } from '@/lib/services-data';
import { toast } from 'sonner';

const ICONS = { Zap, BatteryCharging, Server, Building2, Cpu, Plug, ShieldAlert, Leaf, ClipboardCheck, Network, Scale };

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = SERVICES.find(s => s.slug === slug);
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' });
  const [loading, setLoading] = useState(false);

  if (!service) return notFound();

  const Ic = ICONS[service.icon] || Zap;
  const related = SERVICES.filter(s => s.slug !== slug).slice(0, 3);

  const submit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await fetch('/api/service-inquiry', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...form, service: service.title }) });
      const d = await res.json();
      if (d.success) { toast.success(d.message); setForm({ name:'', email:'', phone:'', message:'' }); }
      else toast.error(d.error || 'Submission failed');
    } catch { toast.error('Network error'); }
    setLoading(false);
  };

  return (
    <div>
      <section className="min-h-[65vh] flex items-center relative overflow-hidden gradient-navy text-white">
        <div className="absolute inset-0">
          <img src={service.image} alt={service.title} className="hero-bg-img w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,22,40,0.80) 0%, rgba(10,22,40,0.50) 100%)' }} />
          <div className="absolute inset-0 grid-pattern opacity-30" />
        </div>
        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6 pt-24 pb-16">
          <Link href="/services" className="inline-flex items-center gap-1.5 text-xs hover:text-white mb-5" style={{ color: 'rgba(255,255,255,0.80)' }}><ArrowLeft className="w-3.5 h-3.5" />All services</Link>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-xl gradient-gold flex items-center justify-center"><Ic className="w-7 h-7" style={{color:'#0a1628'}} /></div>
            <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">IndusVertex Service</div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold max-w-4xl leading-tight" style={{ color: '#ffffff' }}>{service.title}</h1>
          <p className="mt-6 text-lg max-w-3xl" style={{ color: 'rgba(255,255,255,0.85)' }}>{service.short}</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Overview</div>
              <h2 className="text-3xl font-bold mb-4">Capabilities & scope</h2>
              <p className="text-foreground/80 leading-relaxed">{service.short} Delivered end-to-end — from design and approvals to execution, commissioning and long-term operations & maintenance.</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">What we deliver</div>
              <h2 className="text-3xl font-bold mb-4">Service offerings</h2>
              <ul className="space-y-3">{service.points.map(p => (<li key={p} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" /><span className="text-foreground/85">{p}</span></li>))}</ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Process</div>
              <h2 className="text-3xl font-bold mb-4">Our delivery methodology</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Concept','Feasibility','Approval','Design','Execution','Compliance','O&M'].map((step, i) => (
                  <div key={step} className="p-4 rounded-lg bg-card border border-border">
                    <div className="text-2xl font-bold text-gradient-gold">0{i+1}</div>
                    <div className="text-sm font-semibold mt-1">{step}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Industries Served</div>
              <div className="flex flex-wrap gap-2">
                {service.industries.map(i => <span key={i} className="text-sm px-4 py-1.5 rounded-full bg-muted text-foreground/85 font-medium border border-border">{i}</span>)}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Benefits</div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  ['Single-partner accountability','End-to-end execution under one contract reduces interface risks and accelerates delivery.'],
                  ['Regulatory expertise','Deep mastery of CEIG, CTE/CTO, fire NOC and statutory clearances.'],
                  ['Quality & safety discipline','ISO-aligned processes, EHS compliance and rigorous QA/QC throughout.'],
                  ['Long-term O&M','Performance-driven operations and maintenance for sustained uptime.']
                ].map(([t,d]) => (
                  <Card key={t} className="p-5"><h4 className="font-bold mb-1">{t}</h4><p className="text-sm text-foreground/70">{d}</p></Card>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 shadow-xl sticky top-24">
              <h3 className="text-xl font-bold mb-1">Inquire about this service</h3>
              <p className="text-sm text-muted-foreground mb-5">Our team responds within 24 hours.</p>
              <form onSubmit={submit} className="space-y-3">
                <div><Label>Name *</Label><Input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="mt-1.5" /></div>
                <div><Label>Email *</Label><Input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="mt-1.5" /></div>
                <div><Label>Phone</Label><Input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="mt-1.5" /></div>
                <div><Label>Project details</Label><Textarea rows={4} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="mt-1.5" /></div>
                <Button type="submit" disabled={loading} className="w-full font-semibold" style={{backgroundColor:'#d4af37', color:'#0a1628', height:'46px'}}>{loading ? 'Sending…' : 'Submit Inquiry'}</Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Related Services</div>
          <h2 className="text-3xl font-bold mb-8">Explore related capabilities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map(r => {
              const RIc = ICONS[r.icon] || Zap;
              return (
                <Link key={r.slug} href={`/services/${r.slug}`} className="group">
                  <Card className="p-6 h-full hover:shadow-xl hover:-translate-y-1 transition-all">
                    <div className="w-11 h-11 rounded-lg gradient-navy flex items-center justify-center mb-3"><RIc className="w-5 h-5 text-gold" /></div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">{r.title}</h3>
                    <p className="text-sm text-foreground/70 line-clamp-2">{r.short}</p>
                    <div className="mt-4 text-sm text-accent font-semibold inline-flex items-center gap-1">Learn more <ArrowRight className="w-3.5 h-3.5" /></div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
