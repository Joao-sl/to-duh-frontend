import { NextResponse } from 'next/server';
import { updateSectionSchema } from '@/validations/schemas/sections';
import { withValidatedBody } from '@/helpers/with-validated-body';
import { apiClient } from '@/helpers/api-client';

export const PATCH = withValidatedBody(
  updateSectionSchema,
  async (data, _request, params) => {
    const sectionId = Number(params.id);

    if (!Number.isInteger(sectionId) || sectionId < 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid section id' },
        { status: 400 },
      );
    }

    const response = await apiClient.patch(`/sections/${sectionId}`, data);
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
