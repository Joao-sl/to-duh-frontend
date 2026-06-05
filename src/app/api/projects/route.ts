import { NextResponse } from 'next/server';
import { createProjectSchema } from '@/validations/schemas/projects';
import { withValidatedBody } from '@/helpers/with-validated-body';
import { apiClient } from '@/helpers/api-client';

export const POST = withValidatedBody(createProjectSchema, async data => {
  const response = await apiClient.post(`/projects`, data);
  const json = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { success: false, ...json },
      { status: response.status },
    );
  }

  return NextResponse.json(
    { success: true, ...json },
    { status: response.status },
  );
});
