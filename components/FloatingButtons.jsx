'use client';
import { Phone, MessageCircle } from 'lucide-react';
import { COMPANY } from '@/lib/services-data';

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a href={`https://wa.me/${COMPANY.phoneRaw.replace('+','')}?text=Hello%20IndusVertex,%20I%20would%20like%20to%20discuss%20a%20project.`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="w-13 h-13 rounded-full shadow-2xl bg-[#25D366] hover:scale-110 transition-transform flex items-center justify-center group" style={{width:'52px', height:'52px'}}>
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="absolute right-16 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">WhatsApp</span>
      </a>
      <a href={`tel:${COMPANY.phoneRaw}`} aria-label="Call" className="rounded-full shadow-2xl gradient-gold hover:scale-110 transition-transform flex items-center justify-center group relative" style={{width:'52px', height:'52px'}}>
        <Phone className="w-5 h-5 text-navy" style={{color:'#0a1628'}} />
        <span className="absolute right-16 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">Call Now</span>
      </a>
    </div>
  );
}
