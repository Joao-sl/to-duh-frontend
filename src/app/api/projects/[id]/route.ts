import { flattenError } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { fetchWithAuth } from '@/helpers/fetch-with-auth';
import { updateProjectSchema } from '@/validations/schemas/projects';

export async function PATCH(
  request: NextRequest,
  context: RouteContext<'/api/projects/[id]'>,
) {
  const { id } = await context.params;
  const projectId = Number(id);

  if (!Number.isInteger(projectId) || projectId < 0) {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid project id',
      },
      { status: 400 },
    );
  }

  const body = await request.json();
  const validatedData = updateProjectSchema.safeParse(body);

  if (!validatedData.success) {
    const errors = flattenError(validatedData.error);
    return NextResponse.json(
      { success: false, errors: errors.fieldErrors },
      { status: 400 },
    );
  }

  try {
    const response = await fetchWithAuth(
      `${process.env.API_DOMAIN}/projects/${projectId}`,
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
