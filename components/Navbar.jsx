'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Moon, Sun, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SERVICES } from '@/lib/services-data';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services', mega: true },
  { href: '/projects', label: 'Projects' },
  { href: '/clients', label: 'Clients' },
  { href: '/legal', label: 'Legal' },
  { href: '/team', label: 'Team' },
  { href: '/contact', label: 'Contact' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); setServicesOpen(false); }, [pathname]);

  // Hide on admin routes
  if (pathname?.startsWith('/admin')) return null;

  const onHome = pathname === '/';
  const transparent = onHome && !scrolled;

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        transparent ? 'bg-transparent' : 'bg-background/85 backdrop-blur-xl border-b border-border shadow-sm'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-11 h-11 rounded-lg bg-white shadow-md flex items-center justify-center p-1 ring-1 ring-black/5">
                <img src="/assets/logo-symbol.png" alt="IndusVertex" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className={cn('font-bold text-base tracking-tight', transparent ? 'text-white' : 'text-foreground')}>IndusVertex</span>
                <span className={cn('text-[10px] uppercase tracking-[0.18em]', transparent ? 'text-white/70' : 'text-muted-foreground')}>Private Limited</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5">
              {nav.map((item) => {
                if (item.mega) {
                  return (
                    <div key={item.href} className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                      <Link href={item.href} className={cn(
                        'inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                        transparent ? 'text-white/90 hover:text-white' : 'text-foreground/80 hover:text-foreground',
                        pathname.startsWith('/services') && (transparent ? 'text-white' : 'text-primary')
                      )}>
                        {item.label} <ChevronDown className="w-3.5 h-3.5" />
                      </Link>
                      {servicesOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[640px]">
                          <div className="bg-popover border border-border rounded-xl shadow-2xl p-3 grid grid-cols-2 gap-1">
                            {SERVICES.map(s => (
                              <Link key={s.slug} href={`/services/${s.slug}`} className="text-sm px-3 py-2 rounded-md hover:bg-muted text-foreground/80 hover:text-foreground transition-colors">
                                {s.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link key={item.href} href={item.href} className={cn(
                    'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    transparent ? 'text-white/90 hover:text-white' : 'text-foreground/80 hover:text-foreground',
                    pathname === item.href && (transparent ? 'text-white' : 'text-primary')
                  )}>{item.label}</Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-1">
<button onClick={() => mounted && setTheme(theme === 'dark' ? 'light' : 'dark')} className={cn('p-2 rounded-md transition-colors', transparent ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-muted')} aria-label="Toggle theme">
                {mounted && theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Link href="/contact" className="hidden md:block ml-1">
                <Button className="font-semibold" style={{backgroundColor:'#d4af37', color:'#0a1628'}}>Request Consultation</Button>
              </Link>
              <button onClick={() => setOpen(!open)} className={cn('lg:hidden p-2 rounded-md', transparent ? 'text-white' : 'text-foreground')} aria-label="Menu">
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="lg:hidden bg-background border-t border-border">
            <nav className="px-4 py-3 flex flex-col">
              {nav.map(item => (
                <Link key={item.href} href={item.href} className={cn('py-2.5 text-sm font-medium border-b border-border/40 last:border-0', pathname === item.href ? 'text-primary' : 'text-foreground/80')}>{item.label}</Link>
              ))}
              <Link href="/contact" className="mt-3">
                <Button className="w-full font-semibold" style={{backgroundColor:'#d4af37', color:'#0a1628'}}>Request Consultation</Button>
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
