import { fetchWithAuth } from '@/helpers/fetch-with-auth';
import { UserData } from './types/user';

export async function getCurrentUser() {
  try {
    const response = await fetchWithAuth(`${process.env.API_DOMAIN}/users/me`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) {
      return undefined;
    }

    const data: UserData = await response.json();
    return data;
  } catch {
    return undefined;
  }
}
