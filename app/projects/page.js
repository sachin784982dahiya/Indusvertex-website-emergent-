'use client';
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Calendar, CheckCircle2, Zap, ChevronRight, ArrowRight, X, ZoomIn } from 'lucide-react';
import Link from 'next/link';

/* ── LIGHTBOX ───────────────────────────────────────────────────────────── */
function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.9)' }}
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>
        <motion.img
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.25 }}
          src={src}
          alt={alt}
          className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </motion.div>
    </AnimatePresence>
  );
}

const CAT_COLORS = {
  'Power Transmission':  { bg: '#fff7ed', border: '#f97316', badge: '#ea580c', text: '#9a3412', light: '#fff3e0' },
  'EV Infrastructure':   { bg: '#ecfeff', border: '#06b6d4', badge: '#0891b2', text: '#164e63', light: '#e0f7fa' },
  'Environmental':       { bg: '#f0fdf4', border: '#10b981', badge: '#059669', text: '#064e3b', light: '#e8f5e9' },
  'Statutory Compliance':{ bg: '#faf5ff', border: '#a855f7', badge: '#9333ea', text: '#581c87', light: '#f3e5f5' },
};

const SEED_PROJECTS = [
  {
    id: '2',
    no: 'PRJ-PSS-002',
    title: '1250 kVA Package Substation (PSS) Installation – Meerut, Uttar Pradesh',
    client: 'Vodafone Idea Limited',
    location: 'Meerut, Uttar Pradesh',
    category: 'Power Transmission',
    status: 'Completed',
    value: '1250 kVA PSS',
    duration: 'Within Schedule',
    specs: [
      { label: 'Capacity', value: '1250 kVA' },
      { label: 'Type', value: 'Package Substation (PSS)' },
      { label: 'Works', value: 'HT/LT Cable Laying & Termination' },
      { label: 'Protection', value: 'Earthing & Lightning' },
    ],
    highlights: [
      'Installation & commissioning of 1250 kVA Package Substation (PSS)',
      'Transformer, HT switchgear, LT panel & associated electrical equipment',
      'HT/LT cable laying, termination & interconnection works',
      'Earthing & lightning protection system installation',
      'Testing of transformer, switchgear & power cables',
      'Pre-commissioning checks, system integration & energization',
      'Compliance with client specs, utility standards & safety requirements',
      'Successful handover within scheduled timeline',
    ],
    scope: ['Package Substation Installation', 'HT & LT Electrical Works', 'Cable Laying & Termination', 'Earthing & Lightning Protection', 'Testing & Commissioning', 'Utility Coordination & Energization'],
    outcome: '✔ Successfully commissioned 1250 kVA Package Substation (PSS) for Vodafone Idea Limited at Meerut — ensuring reliable and uninterrupted power supply for telecom infrastructure operations.',
    image: '/images/projects/ht-panel-vi-meerut.jpg',
    featured: true,
  },
  {
    id: '5',
    no: 'PRJ-TFR-005',
    title: 'Transformer Testing, Diagnostics & Maintenance – HT Infrastructure',
    client: 'Multiple HT Power Infrastructure Clients',
    location: 'Pan India',
    category: 'Power Transmission',
    status: 'Completed',
    value: 'Multi-Project Portfolio',
    duration: 'Ongoing Portfolio',
    specs: [
      { label: 'Tests', value: 'IR / PI / WTI / BDV' },
      { label: 'Service', value: 'Oil Filtration & Top-up' },
      { label: 'Activity', value: 'Preventive Maintenance' },
      { label: 'Output', value: 'Test Reports & Compliance' },
    ],
    scope: ['IR & PI Testing', 'WTI Inspection & Calibration', 'Transformer Oil BDV Testing', 'Oil Filtration & Top-up', 'Preventive Maintenance', 'Compliance Documentation'],
    outcome: 'Transformer testing & preventive maintenance across HT power, telecom, data centre and industrial projects — ensuring reliable and safe operation with full compliance documentation.',
    image: '/images/projects/ht-transformer-yard.jpg',
    featured: true,
  },
  {
    id: '6',
    no: 'PRJ-HT-006',
    title: '11 kV HT Line Project – Dudu, Jaipur, Rajasthan',
    client: 'Indus Towers',
    location: 'Dudu, Jaipur, Rajasthan',
    category: 'Power Transmission',
    status: 'Completed',
    value: '12 km HT Line',
    duration: 'Within Schedule',
    specs: [
      { label: 'Voltage', value: '11 kV HT Line' },
      { label: 'Length', value: '12 km' },
      { label: 'Works', value: 'Design, Supply, Install, T&C' },
      { label: 'Client', value: 'Indus Towers' },
    ],
    highlights: [
      'Successfully executed 12 km of 11 kV HT Line for reliable power connectivity to telecom infrastructure',
      'Conducted route survey, alignment finalization and coordination with local utility authorities',
      'Erection of poles, cross-arms, insulators and associated line hardware',
      'Stringing of conductors and installation of all HT line accessories',
      'Earthing, safety and protection system implementation',
      'Testing, commissioning and successful energization of the HT feeder',
      'Ensured compliance with client specifications, utility standards and applicable safety regulations',
      'Completed the project within the stipulated timeline and handed over successfully',
    ],
    scope: ['Engineering & Design', 'Supply of Line Materials', 'HT Line Construction', 'Testing & Commissioning', 'Utility Coordination', 'Project Management & Handover'],
    outcome: '✔ Successfully commissioned 12 km of 11 kV HT Line at Dudu, Jaipur (Rajasthan) for Indus Towers, enabling reliable and uninterrupted power supply to telecom infrastructure.',
    image: '/images/projects/11KVA_HT_LINE.png',
    imgFit: 'contain',
    featured: true,
  },
  {
    id: '7',
    no: 'PRJ-DC-007',
    title: 'Express Feeder HT Electrical Works – Nxtra Data Centre, Varanasi',
    client: 'Nxtra by Airtel',
    location: 'Varanasi, Uttar Pradesh',
    category: 'Power Transmission',
    status: 'Completed',
    value: 'HT Express Feeder',
    duration: 'Design to Handover',
    specs: [
      { label: 'Client', value: 'Nxtra by Airtel' },
      { label: 'Type', value: 'HT Express Feeder' },
      { label: 'Works', value: 'Cable Laying & Termination' },
      { label: 'Sector', value: 'Data Centre' },
    ],
    highlights: [
      'Survey, planning and execution of dedicated HT express feeder',
      'HT cable laying through trench/duct route',
      'Installation of HT cable termination kits and jointing works',
      'HT panel interfacing and feeder connectivity',
      'Earthing and bonding system installation',
      'Testing of HT cables including insulation resistance and continuity checks',
      'Coordination with utility authorities for feeder integration and energization',
      'Pre-commissioning, commissioning and successful handover',
    ],
    scope: ['HT Feeder Infrastructure Development', 'HT Cable Laying & Termination', 'Earthing & Testing', 'Utility Coordination', 'Commissioning & Energization Support', 'Data Centre Power Infrastructure Works'],
    outcome: '✔ Successfully executed and commissioned the dedicated HT Express Feeder for Nxtra Data Centre, Varanasi, ensuring reliable and uninterrupted power connectivity for critical data centre operations.',
    image: '/images/projects/EXPRESS_FEEDER_AIRTEL.png',
    imgFit: 'contain',
    featured: true,
  },
  {
    id: '4',
    no: 'PRJ-COMP-004',
    title: '1500+ CEIG & PCB Statutory Approvals – Pan India',
    client: 'Bharti Airtel, Tata Projects, VI Controls, Manor & Mews, Starling & others',
    location: 'Pan India',
    category: 'Statutory Compliance',
    status: 'Completed',
    value: '1500+ Approvals',
    duration: 'Ongoing Portfolio',
    specs: [
      { label: 'CEIG Approvals', value: '1500+' },
      { label: 'PCB Permissions', value: 'CTE / CTO' },
      { label: 'Sectors', value: 'Telecom, DC, Hospitality' },
      { label: 'Clients', value: 'Enterprise & Infra' },
    ],
    highlights: [
      'Obtained 1500+ CEIG approvals across telecom, data centre & hospitality sectors',
      'Managed Electrical Inspectorate clearances for HT/LT electrical installations',
      'Secured PCB Consent to Establish (CTE) and Consent to Operate (CTO) permissions',
      'End-to-end document preparation, application filing & authority liaison',
      'Compliance tracking across multiple projects and states simultaneously',
      'Worked with major clients: Bharti Airtel, Tata Projects, VI Controls & others',
      'Timely approvals enabling on-schedule project commissioning',
      'Maintained regulatory compliance records and handover documentation',
    ],
    scope: ['CEIG Approvals', 'Electrical Inspectorate Clearances', 'PCB Permissions (CTE/CTO)', 'Compliance Coordination', 'Document Preparation', 'Authority Liaison & Follow-up'],
    outcome: '1500+ statutory approvals obtained for telecom, data centre, hospitality and infrastructure projects — ensuring timely regulatory compliance and project commissioning across India.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200',
    featured: true,
  },
  {
    id: '3',
    no: 'PRJ-EV-003',
    title: 'EV Charging Station Infrastructure – Rajasthan',
    client: 'Statiq',
    location: 'Rajasthan',
    category: 'EV Infrastructure',
    status: 'Completed',
    value: 'EV Charging Infra',
    duration: 'Design to Handover',
    specs: [
      { label: 'Infrastructure', value: 'EV Charging Stations' },
      { label: 'Power', value: 'HT/LT Connectivity' },
      { label: 'Safety', value: 'Earthing & Lightning' },
      { label: 'Integration', value: 'Network Monitoring' },
    ],
    highlights: [
      'Successfully executed EV charging station installation for electric vehicle users',
      'Site survey, assessment and charging infrastructure planning',
      'HT/LT power connectivity and cable laying works',
      'Installation of EV chargers, distribution panels and associated electrical systems',
      'Earthing, lightning protection and safety system implementation',
      'Integration of chargers with network monitoring and control systems',
      'Testing, commissioning and operational handover',
      'Compliance with applicable electrical and safety norms',
    ],
    scope: ['EV Infrastructure Development', 'Electrical Design & Load Assessment', 'HT/LT Power Distribution', 'Cable Laying & Termination', 'Earthing & Safety Systems', 'Testing, Commissioning & Handover'],
    outcome: 'Successfully commissioned EV Charging Station infrastructure in Rajasthan for Statiq — supporting sustainable EV mobility across the state.',
    image: '/images/projects/EV_STATION%20_IMAGE.png',
    imgFit: 'contain',
    featured: true,
  },
  {
    id: '1',
    no: 'PRJ-ETP-001',
    title: '4 KLD ETP Installation – Manor & Mews',
    client: 'Manor & Mews',
    location: 'Jaipur, Rajasthan',
    category: 'Environmental',
    status: 'Completed',
    value: '4 KLD ETP',
    duration: 'Design to Handover',
    specs: [
      { label: 'ETP Capacity', value: '4 KLD' },
      { label: 'Type', value: 'Effluent Treatment' },
      { label: 'Scope', value: 'Design to Commissioning' },
      { label: 'Compliance', value: 'PCB / Env. Norms' },
    ],
    highlights: [
      'Design and engineering of 4 KLD Effluent Treatment Plant (ETP)',
      'Equipment supply, procurement and site installation',
      'Piping, instrumentation and process flow integration',
      'Electrical panel, control systems and automation wiring',
      'Performance testing, fine-tuning and process validation',
      'PCB Consent to Operate (CTO) compliance documentation',
      'Operator training and handover with full O&M manuals',
      'On-time commissioning with zero regulatory observations',
    ],
    scope: ['ETP Design & Engineering', 'Equipment Supply & Installation', 'Piping & Instrumentation', 'Electrical & Control Panel', 'Performance Testing', 'Handover & Documentation'],
    outcome: 'Successfully commissioned 4 KLD ETP at Manor & Mews, Jaipur — effective wastewater treatment with full PCB environmental compliance and handover documentation.',
    image: '/images/projects/4KLD_image.png',
    imgFit: 'contain',
    featured: true,
  },
];

