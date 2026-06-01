'use client';
import { motion } from 'framer-motion';
import { CLIENTS } from '@/lib/services-data';
import { Building2 } from 'lucide-react';

export default function Clients() {
  return (
    <div>
      <section className="pt-36 pb-20 gradient-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">Our Clients</div>
          <h1 className="text-5xl lg:text-6xl font-bold max-w-4xl leading-tight">Trusted by India’s leading enterprises.</h1>
          <p className="mt-6 text-lg text-white/75 max-w-3xl">From telecom giants to hyperscale data centres and renewable energy leaders — organisations that demand precision, compliance and reliability choose IndusVertex.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {CLIENTS.map((c, i) => (
              <motion.div key={c} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }} className="aspect-[4/3] rounded-xl border-2 border-border bg-card flex flex-col items-center justify-center p-5 text-center hover:border-accent hover:shadow-xl hover:-translate-y-1 transition-all group">
                <Building2 className="w-9 h-9 text-accent mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-bold text-foreground/85 leading-tight">{c}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Join our growing list of partners</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">Whether you’re scaling critical infrastructure or navigating complex compliance — IndusVertex delivers with single-partner accountability.</p>
        </div>
      </section>
    </div>
  );
}
