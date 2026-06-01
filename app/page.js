'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Award, Zap, BatteryCharging, Server, Building2, Cpu, Plug, ShieldAlert, Leaf, ClipboardCheck, Network, Scale, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SERVICES, CLIENTS, COMPANY } from '@/lib/services-data';

const ICONS = { Zap, BatteryCharging, Server, Building2, Cpu, Plug, ShieldAlert, Leaf, ClipboardCheck, Network, Scale };

function Counter({ end, suffix = '' }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let f; const start = performance.now(); const dur = 1600;
    const tick = (t) => { const p = Math.min(1, (t - start) / dur); setV(Math.floor(end * (1 - Math.pow(1 - p, 3)))); if (p < 1) f = requestAnimationFrame(tick); };
    f = requestAnimationFrame(tick); return () => cancelAnimationFrame(f);
  }, [end]);
  return <span>{v}{suffix}</span>;
}

export default function Home() {
  const stats = [
    { label: 'Projects Delivered', value: 150, suffix: '+' },
    { label: 'Enterprise Clients', value: 50, suffix: '+' },
    { label: 'Years Combined Experience', value: 40, suffix: '+' },
    { label: 'Regulatory Approvals', value: 200, suffix: '+' }
  ];
  const featured = SERVICES.slice(0, 6);

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden gradient-navy">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1543489816-c87b0f5f7dd4?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000" alt="Infrastructure" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050e1c] via-[#050e1c]/80 to-[#050e1c]/30" />
          <div className="absolute inset-0 grid-pattern opacity-40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-7">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-xs uppercase tracking-[0.18em] text-white/90 font-medium">Engineering · Infrastructure · Compliance</span>
            </div>
            <h1 className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-balance">
              Transforming Vision into <span className="text-gradient-gold">Infrastructure Reality</span>
            </h1>
            <p className="mt-7 text-lg lg:text-xl text-white/75 max-w-2xl leading-relaxed">
              IndusVertex delivers integrated engineering, infrastructure, compliance and advisory solutions — from concept and approvals to execution, operations and long-term support.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/contact"><Button size="lg" className="font-semibold text-base px-7 h-13" style={{backgroundColor:'#d4af37', color:'#0a1628', height:'52px'}}>Request Consultation <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
              <Link href="/services"><Button size="lg" variant="outline" className="font-semibold text-base px-7 bg-white/5 backdrop-blur border-white/30 text-white hover:bg-white/15 hover:text-white" style={{height:'52px'}}>Explore Services</Button></Link>
            </div>
            <div className="mt-14 flex flex-wrap items-center gap-6 text-white/60 text-sm">
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-gold" /> ISO-aligned Quality</div>
              <div className="flex items-center gap-2"><Award className="w-4 h-4 text-gold" /> CEIG / CTE-CTO Expertise</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gold" /> End-to-End EPC + O&M</div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* STATS */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="text-center">
                <div className="text-5xl lg:text-6xl font-bold text-gradient-gold mb-2"><Counter end={s.value} suffix={s.suffix} /></div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Why Choose IndusVertex</div>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">A single, accountable partner from concept to commissioning.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Technical Engineering Excellence', text: 'Multi-disciplinary expertise across power, HVAC, civil, IT and automation.' },
              { icon: ShieldCheck, title: 'Regulatory & Compliance Expertise', text: 'CEIG, CTE/CTO, PCB, Fire NOC and statutory clearances under one roof.' },
              { icon: ClipboardCheck, title: 'Strong Project Execution & O&M', text: 'Rigorous delivery discipline with long-term operations and maintenance support.' },
              { icon: Scale, title: 'Integrated Legal Coordination', text: 'IndusVertex Law Firm handles end-to-end legal and compliance coordination.' }
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <Card className="p-6 h-full hover:shadow-xl hover:-translate-y-1 transition-all border-border/60">
                  <div className="w-12 h-12 rounded-lg gradient-navy flex items-center justify-center mb-4"><f.icon className="w-6 h-6 text-gold" /></div>
                  <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Our Approach</div>
            <h2 className="text-4xl lg:text-5xl font-bold">From idea to operations — in seven disciplined stages.</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2 lg:gap-3">
            {['Concept','Feasibility','Approval','Design','Execution','Compliance','O&M'].map((step, i, arr) => (
              <div key={step} className="flex items-center">
                <div className="px-5 py-3 rounded-full bg-card border-2 border-border font-semibold text-sm lg:text-base hover:border-accent transition-colors">
                  <span className="text-accent mr-2 font-mono">0{i+1}</span>{step}
                </div>
                {i < arr.length - 1 && <ArrowRight className="w-4 h-4 mx-1 text-muted-foreground hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="py-24 gradient-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">Featured Services</div>
              <h2 className="text-4xl lg:text-5xl font-bold max-w-2xl leading-tight">End-to-end engineering across critical infrastructure verticals.</h2>
            </div>
            <Link href="/services"><Button variant="outline" className="border-white/30 text-white bg-white/5 hover:bg-white/10 hover:text-white">View All Services <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((s, i) => {
              const Ic = ICONS[s.icon] || Zap;
              return (
                <motion.div key={s.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}>
                  <Link href={`/services#${s.slug}`} className="block group">
                    <div className="glass rounded-xl overflow-hidden hover:bg-white/10 transition-all h-full">
                      <div className="relative h-44 overflow-hidden">
                        <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050e1c] to-transparent" />
                        <div className="absolute top-4 left-4 w-11 h-11 rounded-lg gradient-gold flex items-center justify-center"><Ic className="w-5 h-5 text-navy" style={{color:'#0a1628'}} /></div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-gold transition-colors">{s.title}</h3>
                        <p className="text-sm text-white/70 leading-relaxed line-clamp-3">{s.short}</p>
                        <div className="mt-4 text-sm text-gold font-semibold inline-flex items-center gap-1">Learn more <ArrowRight className="w-3.5 h-3.5" /></div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLIENTS MARQUEE */}
      <section className="py-20 bg-background border-y border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Trusted By Industry Leaders</div>
            <h2 className="text-3xl lg:text-4xl font-bold">Partnering with India’s leading enterprises</h2>
          </div>
        </div>
        <div className="relative">
          <div className="flex marquee whitespace-nowrap">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <div key={i} className="inline-flex items-center justify-center px-10 py-4 mx-2 min-w-[220px] border border-border rounded-lg bg-card text-foreground/70 font-semibold tracking-wide">
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Client Voices</div>
            <h2 className="text-4xl lg:text-5xl font-bold">What our clients say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name:'Rajeev Menon', title:'VP, Network Infrastructure', company:'Bharti Airtel', quote:'IndusVertex delivered our HT substation ahead of schedule with flawless CEIG approvals. Their integrated engineering + compliance expertise is rare.' },
              { name:'Sneha Iyer', title:'Director, DC Operations', company:'CtrlS Data Centers', quote:'From design to O&M, the precision and discipline of the IndusVertex team set a benchmark. Our hyperscale build-out went live without a single deviation.' },
              { name:'Arvind Sharma', title:'Plant Head', company:'Paswara Paper', quote:'Our solar + BESS rollout reduced grid dependency by 38%. IndusVertex managed design, approvals, execution and ongoing O&M end-to-end.' }
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <Card className="p-7 h-full bg-card border-border/60">
                  <Quote className="w-8 h-8 text-accent mb-4" />
                  <p className="text-foreground/85 leading-relaxed mb-5">“{t.quote}”</p>
                  <div className="flex gap-1 mb-3">{[...Array(5)].map((_,j)=><Star key={j} className="w-4 h-4 fill-accent text-accent" />)}</div>
                  <div className="border-t border-border pt-3">
                    <div className="font-bold">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.title} · {t.company}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden" style={{background:'linear-gradient(135deg, #050e1c 0%, #102a4a 100%)'}}>
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-xs uppercase tracking-[0.18em] text-white/90 font-medium">Let’s Build Together</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">Ready to transform your <span className="text-gradient-gold">infrastructure vision</span>?</h2>
          <p className="text-lg text-white/75 max-w-2xl mx-auto mb-10">Connect with our engineering and compliance experts for a confidential consultation tailored to your project.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact"><Button size="lg" className="font-semibold text-base px-8" style={{backgroundColor:'#d4af37', color:'#0a1628', height:'52px'}}>Request Consultation <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
            <a href={`tel:${COMPANY.phoneRaw}`}><Button size="lg" variant="outline" className="border-white/30 text-white bg-white/5 hover:bg-white/10 hover:text-white" style={{height:'52px'}}>Call {COMPANY.phone}</Button></a>
          </div>
        </div>
      </section>
    </div>
  );
}
