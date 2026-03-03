import { getAccessToken, isTokenExpired } from './auth-token-manager';
import { refreshAccessTokenAction } from '@/app/actions/auth/refresh-access-token';

export async function fetchWithAuth(
  input: string,
  initOptions: RequestInit = {},
) {
  let access = await getAccessToken();

  const makeRequest = (access: string | undefined) => {
    return fetch(input, {
      ...initOptions,
      headers: { Authorization: `Bearer ${access}`, ...initOptions.headers },
    });
  };

  const updateAccessToken = async () => {
    await refreshAccessTokenAction();
    access = await getAccessToken();
  };

  try {
    if (!access || isTokenExpired(access)) {
      await updateAccessToken();
    }

    let response = await makeRequest(access);

    if (response.status === 401) {
      await updateAccessToken();
      response = await makeRequest(access);
    }

    return response;
  } catch (error) {
    throw error;
  }
}
