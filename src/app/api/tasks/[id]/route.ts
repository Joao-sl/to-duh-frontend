import { NextResponse } from 'next/server';
import { updateTaskSchema } from '@/validations/schemas/tasks';
import { apiClient } from '@/helpers/api-client';
import { withValidatedBody } from '@/helpers/with-validated-body';

export const PATCH = withValidatedBody(
  updateTaskSchema,
  async (data, _request, params) => {
    const taskId = Number(params.id);

    if (!Number.isInteger(taskId) || taskId < 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid task id' },
        { status: 400 },
      );
    }

    const response = await apiClient.patch(`/tasks/${taskId}`, data);
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
  },
);

export const DELETE = withValidatedBody(
  null,
  async (_data, _request, params) => {
    const taskId = Number(params.id);

    if (!Number.isInteger(taskId) || taskId < 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid task id' },
        { status: 400 },
      );
    }

    const response = await apiClient.delete(`/tasks/${taskId}`);

    if (!response.ok) {
      const json = await response.json();
      return NextResponse.json(
        { success: false, ...json },
        { status: response.status },
      );
    }

    return new NextResponse(null, { status: response.status });
  },
);