/* ── FEATURED CARD (horizontal, compact) ────────────────────────────── */
function FeaturedCard({ p, i }) {
  const col = CAT_COLORS[p.category] || CAT_COLORS['Power Transmission'];
  const flip = i % 2 === 1;
  const [lightbox, setLightbox] = useState(false);
  return (
    <>
    {lightbox && <Lightbox src={p.image} alt={p.title} onClose={() => setLightbox(false)} />}
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className={`flex flex-col lg:flex-row ${flip ? 'lg:flex-row-reverse' : ''} rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white`}
      style={{ border: `2px solid ${col.border}30` }}
    >
      {/* Image — fixed height, not stretching */}
      <div
        className="lg:w-[42%] h-56 lg:h-auto lg:max-h-[380px] relative overflow-hidden flex-shrink-0 cursor-zoom-in group/img"
        onClick={() => setLightbox(true)}
      >
        <img src={p.image} alt={p.title} className={`w-full h-full ${p.imgFit === 'contain' ? 'object-contain bg-white' : 'object-cover group-hover/img:scale-105'} transition-transform duration-700`} />
        <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2 shadow-lg">
            <ZoomIn className="w-5 h-5 text-slate-700" />
          </div>
        </div>
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black text-white shadow"
          style={{ background: col.badge }}>{p.category}</div>
      </div>

      {/* Content */}
      <div className="lg:w-[58%] p-5 flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-mono text-slate-400 tracking-widest bg-slate-50 px-2 py-0.5 rounded">{p.no}</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-800">
            <CheckCircle2 className="w-3 h-3" /> {p.status}
          </span>
        </div>

        <h3 className="text-lg font-black text-[#0f172a] leading-snug">{p.title}</h3>

        {/* Client + Location */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="font-semibold">{p.client}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
            {p.location}
          </div>
        </div>

        {/* Specs + Highlights side by side */}
        <div className="grid grid-cols-2 gap-3">
          {/* Specs */}
          <div className="p-3 rounded-xl" style={{ background: col.bg, border: `1px solid ${col.border}30` }}>
            <div className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: col.badge }}>Specifications</div>
            <div className="grid grid-cols-1 gap-1.5">
              {p.specs.map(s => (
                <div key={s.label} className="flex justify-between items-baseline gap-1">
                  <span className="text-[9px] uppercase text-slate-400 font-semibold flex-shrink-0">{s.label}</span>
                  <span className="text-[10px] font-black text-right" style={{ color: col.text }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          {p.highlights && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Project Highlights</div>
              <ul className="space-y-1">
                {p.highlights.slice(0, 5).map(h => (
                  <li key={h} className="flex items-start gap-1.5">
                    <span className="mt-0.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: col.badge }} />
                    <span className="text-[10px] text-slate-600 leading-tight">{h}</span>
                  </li>
                ))}
                {p.highlights.length > 5 && (
                  <li className="text-[9px] text-slate-400 font-semibold pl-3">+{p.highlights.length - 5} more</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Scope tags */}
        <div className="flex flex-wrap gap-1.5">
          {p.scope.map(s => (
            <span key={s} className="px-2 py-0.5 rounded text-[10px] font-bold"
              style={{ background: `${col.badge}12`, color: col.text, border: `1px solid ${col.badge}30` }}>
              {s}
            </span>
          ))}
        </div>

        {/* Outcome */}
        <div className="p-3 rounded-xl flex items-start gap-2 mt-auto" style={{ background: `${col.badge}0d`, border: `1px solid ${col.badge}25` }}>
          <Zap className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: col.badge }} />
          <p className="text-[11px] font-semibold text-slate-700 leading-snug">{p.outcome}</p>
        </div>
      </div>
    </motion.div>
    </>
  );
}

/* ── REGULAR CARD (grid) ─────────────────────────────────────────────── */
function ProjectCard({ p, i }) {
  const col = CAT_COLORS[p.category] || CAT_COLORS['Power Transmission'];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: i * 0.06 }}
      className="flex flex-col rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 bg-white"
      style={{ border: `2px solid ${col.border}30` }}
    >
      {/* Image */}
      <div className="h-56 overflow-hidden relative">
        <img src={p.image} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,22,40,0.75) 0%, transparent 55%)' }} />
        {/* Top row */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="text-[9px] font-mono text-white/70 bg-black/40 backdrop-blur-sm px-2 py-1 rounded">{p.no}</span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black text-white shadow" style={{ background: col.badge }}>{p.category}</span>
        </div>
        {/* Bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <div className="text-[9px] text-white/60 uppercase tracking-widest">Project Value</div>
            <div className="text-white font-black text-lg leading-tight">{p.value}</div>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold bg-green-500/90 text-white">
            <CheckCircle2 className="w-3 h-3" /> {p.status}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-black text-[#0f172a] text-base leading-snug mb-3">{p.title}</h3>

        {/* Client + Location */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="font-semibold">{p.client}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
            {p.location}
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-xl mb-4" style={{ background: col.bg, border: `1px solid ${col.border}33` }}>
          {p.specs.map(s => (
            <div key={s.label}>
              <div className="text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-0.5">{s.label}</div>
              <div className="text-xs font-black" style={{ color: col.text }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Scope tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.scope.slice(0, 4).map(s => (
            <span key={s} className="px-2 py-0.5 rounded text-[10px] font-bold"
              style={{ background: `${col.badge}15`, color: col.text, border: `1px solid ${col.badge}30` }}>
              {s}
            </span>
          ))}
          {p.scope.length > 4 && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold text-slate-400 bg-slate-100">
              +{p.scope.length - 4} more
            </span>
          )}
        </div>

        {/* Outcome */}
        <div className="mt-auto pt-3 border-t border-slate-100">
          <div className="flex items-start gap-2 p-3 rounded-lg" style={{ background: `${col.badge}0d` }}>
            <Zap className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: col.badge }} />
            <p className="text-[11px] font-semibold text-slate-600 leading-snug">✔ {p.outcome}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState(SEED_PROJECTS);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.projects?.length) setProjects(d.projects); })
      .catch(() => {});
  }, []);

  const cats = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const allFiltered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div>
      {/* ── HERO ── */}
      <section className="min-h-[55vh] flex items-center bg-[#0a1628] text-white relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 15% 50%, #16a34a18 0%, transparent 50%), radial-gradient(circle at 85% 20%, #d4af3718 0%, transparent 45%)' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6 pt-28 pb-16 w-full">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5" style={{ background: '#16a34a1a', border: '1px solid #16a34a40' }}>
                <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
                <span className="text-xs font-bold text-[#4ade80] uppercase tracking-widest">Project Portfolio</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black leading-none mb-5">
                Engineering<br />
                <span style={{ color: '#16a34a' }}>Delivered.</span>
              </h1>
              <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
                Real projects. Real specs. Real outcomes — across HT power substations, transformer maintenance, EV charging, ETP systems and 1500+ statutory approvals.
              </p>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-6 lg:gap-4 lg:items-end">
              {[
                { value: '1500+', label: 'Statutory Approvals', color: '#d4af37' },
                { value: '150+',  label: 'Projects Delivered',  color: '#16a34a' },
                { value: '4',     label: 'Engineering Domains', color: '#0891b2' },
              ].map(s => (
                <div key={s.label} className="lg:text-right">
                  <div className="text-3xl lg:text-4xl font-black" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-[11px] text-white/45 uppercase tracking-widest mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6 py-3 flex gap-2 flex-wrap">
          {cats.map(c => {
            const cc = c !== 'All' ? CAT_COLORS[c] : null;
            const active = filter === c;
            return (
              <button key={c} onClick={() => setFilter(c)}
                className="px-4 py-1.5 rounded-full text-sm font-bold border-2 transition-all"
                style={active
                  ? { background: cc ? cc.badge : '#0f172a', color: 'white', borderColor: cc ? cc.badge : '#0f172a' }
                  : { background: 'white', color: '#475569', borderColor: cc ? `${cc.badge}55` : '#e2e8f0' }
                }>
                {c}
                <span className="ml-1.5 text-[10px] opacity-70">
                  ({c === 'All' ? projects.length : projects.filter(p => p.category === c).length})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── PROJECTS ── */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6 space-y-8">

          {allFiltered.length === 0 ? (
            <div className="text-center py-24 text-slate-400">No projects in this category.</div>
          ) : (
            <div className="space-y-8">
              {allFiltered.map((p, i) => <FeaturedCard key={p.id} p={p} i={i} />)}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#0a1628] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #16a34a0f 0%, transparent 60%)' }} />
        <div className="relative">
          <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-3">Have a project in mind?</p>
          <h2 className="text-4xl font-black mb-3">Let&rsquo;s build it together.</h2>
          <p className="text-white/50 mb-8 max-w-md mx-auto">From design and approvals to execution and handover — single-partner accountability.</p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:gap-3"
            style={{ background: '#16a34a', color: 'white' }}>
            Discuss Your Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
