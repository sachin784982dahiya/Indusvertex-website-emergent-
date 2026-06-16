'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowRight, ShieldCheck, Zap, BatteryCharging, Server, Building2, Cpu, Plug, ShieldAlert, Leaf, ClipboardCheck, Network, Scale, Star, Quote, Users, PackageCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SERVICES, CLIENTS, COMPANY } from '@/lib/services-data';
import ClientLogo from '@/components/ClientLogo';
import HeroCarousel from '@/components/HeroCarousel';

const ICONS = { Zap, BatteryCharging, Server, Building2, Cpu, Plug, ShieldAlert, Leaf, ClipboardCheck, Network, Scale };

function ClientsMarquee() {
  const scrollRef = useRef(null);
  const timerRef = useRef(null);

  const startRoll = useCallback(() => {
    timerRef.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      el.scrollLeft += 2;
      if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
    }, 16);
  }, []);

  const stopRoll = useCallback(() => clearInterval(timerRef.current), []);

  useEffect(() => { startRoll(); return stopRoll; }, [startRoll, stopRoll]);

  const manualScroll = (dir) => {
    stopRoll();
    scrollRef.current?.scrollBy({ left: dir * 280, behavior: 'smooth' });
    setTimeout(startRoll, 1000);
  };

  return (
    <div className="relative">
      {/* Fade edges */}
      <div className="absolute left-12 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, white, transparent)' }} />
      <div className="absolute right-12 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, white, transparent)' }} />

      {/* Left arrow */}
      <button onClick={() => manualScroll(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-[#0a1628] border border-gray-200 dark:border-white/20 shadow-md flex items-center justify-center hover:scale-110 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#0a1628] dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>

      {/* Scrolling track */}
      <div ref={scrollRef}
        className="flex overflow-x-scroll gap-3 px-14 pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseEnter={stopRoll}
        onMouseLeave={startRoll}>
        {[...CLIENTS, ...CLIENTS].map((c, i) => (
          <div key={i} className="inline-flex flex-shrink-0 items-center gap-4 px-6 py-4 min-w-[220px] h-28 border border-gray-100 dark:border-white/10 rounded-xl bg-white dark:bg-white/5 shadow-sm">
            <ClientLogo client={c} variant="inline" size="lg" />
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button onClick={() => manualScroll(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-[#0a1628] border border-gray-200 dark:border-white/20 shadow-md flex items-center justify-center hover:scale-110 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#0a1628] dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}

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
    { label: 'Projects Delivered', value: 300, suffix: '+' },
    { label: 'Statutory Approvals', value: 4000, suffix: '+' },
    { label: 'Years Combined Experience', value: 40, suffix: '+' },
    { label: 'Domains Served', value: 15, suffix: '' }
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

        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6 pt-12 pb-72 w-full">
          <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-center">

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
              <div className="w-full max-w-[580px]">
                <HeroCarousel />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom visual strip — bright infrastructure banner */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '230px', overflow: 'hidden' }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 230" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {/* Vivid sky gradient left→right */}
              <linearGradient id="bsSky" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#7dd3fc"/>
                <stop offset="40%"  stopColor="#bae6fd"/>
                <stop offset="100%" stopColor="#e0f2fe"/>
              </linearGradient>
              {/* Sky top-to-bottom: bright top, lighter toward horizon */}
              <linearGradient id="bsSkyV" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#38bdf8" stopOpacity="0.55"/>
                <stop offset="60%"  stopColor="#7dd3fc" stopOpacity="0.15"/>
                <stop offset="100%" stopColor="#bae6fd" stopOpacity="0"/>
              </linearGradient>
              {/* White top fade */}
              <linearGradient id="bsTopFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor="white" stopOpacity="1"/>
                <stop offset="20%" stopColor="white" stopOpacity="0.55"/>
                <stop offset="36%" stopColor="white" stopOpacity="0"/>
              </linearGradient>
              {/* Navy bottom fade */}
              <linearGradient id="bsBotFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="68%"  stopColor="#0a1628" stopOpacity="0"/>
                <stop offset="100%" stopColor="#0a1628" stopOpacity="1"/>
              </linearGradient>
              {/* Warm sun */}
              <radialGradient id="bsSun" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="#fde68a" stopOpacity="1"/>
                <stop offset="40%"  stopColor="#fde68a" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#fde68a" stopOpacity="0"/>
              </radialGradient>
              {/* Green hill gradient */}
              <linearGradient id="bsHill1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#4ade80"/>
                <stop offset="100%" stopColor="#16a34a"/>
              </linearGradient>
              <linearGradient id="bsHill2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#22c55e"/>
                <stop offset="100%" stopColor="#15803d"/>
              </linearGradient>
            </defs>

            {/* Sky base */}
            <rect width="1440" height="230" fill="url(#bsSky)"/>
            <rect width="1440" height="230" fill="url(#bsSkyV)"/>
            {/* Sun warm glow */}
            <ellipse cx="112" cy="30" rx="105" ry="65" fill="url(#bsSun)"/>
            {/* Sun disc */}
            <circle cx="112" cy="22" r="18" fill="#fbbf24" fillOpacity="0.85"/>
            <circle cx="112" cy="22" r="12" fill="#fef08a"/>

            {/* ── CITY SKYLINE — colourful buildings ── */}
            {[
              [28,112,22,'#60a5fa'],[52,88,18,'#818cf8'],[75,104,24,'#34d399'],
              [98,76,20,'#60a5fa'],[120,96,16,'#f472b6'],[138,106,26,'#a78bfa'],
              [166,70,20,'#38bdf8'],[190,93,18,'#6ee7b7'],[213,110,28,'#93c5fd'],
              [238,83,14,'#c4b5fd'],[254,96,20,'#6ee7b7'],[276,107,22,'#60a5fa']
            ].map(([x,h,w,c],i) => (
              <rect key={i} x={x} y={h} width={w} height={152-h} fill={c} fillOpacity="0.55"/>
            ))}

            {/* ── WIND TURBINE 1 (x=310) ── */}
            <rect x="308" y="55" width="5" height="93" fill="#cbd5e1"/>
            <circle cx="310" cy="55" r="5.5" fill="#94a3b8"/>
            <line x1="310" y1="55" x2="272" y2="20"  stroke="white" strokeWidth="5" strokeLinecap="round"/>
            <line x1="310" y1="55" x2="350" y2="34"  stroke="white" strokeWidth="5" strokeLinecap="round"/>
            <line x1="310" y1="55" x2="303" y2="102" stroke="white" strokeWidth="5" strokeLinecap="round"/>

            {/* ── WIND TURBINE 2 (x=420) ── */}
            <rect x="418" y="44" width="6" height="104" fill="#cbd5e1"/>
            <circle cx="420" cy="44" r="6.5" fill="#94a3b8"/>
            <line x1="420" y1="44" x2="380" y2="8"   stroke="white" strokeWidth="6" strokeLinecap="round"/>
            <line x1="420" y1="44" x2="464" y2="22"  stroke="white" strokeWidth="6" strokeLinecap="round"/>
            <line x1="420" y1="44" x2="413" y2="96"  stroke="white" strokeWidth="6" strokeLinecap="round"/>

            {/* ── WIND TURBINE 3 (x=520) ── */}
            <rect x="518" y="60" width="5" height="88" fill="#cbd5e1"/>
            <circle cx="520" cy="60" r="5" fill="#94a3b8"/>
            <line x1="520" y1="60" x2="487" y2="28"  stroke="white" strokeWidth="4.5" strokeLinecap="round"/>
            <line x1="520" y1="60" x2="556" y2="40"  stroke="white" strokeWidth="4.5" strokeLinecap="round"/>
            <line x1="520" y1="60" x2="514" y2="106" stroke="white" strokeWidth="4.5" strokeLinecap="round"/>

            {/* ── HV PYLONS ── */}
            <path d="M576,148 L580,88 L584,148" stroke="#475569" strokeWidth="1.8" fill="rgba(71,85,105,0.12)"/>
            <line x1="568" y1="108" x2="592" y2="108" stroke="#475569" strokeWidth="2"/>
            <line x1="571" y1="96"  x2="589" y2="96"  stroke="#475569" strokeWidth="2"/>
            <circle cx="568" cy="108" r="2.5" fill="#f59e0b"/>
            <circle cx="592" cy="108" r="2.5" fill="#f59e0b"/>
            <path d="M568,108 Q610,120 636,108" stroke="#94a3b8" strokeWidth="1.2" fill="none"/>
            <path d="M646,148 L650,88 L654,148" stroke="#475569" strokeWidth="1.8" fill="rgba(71,85,105,0.12)"/>
            <line x1="638" y1="108" x2="662" y2="108" stroke="#475569" strokeWidth="2"/>
            <line x1="641" y1="96"  x2="659" y2="96"  stroke="#475569" strokeWidth="2"/>
            <circle cx="638" cy="108" r="2.5" fill="#f59e0b"/>
            <circle cx="662" cy="108" r="2.5" fill="#f59e0b"/>

            {/* ── SOLAR ARRAY (brighter, larger) ── */}
            {[0,1,2,3,4,5].map(col =>
              [0,1,2,3].map(row => (
                <rect key={`s${col}${row}`}
                  x={190+col*18} y={120+row*8} width="15" height="6" rx="1.5"
                  fill="#0ea5e9" fillOpacity="0.85" stroke="#0284c7" strokeWidth="0.8"/>
              ))
            )}
            {/* Solar panel frame */}
            <rect x="187" y="118" width="112" height="36" rx="2" fill="none" stroke="#0284c7" strokeWidth="1" strokeOpacity="0.4"/>

            {/* ── HILLS — vivid green gradient ── */}
            <path d="M0,148 Q90,130 200,142 Q310,154 430,134 Q530,116 640,140 Q740,158 860,142 Q980,128 1100,144 Q1230,158 1350,142 Q1420,134 1440,138 L1440,230 L0,230 Z"
              fill="url(#bsHill1)"/>
            <path d="M0,160 Q120,150 250,158 Q380,166 500,154 Q600,144 720,158 Q840,172 960,160 Q1080,150 1200,162 Q1340,174 1440,160 L1440,230 L0,230 Z"
              fill="url(#bsHill2)" fillOpacity="0.9"/>

            {/* ── ELEVATED METRO (right half x=700–1440) ── */}

            {/* Support pillars — coloured caps */}
            {[730,830,930,1030,1130,1230,1330,1415].map(x => (
              <g key={x}>
                <rect x={x-10} y={108} width={20} height={5} rx="2" fill="#475569"/>
                <rect x={x-4}  y={113} width={8}  height={35} fill="#64748b"/>
              </g>
            ))}

            {/* Track beam */}
            <rect x="700" y="108" width="740" height="8" rx="2" fill="#94a3b8"/>
            <line x1="700" y1="108" x2="1440" y2="108" stroke="#334155" strokeWidth="1.5"/>
            <line x1="700" y1="115" x2="1440" y2="115" stroke="#334155" strokeWidth="1.5"/>

            {/* ── CAR 1 — white body, vivid stripes ── */}
            <path d="M722,74 C706,74 694,81 693,91 C694,101 706,108 722,108 Z" fill="white" stroke="#0ea5e9" strokeWidth="2"/>
            <ellipse cx="695" cy="85"  rx="4.5" ry="3.5" fill="#fef08a"/>
            <ellipse cx="695" cy="97"  rx="4.5" ry="3.5" fill="#fef08a"/>
            <rect x="722" y="74" width="268" height="34" fill="white"/>
            <rect x="722" y="74" width="268" height="34" fill="none" stroke="#0ea5e9" strokeWidth="2"/>
            {/* Green top stripe */}
            <rect x="693" y="75" width="297" height="5" fill="#16a34a" rx="1"/>
            {/* Blue mid stripe */}
            <rect x="693" y="80" width="297" height="5" fill="#0ea5e9" rx="1"/>
            {/* Gold bottom stripe */}
            <rect x="693" y="85" width="297" height="3" fill="#f59e0b" rx="1"/>
            {/* Car 1 windows */}
            {[730,762,794,826,858,890,922,954].map(x => (
              <rect key={x} x={x} y={91} width={24} height={13} rx="3" fill="#e0f2fe"/>
            ))}
            <rect x="730"  y="107" width="28" height="5" rx="2" fill="#1e293b"/>
            <rect x="946"  y="107" width="28" height="5" rx="2" fill="#1e293b"/>

            {/* COUPLING */}
            <rect x="988" y="82" width="10" height="26" rx="1" fill="#94a3b8"/>

            {/* ── CAR 2 — same livery ── */}
            <rect x="998" y="74" width="268" height="34" fill="white"/>
            <rect x="998" y="74" width="268" height="34" fill="none" stroke="#0ea5e9" strokeWidth="2"/>
            <rect x="998" y="75" width="268" height="5" fill="#16a34a" rx="1"/>
            <rect x="998" y="80" width="268" height="5" fill="#0ea5e9" rx="1"/>
            <rect x="998" y="85" width="268" height="3" fill="#f59e0b" rx="1"/>
            {[1006,1038,1070,1102,1134,1166,1198,1230].map(x => (
              <rect key={x} x={x} y={91} width={24} height={13} rx="3" fill="#e0f2fe"/>
            ))}
            <rect x="1010" y="107" width="28" height="5" rx="2" fill="#1e293b"/>
            <rect x="1226" y="107" width="28" height="5" rx="2" fill="#1e293b"/>
            {/* Tail */}
            <path d="M1266,74 C1282,74 1291,81 1291,91 C1291,101 1282,108 1266,108 Z" fill="white" stroke="#0ea5e9" strokeWidth="2"/>
            <rect x="1266" y="75" width="25" height="5" fill="#16a34a" rx="1"/>
            <rect x="1266" y="80" width="25" height="5" fill="#0ea5e9" rx="1"/>

            {/* ── SUBSTATION (coloured) ── */}
            <rect x="1310" y="120" width="62" height="30" rx="3" fill="#dbeafe" stroke="#0ea5e9" strokeWidth="1.5"/>
            <path d="M1308,120 L1341,110 L1374,120" fill="#bfdbfe" stroke="#0ea5e9" strokeWidth="1"/>
            <rect x="1318" y="102" width="7" height="18" fill="#475569"/>
            <rect x="1350" y="105" width="7" height="15" fill="#475569"/>
            <rect x="1330" y="132" width="16" height="18" rx="1" fill="#93c5fd" fillOpacity="0.6"/>
            <circle cx="1322" cy="128" r="5" fill="none" stroke="#16a34a" strokeWidth="2"/>
            <circle cx="1360" cy="128" r="5" fill="none" stroke="#16a34a" strokeWidth="2"/>
            <path d="M1266,108 Q1292,122 1310,127" stroke="#0ea5e9" strokeWidth="1.2" fill="none"/>

            {/* ── WAVE LINES — vivid ── */}
            <path d="M0,178 C240,162 480,182 720,168 C960,154 1200,176 1440,164 L1440,230 L0,230 Z" fill="#2563eb" fillOpacity="0.2"/>
            <path d="M0,178 C240,162 480,182 720,168 C960,154 1200,176 1440,164" stroke="#2563eb" strokeWidth="3" strokeOpacity="0.85" fill="none"/>
            <path d="M0,188 C240,174 480,196 720,181 C960,166 1200,189 1440,175 L1440,230 L0,230 Z" fill="#16a34a" fillOpacity="0.2"/>
            <path d="M0,188 C240,174 480,196 720,181 C960,166 1200,189 1440,175" stroke="#16a34a" strokeWidth="3.2" strokeOpacity="0.9" fill="none"/>
            <path d="M0,199 C300,186 600,205 900,193 C1100,184 1300,201 1440,193 L1440,230 L0,230 Z" fill="#f59e0b" fillOpacity="0.2"/>
            <path d="M0,199 C300,186 600,205 900,193 C1100,184 1300,201 1440,193" stroke="#f59e0b" strokeWidth="2.5" strokeOpacity="0.9" fill="none"/>

            {/* Navy bottom fill */}
            <rect y="212" width="1440" height="18" fill="#0a1628"/>

            {/* Overlay fades */}
            <rect width="1440" height="230" fill="url(#bsBotFade)"/>
            <rect width="1440" height="230" fill="url(#bsTopFade)"/>
          </svg>
        </div>
      </section>

      {/* ── PROJECT TICKER ── */}
      <div className="bg-[#0a1628] border-b border-white/10 overflow-hidden py-3">
        <div className="flex items-center gap-0 animate-none">
          <div className="flex-shrink-0 px-4 py-1 bg-[#16a34a] text-white text-xs font-black uppercase tracking-widest mr-4">Live Projects</div>
          <div className="overflow-hidden flex-1">
            <div className="flex gap-8 whitespace-nowrap"
              style={{
                animation: 'ticker-scroll 30s linear infinite',
              }}>
              {[
                { label: '1250 kVA PSS Installation', client: 'Vodafone Idea', location: 'Meerut, UP' },
                { label: '12 km 11 kV HT Line', client: 'Indus Towers', location: 'Dudu, Jaipur' },
                { label: 'HT Express Feeder', client: 'Nxtra by Airtel', location: 'Varanasi, UP' },
                { label: 'EV Charging Infrastructure', client: 'Statiq', location: 'Rajasthan' },
                { label: '4 KLD ETP Installation', client: 'Manor & Mews', location: 'Jaipur, Rajasthan' },
                { label: 'Transformer Testing & Maintenance', client: 'Multiple Clients', location: 'Pan India' },
                { label: '4000+ CEIG & PCB Approvals', client: 'Bharti Airtel & others', location: 'Pan India' },
              ].concat([
                { label: '1250 kVA PSS Installation', client: 'Vodafone Idea', location: 'Meerut, UP' },
                { label: '12 km 11 kV HT Line', client: 'Indus Towers', location: 'Dudu, Jaipur' },
                { label: 'HT Express Feeder', client: 'Nxtra by Airtel', location: 'Varanasi, UP' },
                { label: 'EV Charging Infrastructure', client: 'Statiq', location: 'Rajasthan' },
                { label: '4 KLD ETP Installation', client: 'Manor & Mews', location: 'Jaipur, Rajasthan' },
                { label: 'Transformer Testing & Maintenance', client: 'Multiple Clients', location: 'Pan India' },
                { label: '4000+ CEIG & PCB Approvals', client: 'Bharti Airtel & others', location: 'Pan India' },
              ]).map((p, i) => (
                <span key={i} className="inline-flex items-center gap-2 text-xs text-white/80 flex-shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] flex-shrink-0" />
                  <span className="font-bold text-[#16a34a]">{p.label}</span>
                  <span className="text-white/40">·</span>
                  <span className="text-[#d4af37]">{p.client}</span>
                  <span className="text-white/40">·</span>
                  <span className="text-white/60">{p.location}</span>
                  <span className="ml-4 text-white/20">|</span>
                </span>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @keyframes ticker-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ── PROJECT PROOF STRIP ── */}
      <section className="py-10 bg-[#0a1628]">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#16a34a] font-bold mb-1">Real Projects · Real Results</div>
              <h2 className="text-xl font-black text-white">Our Work, On Ground</h2>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d4af37] hover:gap-2.5 transition-all">
              View All Projects <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
            {[
              { img: '/images/projects/ht-panel-vi-meerut.jpg',      title: '1250 kVA PSS',         client: 'Vodafone Idea', location: 'Meerut, UP',       badge: 'Power',      color: '#ea580c' },
              { img: '/images/projects/11KVA_HT_LINE.png',           title: '11 kV HT Line',        client: 'Indus Towers',  location: 'Dudu, Jaipur',    badge: 'HT Line',    color: '#ea580c', fit: 'contain' },
              { img: '/images/projects/EXPRESS_FEEDER_AIRTEL.png',   title: 'HT Express Feeder',    client: 'Nxtra Airtel',  location: 'Varanasi',        badge: 'Data Centre',color: '#0891b2', fit: 'contain' },
              { img: '/images/projects/EV_STATION _IMAGE.png',       title: 'EV Charging Infra',    client: 'Statiq',        location: 'Rajasthan',       badge: 'EV',         color: '#0891b2', fit: 'contain' },
              { img: '/images/projects/4KLD_image.png',              title: '4 KLD ETP',            client: 'Manor & Mews',  location: 'Jaipur',          badge: 'ETP',        color: '#059669', fit: 'contain' },
              { img: '/images/projects/ht-transformer-yard.jpg',     title: 'Transformer Testing',  client: 'Multiple',      location: 'Pan India',       badge: 'Testing',    color: '#ea580c' },
              { img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=srgb&fm=jpg&q=85&w=600', title: '4000+ Approvals', client: 'Airtel & others', location: 'Pan India', badge: 'Compliance', color: '#9333ea' },
            ].map((p, i) => (
              <Link href="/projects" key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="relative rounded-xl overflow-hidden group cursor-pointer"
                  style={{ aspectRatio: '3/4' }}
                >
                  <img
                    src={p.img} alt={p.title}
                    className={`w-full h-full ${p.fit === 'contain' ? 'object-contain bg-white' : 'object-cover'} group-hover:scale-105 transition-transform duration-500`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-2 left-2">
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-black text-white"
                      style={{ background: p.color }}>{p.badge}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2.5">
                    <div className="text-white font-black text-[11px] leading-tight mb-0.5">{p.title}</div>
                    <div className="text-white/60 text-[9px]">{p.client}</div>
                    <div className="text-[#d4af37] text-[9px]">{p.location}</div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-[#d4af37] mb-1"><Counter end={s.value} suffix={s.suffix} /></div>
                <div className="text-xs text-white/60 uppercase tracking-wider font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 bg-gray-50 dark:bg-[#0d1f3c]">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-[#16a34a] font-semibold mb-3">Why Choose IndusVertex</div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0a1628] dark:text-white leading-tight">A single, accountable partner from concept to commissioning.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: 'HT/LT Power Experts',
                stat: '300+ Projects',
                text: 'From 11 kV HT lines and 1250 kVA substations to LT panels and cable terminations — executed across telecom, data centres and industrial sites.',
                color: '#ea580c',
              },
              {
                icon: ShieldCheck,
                title: '4000+ Approvals Secured',
                stat: 'CEIG · PCB · CTE/CTO',
                text: 'We handle the full regulatory cycle — drawings, submissions, inspections and follow-ups — so your project is never held up by paperwork.',
                color: '#9333ea',
              },
              {
                icon: ClipboardCheck,
                title: 'End-to-End Accountability',
                stat: 'Design → Handover',
                text: 'Single-partner responsibility from survey and design through supply, installation, testing and commissioning — no handoff gaps, no excuses.',
                color: '#0891b2',
              },
              {
                icon: Leaf,
                title: 'Sustainable by Design',
                stat: 'EV · ETP · STP · ZLD',
                text: 'EV charging infrastructure, effluent treatment plants and green compliance built into every project from day one — not added as an afterthought.',
                color: '#16a34a',
              },
            ].map((f, i) => (
              <div key={f.title}>
                <Card className="p-6 h-full hover:shadow-xl hover:-translate-y-1 transition-all border-border/60 bg-white dark:bg-[#0a1628] dark:border-white/10">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${f.color}18` }}>
                    <f.icon className="w-6 h-6" style={{ color: f.color }} />
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: f.color }}>{f.stat}</div>
                  <h3 className="font-bold text-lg mb-2 text-[#0a1628] dark:text-white leading-snug">{f.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-white/60 leading-relaxed">{f.text}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPROACH ── */}
      <section className="py-20 bg-white dark:bg-[#081020]">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-[#16a34a] font-semibold mb-3">Our Approach</div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0a1628] dark:text-white">From idea to operations — in seven disciplined stages.</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2 lg:gap-3">
            {['Concept','Feasibility','Approval','Design','Execution','Compliance','O&M'].map((step, i, arr) => (
              <div key={step} className="flex items-center">
                <div className="px-5 py-3 rounded-full bg-white dark:bg-[#0a1628] border-2 border-gray-200 dark:border-white/10 font-semibold text-sm hover:border-[#16a34a] hover:text-[#16a34a] transition-colors text-[#0a1628] dark:text-white">
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
                <div key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="block group">
                    <div className="rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 transition-all h-full">
                      <div className="relative h-44 overflow-hidden">
                        <img src={s.image} alt={s.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CLIENTS MARQUEE ── */}
      <section className="py-16 bg-white dark:bg-[#0a1628] border-y border-gray-100 dark:border-white/10 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6 mb-10">
          <div className="text-center">
            <div className="text-xs uppercase tracking-[0.2em] text-[#16a34a] font-semibold mb-3">Trusted By Industry Leaders</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0a1628]">Partnering with India's leading enterprises</h2>
          </div>
        </div>
        <ClientsMarquee />
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-gray-50 dark:bg-[#0d1f3c]">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-[#16a34a] font-semibold mb-3">Client Voices</div>
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0a1628] dark:text-white">What our clients say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { initials:'A.S.', title:'VP – Infrastructure', company:'Leading Telecom Company', quote:'IndusVertex delivered our HT substation ahead of schedule with flawless CEIG approvals. Their integrated engineering + compliance expertise is rare.' },
              { initials:'P.N.', title:'Director – DC Operations', company:'Hyperscale Data Centre', quote:'From design to O&M, the precision and discipline of the IndusVertex team set a benchmark. Our build-out went live without a single deviation.' },
              { initials:'R.G.', title:'Plant Head', company:'Large Manufacturing Unit', quote:'Our solar + BESS rollout reduced grid dependency by 38%. IndusVertex managed design, approvals, execution and ongoing O&M end-to-end.' }
            ].map((t, i) => (
              <div key={i}>
                <Card className="p-7 h-full bg-white dark:bg-[#0a1628] border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow">
                  <Quote className="w-8 h-8 text-[#16a34a] mb-4" />
                  <p className="text-gray-600 dark:text-white/70 leading-relaxed mb-5 italic">"{t.quote}"</p>
                  <div className="flex gap-1 mb-3">{[...Array(5)].map((_,j)=><Star key={j} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />)}</div>
                  <div className="border-t border-gray-100 dark:border-white/10 pt-3">
                    <div className="font-bold text-[#0a1628] dark:text-white">{t.initials} <span className="text-xs font-normal text-gray-400 dark:text-white/30">(name withheld — client confidentiality)</span></div>
                    <div className="text-sm text-gray-500 dark:text-white/50">{t.title} · {t.company}</div>
                  </div>
                </Card>
              </div>
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
