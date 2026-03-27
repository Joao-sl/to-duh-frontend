import { ApiResponse } from './types/api';
import { ProjectBoardData } from './types/project';
import { fetchWithAuth } from '@/helpers/fetch-with-auth';

export async function getProjectBoard(
  projectId: number,
): ApiResponse<ProjectBoardData, string> {
  try {
    const response = await fetchWithAuth(
      `${process.env.API_DOMAIN}/project/${projectId}/board`,
      {
        method: 'GET',
      },
    );

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
