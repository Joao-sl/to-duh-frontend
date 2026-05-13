import { flattenError } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { fetchWithAuth } from '@/helpers/fetch-with-auth';
import { createSectionSchema } from '@/validations/schemas/sections';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validatedData = createSectionSchema.safeParse(body);

  if (!validatedData.success) {
    const errors = flattenError(validatedData.error);
    return NextResponse.json(
      { success: false, errors: errors.fieldErrors },
      { status: 400 },
    );
  }

  try {
    const response = await fetchWithAuth(`${process.env.API_DOMAIN}/sections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedData.data),
    });

    const apiData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, ...apiData },
        { status: response.status ?? 400 },
      );
    }

    return NextResponse.json(
      { success: true, ...apiData },
      { status: response.status ?? 201 },
    );
  } catch {
    return NextResponse.json({
      success: false,
      message: 'Internal Server Error, please try again latter',
      statusCode: 500,
    });
  }
}
