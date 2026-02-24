'use server';

import { setAuthCookies } from '@/helpers/auth-token-manager';
import { logInSchema, LogInSchema } from '@/validations/schemas/auth';
import { redirect } from 'next/navigation';
import z from 'zod';

export async function loginAction(formData: LogInSchema) {
  const validatedData = logInSchema.safeParse(formData);

  if (!validatedData.success) {
    const errors = z.flattenError(validatedData.error);
    return { success: false, errors: errors.fieldErrors };
  }

  try {
    const response = await fetch(`${process.env.API_DOMAIN}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: validatedData.data.email,
        password: validatedData.data.password,
      }),
    });

    const apiData = await response.json();

    if (!response.ok) {
      return { success: false, ...apiData };
    }

    await setAuthCookies(apiData.refreshToken, apiData.accessToken);
  } catch {
    return {
      message: 'Internal server error, please try again later',
      statusCode: 500,
    };
  }
  redirect('/hub');
}
