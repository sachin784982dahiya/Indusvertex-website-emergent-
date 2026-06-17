'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home',    href: '#top' },
  { label: 'About',   href: '#legal-about' },
  { label: 'Team',    href: '#legal-team' },
  { label: 'Contact', href: '#legal-contact' },
];

function scrollTo(id) {
  if (id === '#top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function LegalNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628] shadow-lg border-b border-[#d4af37]/20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <button onClick={() => scrollTo('#top')} className="inline-flex items-center gap-2.5 group">
              <div className="relative w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center p-1 ring-1 ring-black/5 flex-shrink-0">
                <img src="/assets/logo-symbol.png" alt="IndusVertex Law Firm" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col leading-tight items-start text-left">
                <span className="font-bold text-lg tracking-tight text-white">Indus<span className="text-[#d4af37]">Vertex</span></span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/70">Law Firm</span>
                <span className="hidden lg:block text-[11px] tracking-[0.06em] font-medium mt-0.5 text-[#d4af37]">Legal Advisory · Litigation · Compliance</span>
              </div>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <button key={link.label} onClick={() => scrollTo(link.href)}
                  className="px-4 py-2 text-sm font-medium rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors">
                  {link.label}
                </button>
              ))}
            </nav>

            <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-md text-white" aria-label="Menu">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        </div>
      )}
      <div className={cn(
        'lg:hidden fixed top-0 right-0 h-full w-[260px] z-50 bg-[#0a1628] shadow-2xl transition-transform duration-300 flex flex-col',
        open ? 'translate-x-0' : 'translate-x-full'
      )}>
        <div className="flex items-center justify-between px-5 pt-6 pb-5 border-b border-white/10">
          <div>
            <div className="text-white font-bold">IndusVertex <span className="text-[#d4af37]">Law Firm</span></div>
            <div className="text-white/40 text-[10px] uppercase tracking-widest mt-0.5">Legal Advisory</div>
          </div>
          <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg bg-white/10 text-white"><X className="w-4 h-4" /></button>
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navLinks.map(link => (
            <button key={link.label} onClick={() => { scrollTo(link.href); setOpen(false); }}
              className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all text-left">
              {link.label}
            </button>
          ))}
        </nav>
        <div className="px-4 py-5 border-t border-white/10">
          <button onClick={() => { scrollTo('#legal-contact'); setOpen(false); }}
            className="w-full py-3 rounded-xl font-semibold text-sm bg-[#d4af37] text-[#0a1628]">
            Schedule Consultation
          </button>
        </div>
      </div>
    </>
  );
}
