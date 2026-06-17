'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Moon, Sun, ChevronDown, Home, Info, Briefcase, FolderOpen, Users, Scale, UserCircle, Phone, ArrowRight, Handshake, Building2, Zap, Wrench, Battery, ClipboardCheck, Server, Car, ShieldAlert, Leaf, Landmark, Cpu, Network } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SERVICES } from '@/lib/services-data';

const nav = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: Info },
  { href: '/services', label: 'Services', icon: Briefcase, mega: true },
  { href: '/projects', label: 'Projects', icon: FolderOpen },
  { href: '/clients', label: 'Clients', icon: Users },
  // { href: '/legal', label: 'Legal', icon: Scale }, // temporarily hidden
  { href: '/team', label: 'Team', icon: UserCircle },
  { href: '/contact', label: 'Contact', icon: Phone },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); setServicesOpen(false); setWorkOpen(false); }, [pathname]);

  // Hide on admin routes
  if (pathname?.startsWith('/admin')) return null;

  const onHome = pathname === '/';
  const transparent = onHome && !scrolled;

  return (
    <>
      {/* ── FIXED TOP WRAPPER: ticker + navbar stacked cleanly ── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">

        {/* News Ticker */}
        <div className="w-full overflow-hidden bg-[#162844] border-b border-[#d4af37]/30 flex-shrink-0" style={{ height: '36px' }}>
          <div className="flex items-center h-full">
            <div className="flex-shrink-0 flex items-center gap-2 px-4 bg-[#d4af37] h-full">
              <span className="w-2 h-2 rounded-full bg-[#0a1628] animate-pulse" />
              <span className="text-[#0a1628] text-xs font-bold uppercase tracking-widest whitespace-nowrap">Latest</span>
            </div>
            <div className="relative flex-1 overflow-hidden h-full flex items-center group">
              <div className="flex whitespace-nowrap" style={{ animation: 'ticker-scroll 30s linear infinite' }}
                onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
                onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}>
                {[1,2,3].map(n => (
                  <span key={n} className="text-[#16a34a] text-base font-semibold px-10">
                    ⚡ A Single-Window Solution for Complete Project Lifecycle Management – From Design &amp; Approvals to Execution, Testing, Commissioning and Handover.
                  </span>
                ))}
              </div>
            </div>
          </div>
          <style>{`@keyframes ticker-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }`}</style>
        </div>

      <header className={cn(
        'transition-all duration-300',
        transparent
          ? 'border-b border-white/10'
          : 'bg-background/85 backdrop-blur-xl border-b border-border shadow-sm'
      )}
        style={transparent ? { background: 'linear-gradient(to bottom, rgba(5,14,28,0.92) 0%, rgba(5,14,28,0.4) 80%, rgba(5,14,28,0.0) 100%)' } : {}}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center p-1 ring-1 ring-black/5 flex-shrink-0">
                <img src="/assets/logo-symbol.png" alt="IndusVertex" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-lg tracking-tight">
                  <span className={transparent ? 'text-white' : 'text-[#0a1628] dark:text-white'}>Indus</span><span className="text-[#16a34a]">Vertex</span>
                </span>
                <span className={cn('text-[10px] uppercase tracking-[0.18em]', transparent ? 'text-white/70' : 'text-muted-foreground')}>Private Limited</span>
                <span className={cn('hidden lg:block text-[11px] tracking-[0.06em] font-medium mt-0.5', transparent ? 'text-[#d4af37]' : 'text-[#b8860b]')}>Transforming Vision into Infrastructure Reality</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5">
              {nav.map((item) => {
                if (item.mega) {
                  return (
                    <div key={item.href} className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                      <Link href={item.href} className={cn(
                        'inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                        transparent ? 'text-white hover:text-white/80' : 'text-foreground/80 hover:text-foreground',
                        pathname.startsWith('/services') && (transparent ? 'text-white' : 'text-primary')
                      )}>
                        {item.label} <ChevronDown className="w-3.5 h-3.5" />
                      </Link>
                      {servicesOpen && (() => {
                        const serviceIcons = {
                          'electrical-power-transmission': Zap,
                          'transformer-testing-maintenance': Wrench,
                          'power-backup-renewable': Battery,
                          'project-management-approvals': ClipboardCheck,
                          'data-centre-hvac': Server,
                          'ev-infrastructure': Car,
                          'fire-safety-surveillance': ShieldAlert,
                          'environmental-sustainability': Leaf,
                          'civil-structural': Landmark,
                          'automation-smart-infrastructure': Cpu,
                          'it-infrastructure-ofc': Network,
                        };
                        return (
                          <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[680px]">
                            <div className="bg-popover border border-border rounded-xl shadow-2xl p-4 grid grid-cols-2 gap-1">
                              {SERVICES.filter(s => s.slug !== 'legal-advisory').map(s => {
                                const Icon = serviceIcons[s.slug] || Briefcase;
                                return (
                                  <Link key={s.slug} href={`/services/${s.slug}`}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors group">
                                    <div className="w-7 h-7 rounded-md bg-[#0a1628] flex items-center justify-center flex-shrink-0 group-hover:bg-[#d4af37] transition-colors">
                                      <Icon className="w-3.5 h-3.5 text-[#d4af37] group-hover:text-[#0a1628] transition-colors" />
                                    </div>
                                    <span className="text-sm font-bold text-foreground group-hover:text-foreground tracking-tight">{s.title}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }
                return (
                  <Link key={item.href} href={item.href} className={cn(
                    'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    transparent ? 'text-white hover:text-white/80' : 'text-foreground/80 hover:text-foreground',
                    pathname === item.href && (transparent ? 'text-white' : 'text-primary')
                  )}>{item.label}</Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-1">
              <button onClick={() => mounted && setTheme(theme === 'dark' ? 'light' : 'dark')} className={cn('p-2 rounded-md transition-colors', transparent ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-muted')} aria-label="Toggle theme">
                {mounted && theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Work With Us dropdown */}
              <div className="relative hidden md:block" onMouseEnter={() => setWorkOpen(true)} onMouseLeave={() => setWorkOpen(false)}>
                <button className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-md transition-colors',
                  'bg-[#d4af37] text-[#0a1628] hover:bg-[#c9a430]'
                )}>
                  <Handshake className="w-4 h-4" /> Work With Us <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {workOpen && (
                  <div className="absolute top-full right-0 pt-2 w-52">
                    <div className="bg-popover border border-border rounded-xl shadow-2xl p-2 flex flex-col gap-1">
                      <Link href="/vendor" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted text-sm font-medium text-foreground transition-colors">
                        <div className="w-7 h-7 rounded-md bg-[#0a1628] flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-3.5 h-3.5 text-[#d4af37]" />
                        </div>
                        <div>
                          <div className="font-semibold text-xs">Become a Vendor</div>
                          <div className="text-[10px] text-muted-foreground">Register your firm</div>
                        </div>
                      </Link>
                      <Link href="/careers" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted text-sm font-medium text-foreground transition-colors">
                        <div className="w-7 h-7 rounded-md bg-[#16a34a] flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-xs">Join Our Team</div>
                          <div className="text-[10px] text-muted-foreground">View open positions</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/contact#inquiry" className="hidden md:block ml-1">
                <Button className="font-semibold" style={{backgroundColor:'#d4af37', color:'#0a1628'}}>Request Consultation</Button>
              </Link>
              <button onClick={() => setOpen(!open)} className={cn('lg:hidden p-2 rounded-md', transparent ? 'text-white' : 'text-foreground')} aria-label="Menu">
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

      </header>
      </div>{/* end fixed top wrapper */}

      {/* Mobile drawer overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        </div>
      )}

      {/* Mobile slide-in drawer */}
      <div className={cn(
        'lg:hidden fixed top-0 right-0 h-full w-[280px] z-50 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col',
        'bg-[#0a1628]',
        open ? 'translate-x-0' : 'translate-x-full'
      )}>
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 pt-6 pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white shadow flex items-center justify-center p-1">
              <img src="/assets/logo-symbol.png" alt="IndusVertex" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight">IndusVertex</div>
              <div className="text-white/40 text-[10px] uppercase tracking-widest">Private Limited</div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-0.5">
          {nav.map(item => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                  active
                    ? 'bg-[#d4af37] text-[#0a1628] font-semibold shadow-lg'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                )}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
                {active && <ArrowRight className="w-3.5 h-3.5 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="px-4 py-5 border-t border-white/10 space-y-2">
          <Link href="/vendor" onClick={() => setOpen(false)}>
            <button className="w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 border border-white/20 text-white">
              <Building2 className="w-4 h-4" /> Become a Vendor
            </button>
          </Link>
          <Link href="/careers" onClick={() => setOpen(false)}>
            <button className="w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 border border-white/20 text-white">
              <Briefcase className="w-4 h-4" /> Join Our Team
            </button>
          </Link>
          <Link href="/contact#inquiry" onClick={() => setOpen(false)}>
            <button className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90"
              style={{backgroundColor:'#d4af37', color:'#0a1628'}}>
              Request Consultation <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <p className="text-center text-white/30 text-[11px] mt-1">Precision Engineering & Sustainable Solutions</p>
        </div>
      </div>
    </>
  );
}
