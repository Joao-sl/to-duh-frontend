import z from 'zod';
import { logInSchema } from '@/validations/schemas/auth';
import { type NextRequest, NextResponse } from 'next/server';
import { setAuthCookies } from '@/helpers/auth-token-manager';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const validatedData = logInSchema.safeParse(data);

  if (!validatedData.success) {
    const fieldErrors = z.flattenError(validatedData.error).fieldErrors;
    return NextResponse.json({ errors: fieldErrors }, { status: 400 });
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

    const responseBody = await response.json();

    if (!response.ok) {
      return NextResponse.json(responseBody, { status: response.status });
    }

    await setAuthCookies(responseBody.refreshToken, responseBody.accessToken);
    return NextResponse.json(null, { status: 204 });
  } catch {
    return NextResponse.json(
      {
        message: 'Internal server error, please try again later',
        error: 'Internal server error',
      },
      { status: 503 },
    );
  }
}
