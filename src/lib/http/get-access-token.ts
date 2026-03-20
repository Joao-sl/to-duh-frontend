import { SessionExpiredError } from '@/errors/session-expired-error';

export async function getNewAccessToken(refreshToken: string) {
  if (!refreshToken) {
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

  if (!response.ok) {
    throw Error(
      `Error trying get new access token, statusCode: ${response.status}`,
    );
  }

  const data = await response.json();
  return data;
}
