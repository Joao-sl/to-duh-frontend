import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

type TokenPayload = {
  sub: number;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
};

export const REFRESH_COOKIE_NAME = 'refreshToken';
export const ACCESS_COOKIE_NAME = 'accessToken';
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
};

export async function setRefreshTokenCookie(refreshToken: string) {
  const cookieStore = await cookies();
  const { exp } = jwtDecode<TokenPayload>(refreshToken);
  const cookieExpDate = new Date(exp * 1000);

  if (cookieStore.get(REFRESH_COOKIE_NAME)) {
    cookieStore.delete(REFRESH_COOKIE_NAME);
  }

  cookieStore.set(REFRESH_COOKIE_NAME, refreshToken, {
    ...COOKIE_OPTIONS,
    expires: cookieExpDate,
  });
}

export async function setAccessTokenCookie(accessToken: string) {
  const cookieStore = await cookies();
  const { exp } = jwtDecode<TokenPayload>(accessToken);
  const cookieExpDate = new Date(exp * 1000);

  if (cookieStore.get(ACCESS_COOKIE_NAME)) {
    cookieStore.delete(ACCESS_COOKIE_NAME);
  }

  cookieStore.set(ACCESS_COOKIE_NAME, accessToken, {
    ...COOKIE_OPTIONS,
    expires: cookieExpDate,
  });
}

export async function setAuthCookies(
  refreshToken: string,
  accessToken: string,
) {
  try {
    await setRefreshTokenCookie(refreshToken);
    await setAccessTokenCookie(accessToken);
  } catch {
    throw new Error('Malformed token');
  }
}

export function isTokenExpired(token: string) {
  if (!token) return true;
  const leewaySeconds = 30;

  try {
    const { exp } = jwtDecode<TokenPayload>(token);
    if (typeof exp === 'string') return true;

    return Date.now() > (exp - leewaySeconds) * 1000;
  } catch {
    return true;
  }
}

export async function getRefreshToken() {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_COOKIE_NAME)?.value;
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_COOKIE_NAME)?.value;
}

export async function closeSession() {
  const cookieStore = await cookies();
  cookieStore.delete(REFRESH_COOKIE_NAME);
  cookieStore.delete(ACCESS_COOKIE_NAME);
}
