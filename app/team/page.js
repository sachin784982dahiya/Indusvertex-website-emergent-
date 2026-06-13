'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { TEAM as STATIC_TEAM } from '@/lib/services-data';
import PersonAvatar from '@/components/PersonAvatar';
import { Award, Briefcase } from 'lucide-react';

export default function Team() {
  const [team, setTeam] = useState(STATIC_TEAM);

  useEffect(() => {
    fetch('/api/team').then(r => r.ok ? r.json() : null).then(d => {
      if (d?.team?.length) setTeam(d.team);
    }).catch(() => {});
  }, []);

  return (
    <div>
      <section className="min-h-[65vh] flex items-center gradient-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6 pt-24 pb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">Leadership & Team</div>
          <h1 className="text-5xl lg:text-6xl font-bold max-w-4xl leading-tight">The minds engineering IndusVertex.</h1>
          <p className="mt-6 text-lg text-white/75 max-w-3xl">A multi-disciplinary team of engineers, financial strategists and legal experts with decades of combined experience across power, infrastructure and regulatory domains.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-7">
            {team.map((m, i) => (
              <motion.div
                key={m.id || m.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card className="p-8 hover:shadow-2xl transition-all border-border/60 h-full group">
                  <div className="flex items-start gap-6">
                    <PersonAvatar name={m.name} imageUrl={m.imageUrl || m.image} size="lg" shape="square" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold leading-tight">{m.name}</h3>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-accent" />
                        <div className="text-accent font-semibold text-sm">{m.role}</div>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Award className="w-3.5 h-3.5 text-muted-foreground" />
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">{m.creds}</div>
                      </div>
                      <p className="mt-4 text-foreground/75 leading-relaxed text-sm">{m.bio}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Want to know more about our team?</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">Reach out for a confidential discussion about engineering, infrastructure, compliance or legal advisory — our leadership will respond personally.</p>
        </div>
      </section>
    </div>
  );
}
