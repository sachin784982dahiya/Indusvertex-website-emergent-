import { NextResponse } from 'next/server';

// Set to true to redirect all traffic to /legal (legal-only mode)
// Set to false to restore the full website
const LEGAL_ONLY_MODE = false;

export function middleware(request) {
  if (!LEGAL_ONLY_MODE) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // Allow /legal and its assets through
  if (pathname.startsWith('/legal')) return NextResponse.next();

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

  // Redirect everything else to /legal
  return NextResponse.redirect(new URL('/legal', request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
