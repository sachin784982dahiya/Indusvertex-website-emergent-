'use client';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PersonAvatar from '@/components/PersonAvatar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { COMPANY } from '@/lib/services-data';
import { Scale, Gavel, Building, ShieldCheck, AlertTriangle, CheckCircle2, ArrowRight, Award, Briefcase, Mail, Linkedin, X, Phone, User, MessageSquare, MapPin, HelpCircle, Search } from 'lucide-react';

// Default legal team displayed on the legal page. Admin can override / add more via team CRUD
// by giving role containing "Legal" or "Counsel".
const DEFAULT_LEGAL_TEAM = [
  {
    name: 'Adv. Pradeep Kumar',
    role: 'Partner',
    creds: 'B.Tech (IT) | LL.B | LL.M (Silver Medalist)',
    imageUrl: '/assets/adv-pradeep.png',
    bio: 'A legal and compliance specialist with 10+ years of experience in IT and electrical infrastructure, along with 3+ years of expertise in regulatory and environmental compliance. He is actively engaged in civil and criminal practice, supporting corporate and public sector matters.',
    practice: ['Corporate', 'Regulatory', 'Environmental', 'IT Infrastructure'],
  },
  {
    name: 'Adv. Kapil',
    role: 'Partner',
    creds: 'LL.M | Bar Council of India',
    imageUrl: '/assets/adv-kapil.png',
    bio: 'Leads banking, financial recovery and SARFAESI matters for the firm — representing leading banks and NBFCs in commercial litigation and asset recovery proceedings across India.',
    practice: ['Banking', 'SARFAESI', 'Recovery', 'Commercial Litigation'],
  },
  {
    name: 'Adv. Davesh',
    role: 'Partner',
    creds: 'LL.M | Property Law Specialist',
    imageUrl: '/assets/adv-davesh.png',
    bio: 'Specialises in property due diligence, RERA matters, land acquisition and real-estate dispute resolution — supporting both corporate and individual clients with end-to-end advisory.',
    practice: ['RERA', 'Real Estate', 'Property Due Diligence', 'Land Acquisition'],
  },
];

