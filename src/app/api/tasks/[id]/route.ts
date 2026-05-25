import { flattenError } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { fetchWithAuth } from '@/helpers/fetch-with-auth';
import { updateTaskSchema } from '@/validations/schemas/tasks';

export async function PATCH(
  request: NextRequest,
  context: RouteContext<'/api/tasks/[id]'>,
) {
  const { id } = await context.params;
  const taskId = Number(id);

  if (!Number.isInteger(taskId) || taskId < 0) {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid task id',
      },
      { status: 400 },
    );
  }

  const body = await request.json();
  const validatedData = updateTaskSchema.safeParse(body);

  if (!validatedData.success) {
    const errors = flattenError(validatedData.error);
    return NextResponse.json(
      { success: false, errors: errors.fieldErrors },
      { status: 400 },
    );
  }

  try {
    const response = await fetchWithAuth(
      `${process.env.API_DOMAIN}/tasks/${taskId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData.data),
      },
    );

    const apiData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, ...apiData },
        { status: response.status ?? 400 },
      );
    }

    return NextResponse.json(
      { success: true, ...apiData },
      { status: response.status ?? 200 },
    );
  } catch {
    return NextResponse.json({
      success: false,
      message: 'Internal Server Error, please try again latter',
      statusCode: 500,
    });
  }
}
