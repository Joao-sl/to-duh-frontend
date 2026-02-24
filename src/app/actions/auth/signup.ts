'use server';

import { signUpSchema, SignUpSchema } from '@/validations/schemas/auth';
import { redirect } from 'next/navigation';
import z from 'zod';

export async function signUpAction(formData: SignUpSchema) {
  const validatedData = signUpSchema.safeParse(formData);

  if (!validatedData.success) {
    const errors = z.flattenError(validatedData.error);
    return { success: false, errors: errors.fieldErrors };
  }

  try {
    const response = await fetch(`${process.env.API_DOMAIN}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: validatedData.data.name,
        email: validatedData.data.email,
        password: validatedData.data.password,
      }),
    });

    const apiData = await response.json();

    if (!response.ok) {
      return { success: false, ...apiData };
    }
  } catch {
    return {
      message: 'Internal server error, please try again later',
      statusCode: 500,
    };
  }

  return redirect(`login?email=${formData.email}&created=true`);
}