export default function Legal() {
  const [legalTeam, setLegalTeam] = useState(DEFAULT_LEGAL_TEAM);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | sent | error
  const [serviceSearch, setServiceSearch] = useState('');
  const [checkedDocs, setCheckedDocs] = useState({});
  const [activeChecklistCategory, setActiveChecklistCategory] = useState(0);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, subject: 'Legal Consultation Request', service: 'Legal Advisory' }),
      });
      if (res.ok) {
        setFormStatus('sent');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  }

  useEffect(() => {
    fetch('/api/team').then(r => r.ok ? r.json() : null).then(d => {
      const lawyers = (d?.team || []).filter(t => /legal|counsel|advoc/i.test(t.role || ''));
      if (lawyers.length) {
        // Merge: any admin-edited members override defaults by name match
        const merged = DEFAULT_LEGAL_TEAM.map(def => {
          const fromDb = lawyers.find(l => (l.name || '').toLowerCase().includes('pradeep') && def.name.toLowerCase().includes('pradeep'));
          return fromDb ? { ...def, ...fromDb } : def;
        });
        // Append additional lawyers from DB that aren't in defaults
        lawyers.forEach(l => {
          if (!merged.some(m => (m.name || '').toLowerCase() === (l.name || '').toLowerCase()) &&
              !(l.name || '').toLowerCase().includes('pradeep')) {
            merged.push({ ...l, practice: l.practice || [] });
          }
        });
        setLegalTeam(merged);
      }
    }).catch(() => {});
  }, []);

  const services = [
    'Legal Advisory for Corporate & Industrial Compliance',
    'Property Verification, Title Search & Due Diligence',
    'Banking, Financial Recovery & SARFAESI Matters',
    'Land Acquisition, Registry & Documentation Support',
    'Land & Revenue Compliance (CLU & Verification)',
    'Legal Support for Bad Debt Recovery',
    'Civil, Commercial & Corporate Litigation',
    'Contract Drafting, Vetting & Documentation',
    'RERA, Real Estate & Infrastructure Legal Advisory',
    'MSME, Vendor & Commercial Dispute Resolution',
    'Legal Notices, Reply Drafting & Case Documentation',
    'Criminal Complaints, Bail & Legal Representation Support',
    'Environmental, Pollution & Regulatory Compliance Advisory',
    'Fire NOC, Industrial Licensing & Statutory Approvals Support',
    'Tender, Contractual & Government Project Legal Support',
    'Infrastructure, EPC & Project Legal Consultancy',
    'End-to-End Liaisoning & Regulatory Coordination Services'
  ];
  const filteredServices = serviceSearch.trim()
    ? services.filter(s => s.toLowerCase().includes(serviceSearch.trim().toLowerCase()))
    : services;
  const stats = [
    { value: "10+", label: "Years of Legal Excellence" },
    { value: "500+", label: "Consultations Delivered" },
    { value: "100+", label: "Satisfied Clients" },
    { value: "24×7", label: "Legal Assistance" },
  ];
  
  const practiceAreas = [
    {
      icon: Building,
      title: "Corporate & Commercial Law",
      text: "Corporate advisory, compliance, governance and commercial documentation."
    },
    {
      icon: Gavel,
      title: "Civil & Criminal Litigation",
      text: "Representation before courts, tribunals and statutory authorities."
    },
    {
      icon: ShieldCheck,
      title: "Regulatory Compliance",
      text: "Environmental, labour, industrial and statutory compliance."
    },
    {
      icon: Scale,
      title: "Infrastructure & EPC Contracts",
      text: "Legal support for infrastructure, EPC and government projects."
    }
  ];

  const processSteps = [
    { step: '01', title: 'Initial Consultation', text: 'Share your matter with our team — by call, email or the form below — for a confidential first assessment.' },
    { step: '02', title: 'Case Assessment', text: 'Our advocates review documents, evaluate merits and identify the applicable legal framework.' },
    { step: '03', title: 'Strategy & Action', text: 'We draft a clear plan of action — drafting, filing, negotiation or representation — and keep you informed at every step.' },
    { step: '04', title: 'Resolution & Follow-up', text: 'We pursue resolution through litigation, settlement or compliance closure, with continued support post-resolution.' },
  ];

  const faqs = [
    { q: 'Does the firm handle matters outside Uttar Pradesh / NCR?', a: 'Yes. While our office is based in Ghaziabad, we represent clients — industries, corporates, banks, NBFCs and individuals — across India, particularly where a matter connects to infrastructure, telecom or industrial projects our engineering teams already work on.' },
    { q: 'What does an initial consultation cost?', a: 'The first consultation is a confidential discussion to understand your matter and scope of engagement. Fees for representation or advisory work are agreed transparently before any billable work begins, based on the nature and complexity of the matter.' },
    { q: 'How quickly will I hear back after submitting a query?', a: 'Our legal team aims to respond to every consultation request within 24 hours on business days.' },
    { q: 'Is the information on this website legal advice?', a: 'No. As per Bar Council of India rules, this website is for informational purposes only and does not constitute legal advice, solicitation or an advocate-client relationship. Please schedule a consultation to discuss your specific matter.' },
    { q: 'Can IndusVertex Law Firm support both corporate and individual clients?', a: 'Yes — we advise industries, corporates, banks and NBFCs on compliance, contracts and recovery matters, while also supporting individuals with property, civil, criminal and dispute-resolution needs.' },
  ];

  const documentChecklist = [
    {
      category: 'Property & Real Estate',
      items: ['Sale deed / title documents', 'Encumbrance certificate', 'Property tax receipts', 'Building approval / occupancy certificate', 'Identity & address proof of all parties'],
    },
    {
      category: 'Banking & Recovery (SARFAESI)',
      items: ['Loan agreement & sanction letter', 'Demand notice / SARFAESI notice copy', 'Security documents (mortgage / hypothecation)', 'Latest account statements', 'Correspondence with the bank / NBFC'],
    },
    {
      category: 'Corporate & Contracts',
      items: ['Company incorporation documents (COI, MOA/AOA)', 'Board resolutions', 'Draft or executed contract copy', 'Correspondence relevant to the matter', 'GST & PAN details'],
    },
    {
      category: 'Civil / Criminal Litigation',
      items: ['FIR copy / complaint copy (if any)', 'Relevant evidence or correspondence', 'Prior legal notices sent or received', 'Identity proof', 'Any court orders already passed'],
    },
  ];

  function toggleDoc(catIdx, itemIdx) {
    const key = `${catIdx}-${itemIdx}`;
    setCheckedDocs(prev => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div id="top">
      {/* CONSULTATION MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-background rounded-2xl shadow-2xl max-w-lg w-full p-8 border border-border relative">
            <button onClick={() => { setShowForm(false); setFormStatus('idle'); }} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted transition-colors">
              <X className="w-5 h-5" />
            </button>
            {formStatus === 'sent' ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Query Submitted</h3>
                <p className="text-foreground/70 text-sm">Our legal team will get back to you shortly at <strong>{formData.email || 'your email'}</strong>.</p>
                <Button className="mt-6 font-semibold" style={{ backgroundColor: '#d4af37', color: '#0a1628' }} onClick={() => { setShowForm(false); setFormStatus('idle'); }}>Close</Button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center flex-shrink-0"><Scale className="w-5 h-5" style={{ color: '#0a1628' }} /></div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight">Schedule a Consultation</h3>
                    <p className="text-xs text-muted-foreground">IndusVertex Law Firm · legal@indusvertex.com</p>
                  </div>
                </div>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input required placeholder="Full Name *" value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="email" required placeholder="Email Address *" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input placeholder="Phone Number" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37]" />
                  </div>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <textarea required rows={4} placeholder="Briefly describe your legal matter *" value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] resize-none" />
                  </div>
                  {formStatus === 'error' && <p className="text-red-500 text-xs">Something went wrong. Please try again or email legal@indusvertex.com directly.</p>}
                  <Button type="submit" disabled={formStatus === 'sending'} className="w-full font-semibold" style={{ backgroundColor: '#d4af37', color: '#0a1628', height: '48px' }}>
                    {formStatus === 'sending' ? 'Sending...' : 'Submit Query'} {formStatus !== 'sending' && <ArrowRight className="ml-2 w-4 h-4" />}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* DISCLAIMER POPUP */}
      {showDisclaimer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-background rounded-2xl shadow-2xl max-w-lg w-full p-8 border border-amber-500/40">
            <div className="flex items-start gap-4 mb-4">
              <AlertTriangle className="w-7 h-7 text-amber-500 flex-shrink-0 mt-0.5" />
              <h3 className="font-bold text-xl">Mandatory Disclaimer</h3>
            </div>
            <p className="text-foreground/75 leading-relaxed text-sm mb-6">
              As per the rules of the Bar Council of India, advocates are not permitted to advertise or solicit work. By accessing this website, you acknowledge that you are seeking information about IndusVertex Law Firm on your own accord and that there has been no solicitation, advertisement, or inducement by the Firm or its members. The content available on this website is solely for informational purposes and should not be construed as legal advice or opinion. IndusVertex Law Firm shall not be responsible for any action taken based on the information provided herein.
            </p>
            <Button
              className="w-full font-semibold"
              style={{ backgroundColor: '#d4af37', color: '#0a1628', height: '48px' }}
              onClick={() => setShowDisclaimer(false)}
            >
              I Understand, Proceed
            </Button>
          </div>
        </div>
      )}
      <section id="legal-about" className="pt-24 pb-24 relative overflow-hidden section-dark">

        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6 text-white">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-14 h-14 rounded-xl gradient-gold flex items-center justify-center"><Scale className="w-7 h-7" style={{color:'#0a1628'}} /></div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold">Legal Practice</div>
              <div className="text-2xl font-bold">IndusVertex Law Firm</div>
            </div>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold max-w-4xl leading-tight">Comprehensive legal, compliance & litigation advisory.</h1>
          <p className="mt-6 text-lg text-white/75 max-w-3xl leading-relaxed">IndusVertex Law Firm provides legal, compliance, litigation and advisory services to Industries, Corporates, Banks, NBFCs and Individual Clients across India — fully integrated with our engineering and infrastructure capabilities.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="font-semibold" style={{backgroundColor:'#d4af37', color:'#0a1628', height:'52px'}} onClick={() => setShowForm(true)}>Schedule a Consultation <ArrowRight className="ml-2 w-4 h-4" /></Button>
            <a href="mailto:legal@indusvertex.com"><Button size="lg" variant="outline" className="border-white/30 text-white bg-white/5 hover:bg-white/15 hover:text-white" style={{height:'52px'}}>legal@indusvertex.com</Button></a>
          </div>

          {/* STATS STRIP */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10">
            {stats.map(s => (
              <div key={s.label}>
                <div className="text-3xl lg:text-4xl font-bold text-gold">{s.value}</div>
                <div className="text-white/60 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Building, title:'Corporate & Banking', text:'Advisory across corporate compliance, SARFAESI matters and financial recovery for banks, NBFCs and corporates.' },
              { icon: Gavel, title:'Litigation & Dispute Resolution', text:'Civil, commercial and corporate litigation with MSME and vendor dispute resolution capabilities.' },
              { icon: ShieldCheck, title:'Regulatory & Compliance', text:'Environmental, pollution, fire NOC, industrial licensing and statutory approvals support.' }
            ].map(b => (
              <Card key={b.title} className="p-7 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-lg gradient-navy flex items-center justify-center mb-4"><b.icon className="w-6 h-6 text-gold" /></div>
                <h3 className="font-bold text-xl mb-2">{b.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{b.text}</p>
              </Card>
            ))}
          </div>

          {/* LEGAL TEAM */}
          <div id="legal-team" className="mb-8" style={{scrollMarginTop:'124px'}}>
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Our Legal Counsel</div>
            <h2 className="text-3xl lg:text-4xl font-bold">Meet the lawyers behind IndusVertex Law Firm</h2>
            <p className="text-foreground/70 mt-3 max-w-3xl">Multi-disciplinary legal expertise across corporate, banking, real estate, regulatory and litigation matters.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {legalTeam.map((m, i) => (
              <Card key={m.id || m.name + i} className="p-7 hover:shadow-xl transition-all border-border/60">
                <div className="flex flex-col items-center text-center">
                  <PersonAvatar name={m.name} imageUrl={m.imageUrl || m.image} size="lg" shape="circle" />
                  <div className="mt-5 w-full">
                    <h3 className="text-xl font-bold leading-tight">{m.name}</h3>
                    <div className="flex items-center justify-center gap-1.5 mt-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-accent" />
                      <div className="text-accent font-semibold text-sm">{m.role}</div>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mt-1">
                      <Award className="w-3.5 h-3.5 text-muted-foreground" />
                      <div className="text-[11px] text-muted-foreground uppercase tracking-wider">{m.creds}</div>
                    </div>
                    <p className="mt-4 text-sm text-foreground/75 leading-relaxed">{m.bio}</p>
                    {Array.isArray(m.practice) && m.practice.length > 0 && (
                      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                        {m.practice.map(p => (
                          <span key={p} className="text-[11px] px-2.5 py-1 rounded-full bg-muted text-foreground/70 font-medium">{p}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex justify-center gap-2 mt-5">
                      <a href="#" className="w-9 h-9 rounded-md border border-border flex items-center justify-center hover:bg-muted hover:border-accent transition-colors"><Linkedin className="w-4 h-4" /></a>
                      <a href="mailto:legal@indusvertex.com" className="w-9 h-9 rounded-md border border-border flex items-center justify-center hover:bg-muted hover:border-accent transition-colors"><Mail className="w-4 h-4" /></a>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* PRACTICE AREAS */}
          <div id="legal-services" className="mb-8" style={{scrollMarginTop:'124px'}}>
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Practice Areas</div>
            <h2 className="text-3xl lg:text-4xl font-bold">Full-spectrum legal services</h2>
            <p className="text-foreground/70 mt-3 max-w-3xl">From corporate compliance to courtroom representation — advisory backed by our infrastructure and engineering domain expertise.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {practiceAreas.map(p => (
              <Card key={p.title} className="p-6 hover:shadow-xl transition-shadow border-border/60">
                <div className="w-11 h-11 rounded-lg gradient-navy flex items-center justify-center mb-4"><p.icon className="w-5 h-5 text-gold" /></div>
                <h3 className="font-bold text-base mb-2">{p.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{p.text}</p>
              </Card>
            ))}
          </div>

          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={serviceSearch}
              onChange={e => setServiceSearch(e.target.value)}
              placeholder="Search practice areas — e.g. RERA, SARFAESI, contracts..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          {filteredServices.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-3">
              {filteredServices.map(s => (
                <div key={s} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border hover:border-accent transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/85">{s}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground text-sm">
              No practice areas match "{serviceSearch}" — try a different term, or <button onClick={() => setShowForm(true)} className="text-accent underline underline-offset-2">ask us directly</button>.
            </div>
          )}

          {/* PROCESS / HOW WE WORK */}
          <div className="mt-20">
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">How We Work</div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-10">A clear, structured engagement process</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map(p => (
                <div key={p.step} className="relative p-6 rounded-xl border border-border bg-card">
                  <div className="text-4xl font-bold text-accent/25 mb-2">{p.step}</div>
                  <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">{p.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-20 max-w-4xl mx-auto" id="legal-faq" style={{scrollMarginTop:'124px'}}>
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3 text-center">FAQ</div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-10 text-center">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    <span className="flex items-start gap-3"><HelpCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />{f.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/70 leading-relaxed pl-8">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* CONSULTATION PREP CHECKLIST */}
          <div className="mt-20 max-w-3xl mx-auto" id="legal-checklist" style={{scrollMarginTop:'124px'}}>
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3 text-center">Get Ready</div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-center">Consultation prep checklist</h2>
            <p className="text-foreground/70 text-center max-w-xl mx-auto mb-8">Pick the category closest to your matter and check off what you already have — it'll make your first consultation faster and more productive.</p>

            <div>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {documentChecklist.map((c, i) => (
                  <button key={c.category} onClick={() => setActiveChecklistCategory(i)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                      activeChecklistCategory === i
                        ? 'bg-accent text-accent-foreground border-accent'
                        : 'bg-card border-border text-foreground/70 hover:border-accent'
                    }`}>
                    {c.category}
                  </button>
                ))}
              </div>

              {documentChecklist.map((c, catIdx) => {
                if (catIdx !== activeChecklistCategory) return null;
                const checkedCount = c.items.filter((_, itemIdx) => checkedDocs[`${catIdx}-${itemIdx}`]).length;
                return (
                  <Card key={c.category} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg">{c.category}</h3>
                      <span className="text-xs font-medium text-muted-foreground">{checkedCount}/{c.items.length} ready</span>
                    </div>
                    <div className="space-y-3">
                      {c.items.map((item, itemIdx) => {
                        const key = `${catIdx}-${itemIdx}`;
                        return (
                          <label key={key} className="flex items-start gap-3 cursor-pointer group">
                            <Checkbox checked={!!checkedDocs[key]} onCheckedChange={() => toggleDoc(catIdx, itemIdx)} className="mt-0.5" />
                            <span className={`text-sm leading-relaxed ${checkedDocs[key] ? 'text-muted-foreground line-through' : 'text-foreground/85'}`}>{item}</span>
                          </label>
                        );
                      })}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="legal-contact" className="py-20 section-dark" style={{scrollMarginTop:'124px'}}>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-3 text-center">Get In Touch</div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-3">Contact IndusVertex Law Firm</h2>
          <p className="text-white/60 text-center max-w-xl mx-auto mb-12">Reach out for a confidential consultation. Our legal team will respond within 24 hours.</p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Mail,    label: 'Email Us',     value: COMPANY.emails.legal,     href: `mailto:${COMPANY.emails.legal}` },
              { icon: Phone,   label: 'Call Us',      value: COMPANY.phone,             href: `tel:${COMPANY.phoneRaw}` },
              { icon: MapPin,  label: 'Office',       value: COMPANY.address, href: null },
            ].map(c => (
              <div key={c.label} className="flex flex-col items-center text-center p-7 rounded-2xl border border-[#d4af37]/20 bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center mb-4">
                  <c.icon className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div className="text-xs uppercase tracking-widest text-white/40 mb-1">{c.label}</div>
                {c.href
                  ? <a href={c.href} className="text-white font-semibold hover:text-[#d4af37] transition-colors">{c.value}</a>
                  : <span className="text-white font-semibold">{c.value}</span>}
              </div>
            ))}
          </div>
          <div className="text-center">
            <button onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-[#0a1628] bg-[#d4af37] hover:bg-[#c9a430] transition-colors text-base">
              Schedule a Consultation <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-16 pt-8 border-t border-white/10 text-center text-white/30 text-xs">
            © {new Date().getFullYear()} IndusVertex Law Firm · As per Bar Council of India rules, this website does not constitute legal advice or solicitation.
          </div>
        </div>
      </section>

    </div>
  );
}





