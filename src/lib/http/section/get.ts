import type { ApiResponse } from '../types/api';
import type { SectionData } from '../types/section';
import { fetchWithAuth } from '@/helpers/fetch-with-auth';

type Params = {
  archived?: boolean;
};

export async function getSectionsList(
  params: Params = {},
): Promise<ApiResponse<SectionData[], string>> {
  const searchParams = new URLSearchParams();

  if (params.archived !== undefined) {
    searchParams.set('archived', String(params.archived));
  }

  try {
    const response = await fetchWithAuth(
      `${process.env.API_DOMAIN}/sections?${searchParams}`,
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
        status: response.status,
      };
    }

    return { success: true, data: data, status: response.status };
  } catch {
    return { success: false, error: 'Internal server error', status: 500 };
  }
}
