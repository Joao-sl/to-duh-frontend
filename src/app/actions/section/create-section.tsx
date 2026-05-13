'use server';

import { flattenError } from 'zod';
import { fetchWithAuth } from '@/helpers/fetch-with-auth';
import {
  type CreateSectionSchema,
  createSectionSchema,
} from '@/validations/schemas/sections';

export async function createSectionAction(data: CreateSectionSchema) {
  const validatedData = createSectionSchema.safeParse(data);

  if (!validatedData.success) {
    const errors = flattenError(validatedData.error);
    return { success: false, errors: errors.fieldErrors };
  }

  try {
    const response = await fetchWithAuth(`${process.env.API_DOMAIN}/sections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedData.data),
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
