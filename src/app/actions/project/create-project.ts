'use server';

import z from 'zod';
import { fetchWithAuth } from '@/helpers/fetch-with-auth';
import {
  createProjectSchema,
  CreateProjectSchema,
} from '@/validations/schemas/projects';

export async function createProjectAction(formData: CreateProjectSchema) {
  const validatedData = createProjectSchema.safeParse(formData);

  if (!validatedData.success) {
    const errors = z.flattenError(validatedData.error);
    return { success: false, errors: errors.fieldErrors };
  }

  try {
    const response = await fetchWithAuth(`${process.env.API_DOMAIN}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: validatedData.data.name,
        description: validatedData.data.description,
        is_favorite: validatedData.data.is_favorite,
      }),
    });

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
