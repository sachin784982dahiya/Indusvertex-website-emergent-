'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Calendar, User, Tag, ArrowLeft, Loader2 } from 'lucide-react';

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blogs/${slug}`).then(r=>r.ok?r.json():null).then(d=>{ setBlog(d?.blog || null); setLoading(false); }).catch(()=>setLoading(false));
    if (typeof document !== 'undefined') document.title = 'Loading… — IndusVertex Blog';
  }, [slug]);

  useEffect(() => { if (blog && typeof document !== 'undefined') document.title = `${blog.seoTitle || blog.title} — IndusVertex Blog`; }, [blog]);

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-24"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>;
  if (!blog) return <div className="min-h-screen flex flex-col items-center justify-center pt-24 gap-3"><p className="text-muted-foreground">Article not found.</p><Link href="/blog" className="text-accent underline">Back to blog</Link></div>;

  return (
    <article>
      <section className="pt-32 pb-12 gradient-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-25" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white mb-5"><ArrowLeft className="w-3.5 h-3.5" />Back to blog</Link>
          <div className="flex items-center gap-3 text-xs text-white/70 mb-3">
            <span className="px-3 py-1 rounded-full bg-gold/20 text-gold font-semibold">{blog.category}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(blog.createdAt).toLocaleDateString('en-IN', { month:'long', day:'numeric', year:'numeric' })}</span>
            <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{blog.author}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">{blog.title}</h1>
          {blog.excerpt && <p className="mt-5 text-lg text-white/75 leading-relaxed max-w-3xl">{blog.excerpt}</p>}
        </div>
      </section>

      {blog.image && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <div className="aspect-[16/8] rounded-2xl overflow-hidden shadow-2xl"><img src={blog.image} alt={blog.title} className="w-full h-full object-cover" /></div>
        </div>
      )}

      <section className="py-12 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-foreground/85 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-2" dangerouslySetInnerHTML={{ __html: blog.content }} />
          {Array.isArray(blog.tags) && blog.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-border flex flex-wrap gap-2">
              {blog.tags.map(t => <span key={t} className="text-xs px-3 py-1 rounded-full bg-muted text-foreground/70 font-medium inline-flex items-center gap-1"><Tag className="w-3 h-3" />{t}</span>)}
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
