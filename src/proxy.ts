import { NextRequest, NextResponse } from 'next/server';
import { REFRESH_COOKIE_NAME } from './helpers/auth-token-manager';

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = request.nextUrl.pathname;
  const isAuthPage = path === '/login' || path === '/signup';
  const isAuthenticated = request.cookies.get(REFRESH_COOKIE_NAME)?.value;

  if (path.startsWith('/_next') || path.startsWith('/_static')) {
    return NextResponse.next();
  }

  const secFetchMode = request.headers.get('sec-fetch-mode') ?? '';
  const accept = request.headers.get('accept') ?? '';
  const isNavigationRequest =
    request.method === 'GET' &&
    (secFetchMode === 'navigate' || accept.includes('text/html'));

  if (isAuthenticated && isAuthPage && isNavigationRequest) {
    url.pathname = '/hub';
    return NextResponse.redirect(url);
  }

  if (!isAuthenticated && !isAuthPage && isNavigationRequest) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login/:path*', '/signup/:path*', '/hub/:path*'],
};
