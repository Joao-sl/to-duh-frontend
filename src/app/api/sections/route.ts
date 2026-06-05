import { NextResponse } from 'next/server';
import { createSectionSchema } from '@/validations/schemas/sections';
import { withValidatedBody } from '@/helpers/with-validated-body';
import { apiClient } from '@/helpers/api-client';

export const POST = withValidatedBody(createSectionSchema, async data => {
  const response = await apiClient.post(`/sections`, data);
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
