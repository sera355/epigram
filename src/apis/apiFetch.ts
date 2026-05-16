export const TEAM_ID = '12-4';
export const BASE_URL = `https://fe-project-epigram-api.vercel.app/${TEAM_ID}`;

type ApiFetchOptions = RequestInit & {
  skipAuth?: boolean;
};

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
  const { skipAuth = false, ...fetchOptions } = options;

   //처음 접근했을 때 토큰 값이 없기 때문에 함수를 실행할 때마다 token을 재할당하도록 apiFetch안에서 token을 정의해야한다.
  const token = localStorage.getItem('accessToken') ?? '';
 
  let response = await fetch(`${BASE_URL}${path}`, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(!skipAuth && token && {
        Authorization: `Bearer ${token}`,
      }),
      ...fetchOptions.headers,
    },
  });


  if (!skipAuth && (response.status === 401 || response.status === 403)) {
    const newAccessToken = await refreshAccessToken();

    response = await fetch(`${BASE_URL}${path}`, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${newAccessToken}`,
        ...fetchOptions.headers,
      },
    });
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API 요청에 실패했습니다.');
  }

  return data;
};
