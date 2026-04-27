import z from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { fetchWithAuth } from '@/helpers/fetch-with-auth';
import { createTaskSchema } from '@/validations/schemas/tasks';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validatedData = createTaskSchema.safeParse(body);

  if (!validatedData.success) {
    const errors = z.flattenError(validatedData.error);
    return NextResponse.json(
      { success: false, errors: errors.fieldErrors },
      { status: 400 },
    );
  }

  try {
    const response = await fetchWithAuth(`${process.env.API_DOMAIN}/tasks`, {
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

    return NextResponse.json({ success: true, ...apiData }, { status: 201 });
  } catch {
    return NextResponse.json({
      success: false,
      message: 'Internal Server Error, please try again latter',
      statusCode: 500,
    });
  }
}
