'use client';
import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { TEAM as STATIC_TEAM } from '@/lib/services-data';
import PersonAvatar from '@/components/PersonAvatar';
import { Award, Briefcase, X, ZoomIn } from 'lucide-react';

function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.88)' }}
        onClick={onClose}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all">
          <X className="w-5 h-5" />
        </button>
        <motion.img
          initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.25 }}
          src={src} alt={alt}
          className="max-w-sm w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default function Team() {
  const [team, setTeam] = useState(STATIC_TEAM);
  const [lightbox, setLightbox] = useState(null); // { src, alt }

  useEffect(() => {
    fetch('/api/team').then(r => r.ok ? r.json() : null).then(d => {
      if (d?.team?.length) setTeam(d.team);
    }).catch(() => {});
  }, []);

  return (
    <div>
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
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
                    <div
                      className="relative cursor-zoom-in group/avatar flex-shrink-0"
                      onClick={() => (m.imageUrl || m.image) && setLightbox({ src: m.imageUrl || m.image, alt: m.name })}
                    >
                      <PersonAvatar name={m.name} imageUrl={m.imageUrl || m.image} size="lg" shape="square" />
                      <div className="absolute inset-0 rounded-xl bg-black/0 group-hover/avatar:bg-black/25 transition-all flex items-center justify-center">
                        <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
                      </div>
                    </div>
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
