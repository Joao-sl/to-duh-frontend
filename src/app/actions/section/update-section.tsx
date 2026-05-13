'use server';

import { flattenError } from 'zod';
import { fetchWithAuth } from '@/helpers/fetch-with-auth';
import {
  type UpdateSectionSchema,
  updateSectionSchema,
} from '@/validations/schemas/sections';

export async function updateSectionAction(
  sectionId: number,
  data: UpdateSectionSchema,
) {
  const validatedData = updateSectionSchema.safeParse(data);

  if (!validatedData.success) {
    const errors = flattenError(validatedData.error);
    return { success: false, errors: errors.fieldErrors };
  }

  try {
    const response = await fetchWithAuth(
      `${process.env.API_DOMAIN}/sections/${sectionId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData.data),
      },
    );

    const apiData = await response.json();

    if (!response.ok) {
      return { success: false, ...apiData };
    }

    return { success: true, ...apiData };
  } catch {
    return {
      success: false,
      message: 'Internal Server Error, please try again latter',
      statusCode: 500,
    };
  }
}
