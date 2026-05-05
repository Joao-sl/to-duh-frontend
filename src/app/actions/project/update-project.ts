'use server';

import { flattenError } from 'zod';
import {
  UpdateProjectSchema,
  updateProjectSchema,
} from '@/validations/schemas/projects';
import { fetchWithAuth } from '@/helpers/fetch-with-auth';

export async function updateProjectAction(
  projectId: number,
  data: UpdateProjectSchema,
) {
  const validatedData = updateProjectSchema.safeParse(data);

  if (!validatedData.success) {
    const errors = flattenError(validatedData.error);
    return { success: false, errors: errors.fieldErrors };
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
