import { type NextRequest, NextResponse } from 'next/server';
import { REFRESH_COOKIE_NAME } from './helpers/auth-token-manager';

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = request.nextUrl.pathname;
  const isAuthPage = path === '/login' || path === '/signup';
  const isAuthenticated = request.cookies.get(REFRESH_COOKIE_NAME)?.value;

  if (isAuthenticated && isAuthPage) {
    url.pathname = '/hub';
    return NextResponse.redirect(url);
  }

  if (!isAuthenticated && !isAuthPage) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login/:path*', '/signup/:path*', '/hub/:path*'],
};
