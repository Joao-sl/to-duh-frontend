import { fetchWithAuth } from '@/helpers/fetch-with-auth';
import type { ProjectData } from './types/project';
import type { ApiResponse } from './types/api';

export type GetProjectsResponse = ApiResponse<ProjectData[], string>;

export async function getProjects(): Promise<GetProjectsResponse> {
  try {
    const response = await fetchWithAuth(`${process.env.API_DOMAIN}/projects`, {
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
