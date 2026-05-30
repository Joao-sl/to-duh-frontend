import { fetchWithAuth } from './fetch-with-auth';

async function requestWithAuth(path: string, init: RequestInit = {}) {
  return fetchWithAuth(`${process.env.API_DOMAIN}${path}`, {
    headers: {
      ...(init.body != null && { 'Content-Type': 'application/json' }),
      ...init.headers,
    },
    ...init,
  });
}

export const apiClient = {
  get: (path: string, init?: Omit<RequestInit, 'method'>) => {
    return requestWithAuth(path, {
      method: 'GET',
      ...init,
    });
  },

  delete: (path: string, init?: Omit<RequestInit, 'method'>) => {
    return requestWithAuth(path, {
      method: 'DELETE',
      ...init,
    });
  },

  post: (
    path: string,
    body: unknown,
    init?: Omit<RequestInit, 'method' | 'body'>,
  ) => {
    return requestWithAuth(path, {
      method: 'POST',
      ...init,
      body: JSON.stringify(body),
    });
  },

  put: (
    path: string,
    body: unknown,
    init?: Omit<RequestInit, 'method' | 'body'>,
  ) => {
    return requestWithAuth(path, {
      method: 'PUT',
      ...init,
      body: JSON.stringify(body),
    });
  },

  patch: (
    path: string,
    body: unknown,
    init?: Omit<RequestInit, 'method' | 'body'>,
  ) => {
    return requestWithAuth(path, {
      method: 'PATCH',
      ...init,
      body: JSON.stringify(body),
    });
  },
};
