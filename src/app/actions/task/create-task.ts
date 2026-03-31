'use server';

import { fetchWithAuth } from '@/helpers/fetch-with-auth';
import {
  createTaskSchema,
  CreateTaskSchema,
} from '@/validations/schemas/tasks';
import z from 'zod';

export async function createTaskAction(data: CreateTaskSchema) {
  const validatedData = createTaskSchema.safeParse(data);

  if (!validatedData.success) {
    const errors = z.flattenError(validatedData.error);
    return { success: false, errors: errors.fieldErrors };
  }

  try {
    const response = await fetchWithAuth(`${process.env.API_DOMAIN}/tasks`, {
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
