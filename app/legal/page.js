'use client';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PersonAvatar from '@/components/PersonAvatar';
import { Scale, Gavel, FileText, Building, ShieldCheck, AlertTriangle, CheckCircle2, ArrowRight, Award, Briefcase, Mail, Linkedin } from 'lucide-react';

// Default legal team displayed on the legal page. Admin can override / add more via team CRUD
// by giving role containing "Legal" or "Counsel".
const DEFAULT_LEGAL_TEAM = [
  {
    name: 'Adv. Pradeep Kumar',
    role: 'Associate Legal Counsel',
    creds: 'B.Tech (IT) | LL.B | LL.M (Silver Medalist)',
    imageUrl: '/assets/adv-pradeep.png',
    bio: 'A legal and compliance specialist with 10+ years of experience in IT and electrical infrastructure, along with 3+ years of expertise in regulatory and environmental compliance. He is actively engaged in civil and criminal practice, supporting corporate and public sector matters.',
    practice: ['Corporate', 'Regulatory', 'Environmental', 'IT Infrastructure'],
  },
  {
    name: 'Adv. Kapil',
    role: 'Senior Counsel — Banking & SARFAESI',
    creds: 'LL.M | Bar Council of India',
    imageUrl: '/assets/adv-kapil.png',
    bio: 'Leads banking, financial recovery and SARFAESI matters for the firm — representing leading banks and NBFCs in commercial litigation and asset recovery proceedings across India.',
    practice: ['Banking', 'SARFAESI', 'Recovery', 'Commercial Litigation'],
  },
  {
    name: 'Adv. Davesh',
    role: 'Litigation Counsel — Real Estate & RERA',
    creds: 'LL.M | Property Law Specialist',
    imageUrl: '/assets/adv-davesh.png',
    bio: 'Specialises in property due diligence, RERA matters, land acquisition and real-estate dispute resolution — supporting both corporate and individual clients with end-to-end advisory.',
    practice: ['RERA', 'Real Estate', 'Property Due Diligence', 'Land Acquisition'],
  },
];

export default function Legal() {
  const [legalTeam, setLegalTeam] = useState(DEFAULT_LEGAL_TEAM);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

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

  return (
    <div>
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
      <section className="pt-36 pb-24 relative overflow-hidden section-dark">

        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
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
            <Link href="/contact"><Button size="lg" className="font-semibold" style={{backgroundColor:'#d4af37', color:'#0a1628', height:'52px'}}>Schedule a Consultation <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
            <a href="mailto:legal@indusvertex.com"><Button size="lg" variant="outline" className="border-white/30 text-white bg-white/5 hover:bg-white/15 hover:text-white" style={{height:'52px'}}>legal@indusvertex.com</Button></a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="mb-8">
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
          <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Practice Areas</div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">Full-spectrum legal services</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {services.map(s => (
              <div key={s} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border hover:border-accent transition-colors">
                <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-foreground/85">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
