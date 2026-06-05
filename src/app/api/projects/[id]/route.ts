import { NextResponse } from 'next/server';
import { updateProjectSchema } from '@/validations/schemas/projects';
import { withValidatedBody } from '@/helpers/with-validated-body';
import { apiClient } from '@/helpers/api-client';

export const PATCH = withValidatedBody(
  updateProjectSchema,
  async (data, _request, params) => {
    const projectId = Number(params.id);

    if (!Number.isInteger(projectId) || projectId < 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid section id' },
        { status: 400 },
      );
    }

    const response = await apiClient.patch(`/projects/${projectId}`, data);
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
