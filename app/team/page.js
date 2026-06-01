import { Card } from '@/components/ui/card';
import { TEAM } from '@/lib/services-data';
import { Linkedin, Mail } from 'lucide-react';

export const metadata = { title: 'Leadership Team — IndusVertex' };

export default function Team() {
  const initials = (n) => n.split(' ').map(w=>w[0]).slice(0,2).join('');
  return (
    <div>
      <section className="pt-36 pb-20 gradient-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">Leadership & Team</div>
          <h1 className="text-5xl lg:text-6xl font-bold max-w-4xl leading-tight">The minds engineering IndusVertex.</h1>
          <p className="mt-6 text-lg text-white/75 max-w-3xl">A multi-disciplinary team of engineers, financial strategists and legal experts with decades of combined experience across power, infrastructure and regulatory domains.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-7">
          {TEAM.map((m) => (
            <Card key={m.name} className="p-8 hover:shadow-2xl transition-shadow border-border/60">
              <div className="flex items-start gap-5">
                <div className="w-20 h-20 rounded-2xl gradient-navy flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-2xl font-bold text-gold">{initials(m.name)}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold">{m.name}</h3>
                  <div className="text-accent font-semibold text-sm mt-0.5">{m.role}</div>
                  <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{m.creds}</div>
                  <p className="mt-4 text-foreground/75 leading-relaxed">{m.bio}</p>
                  <div className="flex gap-2 mt-5">
                    <a href="#" className="w-9 h-9 rounded-md border border-border flex items-center justify-center hover:bg-muted"><Linkedin className="w-4 h-4" /></a>
                    <a href="mailto:info@indusvertex.com" className="w-9 h-9 rounded-md border border-border flex items-center justify-center hover:bg-muted"><Mail className="w-4 h-4" /></a>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
