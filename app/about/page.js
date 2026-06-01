'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Target, Eye, Award, Users, ShieldCheck, Zap, ClipboardCheck, Scale } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function About() {
  const stages = ['Concept','Feasibility','Approval','Design','Execution','Compliance','O&M'];
  const strengths = [
    { icon: Zap, title: 'Technical Engineering Excellence', text: 'Multi-disciplinary teams across power, HVAC, civil, IT, automation and renewable energy.' },
    { icon: ShieldCheck, title: 'Regulatory & Compliance Expertise', text: 'Deep mastery of CEIG, CTE/CTO, PCB, Fire NOC and statutory regulatory frameworks.' },
    { icon: ClipboardCheck, title: 'Strong Project Execution & O&M', text: 'Disciplined delivery, quality control and long-term operations & maintenance support.' },
    { icon: Scale, title: 'Integrated Legal Coordination', text: 'IndusVertex Law Firm handles legal, contractual and regulatory matters under one roof.' }
  ];

  return (
    <div>
      <section className="pt-36 pb-20 gradient-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-xs uppercase tracking-[0.2em] text-gold font-semibold mb-3">About IndusVertex</div>
            <h1 className="text-5xl lg:text-6xl font-bold max-w-4xl leading-tight">An integrated engineering, infrastructure & advisory company — built for scale.</h1>
            <p className="mt-6 text-lg text-white/75 max-w-3xl leading-relaxed">Delivering end-to-end solutions for industries, institutions, corporates and government sectors across India — from planning and approvals to execution, operations and long-term support.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Company Overview</div>
            <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-6">A single-point partner for complex infrastructure & compliance.</h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>IndusVertex Private Limited specializes in power transmission and uninterrupted power solutions, CSS/PSS systems, DG Set installation, civil & structural infrastructure, data center development, IT infrastructure & optical fiber cabling, EV infrastructure, fire safety systems, and environmental solutions including ETP, STP, WTP and OCEMS.</p>
              <p>Our expertise also covers regulatory approvals and compliances such as CEIG approvals, CTE/CTO, Pollution Control Board compliances and Fire Safety compliance NOCs, complemented by integrated legal advisory services through IndusVertex Law Firm.</p>
              <p>At IndusVertex, we transform complex requirements into scalable, execution-ready and future-focused solutions — delivered with quality, efficiency and accountability.</p>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-5">
            <Card className="p-7 border-l-4 border-accent">
              <div className="flex items-center gap-3 mb-3"><Target className="w-6 h-6 text-accent" /><h3 className="text-xl font-bold">Our Mission</h3></div>
              <p className="text-foreground/75 leading-relaxed">To deliver reliable, compliant and technology-driven infrastructure solutions that empower businesses and institutions to grow with confidence.</p>
            </Card>
            <Card className="p-7 border-l-4 border-accent">
              <div className="flex items-center gap-3 mb-3"><Eye className="w-6 h-6 text-accent" /><h3 className="text-xl font-bold">Our Vision</h3></div>
              <p className="text-foreground/75 leading-relaxed">To be India’s most trusted integrated engineering, infrastructure and compliance partner — known for excellence, accountability and future-ready solutions.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Core Strengths</div>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">What makes IndusVertex different.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {strengths.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <Card className="p-7 h-full hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg gradient-navy flex items-center justify-center flex-shrink-0"><s.icon className="w-6 h-6 text-gold" /></div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                      <p className="text-foreground/70 leading-relaxed">{s.text}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Our Business Approach</div>
            <h2 className="text-4xl lg:text-5xl font-bold">From idea to operations — a disciplined seven-stage methodology.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {stages.map((step, i) => (
              <motion.div key={step} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                <div className="relative bg-card border-2 border-border rounded-xl p-5 text-center hover:border-accent transition-colors">
                  <div className="text-3xl font-bold text-gradient-gold mb-1">0{i+1}</div>
                  <div className="text-sm font-semibold">{step}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="w-12 h-12 mx-auto text-accent mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Meet the leadership behind IndusVertex</h2>
          <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">A team of engineers, financial strategists and legal experts — with decades of combined experience across power, infrastructure and regulatory domains.</p>
          <Link href="/team"><Button size="lg" className="font-semibold" style={{backgroundColor:'#d4af37', color:'#0a1628', height:'48px'}}>Meet Our Team <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
        </div>
      </section>
    </div>
  );
}
