import { NextResponse } from 'next/server';

// Set to true to redirect all traffic to /legal (legal-only mode)
// Set to false to restore the full website
const LEGAL_ONLY_MODE = true;

export function middleware(request) {
  if (!LEGAL_ONLY_MODE) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // Allow API routes, Next.js internals, and static assets
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/public') ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // If someone directly visits /legal, redirect to root (hide /legal from URL)
  if (pathname.startsWith('/legal')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Rewrite root and all other paths to /legal — URL stays clean (indusvertex.com)
  const reqHeaders = new Headers(request.headers);
  reqHeaders.set('x-legal-mode', '1');
  return NextResponse.rewrite(new URL('/legal', request.url), {
    request: { headers: reqHeaders },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
