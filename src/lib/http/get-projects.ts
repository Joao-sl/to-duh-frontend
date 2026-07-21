import { fetchWithAuth } from '@/helpers/fetch-with-auth';
import { ProjectData } from './types/project';

export type GetProjectsResponse =
  | { success: true; data: ProjectData[] }
  | { success: false; error: string };

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
      };
    }

    return { success: true, data: data };
  } catch {
    return { success: false, error: 'Internal server error' };
  }
}
