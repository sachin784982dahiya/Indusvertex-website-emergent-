'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@indusvertex.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('iv_admin_token')) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const submit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const res = await fetch('/api/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) });
      const d = await res.json();
      if (d.success) {
        localStorage.setItem('iv_admin_token', d.token);
        toast.success('Logged in');
        router.push('/admin/dashboard');
      } else toast.error(d.error || 'Login failed');
    } catch { toast.error('Network error'); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-navy p-4" style={{paddingTop:'6rem'}}>
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <Card className="relative w-full max-w-md p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg gradient-gold flex items-center justify-center"><ShieldCheck className="w-6 h-6 text-navy" style={{color:'#0a1628'}} /></div>
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">Admin Portal</div>
            <h1 className="text-xl font-bold">IndusVertex Console</h1>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div><Label>Email</Label><Input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1.5" /></div>
          <div><Label>Password</Label><Input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1.5" /></div>
          <Button type="submit" disabled={loading} className="w-full font-semibold" style={{backgroundColor:'#0a1628', color:'#fff', height:'46px'}}>{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}</Button>
        </form>
        <div className="mt-6 p-3 bg-muted rounded-md text-xs text-muted-foreground">
          <strong>Default credentials (change in production):</strong><br />
          Email: admin@indusvertex.com<br />
          Password: IndusVertex@2025
        </div>
      </Card>
    </div>
  );
}
