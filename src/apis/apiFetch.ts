export const TEAM_ID = '22-수정';
export const BASE_URL = `https://fe-project-epigram-api.vercel.app/${TEAM_ID}`;

type ApiFetchOptions = RequestInit;

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    throw new Error('refreshToken이 없습니다.');
  }

  const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refreshToken,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    throw new Error(data.message || '토큰 갱신에 실패했습니다.');
  }

  localStorage.setItem('accessToken', data.accessToken);

  if (data.refreshToken) {
    localStorage.setItem('refreshToken', data.refreshToken);
  }

  return data.accessToken;
};

export const apiFetch = async (
  path: string,
  options: ApiFetchOptions = {},
) => {
  const token = localStorage.getItem('accessToken');

  let response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    },
  });

  if (response.status === 401 || response.status === 403) {
    const newAccessToken = await refreshAccessToken();

    response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${newAccessToken}`,
        ...options.headers,
      },
    });
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API 요청에 실패했습니다.');
  }

  return data;
};