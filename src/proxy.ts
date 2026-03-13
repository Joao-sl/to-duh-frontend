import { NextRequest, NextResponse } from 'next/server';
import {
  isTokenExpired,
  ACCESS_COOKIE_NAME,
  REFRESH_COOKIE_NAME,
} from './helpers/auth-token-manager';
import { refreshAccessTokenAction } from './app/actions/auth/refresh-access-token';

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = request.nextUrl.pathname;
  const isAuthPage = path === '/login' || path === '/signup';
  const isAuthenticated = request.cookies.get(REFRESH_COOKIE_NAME)?.value;
  const accessToken = request.cookies.get(ACCESS_COOKIE_NAME)?.value;

  if (path.startsWith('/_next') || path.startsWith('/_static')) {
    return NextResponse.next();
  }

  const secFetchMode = request.headers.get('sec-fetch-mode') ?? '';
  const accept = request.headers.get('accept') ?? '';
  const isNavigationRequest =
    request.method === 'GET' &&
    (secFetchMode === 'navigate' || accept.includes('text/html'));

  if (isAuthenticated && isAuthPage && isNavigationRequest) {
    url.pathname = '/desk';
    return NextResponse.redirect(url);
  }

  if (!isAuthenticated && !isAuthPage && isNavigationRequest) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (!accessToken || isTokenExpired(accessToken)) {
    try {
      await refreshAccessTokenAction();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.log('PROXY ERROR: ', error);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login/:path*',
    '/signup/:path*',
    `/desk/:path*`,
    '/account/:path*',
  ],
};
