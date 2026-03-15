import { fetchWithAuth } from '@/helpers/fetch-with-auth';

export type ProjectData = {
  id: number;
  user_id: number;
  name: string;
  description: string;
  is_favorite: boolean;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
};

export type GetProjectsResponse =
  | { success: true; data: ProjectData[] }
  | { success: false; error: { message: string } };

export async function getProjects(): Promise<GetProjectsResponse> {
  try {
    const response = await fetchWithAuth(`${process.env.API_DOMAIN}/projects`, {
      method: 'GET',
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data };
    }

    return { success: true, data: data };
  } catch {
    return { success: false, error: { message: 'Internal server error' } };
  }
}
