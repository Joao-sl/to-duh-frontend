import { type UpdateTaskSchema } from '@/validations/schemas/tasks';
import { type ApiResponse } from '../types/api';
import { type TaskData } from '../types/task';

export async function patchTask(
  id: number,
  data: UpdateTaskSchema,
): ApiResponse<TaskData, unknown> {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const apiData = await response.json();

    if (!response.ok || !apiData.success) {
      const error = apiData.message || apiData.error;
      return { success: false, error: error, status: response.status };
    }

    return { success: true, data: apiData, status: response.status };
  } catch {
    return { success: false, error: 'Internal Server Error', status: 500 };
  }
}
