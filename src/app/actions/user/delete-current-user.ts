'use server';

import { logOutAction } from '../auth/logout';
import { fetchWithAuth } from '@/helpers/fetch-with-auth';
import { SessionExpiredError } from '@/errors/session-expired-error';

export async function deleteCurrentUserAction() {
  try {
    const response = await fetchWithAuth(
      `${process.env.API_DOMAIN}/users/delete`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      return { success: false };
    }
  } catch (error) {
    if (error instanceof SessionExpiredError) {
      await logOutAction('/login?session-expired=true');
    }
    return { success: false };
  }
  await logOutAction('/?deleted=true');
}
