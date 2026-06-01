'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Search, X, Loader2 } from 'lucide-react';

export default function SearchDialog({ open, onClose }) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  useEffect(() => { if (open && ref.current) ref.current.focus(); }, [open]);
  useEffect(() => {
    if (!q.trim()) { setResults([]); return; }
    setLoading(true);
    const t = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(q)}`).then(r=>r.json()).then(d=>{ setResults(d.results || []); setLoading(false); }).catch(()=>setLoading(false));
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 pt-24" onClick={onClose}>
      <div className="bg-popover w-full max-w-2xl rounded-xl shadow-2xl border border-border overflow-hidden" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input ref={ref} value={q} onChange={e=>setQ(e.target.value)} placeholder="Search services, projects, blog…" className="flex-1 bg-transparent outline-none text-base" />
          <button onClick={onClose} className="p-1.5 rounded hover:bg-muted"><X className="w-4 h-4" /></button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {loading && <div className="p-6 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-accent" /></div>}
          {!loading && q && results.length === 0 && <div className="p-6 text-center text-muted-foreground text-sm">No results for “{q}”</div>}
          {!loading && !q && <div className="p-6 text-center text-muted-foreground text-sm">Search across services, projects, blog and jobs.</div>}
          {results.map((r, i) => (
            <Link key={i} href={r.url} onClick={onClose} className="flex items-start gap-3 px-4 py-3 border-b border-border hover:bg-muted transition-colors">
              <span className="text-[10px] uppercase tracking-wider font-bold text-accent w-14 mt-1">{r.type}</span>
              <div className="flex-1"><div className="font-semibold">{r.title}</div>{r.excerpt && <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{r.excerpt}</div>}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
