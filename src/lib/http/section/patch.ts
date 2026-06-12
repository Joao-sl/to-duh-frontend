import { type ApiResponse } from '../types/api';
import { type SectionData } from '../types/section';
import { type UpdateSectionSchema } from '@/validations/schemas/sections';

export async function patchSection(
  id: number,
  data: UpdateSectionSchema,
): ApiResponse<SectionData, unknown> {
  try {
    const response = await fetch(`/api/sections/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const apiData = await response.json().catch(null);

    if (!response.ok) {
      const error = apiData.message || apiData.error;
      return {
        success: false,
        error: error ?? 'Unknown Error',
        status: response.status,
      };
    }

    return { success: true, data: apiData, status: response.status };
  } catch {
    return { success: false, error: 'Internal Server Error', status: 500 };
  }
}
