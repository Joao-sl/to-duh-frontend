'use server';

import z from 'zod';
import { fetchWithAuth } from '@/helpers/fetch-with-auth';
import { SessionExpiredError } from '@/errors/session-expired-error';
import {
  updateUserNameSchema,
  UpdateUserNameSchema,
} from '@/validations/schemas/user-update';

export async function updateCurrentUserNameAction(data: UpdateUserNameSchema) {
  const validatedData = updateUserNameSchema.safeParse(data);

  if (!validatedData.success) {
    const fieldErrors = z.flattenError(validatedData.error).fieldErrors;
    return { success: false, errors: fieldErrors };
  }

  try {
    const response = await fetchWithAuth(
      `${process.env.API_DOMAIN}/users/update`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: validatedData.data.name,
        }),
      },
    );

    const apiData = await response.json();

    if (!response.ok) {
      return { success: false, ...apiData };
    }

    return { success: true, ...apiData };
  } catch (error) {
    if (error instanceof SessionExpiredError) {
      return { success: false, shouldLogout: true, message: 'Session expired' };
    }
    return {
      success: false,
      shouldLogout: false,
      message: 'Internal server error',
    };
  }
}
