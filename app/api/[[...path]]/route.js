import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { v4 as uuidv4 } from 'uuid';

const json = (data, init = {}) => NextResponse.json(data, init);
const err = (msg, status = 400) => NextResponse.json({ error: msg }, { status });

async function readBody(req) {
  try { return await req.json(); } catch { return {}; }
}

function sanitize(doc) {
  if (!doc) return doc;
  const { _id, ...rest } = doc;
  return rest;
}

async function handle(req, params) {
  const path = (params?.path || []).join('/');
  const method = req.method;
  const db = await getDb();

  // Health
  if (path === '' || path === 'health') {
    return json({ ok: true, service: 'IndusVertex API', time: new Date().toISOString() });
  }

  // ============= LEADS / CONTACT =============
  // POST /api/contact   POST /api/consultation   POST /api/service-inquiry  POST /api/project-inquiry
  if (['contact', 'consultation', 'service-inquiry', 'project-inquiry'].includes(path) && method === 'POST') {
    const body = await readBody(req);
    const { name, email, phone, message } = body;
    if (!name || !email) return err('Name and email are required');
    const lead = {
      id: uuidv4(),
      type: path,
      name, email, phone: phone || '', company: body.company || '',
      service: body.service || '', subject: body.subject || '',
      message: message || '',
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    await db.collection('leads').insertOne(lead);
    return json({ success: true, message: 'Thank you. Our team will contact you within 24 hours.', id: lead.id });
  }

  if (path === 'leads' && method === 'GET') {
    const docs = await db.collection('leads').find({}).sort({ createdAt: -1 }).limit(200).toArray();
    return json({ leads: docs.map(sanitize) });
  }

  // ============= CAREERS =============
  if (path === 'careers' && method === 'GET') {
    const jobs = await db.collection('jobs').find({}).sort({ createdAt: -1 }).toArray();
    // Seed if empty
    if (!jobs.length) {
      const seed = [
        { id: uuidv4(), title: 'Senior Electrical Engineer', department: 'Engineering', location: 'Ghaziabad, UP', type: 'Full-time', experience: '5-8 years', description: 'Lead HT/LT power transmission projects including GSS/AIS design, CEIG approvals and commissioning.', createdAt: new Date().toISOString() },
        { id: uuidv4(), title: 'Data Centre Project Manager', department: 'Project Management', location: 'Pan-India', type: 'Full-time', experience: '8-12 years', description: 'End-to-end ownership of data centre build projects — design, HVAC, power redundancy, O&M handover.', createdAt: new Date().toISOString() },
        { id: uuidv4(), title: 'Solar / BESS Design Engineer', department: 'Renewable Energy', location: 'Ghaziabad / Remote', type: 'Full-time', experience: '3-6 years', description: 'Design hybrid solar + DG + BESS systems with energy optimization & monitoring.', createdAt: new Date().toISOString() },
        { id: uuidv4(), title: 'Legal Associate', department: 'IndusVertex Law Firm', location: 'Ghaziabad, UP', type: 'Full-time', experience: '2-5 years', description: 'Support corporate, banking and regulatory compliance matters including SARFAESI, RERA and EHS.', createdAt: new Date().toISOString() },
        { id: uuidv4(), title: 'Site Civil Engineer', department: 'Civil Infrastructure', location: 'Multiple Sites', type: 'Full-time', experience: '3-7 years', description: 'Execute industrial & commercial civil works, structural QA/QC and site coordination.', createdAt: new Date().toISOString() },
      ];
      await db.collection('jobs').insertMany(seed);
      return json({ jobs: seed.map(sanitize) });
    }
    return json({ jobs: jobs.map(sanitize) });
  }

  if (path === 'careers' && method === 'POST') {
    const body = await readBody(req);
    const job = { id: uuidv4(), ...body, createdAt: new Date().toISOString() };
    await db.collection('jobs').insertOne(job);
    return json({ success: true, job: sanitize(job) });
  }

  if (path === 'career-application' && method === 'POST') {
    const body = await readBody(req);
    const { name, email, phone, jobTitle, experience, coverLetter, resumeUrl } = body;
    if (!name || !email || !jobTitle) return err('Name, email and job title are required');
    const application = {
      id: uuidv4(),
      name, email, phone: phone || '', jobTitle,
      experience: experience || '', coverLetter: coverLetter || '', resumeUrl: resumeUrl || '',
      status: 'received', createdAt: new Date().toISOString(),
    };
    await db.collection('applications').insertOne(application);
    return json({ success: true, message: 'Application received. Our HR team will get back to you shortly.', id: application.id });
  }

  // ============= PROJECTS =============
  if (path === 'projects' && method === 'GET') {
    let projects = await db.collection('projects').find({}).sort({ createdAt: -1 }).toArray();
    if (!projects.length) {
      const seed = [
        { id: uuidv4(), title: '20 MVA HT Substation - Telecom Hub', client: 'Bharti Airtel', location: 'Gurugram, Haryana', description: 'Design, supply, installation and CEIG approval of 20 MVA HT substation with redundant transformers, RMU and SCADA integration for a tier-1 telecom hub.', completionDate: '2024-08', category: 'Power Transmission', image: 'https://images.unsplash.com/photo-1543489816-c87b0f5f7dd4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', createdAt: new Date().toISOString() },
        { id: uuidv4(), title: 'Hyperscale Data Centre Build-Out', client: 'CtrlS Data Centers', location: 'Mumbai, MH', description: 'Greenfield 5 MW data hall with N+1 precision cooling, raised flooring, HAC containment and full O&M handover.', completionDate: '2024-11', category: 'Data Centre', image: 'https://images.pexels.com/photos/17489153/pexels-photo-17489153.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1200', createdAt: new Date().toISOString() },
        { id: uuidv4(), title: '2 MW Rooftop Solar + BESS', client: 'Paswara Paper Limited', location: 'Meerut, UP', description: 'Hybrid solar + BESS + DG integration with energy monitoring, achieving 38% reduction in grid dependency.', completionDate: '2024-05', category: 'Renewable Energy', image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', createdAt: new Date().toISOString() },
        { id: uuidv4(), title: 'EV Charging Network Rollout', client: 'Sudhir Power Ltd', location: 'NCR Region', position: 'Lead EPC', description: 'Public + fleet EV charging network across 24 sites with smart charging and grid integration.', completionDate: '2025-02', category: 'EV Infrastructure', image: 'https://images.unsplash.com/photo-1698223817307-29dc4bdcce1f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', createdAt: new Date().toISOString() },
        { id: uuidv4(), title: 'OFC Backbone - 180 KM', client: 'Tata Communications', location: 'UP & Uttarakhand', description: 'Long-haul optical fiber cabling with HDD, splicing, OTDR testing and end-to-end commissioning.', completionDate: '2024-03', category: 'IT Infrastructure', image: 'https://images.pexels.com/photos/17489163/pexels-photo-17489163.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1200', createdAt: new Date().toISOString() },
        { id: uuidv4(), title: 'ETP + OCEMS Compliance Setup', client: 'Cosmo Infra', location: 'Sahibabad, UP', description: 'ETP design, OCEMS integration and PCB compliance documentation for industrial cluster.', completionDate: '2024-09', category: 'Environmental', image: 'https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', createdAt: new Date().toISOString() },
      ];
      await db.collection('projects').insertMany(seed);
      projects = seed;
    }
    return json({ projects: projects.map(sanitize) });
  }

  if (path === 'projects' && method === 'POST') {
    const body = await readBody(req);
    const project = { id: uuidv4(), ...body, createdAt: new Date().toISOString() };
    await db.collection('projects').insertOne(project);
    return json({ success: true, project: sanitize(project) });
  }

  // ============= TESTIMONIALS =============
  if (path === 'testimonials' && method === 'GET') {
    let t = await db.collection('testimonials').find({}).toArray();
    if (!t.length) {
      const seed = [
        { id: uuidv4(), name: 'Rajeev Menon', title: 'VP, Network Infrastructure', company: 'Bharti Airtel', quote: 'IndusVertex delivered our HT substation ahead of schedule with flawless CEIG approvals. Their integrated approach is a rare combination of engineering and compliance expertise.', rating: 5 },
        { id: uuidv4(), name: 'Sneha Iyer', title: 'Director, Data Center Operations', company: 'CtrlS Data Centers', quote: 'From design to O&M, the precision and discipline of the IndusVertex team set a benchmark. Our hyperscale build-out went live without a single deviation.', rating: 5 },
        { id: uuidv4(), name: 'Arvind Sharma', title: 'Plant Head', company: 'Paswara Paper', quote: 'Our solar + BESS rollout reduced grid dependency by 38%. IndusVertex managed everything — design, approvals, execution and ongoing O&M.', rating: 5 }
      ];
      await db.collection('testimonials').insertMany(seed);
      t = seed;
    }
    return json({ testimonials: t.map(sanitize) });
  }

  // ============= STATS =============
  if (path === 'stats' && method === 'GET') {
    return json({
      stats: [
        { label: 'Projects Delivered', value: 150, suffix: '+' },
        { label: 'Enterprise Clients', value: 50, suffix: '+' },
        { label: 'Years of Combined Experience', value: 40, suffix: '+' },
        { label: 'Regulatory Approvals', value: 200, suffix: '+' }
      ]
    });
  }

  return err('Not found', 404);
}

export async function GET(req, ctx) { return handle(req, await ctx.params); }
export async function POST(req, ctx) { return handle(req, await ctx.params); }
export async function PUT(req, ctx) { return handle(req, await ctx.params); }
export async function DELETE(req, ctx) { return handle(req, await ctx.params); }
