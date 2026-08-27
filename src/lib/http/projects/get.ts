import type { ApiResponse } from '../types/api';
import type { ProjectData } from '../types/project';

type Params = {
  archived?: boolean;
};

export async function getProjectsList(
  params: Params = {},
): Promise<ApiResponse<ProjectData[], string>> {
  const searchParams = new URLSearchParams();

  if (params.archived !== undefined) {
    searchParams.set('archived', String(params.archived));
  }

  try {
    const response = await fetch(`/api/projects?${searchParams}`, {
      method: 'GET',
    });

    const json = await response.json();

    if (!response.ok) {
      const errorMessage = json.message ?? json.error;
      return {
        success: false,
        error: errorMessage ?? `ERROR ${response.status}`,
        status: response.status,
      };
    }

    return { success: true, data: json.data, status: response.status };
  } catch {
    return { success: false, error: 'Internal server error', status: 500 };
  }
}
