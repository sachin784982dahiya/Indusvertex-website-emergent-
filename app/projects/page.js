'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin, Building2, Loader2 } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/api/projects').then(r=>r.json()).then(d=>{ setProjects(d.projects || []); setLoading(false); }).catch(()=>setLoading(false));
  }, []);

  const cats = ['All', ...Array.from(new Set(projects.map(p => p.category)))];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div>
      <section className="pt-36 pb-20 gradient-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">Featured Projects</div>
          <h1 className="text-5xl lg:text-6xl font-bold max-w-4xl leading-tight">Engineering excellence — delivered at scale.</h1>
          <p className="mt-6 text-lg text-white/75 max-w-3xl">A curated selection of projects across power, data centres, renewable energy, EV infrastructure, environmental and IT.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {cats.map(c => (
              <button key={c} onClick={()=>setFilter(c)} className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors ${filter===c ? 'bg-foreground text-background border-foreground' : 'bg-card border-border hover:border-accent'}`}>{c}</button>
            ))}
          </div>
          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                  <Card className="overflow-hidden h-full hover:shadow-2xl hover:-translate-y-1 transition-all group">
                    <div className="h-52 overflow-hidden relative">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-background/90 backdrop-blur text-foreground">{p.category}</div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-lg mb-3 line-clamp-2">{p.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><Building2 className="w-3.5 h-3.5" />{p.client}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><MapPin className="w-3.5 h-3.5" />{p.location}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3"><Calendar className="w-3.5 h-3.5" />Completed {p.completionDate}</div>
                      <p className="text-sm text-foreground/75 leading-relaxed line-clamp-3">{p.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
