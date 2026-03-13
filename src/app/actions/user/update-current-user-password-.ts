'use server';

import z from 'zod';
import { fetchWithAuth } from '@/helpers/fetch-with-auth';
import { SessionExpiredError } from '@/errors/session-expired-error';
import {
  updateUserPasswordSchema,
  UpdateUserPasswordSchema,
} from '@/validations/schemas/user-update';

export async function updateCurrentUserPasswordAction(
  formData: UpdateUserPasswordSchema,
) {
  const validatedData = updateUserPasswordSchema.safeParse(formData);

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
          password: validatedData.data.password,
          newPassword: validatedData.data.newPassword,
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
