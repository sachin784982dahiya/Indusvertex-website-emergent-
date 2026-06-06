'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    slug: 'electrical-power-transmission',
    tag: 'Electrical Infrastructure',
    title: 'Power Transmission & HT/LT Systems',
    desc: 'End-to-end design, execution and O&M of high-tension substations, LT distribution, CEIG approvals and grid connectivity.',
    image: '/images/power_transmission.png',
    accent: '#16a34a',
  },
  {
    slug: 'data-centre-development',
    tag: 'Data Centre Infrastructure',
    title: 'Data Centre Design, Build & Operations',
    desc: 'Hyperscale and enterprise data centres — precision cooling, power redundancy (N+1/2N), structured cabling and full lifecycle O&M.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=srgb&fm=jpg&q=65&w=1400',
    accent: '#0891b2',
  },
  {
    slug: 'environmental-sustainability',
    tag: 'Compliance & Legal',
    title: 'Regulatory Approvals & Legal Advisory',
    desc: 'CEIG, CTE/CTO, PCB, Fire NOC, environmental clearances — plus end-to-end legal coordination through IndusVertex Law Firm.',
    image: '/images/compliances_image.png',
    accent: '#d4af37',
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((index) => {
    if (animating) return;
    setAnimating(true);
    setActive(index);
    setTimeout(() => setAnimating(false), 600);
  }, [animating]);

  const next = useCallback(() => goTo((active + 1) % SLIDES.length), [active, goTo]);
  const prev = useCallback(() => goTo((active - 1 + SLIDES.length) % SLIDES.length), [active, goTo]);

  // Auto-advance every 2.5 seconds
  useEffect(() => {
    const timer = setInterval(next, 2500);
    return () => clearInterval(timer);
  }, [next]);

  const slide = SLIDES[active];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ height: '480px' }}>

      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div key={s.slug}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}>
          <img
            src={s.image}
            alt={s.tag}
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(10,22,40,0.88) 0%, rgba(10,22,40,0.45) 60%, rgba(10,22,40,0.20) 100%)' }} />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-8">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 mb-3 w-fit">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: slide.accent }} />
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: slide.accent }}>
            {slide.tag}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl lg:text-3xl font-bold text-white leading-tight mb-3 max-w-sm"
          style={{ transition: 'all 0.5s ease' }}>
          {slide.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-white/75 leading-relaxed mb-5 max-w-sm">
          {slide.desc}
        </p>

        {/* CTA */}
        <Link href={`/services/${slide.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold w-fit px-4 py-2 rounded-lg transition-all duration-200 hover:gap-3"
          style={{ background: slide.accent, color: '#fff' }}>
          Learn More <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Navigation arrows */}
      <button onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}>
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}>
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 right-4 z-20 flex gap-2 items-center">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? '24px' : '8px',
              height: '8px',
              background: i === active ? SLIDES[i].accent : 'rgba(255,255,255,0.4)',
            }} />
        ))}
      </div>

    </div>
  );
}
