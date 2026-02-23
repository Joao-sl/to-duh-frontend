import z from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { signUpSchema } from '@/validations/schemas/auth';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const validatedData = signUpSchema.safeParse(data);

  if (!validatedData.success) {
    const fieldErrors = z.flattenError(validatedData.error).fieldErrors;
    return NextResponse.json({ errors: fieldErrors }, { status: 400 });
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

    const responseBody = await response.json();

    return NextResponse.json(responseBody, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: 'Internal error, please try again latter' },
      { status: 503 },
    );
  }
}
