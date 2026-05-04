import z from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { fetchWithAuth } from '@/helpers/fetch-with-auth';
import { createProjectSchema } from '@/validations/schemas/projects';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validatedData = createProjectSchema.safeParse(body);

  if (!validatedData.success) {
    const errors = z.flattenError(validatedData.error);
    return NextResponse.json(
      { success: false, errors: errors.fieldErrors },
      { status: 400 },
    );
  }

  try {
    const response = await fetchWithAuth(`${process.env.API_DOMAIN}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: validatedData.data.name,
        description: validatedData.data.description,
        is_favorite: validatedData.data.is_favorite,
      }),
    });

    const apiData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, ...apiData },
        { status: response.status ?? 400 },
      );
    }

    return NextResponse.json({ success: true, ...apiData }, { status: 201 });
  } catch {
    return NextResponse.json({
      success: false,
      message: 'Internal Server Error, please try again latter',
      statusCode: 500,
    });
  }
}
