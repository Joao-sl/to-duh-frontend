import type { TaskData } from '../types/task';
import type { ApiResponse } from '../types/api';
import { fetchWithAuth } from '@/helpers/fetch-with-auth';

export async function getTasksList(): Promise<ApiResponse<TaskData[], string>> {
  try {
    const response = await fetchWithAuth(`${process.env.API_DOMAIN}/tasks`, {
      method: 'GET',
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.message ?? data.error;
      return {
        success: false,
        error: errorMessage ?? `ERROR ${response.status}`,
        status: response.status,
      };
    }

    return { success: true, data: data, status: response.status };
  } catch {
    return { success: false, error: 'Internal server error', status: 500 };
  }
}
