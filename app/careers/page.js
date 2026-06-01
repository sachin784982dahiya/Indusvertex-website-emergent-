'use client';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Briefcase, Clock, Award, ArrowRight, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ name:'', email:'', phone:'', experience:'', coverLetter:'', resumeUrl:'' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetch('/api/careers').then(r=>r.json()).then(d=>{ setJobs(d.jobs || []); setLoading(false); }).catch(()=>setLoading(false)); }, []);

  const apply = async (e) => {
    e.preventDefault(); setSubmitting(true);
    try {
      const res = await fetch('/api/career-application', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ ...form, jobTitle: selected.title }) });
      const d = await res.json();
      if (d.success) { toast.success(d.message); setSelected(null); setForm({ name:'', email:'', phone:'', experience:'', coverLetter:'', resumeUrl:'' }); }
      else toast.error(d.error || 'Could not submit');
    } catch { toast.error('Network error'); }
    setSubmitting(false);
  };

  return (
    <div>
      <section className="pt-36 pb-20 gradient-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">Careers</div>
          <h1 className="text-5xl lg:text-6xl font-bold max-w-4xl leading-tight">Build the infrastructure of tomorrow.</h1>
          <p className="mt-6 text-lg text-white/75 max-w-3xl">Join a multi-disciplinary team of engineers, project managers and legal experts solving high-stakes infrastructure challenges across India.</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Open Positions</div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">Current openings</h2>
          {loading ? <div className="flex justify-center py-12"><Loader2 className="w-7 h-7 animate-spin text-accent" /></div> : (
            <div className="space-y-4">
              {jobs.map(j => (
                <Card key={j.id} className="p-6 hover:shadow-xl transition-shadow border-border/60">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">{j.title}</h3>
                      <div className="text-sm text-accent font-semibold mt-0.5">{j.department}</div>
                      <p className="text-foreground/70 mt-2 text-sm leading-relaxed">{j.description}</p>
                      <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{j.location}</span>
                        <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{j.type}</span>
                        <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5" />{j.experience}</span>
                      </div>
                    </div>
                    <Button onClick={()=>setSelected(j)} className="font-semibold flex-shrink-0" style={{backgroundColor:'#0a1628', color:'#fff'}}>Apply Now <ArrowRight className="ml-2 w-4 h-4" /></Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={()=>setSelected(null)}>
          <Card className="max-w-2xl w-full p-8 my-8" onClick={e=>e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-xs uppercase tracking-wider text-accent font-semibold">Apply for</div>
                <h3 className="text-2xl font-bold">{selected.title}</h3>
              </div>
              <button onClick={()=>setSelected(null)} className="p-2 hover:bg-muted rounded-md"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={apply} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label>Full Name *</Label><Input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="mt-1.5" /></div>
                <div><Label>Email *</Label><Input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="mt-1.5" /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div><Label>Phone</Label><Input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="mt-1.5" /></div>
                <div><Label>Total Experience</Label><Input placeholder="e.g. 5 years" value={form.experience} onChange={e=>setForm({...form,experience:e.target.value})} className="mt-1.5" /></div>
              </div>
              <div><Label>Resume / CV Link</Label><Input placeholder="Google Drive / LinkedIn URL" value={form.resumeUrl} onChange={e=>setForm({...form,resumeUrl:e.target.value})} className="mt-1.5" /></div>
              <div><Label>Cover Letter</Label><Textarea rows={4} value={form.coverLetter} onChange={e=>setForm({...form,coverLetter:e.target.value})} placeholder="Tell us why you’re a fit…" className="mt-1.5" /></div>
              <Button type="submit" disabled={submitting} className="w-full font-semibold" style={{backgroundColor:'#d4af37', color:'#0a1628', height:'48px'}}>{submitting ? 'Submitting…' : 'Submit Application'}</Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
