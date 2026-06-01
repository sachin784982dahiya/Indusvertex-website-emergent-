'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CLIENTS as STATIC_CLIENTS } from '@/lib/services-data';
import ClientLogo from '@/components/ClientLogo';

// Merge admin DB clients with static metadata (color, initials, domain)
function enrich(apiClients) {
  return apiClients.map(c => {
    const match = STATIC_CLIENTS.find(s => s.name.toLowerCase() === (c.name || '').toLowerCase());
    return {
      ...c,
      short: c.short || match?.short || c.name,
      initials: match?.initials || (c.name || '').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase(),
      color: match?.color || '#0a1628',
      domain: match?.domain || '',
    };
  });
}

export default function Clients() {
  const [clients, setClients] = useState(STATIC_CLIENTS);

  useEffect(() => {
    fetch('/api/clients').then(r => r.ok ? r.json() : null).then(d => {
      if (d?.clients?.length) setClients(enrich(d.clients));
    }).catch(() => {});
  }, []);

  return (
    <div>
      <section className="pt-36 pb-20 gradient-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">Our Clients</div>
          <h1 className="text-5xl lg:text-6xl font-bold max-w-4xl leading-tight">Trusted by India&rsquo;s leading enterprises.</h1>
          <p className="mt-6 text-lg text-white/75 max-w-3xl">From telecom giants to hyperscale data centres and renewable energy leaders &mdash; organisations that demand precision, compliance and reliability choose IndusVertex.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {clients.map((c, i) => (
              <motion.div
                key={c.id || c.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="aspect-[4/3] rounded-xl border-2 border-border bg-card flex flex-col items-center justify-center p-6 text-center hover:border-accent hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className="h-20 flex items-center justify-center mb-3">
                  {c.logoUrl ? (
                    <img src={c.logoUrl} alt={c.name} className="h-16 w-auto object-contain max-w-[160px]" />
                  ) : (
                    <ClientLogo client={c} size="lg" />
                  )}
                </div>
                <div className="font-semibold text-foreground/85 text-sm leading-tight">{c.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Join our growing list of partners</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">Whether you&rsquo;re scaling critical infrastructure or navigating complex compliance &mdash; IndusVertex delivers with single-partner accountability.</p>
        </div>
      </section>
    </div>
  );
}
