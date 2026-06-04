'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SERVICES } from '@/lib/services-data';
import { Zap, BatteryCharging, Server, Building2, Cpu, Plug, ShieldAlert, Leaf, ClipboardCheck, Network, Scale } from 'lucide-react';

const ICONS = { Zap, BatteryCharging, Server, Building2, Cpu, Plug, ShieldAlert, Leaf, ClipboardCheck, Network, Scale };

// Short display names for inside the circles
const SHORT_NAMES = [
  'Electrical Power',
  'Power Backup',
  'Data Centre',
  'Civil & Structural',
  'Automation',
  'EV Infrastructure',
  'Fire Safety',
  'Environmental',
  'Project Management',
];

const RING_COLORS = [
  '#16a34a', // green
  '#1e40af', // blue
  '#16a34a', // green
  '#d4af37', // gold
  '#0891b2', // cyan
  '#16a34a', // green
  '#d4af37', // gold
  '#d4af37', // gold
  '#16a34a', // green
];

export default function ServicesWheel() {
  const services = SERVICES.slice(0, 9);
  const r = 37;

  const items = services.map((s, i) => {
    const angle = (i * (360 / services.length) - 90) * (Math.PI / 180);
    const cx = 50 + r * Math.cos(angle);
    const cy = 50 + r * Math.sin(angle);
    return { ...s, cx, cy };
  });

  return (
    <div className="relative w-full" style={{ paddingBottom: '100%' }}>
      <div className="absolute inset-0">

        {/* Outer dashed ring */}
        <div className="absolute rounded-full pointer-events-none"
          style={{ inset: '1%', border: '1.5px dashed rgba(22,163,74,0.25)' }} />

        {/* SVG connecting dot-trails from center to each circle */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
          {items.map((s, i) => {
            const angle = (i * (360 / services.length) - 90) * (Math.PI / 180);
            const color = RING_COLORS[i];
            // Start just outside center circle (14%), end just before service circle (27%)
            const x1 = 50 + 14 * Math.cos(angle);
            const y1 = 50 + 14 * Math.sin(angle);
            const x2 = 50 + 27 * Math.cos(angle);
            const y2 = 50 + 27 * Math.sin(angle);
            // 5 dots evenly spaced along the line
            return Array.from({ length: 5 }).map((_, d) => {
              const t = d / 4;
              const dx = x1 + (x2 - x1) * t;
              const dy = y1 + (y2 - y1) * t;
              const size = d === 0 || d === 4 ? 0.9 : 0.6; // larger at ends
              return (
                <circle key={`${i}-${d}`} cx={dx} cy={dy} r={size}
                  fill={color} opacity={0.7 - d * 0.08} />
              );
            });
          })}
        </svg>

        {/* Center circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute rounded-full flex items-center justify-center text-center z-10"
          style={{
            width: '28%', height: '28%',
            left: '36%', top: '36%',
            background: 'linear-gradient(145deg, #ffffff, #f0fdf4)',
            boxShadow: '0 4px 24px rgba(10,22,40,0.10), 0 0 0 3px rgba(22,163,74,0.18), 0 0 0 7px rgba(22,163,74,0.06)',
          }}>
          <div className="flex flex-col items-center px-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center mb-2"
              style={{ background: 'linear-gradient(135deg, #0a1628, #1e3a5f)' }}>
              <Zap className="w-4 h-4" style={{ color: '#d4af37' }} />
            </div>
            <div className="font-extrabold text-[8px] lg:text-[10px] text-[#0a1628] leading-snug uppercase tracking-widest">
              Integrated<br />Infrastructure<br />Solutions
            </div>
          </div>
        </motion.div>

        {/* Service circles */}
        {items.map((s, i) => {
          const Ic = ICONS[s.icon] || Zap;
          const ringColor = RING_COLORS[i];
          const label = SHORT_NAMES[i] || s.title.split(' ').slice(0, 2).join(' ');

          return (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.45, type: 'spring', stiffness: 180 }}
              className="absolute z-10"
              style={{ width: '20%', left: `${s.cx - 10}%`, top: `${s.cy - 10}%` }}>
              <Link href={`/services/${s.slug}`} className="group block w-full">
                <div className="w-full aspect-square rounded-full overflow-hidden relative transition-all duration-300 group-hover:scale-108"
                  style={{
                    boxShadow: `0 4px 18px rgba(0,0,0,0.18), 0 0 0 2.5px white, 0 0 0 5px ${ringColor}`,
                    transform: 'scale(1)',
                  }}>
                  {/* Background image */}
                  <img src={s.image.replace('q=85','q=55').replace('q=80','q=55')} alt={s.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

                  {/* Base dark overlay */}
                  <div className="absolute inset-0" style={{ background: 'rgba(8,18,36,0.42)' }} />

                  {/* Bottom gradient for label */}
                  <div className="absolute bottom-0 left-0 right-0"
                    style={{ height: '52%', background: 'linear-gradient(to top, rgba(8,18,36,0.88) 0%, transparent 100%)' }} />

                  {/* Icon — centered upper area */}
                  <div className="absolute inset-0 flex items-center justify-center" style={{ marginBottom: '22%' }}>
                    <Ic className="w-[30%] h-[30%] text-white drop-shadow" />
                  </div>

                  {/* Label text inside circle */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end pb-[18%] px-[10%]">
                    <span className="text-white font-bold text-center leading-tight w-full"
                      style={{ fontSize: 'clamp(6.5px, 1.05vw, 10.5px)', wordBreak: 'break-word' }}>
                      {label}
                    </span>
                  </div>

                  {/* Hover ring glow */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: `inset 0 0 18px ${ringColor}55` }} />
                </div>
              </Link>
            </motion.div>
          );
        })}

      </div>
    </div>
  );
}
