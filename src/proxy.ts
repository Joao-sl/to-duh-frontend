import { NextRequest, NextResponse } from 'next/server';
import { getNewAccessToken } from './lib/http/get-access-token';
import { SessionExpiredError } from './errors/session-expired-error';
import {
  isTokenExpired,
  ACCESS_COOKIE_NAME,
  REFRESH_COOKIE_NAME,
  COOKIE_OPTIONS,
  closeSession,
} from './helpers/auth-token-manager';
import { jwtDecode } from 'jwt-decode';

function isTokenValid(token?: string) {
  if (!token) return false;
  try {
    jwtDecode(token);
    return !isTokenExpired(token);
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = request.nextUrl.pathname;

  const isAuthenticationPage = path === '/login' || path === '/signup';
  const refreshToken = request.cookies.get(REFRESH_COOKIE_NAME)?.value;
  const accessToken = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  const isAuthenticated = isTokenValid(refreshToken);

  const isPageRequest =
    request.method === 'GET' &&
    request.headers.get('accept')?.includes('text/html');

  if (path.startsWith('/_next') || path.startsWith('/_static')) {
    return NextResponse.next();
  }

  if (isAuthenticated && isAuthenticationPage && isPageRequest) {
    url.pathname = '/desk';
    return NextResponse.redirect(url);
  }

  if (!isAuthenticated && !isAuthenticationPage && isPageRequest) {
    url.pathname = '/login';
    url.searchParams.set('session-expired', 'true');
    return NextResponse.redirect(url);
  }

  if (isAuthenticated && (!!accessToken || !isTokenValid(accessToken))) {
    try {
      const newAccess = await getNewAccessToken(refreshToken!);
      const response = NextResponse.next();
      response.cookies.set(
        ACCESS_COOKIE_NAME,
        newAccess.accessToken,
        COOKIE_OPTIONS,
      );

      return response;
    } catch (error) {
      if (error instanceof SessionExpiredError) {
        await closeSession();
        url.pathname = '/login';
        url.searchParams.set('session-expired', 'true');
        return NextResponse.redirect(url);
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
