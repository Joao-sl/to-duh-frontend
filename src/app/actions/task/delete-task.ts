'use server';

import { fetchWithAuth } from '@/helpers/fetch-with-auth';

export async function deleteTaskAction(taskId: number) {
  try {
    const response = await fetchWithAuth(
      `${process.env.API_DOMAIN}/tasks/${taskId}`,
      { method: 'DELETE' },
    );

    if (!response.ok) {
      const apiData = await response.json();
      return { success: false, ...apiData };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      message: 'Internal Server Error, please try again latter',
      statusCode: 500,
    };
  }
}
