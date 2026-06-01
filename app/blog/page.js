'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Calendar, User, Tag, Loader2 } from 'lucide-react';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');

  const fetchBlogs = (search = '', category = '') => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (category && category !== 'All') params.set('category', category);
    fetch(`/api/blogs?${params}`).then(r=>r.json()).then(d=>{ setBlogs(d.blogs || []); setLoading(false); }).catch(()=>setLoading(false));
  };
  useEffect(() => { fetchBlogs(); }, []);
  useEffect(() => { const t = setTimeout(() => fetchBlogs(q, cat), 350); return () => clearTimeout(t); }, [q, cat]);

  const cats = ['All', ...Array.from(new Set(blogs.map(b => b.category)))];

  return (
    <div>
      <section className="pt-36 pb-16 gradient-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">Insights & Blog</div>
          <h1 className="text-5xl lg:text-6xl font-bold max-w-4xl leading-tight">Engineering perspectives & industry insights.</h1>
          <p className="mt-6 text-lg text-white/75 max-w-3xl">Field-tested perspectives on power, data centres, renewable energy, EV infrastructure and regulatory compliance from the IndusVertex team.</p>
          <div className="mt-8 relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
            <Input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search articles, tags…" className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50" />
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {cats.map(c => (
              <button key={c} onClick={()=>setCat(c)} className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors ${cat===c ? 'bg-foreground text-background border-foreground' : 'bg-card border-border hover:border-accent'}`}>{c}</button>
            ))}
          </div>
          {loading ? <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div> : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {blogs.map(b => (
                <Link key={b.id} href={`/blog/${b.slug}`} className="block group">
                  <Card className="h-full overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <span className="px-2 py-0.5 rounded-full bg-accent/15 text-accent font-semibold">{b.category}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(b.createdAt).toLocaleDateString('en-IN', { month:'short', day:'numeric', year:'numeric' })}</span>
                      </div>
                      <h3 className="text-xl font-bold leading-tight group-hover:text-accent transition-colors line-clamp-2">{b.title}</h3>
                      <p className="mt-2 text-sm text-foreground/70 line-clamp-3">{b.excerpt}</p>
                      <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><User className="w-3 h-3" />{b.author}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
              {!blogs.length && <div className="col-span-3 py-20 text-center text-muted-foreground">No articles found.</div>}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
