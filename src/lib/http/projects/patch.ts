import { type ApiResponse } from '../types/api';
import { type ProjectData } from '../types/project';
import { type UpdateProjectSchema } from '@/validations/schemas/projects';

export async function patchProject(
  id: number,
  data: UpdateProjectSchema,
): Promise<ApiResponse<ProjectData, unknown>> {
  try {
    const response = await fetch(`/api/projects/${id}`, {
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
