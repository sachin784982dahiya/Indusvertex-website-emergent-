'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Inbox, Briefcase, FolderKanban, FileText, Users, MessageSquareQuote, Building2, LogOut, Trash2, Plus, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';

function useAuth() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = typeof window !== 'undefined' ? localStorage.getItem('iv_admin_token') : null;
    if (!t) { router.push('/admin'); return; }
    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${t}` } })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(() => { setToken(t); setReady(true); })
      .catch(() => { localStorage.removeItem('iv_admin_token'); router.push('/admin'); });
  }, [router]);
  const authFetch = useCallback((url, opts = {}) => fetch(url, { ...opts, headers: { ...(opts.headers || {}), 'Content-Type':'application/json', Authorization: `Bearer ${token}` } }), [token]);
  return { token, ready, authFetch };
}

function Stat({ icon: Ic, label, value, accent }) {
  return (
    <Card className="p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${accent || 'gradient-navy'}`}><Ic className="w-5 h-5 text-gold" /></div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      </div>
    </Card>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const { ready, authFetch, token } = useAuth();
  const [leads, setLeads] = useState([]);
  const [apps, setApps] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [team, setTeam] = useState([]);
  const [tms, setTms] = useState([]);
  const [clients, setClients] = useState([]);
  const [modal, setModal] = useState(null); // {type, data}
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  const loadAll = useCallback(async () => {
    if (!token) return;
    const [a, b, c, d, e, f, g, h] = await Promise.all([
      authFetch('/api/leads'), authFetch('/api/applications'), fetch('/api/careers'),
      fetch('/api/projects'), fetch('/api/blogs'), fetch('/api/team'),
      fetch('/api/testimonials'), fetch('/api/clients')
    ]);
    const J = (r) => r.json();
    setLeads((await J(a)).leads || []);
    setApps((await J(b)).applications || []);
    setJobs((await J(c)).jobs || []);
    setProjects((await J(d)).projects || []);
    setBlogs((await J(e)).blogs || []);
    setTeam((await J(f)).team || []);
    setTms((await J(g)).testimonials || []);
    setClients((await J(h)).clients || []);
  }, [authFetch, token]);

  useEffect(() => { if (ready) loadAll(); }, [ready, loadAll]);

  const logout = () => { localStorage.removeItem('iv_admin_token'); router.push('/admin'); };
  const del = async (resource, id) => {
    if (!confirm('Delete this item?')) return;
    const r = await authFetch(`/api/${resource}/${id}`, { method:'DELETE' });
    if (r.ok) { toast.success('Deleted'); loadAll(); } else toast.error('Failed');
  };

  const openModal = (type, data = {}) => {
    setModal({ type });
    if (type === 'job') setForm({ title:'', department:'', location:'', type:'Full-time', experience:'', description:'', ...data });
    else if (type === 'project') setForm({ title:'', client:'', location:'', category:'Power Transmission', description:'', completionDate:'', image:'', ...data });
    else if (type === 'blog') setForm({ title:'', slug:'', excerpt:'', content:'', category:'General', tags:'', author:'IndusVertex Team', image:'', seoTitle:'', seoDescription:'', published:true, ...data, tags: Array.isArray(data?.tags) ? data.tags.join(', ') : (data?.tags || '') });
    else if (type === 'team') setForm({ name:'', role:'', creds:'', bio:'', order:99, ...data });
    else if (type === 'testimonial') setForm({ name:'', title:'', company:'', quote:'', rating:5, ...data });
    else if (type === 'client') setForm({ name:'', logoUrl:'', order:99, ...data });
  };

  const save = async () => {
    setSaving(true);
    const map = { job:'careers', project:'projects', blog:'blogs', team:'team', testimonial:'testimonials', client:'clients' };
    const resource = map[modal.type];
    const payload = { ...form };
    if (modal.type === 'blog' && typeof payload.tags === 'string') payload.tags = payload.tags.split(',').map(t=>t.trim()).filter(Boolean);
    const url = form.id ? `/api/${resource}/${form.id}` : `/api/${resource}`;
    const method = form.id ? 'PUT' : 'POST';
    const r = await authFetch(url, { method, body: JSON.stringify(payload) });
    if (r.ok) { toast.success(form.id ? 'Updated' : 'Created'); setModal(null); loadAll(); }
    else toast.error('Failed');
    setSaving(false);
  };

  if (!ready) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>;

  return (
    <div className="min-h-screen bg-muted/20 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">Admin Console</div>
            <h1 className="text-3xl font-bold">IndusVertex Dashboard</h1>
          </div>
          <Button onClick={logout} variant="outline"><LogOut className="w-4 h-4 mr-2" />Logout</Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Stat icon={Inbox} label="New Leads" value={leads.length} />
          <Stat icon={Briefcase} label="Applications" value={apps.length} />
          <Stat icon={FolderKanban} label="Projects" value={projects.length} />
          <Stat icon={FileText} label="Blog Posts" value={blogs.length} />
        </div>

        <Tabs defaultValue="leads">
          <TabsList className="flex-wrap h-auto">
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="blogs">Blog</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="mt-4">
            <Card className="overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted text-left"><tr><th className="p-3">Type</th><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Phone</th><th className="p-3">Message</th><th className="p-3">Date</th><th></th></tr></thead>
                <tbody>{leads.map(l => (
                  <tr key={l.id} className="border-t border-border">
                    <td className="p-3"><span className="text-xs px-2 py-0.5 rounded-full bg-accent/15 text-accent font-semibold">{l.type}</span></td>
                    <td className="p-3 font-semibold">{l.name}</td>
                    <td className="p-3">{l.email}</td>
                    <td className="p-3">{l.phone}</td>
                    <td className="p-3 max-w-xs truncate">{l.message}</td>
                    <td className="p-3 text-xs text-muted-foreground">{new Date(l.createdAt).toLocaleDateString()}</td>
                    <td className="p-3"><button onClick={()=>del('leads', l.id)} className="text-destructive hover:bg-destructive/10 p-1.5 rounded"><Trash2 className="w-4 h-4" /></button></td>
                  </tr>
                ))}{!leads.length && <tr><td colSpan="7" className="p-8 text-center text-muted-foreground">No leads yet</td></tr>}</tbody>
              </table>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="mt-4">
            <Card className="overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted text-left"><tr><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Job</th><th className="p-3">Exp</th><th className="p-3">Resume</th><th className="p-3">Date</th></tr></thead>
                <tbody>{apps.map(a => (
                  <tr key={a.id} className="border-t border-border">
                    <td className="p-3 font-semibold">{a.name}</td><td className="p-3">{a.email}</td><td className="p-3">{a.jobTitle}</td><td className="p-3">{a.experience}</td>
                    <td className="p-3">{a.resumeUrl ? <a href={a.resumeUrl} target="_blank" rel="noreferrer" className="text-accent underline">View CV</a> : '—'}</td>
                    <td className="p-3 text-xs text-muted-foreground">{new Date(a.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}{!apps.length && <tr><td colSpan="6" className="p-8 text-center text-muted-foreground">No applications yet</td></tr>}</tbody>
              </table>
            </Card>
          </TabsContent>

          {[
            { key:'jobs', list:jobs, type:'job', label:'Job', fields:['title','department','location'] },
            { key:'projects', list:projects, type:'project', label:'Project', fields:['title','client','location','category'] },
            { key:'blogs', list:blogs, type:'blog', label:'Article', fields:['title','category','author'] },
            { key:'team', list:team, type:'team', label:'Team Member', fields:['name','role','creds'] },
            { key:'testimonials', list:tms, type:'testimonial', label:'Testimonial', fields:['name','company','quote'] },
            { key:'clients', list:clients, type:'client', label:'Client', fields:['name'] },
          ].map(s => (
            <TabsContent key={s.key} value={s.key} className="mt-4">
              <div className="mb-3 flex justify-end"><Button onClick={()=>openModal(s.type)} style={{backgroundColor:'#0a1628', color:'#fff'}}><Plus className="w-4 h-4 mr-2" />Add {s.label}</Button></div>
              <Card className="overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted text-left"><tr>{s.fields.map(f => <th key={f} className="p-3 capitalize">{f}</th>)}<th></th></tr></thead>
                  <tbody>{s.list.map(item => (
                    <tr key={item.id} className="border-t border-border">
                      {s.fields.map(f => <td key={f} className="p-3 max-w-xs truncate">{Array.isArray(item[f]) ? item[f].join(', ') : (item[f] || '—')}</td>)}
                      <td className="p-3 text-right whitespace-nowrap">
                        <button onClick={()=>openModal(s.type, item)} className="text-xs text-accent hover:underline mr-3">Edit</button>
                        <button onClick={()=>del(s.key, item.id)} className="text-destructive hover:bg-destructive/10 p-1.5 rounded inline-flex"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}{!s.list.length && <tr><td colSpan={s.fields.length+1} className="p-8 text-center text-muted-foreground">No items yet</td></tr>}</tbody>
                </table>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={()=>setModal(null)}>
          <Card className="max-w-2xl w-full p-7 my-8" onClick={e=>e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold capitalize">{form.id ? 'Edit' : 'New'} {modal.type}</h3>
              <button onClick={()=>setModal(null)} className="p-2 hover:bg-muted rounded"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              {modal.type === 'job' && (<>
                <div><Label>Title</Label><Input value={form.title||''} onChange={e=>setForm({...form,title:e.target.value})} /></div>
                <div className="grid grid-cols-2 gap-3"><div><Label>Department</Label><Input value={form.department||''} onChange={e=>setForm({...form,department:e.target.value})} /></div><div><Label>Location</Label><Input value={form.location||''} onChange={e=>setForm({...form,location:e.target.value})} /></div></div>
                <div className="grid grid-cols-2 gap-3"><div><Label>Type</Label><Input value={form.type||''} onChange={e=>setForm({...form,type:e.target.value})} /></div><div><Label>Experience</Label><Input value={form.experience||''} onChange={e=>setForm({...form,experience:e.target.value})} /></div></div>
                <div><Label>Description</Label><Textarea rows={4} value={form.description||''} onChange={e=>setForm({...form,description:e.target.value})} /></div>
              </>)}
              {modal.type === 'project' && (<>
                <div><Label>Title</Label><Input value={form.title||''} onChange={e=>setForm({...form,title:e.target.value})} /></div>
                <div className="grid grid-cols-2 gap-3"><div><Label>Client</Label><Input value={form.client||''} onChange={e=>setForm({...form,client:e.target.value})} /></div><div><Label>Location</Label><Input value={form.location||''} onChange={e=>setForm({...form,location:e.target.value})} /></div></div>
                <div className="grid grid-cols-2 gap-3"><div><Label>Category</Label><Input value={form.category||''} onChange={e=>setForm({...form,category:e.target.value})} /></div><div><Label>Completion Date</Label><Input value={form.completionDate||''} onChange={e=>setForm({...form,completionDate:e.target.value})} placeholder="2024-08" /></div></div>
                <div><Label>Image URL</Label><Input value={form.image||''} onChange={e=>setForm({...form,image:e.target.value})} /></div>
                <div><Label>Description</Label><Textarea rows={4} value={form.description||''} onChange={e=>setForm({...form,description:e.target.value})} /></div>
              </>)}
              {modal.type === 'blog' && (<>
                <div className="grid grid-cols-2 gap-3"><div><Label>Title</Label><Input value={form.title||''} onChange={e=>setForm({...form,title:e.target.value})} /></div><div><Label>Slug</Label><Input value={form.slug||''} onChange={e=>setForm({...form,slug:e.target.value})} placeholder="auto-generated" /></div></div>
                <div className="grid grid-cols-2 gap-3"><div><Label>Category</Label><Input value={form.category||''} onChange={e=>setForm({...form,category:e.target.value})} /></div><div><Label>Author</Label><Input value={form.author||''} onChange={e=>setForm({...form,author:e.target.value})} /></div></div>
                <div><Label>Image URL</Label><Input value={form.image||''} onChange={e=>setForm({...form,image:e.target.value})} /></div>
                <div><Label>Tags (comma separated)</Label><Input value={form.tags||''} onChange={e=>setForm({...form,tags:e.target.value})} /></div>
                <div><Label>Excerpt</Label><Textarea rows={2} value={form.excerpt||''} onChange={e=>setForm({...form,excerpt:e.target.value})} /></div>
                <div><Label>Content (HTML allowed)</Label><Textarea rows={8} value={form.content||''} onChange={e=>setForm({...form,content:e.target.value})} /></div>
                <div className="grid grid-cols-2 gap-3"><div><Label>SEO Title</Label><Input value={form.seoTitle||''} onChange={e=>setForm({...form,seoTitle:e.target.value})} /></div><div><Label>SEO Description</Label><Input value={form.seoDescription||''} onChange={e=>setForm({...form,seoDescription:e.target.value})} /></div></div>
              </>)}
              {modal.type === 'team' && (<>
                <div className="grid grid-cols-2 gap-3"><div><Label>Name</Label><Input value={form.name||''} onChange={e=>setForm({...form,name:e.target.value})} /></div><div><Label>Role</Label><Input value={form.role||''} onChange={e=>setForm({...form,role:e.target.value})} /></div></div>
                <div className="grid grid-cols-2 gap-3"><div><Label>Credentials</Label><Input value={form.creds||''} onChange={e=>setForm({...form,creds:e.target.value})} /></div><div><Label>Order</Label><Input type="number" value={form.order||''} onChange={e=>setForm({...form,order:Number(e.target.value)})} /></div></div>
                <div><Label>Bio</Label><Textarea rows={5} value={form.bio||''} onChange={e=>setForm({...form,bio:e.target.value})} /></div>
              </>)}
              {modal.type === 'testimonial' && (<>
                <div className="grid grid-cols-2 gap-3"><div><Label>Name</Label><Input value={form.name||''} onChange={e=>setForm({...form,name:e.target.value})} /></div><div><Label>Title</Label><Input value={form.title||''} onChange={e=>setForm({...form,title:e.target.value})} /></div></div>
                <div className="grid grid-cols-2 gap-3"><div><Label>Company</Label><Input value={form.company||''} onChange={e=>setForm({...form,company:e.target.value})} /></div><div><Label>Rating</Label><Input type="number" min="1" max="5" value={form.rating||5} onChange={e=>setForm({...form,rating:Number(e.target.value)})} /></div></div>
                <div><Label>Quote</Label><Textarea rows={4} value={form.quote||''} onChange={e=>setForm({...form,quote:e.target.value})} /></div>
              </>)}
              {modal.type === 'client' && (<>
                <div><Label>Name</Label><Input value={form.name||''} onChange={e=>setForm({...form,name:e.target.value})} /></div>
                <div><Label>Logo URL</Label><Input value={form.logoUrl||''} onChange={e=>setForm({...form,logoUrl:e.target.value})} /></div>
                <div><Label>Order</Label><Input type="number" value={form.order||0} onChange={e=>setForm({...form,order:Number(e.target.value)})} /></div>
              </>)}
              <div className="flex gap-3 pt-2">
                <Button onClick={save} disabled={saving} className="flex-1 font-semibold" style={{backgroundColor:'#d4af37', color:'#0a1628'}}>{saving ? 'Saving…' : 'Save'}</Button>
                <Button onClick={()=>setModal(null)} variant="outline" className="flex-1">Cancel</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
