import crypto from 'crypto';

const SECRET = process.env.ADMIN_SECRET || 'indusvertex-secret-key-change-in-production';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@indusvertex.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'IndusVertex@2025';

const b64url = (b) => Buffer.from(b).toString('base64url');
const b64dec = (s) => Buffer.from(s, 'base64url').toString();

export function signToken(payload, days = 7) {
  const body = { ...payload, exp: Date.now() + days * 24 * 3600 * 1000 };
  const data = b64url(JSON.stringify(body));
  const sig = crypto.createHmac('sha256', SECRET).update(data).digest('base64url');
  return `${data}.${sig}`;
}

export function verifyToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const [data, sig] = token.split('.');
  const expected = crypto.createHmac('sha256', SECRET).update(data).digest('base64url');
  if (sig !== expected) return null;
  try {
    const payload = JSON.parse(b64dec(data));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch { return null; }
}

export function checkAdmin(email, password) {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export function getAuth(req) {
  const auth = req.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  return verifyToken(token);
}

export const ADMIN_DEFAULTS = { email: ADMIN_EMAIL };
