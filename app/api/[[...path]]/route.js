import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { v4 as uuidv4 } from 'uuid';
import { signToken, checkAdmin, getAuth } from '@/lib/auth';
import nodemailer from 'nodemailer';

const json = (data, init = {}) => NextResponse.json(data, init);
const err = (msg, status = 400) => NextResponse.json({ error: msg }, { status });

async function readBody(req) {
  try { return await req.json(); } catch { return {}; }
}
function sanitize(doc) { if (!doc) return doc; const { _id, ...rest } = doc; return rest; }
function requireAuth(req) { const u = getAuth(req); return u ? null : err('Unauthorized', 401); }
function slugify(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 80); }

async function handle(req, params) {
  const path = (params?.path || []).join('/');
  const method = req.method;

  if (path === '' || path === 'health') {
    return json({ ok: true, service: 'IndusVertex API', time: new Date().toISOString() });
  }

  // ============= AUTH =============
  if (path === 'auth/login' && method === 'POST') {
    const body = await readBody(req);
    const { email, password } = body;
    if (!checkAdmin(email, password)) return err('Invalid credentials', 401);
    const token = signToken({ email, role: 'admin' });
    return json({ success: true, token, user: { email, role: 'admin' } });
  }
  if (path === 'auth/me' && method === 'GET') {
    const u = getAuth(req);
    if (!u) return err('Unauthorized', 401);
    return json({ user: { email: u.email, role: u.role } });
  }

  // ============= LEADS (no DB required — works via email) =============
  if (['contact', 'consultation', 'service-inquiry', 'project-inquiry'].includes(path) && method === 'POST') {
    const body = await readBody(req);
    const { name, email, phone, message } = body;
    if (!name) return err('Name is required');
    const lead = {
      id: uuidv4(), type: path, name, email, phone: phone || '',
      company: body.company || '', service: body.service || '', subject: body.subject || '',
      message: message || '', status: 'new', createdAt: new Date().toISOString(),
    };

    let emailSent = false;
    let dbSaved = false;

    // Send email notification to business@indusvertex.com
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    if (emailUser && emailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: emailUser, pass: emailPass },
        });
        await transporter.sendMail({
          from: `"IndusVertex Website" <${emailUser}>`,
          to: 'business@indusvertex.com',
          ...(email ? { replyTo: email } : {}),
          subject: `New ${path === 'contact' ? 'Business Inquiry' : 'Consultation Request'} — ${lead.subject || lead.service || 'General'} | IndusVertex`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
              <div style="background:#0a1628;padding:24px 32px">
                <h2 style="color:#d4af37;margin:0;font-size:18px">New Enquiry — IndusVertex</h2>
              </div>
              <div style="padding:28px 32px;background:#fff">
                <table style="width:100%;border-collapse:collapse;font-size:14px">
                  <tr><td style="padding:8px 0;color:#555;width:130px"><strong>Name</strong></td><td style="padding:8px 0">${name}</td></tr>
                  <tr><td style="padding:8px 0;color:#555"><strong>Email</strong></td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
                  ${phone ? `<tr><td style="padding:8px 0;color:#555"><strong>Phone</strong></td><td style="padding:8px 0">${phone}</td></tr>` : ''}
                  ${lead.company ? `<tr><td style="padding:8px 0;color:#555"><strong>Company</strong></td><td style="padding:8px 0">${lead.company}</td></tr>` : ''}
                  ${lead.subject ? `<tr><td style="padding:8px 0;color:#555"><strong>Subject</strong></td><td style="padding:8px 0">${lead.subject}</td></tr>` : ''}
                  ${lead.service ? `<tr><td style="padding:8px 0;color:#555"><strong>Service</strong></td><td style="padding:8px 0">${lead.service}</td></tr>` : ''}
                </table>
                <div style="margin-top:20px;padding:16px;background:#f9f9f9;border-radius:6px">
                  <p style="margin:0 0 8px;color:#555;font-size:13px"><strong>Message</strong></p>
                  <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap">${message || '(no message)'}</p>
                </div>
                <p style="margin-top:20px;font-size:12px;color:#999">Submitted via indusvertex.com · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
              </div>
            </div>
          `,
        });
        emailSent = true;
      } catch (e) {
        console.error('Email send error:', e);
      }
    }

    // Try saving to MongoDB (optional — works without it)
    try {
      const db = await getDb();
      await db.collection('leads').insertOne(lead);
      dbSaved = true;
    } catch (e) {
      console.error('DB save error (non-fatal):', e);
    }

    return json({ success: true, message: 'Thank you. Our team will contact you within 24 hours.', id: lead.id });
  }
  // ============= VENDOR INQUIRY (no DB required — email first) =============
  if (path === 'vendor-inquiry' && method === 'POST') {
    const body = await readBody(req);
    const { companyName, contactPerson, phone, email, tradeCategory, gst, experience, areasOfOperation, message } = body;
    if (!companyName || !contactPerson || !phone || !email) return err('Company name, contact person, phone and email are required');
    const vendor = { id: uuidv4(), companyName, contactPerson, phone, email, tradeCategory: tradeCategory || '', gst: gst || '', experience: experience || '', areasOfOperation: areasOfOperation || '', message: message || '', status: 'new', createdAt: new Date().toISOString() };
    let emailSent = false;
    const emailUser = process.env.EMAIL_USER; const emailPass = process.env.EMAIL_PASS;
    if (emailUser && emailPass) {
      try {
        const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: emailUser, pass: emailPass } });
        await transporter.sendMail({
          from: `"IndusVertex Website" <${emailUser}>`, to: 'business@indusvertex.com', replyTo: email,
          subject: `New Vendor Enquiry — ${companyName} | IndusVertex`,
          html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
            <div style="background:#0a1628;padding:24px 32px"><h2 style="color:#d4af37;margin:0">New Vendor Enquiry — IndusVertex</h2></div>
            <div style="padding:28px 32px;background:#fff">
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                <tr><td style="padding:8px 0;color:#555;width:160px"><strong>Company</strong></td><td><strong>${companyName}</strong></td></tr>
                <tr><td style="padding:8px 0;color:#555"><strong>Contact Person</strong></td><td>${contactPerson}</td></tr>
                <tr><td style="padding:8px 0;color:#555"><strong>Phone</strong></td><td>${phone}</td></tr>
                <tr><td style="padding:8px 0;color:#555"><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
                ${tradeCategory ? `<tr><td style="padding:8px 0;color:#555"><strong>Trade Category</strong></td><td>${tradeCategory}</td></tr>` : ''}
                ${gst ? `<tr><td style="padding:8px 0;color:#555"><strong>GST No.</strong></td><td>${gst}</td></tr>` : ''}
                ${experience ? `<tr><td style="padding:8px 0;color:#555"><strong>Experience</strong></td><td>${experience}</td></tr>` : ''}
                ${areasOfOperation ? `<tr><td style="padding:8px 0;color:#555"><strong>Areas of Operation</strong></td><td>${areasOfOperation}</td></tr>` : ''}
              </table>
              ${message ? `<div style="margin-top:20px;padding:16px;background:#f9f9f9;border-radius:6px"><p style="margin:0 0 8px;color:#555;font-size:13px"><strong>Message</strong></p><p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap">${message}</p></div>` : ''}
              <p style="margin-top:20px;font-size:12px;color:#999">Submitted via indusvertex.com/vendor · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
            </div></div>`,
        });
        emailSent = true;
      } catch(e) { console.error('Vendor email error:', e); }
    }
    try { const db = await getDb(); await db.collection('vendor_inquiries').insertOne(vendor); } catch(e) { console.error('DB error (non-fatal):', e); }
    return json({ success: true, message: 'Thank you. Our procurement team will review your profile and contact you within 48 hours.', id: vendor.id });
  }

  // ============= CAREER APPLICATION (no DB required — email first) =============
  if (path === 'career-application' && method === 'POST') {
    const body = await readBody(req);
    const { name, email, phone, position, experience, currentOrg, coverLetter, resumeFile } = body;
    if (!name || !phone || !email) return err('Name, phone and email are required');
    const application = { id: uuidv4(), name, email, phone, position: position || 'General Application', experience: experience || '', currentOrg: currentOrg || '', coverLetter: coverLetter || '', hasResume: !!resumeFile, status: 'received', createdAt: new Date().toISOString() };
    let emailSent = false;
    const emailUser = process.env.EMAIL_USER; const emailPass = process.env.EMAIL_PASS;
    if (emailUser && emailPass) {
      try {
        const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: emailUser, pass: emailPass } });
        const attachments = [];
        if (resumeFile?.base64 && resumeFile?.name) {
          attachments.push({ filename: resumeFile.name, content: resumeFile.base64, encoding: 'base64', contentType: resumeFile.type || 'application/octet-stream' });
        }
        await transporter.sendMail({
          from: `"IndusVertex Website" <${emailUser}>`, to: 'business@indusvertex.com', replyTo: email,
          subject: `New Job Application — ${application.position} | IndusVertex`,
          attachments,
          html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
            <div style="background:#0a1628;padding:24px 32px"><h2 style="color:#d4af37;margin:0">New Job Application — IndusVertex</h2></div>
            <div style="padding:28px 32px;background:#fff">
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                <tr><td style="padding:8px 0;color:#555;width:140px"><strong>Name</strong></td><td>${name}</td></tr>
                <tr><td style="padding:8px 0;color:#555"><strong>Phone</strong></td><td>${phone}</td></tr>
                <tr><td style="padding:8px 0;color:#555"><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding:8px 0;color:#555"><strong>Position</strong></td><td><strong>${application.position}</strong></td></tr>
                ${experience ? `<tr><td style="padding:8px 0;color:#555"><strong>Experience</strong></td><td>${experience}</td></tr>` : ''}
                ${currentOrg ? `<tr><td style="padding:8px 0;color:#555"><strong>Current Org</strong></td><td>${currentOrg}</td></tr>` : ''}
                <tr><td style="padding:8px 0;color:#555"><strong>Resume</strong></td><td>${resumeFile?.name ? `Attached — ${resumeFile.name}` : 'Not uploaded'}</td></tr>
              </table>
              ${coverLetter ? `<div style="margin-top:20px;padding:16px;background:#f9f9f9;border-radius:6px"><p style="margin:0 0 8px;color:#555;font-size:13px"><strong>Cover Note</strong></p><p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap">${coverLetter}</p></div>` : ''}
              <p style="margin-top:20px;font-size:12px;color:#999">Submitted via indusvertex.com/careers · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
            </div></div>`,
        });
        emailSent = true;
      } catch(e) { console.error('Careers email error:', e); }
    }
    try { const db = await getDb(); await db.collection('applications').insertOne(application); } catch(e) { console.error('DB error (non-fatal):', e); }
    return json({ success: true, message: 'Application received! Our team will get back to you within 5 working days.', id: application.id });
  }

  // All routes below require MongoDB
  const db = await getDb();

  if (path === 'leads') {
    if (method === 'GET') {
      const unauthorized = requireAuth(req); if (unauthorized) return unauthorized;
      const docs = await db.collection('leads').find({}).sort({ createdAt: -1 }).limit(500).toArray();
      return json({ leads: docs.map(sanitize) });
    }
  }
  if (path.startsWith('leads/') && method === 'DELETE') {
    const unauthorized = requireAuth(req); if (unauthorized) return unauthorized;
    const id = path.split('/')[1];
    await db.collection('leads').deleteOne({ id });
    return json({ success: true });
  }

  // ============= CAREERS =============
  if (path === 'careers' && method === 'GET') {
    let jobs = await db.collection('jobs').find({}).sort({ createdAt: -1 }).toArray();
    if (!jobs.length) {
      const seed = [
        { id: uuidv4(), title: 'Senior Electrical Engineer', department: 'Engineering', location: 'Ghaziabad, UP', type: 'Full-time', experience: '5-8 years', description: 'Lead HT/LT power transmission projects including GSS/AIS design, CEIG approvals and commissioning.', createdAt: new Date().toISOString() },
        { id: uuidv4(), title: 'Data Centre Project Manager', department: 'Project Management', location: 'Pan-India', type: 'Full-time', experience: '8-12 years', description: 'End-to-end ownership of data centre build projects — design, HVAC, power redundancy, O&M handover.', createdAt: new Date().toISOString() },
        { id: uuidv4(), title: 'Solar / BESS Design Engineer', department: 'Renewable Energy', location: 'Ghaziabad / Remote', type: 'Full-time', experience: '3-6 years', description: 'Design hybrid solar + DG + BESS systems with energy optimization & monitoring.', createdAt: new Date().toISOString() },
        { id: uuidv4(), title: 'Legal Associate', department: 'IndusVertex Law Firm', location: 'Ghaziabad, UP', type: 'Full-time', experience: '2-5 years', description: 'Support corporate, banking and regulatory compliance matters including SARFAESI, RERA and EHS.', createdAt: new Date().toISOString() },
        { id: uuidv4(), title: 'Site Civil Engineer', department: 'Civil Infrastructure', location: 'Multiple Sites', type: 'Full-time', experience: '3-7 years', description: 'Execute industrial & commercial civil works, structural QA/QC and site coordination.', createdAt: new Date().toISOString() },
      ];
      await db.collection('jobs').insertMany(seed);
      jobs = seed;
    }
    return json({ jobs: jobs.map(sanitize) });
  }
  if (path === 'careers' && method === 'POST') {
    const unauthorized = requireAuth(req); if (unauthorized) return unauthorized;
    const body = await readBody(req);
    const job = { id: uuidv4(), ...body, createdAt: new Date().toISOString() };
    await db.collection('jobs').insertOne(job);
    return json({ success: true, job: sanitize(job) });
  }
  if (path.startsWith('careers/')) {
    const id = path.split('/')[1];
    if (method === 'PUT') {
      const unauthorized = requireAuth(req); if (unauthorized) return unauthorized;
      const body = await readBody(req);
      await db.collection('jobs').updateOne({ id }, { $set: { ...body, updatedAt: new Date().toISOString() } });
      return json({ success: true });
    }
    if (method === 'DELETE') {
      const unauthorized = requireAuth(req); if (unauthorized) return unauthorized;
      await db.collection('jobs').deleteOne({ id });
      return json({ success: true });
    }
  }
  if (path === 'applications' && method === 'GET') {
    const unauthorized = requireAuth(req); if (unauthorized) return unauthorized;
    const docs = await db.collection('applications').find({}).sort({ createdAt: -1 }).toArray();
    return json({ applications: docs.map(sanitize) });
  }

  // ============= PROJECTS =============
  if (path === 'projects' && method === 'GET') {
    let projects = await db.collection('projects').find({}).sort({ createdAt: -1 }).toArray();
    if (!projects.length) {
      const seed = [
        { id: uuidv4(), title: '20 MVA HT Substation - Telecom Hub', client: 'Bharti Airtel', location: 'Gurugram, Haryana', description: 'Design, supply, installation and CEIG approval of 20 MVA HT substation with redundant transformers, RMU and SCADA integration for a tier-1 telecom hub.', completionDate: '2024-08', category: 'Power Transmission', image: 'https://images.unsplash.com/photo-1543489816-c87b0f5f7dd4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', createdAt: new Date().toISOString() },
        { id: uuidv4(), title: 'Hyperscale Data Centre Build-Out', client: 'CtrlS Data Centers', location: 'Mumbai, MH', description: 'Greenfield 5 MW data hall with N+1 precision cooling, raised flooring, HAC containment and full O&M handover.', completionDate: '2024-11', category: 'Data Centre', image: 'https://images.pexels.com/photos/17489153/pexels-photo-17489153.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1200', createdAt: new Date().toISOString() },
        { id: uuidv4(), title: '2 MW Rooftop Solar + BESS', client: 'Paswara Paper Limited', location: 'Meerut, UP', description: 'Hybrid solar + BESS + DG integration with energy monitoring, achieving 38% reduction in grid dependency.', completionDate: '2024-05', category: 'Renewable Energy', image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', createdAt: new Date().toISOString() },
        { id: uuidv4(), title: 'EV Charging Network Rollout', client: 'Sudhir Power Ltd', location: 'NCR Region', description: 'Public + fleet EV charging network across 24 sites with smart charging and grid integration.', completionDate: '2025-02', category: 'EV Infrastructure', image: 'https://images.unsplash.com/photo-1698223817307-29dc4bdcce1f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', createdAt: new Date().toISOString() },
        { id: uuidv4(), title: 'OFC Backbone - 180 KM', client: 'Tata Communications', location: 'UP & Uttarakhand', description: 'Long-haul optical fiber cabling with HDD, splicing, OTDR testing and end-to-end commissioning.', completionDate: '2024-03', category: 'IT Infrastructure', image: 'https://images.pexels.com/photos/17489163/pexels-photo-17489163.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1200', createdAt: new Date().toISOString() },
        { id: uuidv4(), title: 'ETP + OCEMS Compliance Setup', client: 'Cosmo Infra', location: 'Sahibabad, UP', description: 'ETP design, OCEMS integration and PCB compliance documentation for industrial cluster.', completionDate: '2024-09', category: 'Environmental', image: 'https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', createdAt: new Date().toISOString() },
      ];
      await db.collection('projects').insertMany(seed);
      projects = seed;
    }
    return json({ projects: projects.map(sanitize) });
  }
  if (path === 'projects' && method === 'POST') {
    const unauthorized = requireAuth(req); if (unauthorized) return unauthorized;
    const body = await readBody(req);
    const project = { id: uuidv4(), ...body, createdAt: new Date().toISOString() };
    await db.collection('projects').insertOne(project);
    return json({ success: true, project: sanitize(project) });
  }
  if (path.startsWith('projects/')) {
    const id = path.split('/')[1];
    if (method === 'PUT') {
      const unauthorized = requireAuth(req); if (unauthorized) return unauthorized;
      const body = await readBody(req);
      await db.collection('projects').updateOne({ id }, { $set: { ...body, updatedAt: new Date().toISOString() } });
      return json({ success: true });
    }
    if (method === 'DELETE') {
      const unauthorized = requireAuth(req); if (unauthorized) return unauthorized;
      await db.collection('projects').deleteOne({ id });
      return json({ success: true });
    }
  }

  // ============= BLOG =============
  if (path === 'blogs' && method === 'GET') {
    const url = new URL(req.url);
    const q = (url.searchParams.get('q') || '').trim();
    const cat = (url.searchParams.get('category') || '').trim();
    const filter = { published: { $ne: false } };
    if (cat) filter.category = cat;
    if (q) filter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { excerpt: { $regex: q, $options: 'i' } },
      { content: { $regex: q, $options: 'i' } },
      { tags: { $regex: q, $options: 'i' } },
    ];
    let docs = await db.collection('blogs').find(filter).sort({ createdAt: -1 }).toArray();
    if (!docs.length && !q && !cat) {
      const seed = [
        { id: uuidv4(), slug: 'future-of-data-centre-design-in-india', title: 'The Future of Data Centre Design in India', excerpt: 'How hyperscale demand, sustainability and N+1/2N redundancy are reshaping data centre engineering across India.', content: '<p>India\'s data centre capacity is projected to triple by 2030. As hyperscalers expand and regulatory frameworks tighten, the design discipline is evolving rapidly — from precision cooling and HAC/CAC containment to N+1 / 2N power redundancy and ESG compliance.</p><p>At IndusVertex, our integrated approach combines design-build delivery with regulatory expertise to ensure projects go live on time, on spec and fully compliant.</p><h2>Key trends</h2><ul><li>Liquid cooling for AI workloads</li><li>Hybrid renewable integration (solar + BESS + grid)</li><li>OCEMS and environmental monitoring</li><li>Full lifecycle O&M contracts</li></ul>', category: 'Data Centres', tags: ['data centre','design','HVAC','sustainability'], author: 'Yogyata', image: 'https://images.pexels.com/photos/17489153/pexels-photo-17489153.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1200', published: true, seoTitle: 'Future of Data Centre Design — IndusVertex', seoDescription: 'Hyperscale data centre design trends in India, N+1/2N redundancy, sustainability and integrated delivery.', createdAt: new Date().toISOString() },
        { id: uuidv4(), slug: 'ceig-approvals-explained', title: 'CEIG Approvals: A Practical Playbook for HT Power Projects', excerpt: 'Common pitfalls and a step-by-step methodology to secure CEIG approvals for HT substations and industrial power infrastructure.', content: '<p>CEIG (Chief Electrical Inspector to Government) approvals are mandatory for HT installations. The process can stretch from 30 to 180 days depending on completeness of documentation and engineering compliance.</p><h2>Our 5-step methodology</h2><ol><li>Single-line diagram (SLD) verification</li><li>Earthing and lightning protection design</li><li>CEIG forms A1/A2 preparation</li><li>Site inspection coordination</li><li>Compliance certificate &amp; energisation</li></ol>', category: 'Compliance', tags: ['CEIG','HT','power','approvals'], author: 'Vivek Kumar', image: 'https://images.unsplash.com/photo-1543489816-c87b0f5f7dd4?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', published: true, seoTitle: 'CEIG Approvals Playbook — IndusVertex', seoDescription: 'Step-by-step CEIG approval methodology for HT power projects in India.', createdAt: new Date().toISOString() },
        { id: uuidv4(), slug: 'solar-bess-roi-india-2025', title: 'Solar + BESS: ROI Realities for Indian Industries in 2025', excerpt: 'Why hybrid solar + battery storage is now ROI-positive for mid-corporate manufacturing units — with real-world numbers.', content: '<p>Battery prices have dropped 45% in 3 years. Combined with India\'s rising industrial tariffs and net-metering policies, hybrid solar + BESS installations now achieve payback in 4–6 years for most manufacturing units.</p><h2>Case study — Paswara Paper</h2><p>Our 2 MW rooftop solar + 1 MWh BESS installation reduced grid dependency by 38% and delivered ROI in 4.8 years.</p>', category: 'Renewable Energy', tags: ['solar','BESS','ROI','energy'], author: 'Prince Gaurav', image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', published: true, seoTitle: 'Solar BESS ROI 2025 — IndusVertex', seoDescription: 'ROI analysis for hybrid solar plus BESS deployment in Indian industries.', createdAt: new Date().toISOString() },
        { id: uuidv4(), slug: 'ev-infrastructure-india-rollout', title: 'EV Infrastructure Rollout: Lessons from 24-Site Deployment', excerpt: 'Practical lessons from rolling out a multi-site public + fleet EV charging network across the NCR region.', content: '<p>Public + fleet EV charging requires a careful blend of site selection, grid coordination, smart payments and ongoing O&M. Here’s what we learned.</p>', category: 'EV Infrastructure', tags: ['EV','charging','infrastructure'], author: 'Vivek Kumar', image: 'https://images.unsplash.com/photo-1698223817307-29dc4bdcce1f?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', published: true, seoTitle: 'EV Charging Rollout Lessons — IndusVertex', seoDescription: 'Lessons from 24-site EV charging deployment in NCR.', createdAt: new Date().toISOString() },
      ];
      await db.collection('blogs').insertMany(seed);
      docs = seed;
    }
    return json({ blogs: docs.map(sanitize) });
  }
  if (path.startsWith('blogs/') && method === 'GET') {
    const slug = path.split('/')[1];
    const doc = await db.collection('blogs').findOne({ slug });
    if (!doc) return err('Not found', 404);
    return json({ blog: sanitize(doc) });
  }
  if (path === 'blogs' && method === 'POST') {
    const unauthorized = requireAuth(req); if (unauthorized) return unauthorized;
    const body = await readBody(req);
    const blog = {
      id: uuidv4(),
      slug: body.slug || slugify(body.title),
      title: body.title, excerpt: body.excerpt || '', content: body.content || '',
      category: body.category || 'General', tags: body.tags || [],
      author: body.author || 'IndusVertex Team', image: body.image || '',
      seoTitle: body.seoTitle || body.title, seoDescription: body.seoDescription || body.excerpt || '',
      published: body.published !== false, createdAt: new Date().toISOString(),
    };
    await db.collection('blogs').insertOne(blog);
    return json({ success: true, blog: sanitize(blog) });
  }
  if (path.startsWith('blogs/')) {
    const id = path.split('/')[1];
    if (method === 'PUT') {
      const unauthorized = requireAuth(req); if (unauthorized) return unauthorized;
      const body = await readBody(req);
      await db.collection('blogs').updateOne({ id }, { $set: { ...body, updatedAt: new Date().toISOString() } });
      return json({ success: true });
    }
    if (method === 'DELETE') {
      const unauthorized = requireAuth(req); if (unauthorized) return unauthorized;
      await db.collection('blogs').deleteOne({ id });
      return json({ success: true });
    }
  }

  // ============= TESTIMONIALS =============
  if (path === 'testimonials' && method === 'GET') {
    let t = await db.collection('testimonials').find({}).toArray();
    if (!t.length) {
      const seed = [
        { id: uuidv4(), name: 'A.K. Srivastava', title: 'VP, Infrastructure', company: 'Telecom Sector', quote: 'IndusVertex delivered our HT substation ahead of schedule with flawless CEIG approvals. Their integrated approach is a rare combination of engineering and compliance expertise.', rating: 5 },
        { id: uuidv4(), name: 'Priya Nair', title: 'Director, DC Operations', company: 'Data Centre Industry', quote: 'From design to O&M, the precision and discipline of the IndusVertex team set a benchmark. Our hyperscale build-out went live without a single deviation.', rating: 5 },
        { id: uuidv4(), name: 'Rajesh Gupta', title: 'Plant Head', company: 'Manufacturing Sector', quote: 'Our solar + BESS rollout reduced grid dependency by 38%. IndusVertex managed everything — design, approvals, execution and ongoing O&M.', rating: 5 }
      ];
      await db.collection('testimonials').insertMany(seed);
      t = seed;
    }
    return json({ testimonials: t.map(sanitize) });
  }
  if (path === 'testimonials' && method === 'POST') {
    const unauthorized = requireAuth(req); if (unauthorized) return unauthorized;
    const body = await readBody(req);
    const t = { id: uuidv4(), ...body, createdAt: new Date().toISOString() };
    await db.collection('testimonials').insertOne(t);
    return json({ success: true, testimonial: sanitize(t) });
  }
  if (path.startsWith('testimonials/')) {
    const id = path.split('/')[1];
    if (method === 'PUT') {
      const unauthorized = requireAuth(req); if (unauthorized) return unauthorized;
      const body = await readBody(req);
      await db.collection('testimonials').updateOne({ id }, { $set: body });
      return json({ success: true });
    }
    if (method === 'DELETE') {
      const unauthorized = requireAuth(req); if (unauthorized) return unauthorized;
      await db.collection('testimonials').deleteOne({ id });
      return json({ success: true });
    }
  }

  // ============= TEAM =============
  if (path === 'team' && method === 'GET') {
    let t = await db.collection('team').find({}).sort({ order: 1 }).toArray();
    if (!t.length) {
      const seed = [
        { id: uuidv4(), name: 'Yogyata', role: 'Director', creds: 'B.C.A', order: 1, bio: 'A dynamic professional with over 5 years of experience in education and computer training, complemented by 2+ years of hands-on exposure in data centre operations and automation systems.' },
        { id: uuidv4(), name: 'Vivek Kumar', role: 'Director', creds: 'Diploma (Electrical) | ITI Fitter', order: 2, bio: 'A seasoned technical expert with 15+ years of rich experience in electrical systems, power transmission, operations & maintenance (O&M), and civil & infrastructure projects.' },
        { id: uuidv4(), name: 'Prince Gaurav', role: 'Management, Planning & Execution', creds: 'B.Tech | MBA (Marketing & Finance)', order: 3, bio: 'A financial and strategic planning expert with over 12 years of experience in banking, specializing in working capital and project financing for MSME and mid-corporate sectors.' },
        { id: uuidv4(), name: 'Pradeep Kumar', role: 'Associate Legal Counsel', creds: 'B.Tech (IT) | LL.B | LL.M (Silver Medalist)', order: 4, bio: 'A legal and compliance specialist with 10+ years of experience in IT and electrical infrastructure, along with 3+ years of expertise in regulatory and environmental compliance.' }
      ];
      await db.collection('team').insertMany(seed);
      t = seed;
    }
    return json({ team: t.map(sanitize) });
  }
  if (path === 'team' && method === 'POST') {
    const unauthorized = requireAuth(req); if (unauthorized) return unauthorized;
    const body = await readBody(req);
    const m = { id: uuidv4(), ...body, createdAt: new Date().toISOString() };
    await db.collection('team').insertOne(m);
    return json({ success: true, member: sanitize(m) });
  }
  if (path.startsWith('team/')) {
    const id = path.split('/')[1];
    if (method === 'PUT') {
      const unauthorized = requireAuth(req); if (unauthorized) return unauthorized;
      const body = await readBody(req);
      await db.collection('team').updateOne({ id }, { $set: body });
      return json({ success: true });
    }
    if (method === 'DELETE') {
      const unauthorized = requireAuth(req); if (unauthorized) return unauthorized;
      await db.collection('team').deleteOne({ id });
      return json({ success: true });
    }
  }

  // ============= CLIENTS =============
  if (path === 'clients' && method === 'GET') {
    let docs = await db.collection('clients').find({}).toArray();
    if (!docs.length) {
      const names = ['Tata Teleservices Limited','Tata Communications','Bharti Airtel','Bharti Foundation','Cosmo Infra','Paswara Paper Limited','Menor and Mews','Vodafone Idea Limited','Sudhir Power Ltd','Nitul Data','Green Power','Sharify Services Pvt Ltd','Nxtra Data','CtrlS Data Centers Ltd'];
      docs = names.map((n, i) => ({ id: uuidv4(), name: n, order: i, logoUrl: '' }));
      await db.collection('clients').insertMany(docs);
    }
    return json({ clients: docs.map(sanitize) });
  }
  if (path === 'clients' && method === 'POST') {
    const unauthorized = requireAuth(req); if (unauthorized) return unauthorized;
    const body = await readBody(req);
    const c = { id: uuidv4(), ...body };
    await db.collection('clients').insertOne(c);
    return json({ success: true, client: sanitize(c) });
  }
  if (path.startsWith('clients/') && method === 'DELETE') {
    const unauthorized = requireAuth(req); if (unauthorized) return unauthorized;
    const id = path.split('/')[1];
    await db.collection('clients').deleteOne({ id });
    return json({ success: true });
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

  // ============= SEARCH =============
  if (path === 'search' && method === 'GET') {
    const url = new URL(req.url);
    const q = (url.searchParams.get('q') || '').trim();
    if (!q) return json({ results: [] });
    const rx = { $regex: q, $options: 'i' };
    const [blogs, projects, jobs] = await Promise.all([
      db.collection('blogs').find({ $or: [{ title: rx }, { excerpt: rx }, { tags: rx }] }).limit(5).toArray(),
      db.collection('projects').find({ $or: [{ title: rx }, { description: rx }, { client: rx }, { category: rx }] }).limit(5).toArray(),
      db.collection('jobs').find({ $or: [{ title: rx }, { department: rx }, { description: rx }] }).limit(5).toArray(),
    ]);
    return json({
      results: [
        ...blogs.map(b => ({ type: 'blog', title: b.title, excerpt: b.excerpt, url: `/blog/${b.slug}` })),
        ...projects.map(p => ({ type: 'project', title: p.title, excerpt: `${p.client} · ${p.location}`, url: `/projects` })),
        ...jobs.map(j => ({ type: 'job', title: j.title, excerpt: `${j.department} · ${j.location}`, url: `/careers` })),
      ]
    });
  }

  return err('Not found', 404);
}

export async function GET(req, ctx) { return handle(req, await ctx.params); }
export async function POST(req, ctx) { return handle(req, await ctx.params); }
export async function PUT(req, ctx) { return handle(req, await ctx.params); }
export async function DELETE(req, ctx) { return handle(req, await ctx.params); }
