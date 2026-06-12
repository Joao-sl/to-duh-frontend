import { type ApiResponse } from '../types/api';

export async function deleteSection(id: number): ApiResponse<null, unknown> {
  try {
    const response = await fetch(`/api/sections/${id}`, { method: 'DELETE' });

    if (!response.ok) {
      const data = await response.json().catch(null);
      const error = data.message || data.error;
      return {
        success: false,
        error: error ?? 'Unknown Error',
        status: response.status,
      };
    }

    return { success: true, data: null, status: response.status };
  } catch {
    return { success: false, error: 'Internal Server Error', status: 500 };
  }
}
