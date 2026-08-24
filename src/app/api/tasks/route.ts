import { NextResponse } from 'next/server';
import { createTaskSchema } from '@/validations/schemas/tasks';
import { withValidatedBody } from '@/helpers/with-validated-body';
import { apiClient } from '@/helpers/api-client';

export const GET = withValidatedBody(null, async (_data, request) => {
  const searchParams = request.nextUrl.searchParams;
  const response = await apiClient.get(`/tasks?${searchParams}`);
  const json = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { success: false, ...json },
      { status: response.status },
    );
  }

  return NextResponse.json(
    { success: true, data: json },
    { status: response.status },
  );
});

export const POST = withValidatedBody(createTaskSchema, async data => {
  const response = await apiClient.post(`/tasks`, data);
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
