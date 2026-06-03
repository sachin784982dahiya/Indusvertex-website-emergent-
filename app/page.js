'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Award, Zap, BatteryCharging, Server, Building2, Cpu, Plug, ShieldAlert, Leaf, ClipboardCheck, Network, Scale, Star, Quote, Users, Handshake, PackageCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SERVICES, CLIENTS, COMPANY } from '@/lib/services-data';
import ClientLogo from '@/components/ClientLogo';
import ServicesWheel from '@/components/ServicesWheel';

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
      {/* ── HERO ── */}
      <section className="relative min-h-screen bg-white dark:bg-[#0a1628] flex items-center pt-20">
        {/* Background decorative elements — clipped independently */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #16a34a 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.04]"
            style={{ background: 'radial-gradient(circle, #0a1628 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6 pt-12 pb-48 w-full">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 xl:gap-10 items-center">

            {/* LEFT — Text */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              {/* Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#16a34a]/30 bg-[#16a34a]/5 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
                <span className="text-xs font-semibold text-[#16a34a] uppercase tracking-widest">Engineering · Infrastructure · Compliance</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-[1.1] mb-2">
                <span className="text-[#0a1628] dark:text-white">Integrated Engineering.</span>
              </h1>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-[1.1] mb-2">
                <span className="text-[#16a34a]">Sustainable Solutions.</span>
              </h1>
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-[1.1] mb-5">
                <span className="text-[#0a1628] dark:text-white">Stronger Tomorrow.</span>
              </h1>

              {/* Gold underline */}
              <div className="w-24 h-1 rounded-full mb-6" style={{ background: 'linear-gradient(90deg, #d4af37, #f4d36b)' }} />

              <p className="text-gray-600 dark:text-white/70 text-base lg:text-lg leading-relaxed max-w-xl mb-8">
                Empowering industries with end-to-end infrastructure, advanced technology, and environmental responsibility to build a smarter and sustainable future.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 mb-10">
                <Link href="/contact">
                  <Button size="lg" className="font-semibold px-7" style={{ backgroundColor: '#0a1628', color: '#fff', height: '52px' }}>
                    Request Consultation <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* 4 badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: ShieldCheck, label: 'Engineering Excellence' },
                  { icon: Leaf, label: 'Sustainable Solutions' },
                  { icon: Users, label: 'Trusted Partnerships' },
                  { icon: PackageCheck, label: 'End-to-End Delivery' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-white border-2 border-[#16a34a]/20 shadow-md hover:shadow-lg hover:border-[#16a34a]/50 transition-all">
                    <Icon className="w-7 h-7 text-[#16a34a]" />
                    <span className="text-sm font-bold text-[#0a1628] leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — Services Wheel */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:flex items-center justify-center pr-4"
              style={{ minWidth: 0 }}>
              <div className="w-full max-w-[640px]">
                <ServicesWheel />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom visual strip */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '160px', overflow: 'hidden' }}>
          {/* Top fade */}
          <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, white 0%, transparent 50%)' }} />

          {/* Left — city skyline image */}
          <div className="absolute left-0 top-0 bottom-0" style={{ width: '38%', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?crop=entropy&cs=srgb&fm=jpg&q=80&w=800"
              className="w-full h-full object-cover object-center" style={{ opacity: 0.65 }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, white 100%)' }} />
          </div>

          {/* Right — solar/wind energy image */}
          <div className="absolute right-0 top-0 bottom-0" style={{ width: '38%', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=srgb&fm=jpg&q=80&w=800"
              className="w-full h-full object-cover object-center" style={{ opacity: 0.65 }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to left, transparent 60%, white 100%)' }} />
          </div>

          {/* Center — SVG waves blending both sides */}
          <svg className="absolute bottom-0 left-0 w-full z-20" viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none">
            <defs>
              <linearGradient id="wg1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#16a34a" stopOpacity="0.18" />
                <stop offset="50%" stopColor="#d4af37" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#16a34a" stopOpacity="0.18" />
              </linearGradient>
            </defs>
            <path d="M0,40 C360,10 720,65 1080,30 C1260,12 1380,50 1440,28 L1440,80 L0,80 Z" fill="url(#wg1)" />
            <path d="M0,35 C400,8 800,58 1200,22 C1320,10 1400,42 1440,20" stroke="#16a34a" strokeWidth="2.5" strokeOpacity="0.7" />
            <path d="M0,50 C300,25 700,68 1050,42 C1260,26 1380,58 1440,40" stroke="#d4af37" strokeWidth="2" strokeOpacity="0.65" />
            <path d="M0,62 C360,42 800,75 1100,55 C1280,42 1380,68 1440,55" stroke="#0a1628" strokeWidth="1.5" strokeOpacity="0.35" />
          </svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-[#d4af37] mb-1"><Counter end={s.value} suffix={s.suffix} /></div>
                <div className="text-xs text-white/60 uppercase tracking-wider font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-[#16a34a] font-semibold mb-3">Why Choose IndusVertex</div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0a1628] leading-tight">A single, accountable partner from concept to commissioning.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Technical Engineering Excellence', text: 'Multi-disciplinary expertise across power, HVAC, civil, IT and automation.' },
              { icon: ShieldCheck, title: 'Regulatory & Compliance Expertise', text: 'CEIG, CTE/CTO, PCB, Fire NOC and statutory clearances under one roof.' },
              { icon: ClipboardCheck, title: 'Strong Project Execution & O&M', text: 'Rigorous delivery discipline with long-term operations and maintenance support.' },
              { icon: Scale, title: 'Integrated Legal Coordination', text: 'IndusVertex Law Firm handles end-to-end legal and compliance coordination.' }
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <Card className="p-6 h-full hover:shadow-xl hover:-translate-y-1 transition-all border-border/60 bg-white">
                  <div className="w-12 h-12 rounded-xl bg-[#0a1628] flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-[#0a1628]">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPROACH ── */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-[#16a34a] font-semibold mb-3">Our Approach</div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0a1628]">From idea to operations — in seven disciplined stages.</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2 lg:gap-3">
            {['Concept','Feasibility','Approval','Design','Execution','Compliance','O&M'].map((step, i, arr) => (
              <div key={step} className="flex items-center">
                <div className="px-5 py-3 rounded-full bg-white border-2 border-gray-200 font-semibold text-sm hover:border-[#16a34a] hover:text-[#16a34a] transition-colors text-[#0a1628]">
                  <span className="text-[#d4af37] mr-2 font-mono font-bold">0{i+1}</span>{step}
                </div>
                {i < arr.length - 1 && <ArrowRight className="w-4 h-4 mx-1 text-gray-300 hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED SERVICES ── */}
      <section className="py-20 bg-[#0a1628] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-[#16a34a] font-semibold mb-3">Featured Services</div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white max-w-2xl leading-tight">End-to-end engineering across critical infrastructure verticals.</h2>
            </div>
            <Link href="/services">
              <Button variant="outline" className="border-white/30 text-white bg-white/5 hover:bg-white/10 hover:text-white">
                View All Services <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((s, i) => {
              const Ic = ICONS[s.icon] || Zap;
              return (
                <motion.div key={s.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}>
                  <Link href={`/services/${s.slug}`} className="block group">
                    <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 transition-all h-full">
                      <div className="relative h-44 overflow-hidden">
                        <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-[#d4af37] flex items-center justify-center">
                          <Ic className="w-5 h-5" style={{ color: '#0a1628' }} />
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-base text-white mb-1.5 group-hover:text-[#16a34a] transition-colors">{s.title}</h3>
                        <p className="text-sm text-white/60 leading-relaxed line-clamp-2">{s.short}</p>
                        <div className="mt-3 text-sm text-[#16a34a] font-semibold inline-flex items-center gap-1">Learn more <ArrowRight className="w-3.5 h-3.5" /></div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CLIENTS MARQUEE ── */}
      <section className="py-16 bg-white border-y border-gray-100 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6 mb-10">
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.2em] text-[#16a34a] font-semibold mb-3">Trusted By Industry Leaders</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0a1628]">Partnering with India's leading enterprises</h2>
          </div>
        </div>
        <div className="relative">
          <div className="flex marquee whitespace-nowrap">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <div key={i} className="inline-flex items-center justify-center gap-3 px-8 py-5 mx-2 min-w-[240px] h-24 border border-gray-100 rounded-xl bg-white shadow-sm">
                <ClientLogo client={c} variant="inline" size="md" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-[#16a34a] font-semibold mb-3">Client Voices</div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0a1628]">What our clients say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name:'A.K. Srivastava', title:'VP, Infrastructure', company:'Telecom Sector', quote:'IndusVertex delivered our HT substation ahead of schedule with flawless CEIG approvals. Their integrated engineering + compliance expertise is rare.' },
              { name:'Priya Nair', title:'Director, DC Operations', company:'Data Centre Industry', quote:'From design to O&M, the precision and discipline of the IndusVertex team set a benchmark. Our hyperscale build-out went live without a single deviation.' },
              { name:'Rajesh Gupta', title:'Plant Head', company:'Manufacturing Sector', quote:'Our solar + BESS rollout reduced grid dependency by 38%. IndusVertex managed design, approvals, execution and ongoing O&M end-to-end.' }
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <Card className="p-7 h-full bg-white border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <Quote className="w-8 h-8 text-[#16a34a] mb-4" />
                  <p className="text-gray-600 leading-relaxed mb-5 italic">"{t.quote}"</p>
                  <div className="flex gap-1 mb-3">{[...Array(5)].map((_,j)=><Star key={j} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />)}</div>
                  <div className="border-t border-gray-100 pt-3">
                    <div className="font-bold text-[#0a1628]">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.title} · {t.company}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#0a1628] relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #16a34a, transparent 70%)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#16a34a]/40 bg-[#16a34a]/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-[#16a34a] font-semibold">Let's Build Together</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            Ready to transform your<br />
            <span style={{ color: '#d4af37' }}>infrastructure vision?</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
            Connect with our engineering and compliance experts for a confidential consultation tailored to your project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="font-semibold px-8" style={{ backgroundColor: '#d4af37', color: '#0a1628', height: '52px' }}>
                Request Consultation <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <a href={`tel:${COMPANY.phoneRaw}`}>
              <Button size="lg" variant="outline" className="border-white/30 text-white bg-white/5 hover:bg-white/10 hover:text-white" style={{ height: '52px' }}>
                Call {COMPANY.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
