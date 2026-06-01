'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram, Download } from 'lucide-react';
import { COMPANY, SERVICES } from '@/lib/services-data';

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return (
    <footer className="gradient-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-lg bg-white shadow-md flex items-center justify-center p-1.5 ring-1 ring-white/20">
                <img src="/assets/logo-symbol.png" alt="IndusVertex" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-bold text-lg">IndusVertex</div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/60">Private Limited</div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-md">
              An integrated engineering, infrastructure, compliance, and advisory company — delivering end-to-end solutions for industries, corporates and government sectors across India.
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-start gap-3 text-white/80"><MapPin className="w-4 h-4 mt-0.5 text-gold flex-shrink-0" /><span>{COMPANY.address}</span></div>
              <div className="flex items-center gap-3 text-white/80"><Phone className="w-4 h-4 text-gold" /><a href={`tel:${COMPANY.phoneRaw}`} className="hover:text-white">{COMPANY.phone}</a></div>
              <div className="flex items-center gap-3 text-white/80"><Mail className="w-4 h-4 text-gold" /><a href={`mailto:${COMPANY.emails.info}`} className="hover:text-white">{COMPANY.emails.info}</a></div>
            </div>
            <a href="/company-profile.html" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-6 px-4 py-2.5 rounded-lg gradient-gold text-sm font-semibold" style={{color:'#0a1628'}}><Download className="w-4 h-4" />Download Company Profile</a>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] text-gold mb-4 font-semibold">Company</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/team" className="hover:text-white">Leadership</Link></li>
              <li><Link href="/projects" className="hover:text-white">Projects</Link></li>
              <li><Link href="/clients" className="hover:text-white">Clients</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] text-gold mb-4 font-semibold">Core Services</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {SERVICES.slice(0, 7).map(s => (
                <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-white">{s.title.split('&')[0].trim()}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.18em] text-gold mb-4 font-semibold">Connect</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link href="/legal" className="hover:text-white">IndusVertex Law Firm</Link></li>
              <li><a href={`mailto:${COMPANY.emails.business}`} className="hover:text-white">Business Inquiry</a></li>
              <li><a href={`mailto:${COMPANY.emails.legal}`} className="hover:text-white">Legal Inquiry</a></li>
              <li><Link href="/admin" className="hover:text-white">Admin Login</Link></li>
            </ul>
            <div className="flex items-center gap-3 mt-5">
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-md border border-white/15 flex items-center justify-center hover:bg-white/10"><Linkedin className="w-4 h-4" /></a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-md border border-white/15 flex items-center justify-center hover:bg-white/10"><Facebook className="w-4 h-4" /></a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-md border border-white/15 flex items-center justify-center hover:bg-white/10"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} IndusVertex Private Limited. All rights reserved. · CIN: {COMPANY.cin} · GSTIN: {COMPANY.gstin}
          </div>
          <div>Transforming Vision into Infrastructure Reality.</div>
        </div>
      </div>
    </footer>
  );
}
