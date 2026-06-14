'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Target, Eye, Award, Users, ShieldCheck, Zap, ClipboardCheck, Scale, CheckCircle2, Leaf, Plug, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TRACK_RECORD = [
  { value: '150+', label: 'Projects Delivered', sub: 'Across HT power, EV, ETP & compliance' },
  { value: '1500+', label: 'Statutory Approvals', sub: 'CEIG, PCB, CTE/CTO — Pan India' },
  { value: '50+', label: 'Enterprise Clients', sub: 'Airtel, Tata, VI, Indus Towers & more' },
  { value: '40+', label: 'Years Combined Experience', sub: 'Engineering, compliance & legal' },
];

const REAL_PROJECTS = [
  { tag: 'Power Transmission', title: '1250 kVA Package Substation', client: 'Vodafone Idea Limited', location: 'Meerut, UP', detail: 'Full HT/LT installation, cable laying, earthing, lightning protection, testing & energization.', color: '#ea580c' },
  { tag: 'HT Infrastructure', title: '12 km 11 kV HT Line', client: 'Indus Towers', location: 'Dudu, Jaipur, Rajasthan', detail: 'Route survey, pole erection, conductor stringing, earthing & utility coordination for telecom backbone.', color: '#ea580c' },
  { tag: 'Data Centre', title: 'HT Express Feeder', client: 'Nxtra by Airtel', location: 'Varanasi, UP', detail: 'Dedicated HT express feeder — cable laying, termination, panel interfacing & energization for critical DC ops.', color: '#0891b2' },
  { tag: 'EV Infrastructure', title: 'EV Charging Station Network', client: 'Statiq', location: 'Rajasthan', detail: 'Site assessment, HT/LT power distribution, charger installation, earthing, network monitoring & handover.', color: '#0891b2' },
  { tag: 'Environmental', title: '4 KLD ETP Installation', client: 'Manor & Mews', location: 'Jaipur, Rajasthan', detail: 'Design, supply & commissioning of 4 KLD ETP with PCB compliance, electrical panels & O&M handover.', color: '#059669' },
  { tag: 'Compliance', title: '1500+ CEIG & PCB Approvals', client: 'Airtel, Tata Projects, VI Controls & others', location: 'Pan India', detail: 'End-to-end statutory filings — drawings, inspections, CTE/CTO, CEIG clearances across telecom & DC sectors.', color: '#9333ea' },
];

const STRENGTHS = [
  {
    icon: Zap,
    title: 'HT/LT Power Infrastructure',
    stat: '150+ Projects Executed',
    text: 'Substations (PSS/CSS/GIS), HT line erection, transformer installation, cable laying & termination, earthing and protection systems — for telecom, data centres and industry.',
    color: '#ea580c',
  },
  {
    icon: ShieldCheck,
    title: 'Statutory & Regulatory Compliance',
    stat: '1500+ Approvals Secured',
    text: 'Full-cycle management of CEIG approvals, Electrical Inspectorate clearances, PCB Consent to Establish & Operate, Fire NOCs and utility coordination across India.',
    color: '#9333ea',
  },
  {
    icon: ClipboardCheck,
    title: 'End-to-End Project Execution',
    stat: 'Design → Commissioning → Handover',
    text: 'Single-partner accountability from site survey, engineering design and BOQ through procurement, installation, testing, commissioning and documentation handover.',
    color: '#0891b2',
  },
  {
    icon: Leaf,
    title: 'Green & Environmental Engineering',
    stat: 'ETP · STP · WTP · ZLD · OCEMS',
    text: 'Effluent and sewage treatment plants, zero liquid discharge systems, online emission monitoring and environmental compliance documentation built into every project.',
    color: '#16a34a',
  },
  {
    icon: Plug,
    title: 'EV Charging Infrastructure',
    stat: 'AC/DC · HT/LT · Network Integrated',
    text: 'Load assessment, power distribution design, charger installation, earthing & lightning protection, network monitoring integration and PCB compliance for EV networks.',
    color: '#0891b2',
  },
];

const STAGES = [
  { step: '01', label: 'Concept', desc: 'Feasibility & scope definition' },
  { step: '02', label: 'Design', desc: 'SLDs, BOQ & engineering drawings' },
  { step: '03', label: 'Approval', desc: 'CEIG, PCB & utility clearances' },
  { step: '04', label: 'Procurement', desc: 'Supply of materials & equipment' },
  { step: '05', label: 'Execution', desc: 'Installation & civil works' },
  { step: '06', label: 'Testing', desc: 'T&C, energization & compliance' },
  { step: '07', label: 'Handover', desc: 'Documentation & O&M support' },
];

