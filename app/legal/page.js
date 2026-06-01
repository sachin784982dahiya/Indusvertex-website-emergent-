import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Scale, Gavel, FileText, Building, ShieldCheck, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = { title: 'IndusVertex Law Firm — Legal Advisory Services' };

export default function Legal() {
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
      <section className="pt-36 pb-24 relative overflow-hidden" style={{background:'linear-gradient(135deg, #1a1a1a 0%, #2d2517 50%, #0a1628 100%)'}}>
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
          <div className="grid md:grid-cols-3 gap-6 mb-14">
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

      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-7 border-l-4 border-amber-500">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-lg mb-2">Mandatory Disclaimer</h3>
                <p className="text-foreground/75 leading-relaxed text-sm">As per the rules of the Bar Council of India, advocates are not permitted to advertise or solicit work. By accessing this website, you acknowledge that you are seeking information about IndusVertex Law Firm on your own accord and that there has been no solicitation, advertisement, or inducement by the Firm or its members. The content available on this website is solely for informational purposes and should not be construed as legal advice or opinion. IndusVertex Law Firm shall not be responsible for any action taken based on the information provided herein.</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
