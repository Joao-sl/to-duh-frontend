'use server';

import z from 'zod';
import { fetchWithAuth } from '@/helpers/fetch-with-auth';
import {
  updateTaskSchema,
  UpdateTaskSchema,
} from '@/validations/schemas/tasks';

export async function updateTaskAction(taskId: number, data: UpdateTaskSchema) {
  const validatedData = updateTaskSchema.safeParse(data);

  if (!validatedData.success) {
    const errors = z.flattenError(validatedData.error);
    return { success: false, errors: errors.fieldErrors };
  }

  try {
    const response = await fetchWithAuth(
      `${process.env.API_DOMAIN}/tasks/${taskId}`,
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
