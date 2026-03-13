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

export async function getProjects() {
  try {
    const response = await fetchWithAuth(`${process.env.API_DOMAIN}/projects`, {
      method: 'GET',
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data };
    }

    return { success: true, data: data as ProjectData[] };
  } catch (error) {
    return { success: false, error: error };
  }
}
