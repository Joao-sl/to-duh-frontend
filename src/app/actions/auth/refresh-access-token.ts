'use server';

import { SessionExpiredError } from '@/errors/session-expired-error';
import {
  getRefreshToken,
  isTokenExpired,
  setAccessTokenCookie,
} from '@/helpers/auth-token-manager';

let refreshPromise: Promise<void> | null = null;

export async function refreshAccessTokenAction() {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    const refreshToken = await getRefreshToken();

    try {
      if (!refreshToken || isTokenExpired(refreshToken)) {
        throw new SessionExpiredError();
      }

      const response = await fetch(`${process.env.API_DOMAIN}/users/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.status === 401) {
        throw new SessionExpiredError();
      }

      const apiData = await response.json();
      await setAccessTokenCookie(apiData.accessToken);
    } catch (error) {
      throw error;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}