const SECTORS = [
  'Telecom Towers & Infrastructure',
  'Data Centres & Hyperscale Facilities',
  'Hospitality & Commercial Real Estate',
  'Industrial & Manufacturing',
  'EV Mobility & Charging Networks',
  'Renewable Energy Projects',
  'Government & PSU Infrastructure',
  'Healthcare & Institutional',
];

export default function About() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="min-h-[65vh] flex items-center bg-[#0a1628] text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #16a34a12 0%, transparent 55%), radial-gradient(circle at 80% 20%, #d4af3712 0%, transparent 50%)' }} />
        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6 pt-24 pb-16 w-full">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-3">About IndusVertex</div>
            <h1 className="text-5xl lg:text-6xl font-black max-w-4xl leading-tight mb-6">
              India's integrated engineering, infrastructure & compliance company.
            </h1>
            <p className="text-lg text-white/70 max-w-3xl leading-relaxed mb-10">
              From 11 kV HT lines and 1250 kVA substations to EV charging networks and 1500+ statutory approvals — IndusVertex delivers complex infrastructure with single-partner accountability, on time and on spec.
            </p>
            {/* Hero stats row */}
            <div className="flex flex-wrap gap-8">
              {TRACK_RECORD.map(t => (
                <div key={t.label}>
                  <div className="text-3xl font-black" style={{ color: '#d4af37' }}>{t.value}</div>
                  <div className="text-sm font-bold text-white">{t.label}</div>
                  <div className="text-xs text-white/45">{t.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── COMPANY PROFILE ── */}
      <section className="py-20 bg-background">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6 grid lg:grid-cols-5 gap-14 items-start">
          <div className="lg:col-span-3 space-y-5 text-foreground/80 leading-relaxed">
            <div className="text-xs uppercase tracking-[0.2em] text-[#16a34a] font-bold mb-2">Company Profile</div>
            <h2 className="text-3xl lg:text-4xl font-black text-[#0a1628] dark:text-white leading-tight mb-4">
              Built on real projects. Proven across India's toughest infrastructure challenges.
            </h2>
            <p>
              IndusVertex Private Limited is a multi-discipline engineering, infrastructure and compliance company headquartered in India. We specialize in HT/LT power infrastructure, transformer testing & maintenance, EV charging networks, environmental treatment plants (ETP/STP/WTP/ZLD), data centre power systems, fire safety and statutory regulatory approvals.
            </p>
            <p>
              Our project portfolio spans 150+ executed assignments for some of India's leading enterprises — including Bharti Airtel, Vodafone Idea, Tata Projects, Indus Towers, Nxtra Data (Airtel), Statiq EV and Manor & Mews. Whether it is a 12 km 11 kV HT line for telecom backbone power in Rajasthan, a 1250 kVA Package Substation for Vi in Uttar Pradesh, a dedicated HT express feeder for a hyperscale data centre in Varanasi, or 1500+ CEIG and PCB statutory approvals across telecom and data centre sectors — IndusVertex has delivered it, on ground, with zero compromise on quality or compliance.
            </p>
            <p>
              What sets us apart is our integrated model. Engineering, procurement, statutory compliance, environmental solutions and legal advisory — all under one roof, with one accountable team. No fragmented sub-contracting, no handoff gaps. Our clients get a single point of contact from site survey to final commissioning and handover documentation.
            </p>

            {/* Sectors served */}
            <div className="pt-2">
              <div className="text-xs uppercase tracking-widest font-black text-[#0a1628] dark:text-white mb-3">Sectors We Serve</div>
              <div className="grid grid-cols-2 gap-2">
                {SECTORS.map(s => (
                  <div key={s} className="flex items-center gap-2 text-sm text-foreground/75">
                    <CheckCircle2 className="w-4 h-4 text-[#16a34a] flex-shrink-0" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-5">
            <Card className="p-7 border-l-4" style={{ borderColor: '#16a34a' }}>
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-6 h-6" style={{ color: '#16a34a' }} />
                <h3 className="text-xl font-black">Our Mission</h3>
              </div>
              <p className="text-foreground/75 leading-relaxed">
                To deliver reliable, compliant and technology-driven infrastructure that empowers India's enterprises, institutions and communities to grow — with confidence and without compromise.
              </p>
            </Card>
            <Card className="p-7 border-l-4" style={{ borderColor: '#d4af37' }}>
              <div className="flex items-center gap-3 mb-3">
                <Eye className="w-6 h-6" style={{ color: '#d4af37' }} />
                <h3 className="text-xl font-black">Our Vision</h3>
              </div>
              <p className="text-foreground/75 leading-relaxed">
                To be India's most trusted integrated engineering and compliance partner — recognized for execution excellence, regulatory mastery, and future-ready infrastructure solutions at every scale.
              </p>
            </Card>
            <Card className="p-7 border-l-4" style={{ borderColor: '#0891b2' }}>
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-6 h-6" style={{ color: '#0891b2' }} />
                <h3 className="text-xl font-black">Our Commitment</h3>
              </div>
              <p className="text-foreground/75 leading-relaxed">
                Every project is delivered with full documentation, regulatory compliance, safety sign-off and handover to client standards — no shortcuts, no loose ends.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ── REAL PROJECTS SNAPSHOT ── */}
      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#16a34a] font-bold mb-1">Work On Ground</div>
              <h2 className="text-2xl font-black text-white">Projects that define us</h2>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d4af37] hover:gap-3 transition-all">
              View All Projects <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REAL_PROJECTS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="rounded-xl p-5 border"
                style={{ background: `${p.color}0d`, borderColor: `${p.color}30` }}
              >
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black text-white mb-3" style={{ background: p.color }}>{p.tag}</span>
                <h3 className="text-white font-black text-base leading-snug mb-1">{p.title}</h3>
                <div className="flex items-center gap-1.5 mb-2">
                  <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: p.color }} />
                  <span className="text-[11px] font-semibold" style={{ color: p.color }}>{p.client} · {p.location}</span>
                </div>
                <p className="text-white/55 text-[11px] leading-relaxed">{p.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE STRENGTHS ── */}
      <section className="py-20 bg-slate-50 dark:bg-[#0d1f3c]">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="max-w-3xl mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-[#16a34a] font-bold mb-3">Core Strengths</div>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0a1628] dark:text-white leading-tight">What makes IndusVertex different.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STRENGTHS.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}>
                <Card className="p-6 h-full hover:shadow-xl transition-all hover:-translate-y-1 bg-white dark:bg-[#0a1628]">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${s.color}15` }}>
                    <s.icon className="w-6 h-6" style={{ color: s.color }} />
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: s.color }}>{s.stat}</div>
                  <h3 className="font-black text-lg mb-2 text-[#0a1628] dark:text-white leading-snug">{s.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-white/55 leading-relaxed">{s.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7-STAGE METHODOLOGY ── */}
      <section className="py-20 bg-white dark:bg-[#081020]">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-[#16a34a] font-bold mb-3">Our Delivery Model</div>
            <h2 className="text-4xl lg:text-5xl font-black text-[#0a1628] dark:text-white">From idea to operations — seven disciplined stages.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {STAGES.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                <div className="relative bg-white dark:bg-[#0a1628] border-2 border-slate-100 dark:border-white/10 rounded-xl p-5 text-center hover:border-[#16a34a] hover:shadow-lg transition-all group">
                  <div className="text-2xl font-black mb-1 group-hover:scale-110 transition-transform" style={{ color: '#d4af37' }}>{s.step}</div>
                  <div className="text-sm font-black text-[#0a1628] dark:text-white mb-1">{s.label}</div>
                  <div className="text-[10px] text-slate-400 leading-tight">{s.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM CTA ── */}
      <section className="py-20 bg-[#0a1628] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #16a34a0f 0%, transparent 60%)' }} />
        <div className="relative">
          <Users className="w-12 h-12 mx-auto text-[#d4af37] mb-5" />
          <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-3">The people behind the work</p>
          <h2 className="text-4xl font-black mb-4">Meet the leadership behind IndusVertex</h2>
          <p className="text-white/55 mb-8 max-w-2xl mx-auto leading-relaxed">
            A team of engineers, financial strategists and legal experts with decades of combined experience across power infrastructure, regulatory compliance and environmental engineering.
          </p>
          <Link href="/team">
            <Button size="lg" className="font-bold" style={{ backgroundColor: '#d4af37', color: '#0a1628', height: '48px' }}>
              Meet Our Team <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
