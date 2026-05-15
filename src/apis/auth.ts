import { BASE_URL } from './apiFetch';

type SignUpRequest = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

type SignInRequest = {
  email: string;
  password: string;
};

type User = {
  id: number;
  email: string;
  nickname: string;
  image?: string | null;
};

type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export const signUp = async ({
  email,
  nickname,
  password,
  passwordConfirmation,
}: SignUpRequest): Promise<AuthResponse> => {
  const response = await fetch(`${BASE_URL}/auth/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      nickname,
      password,
      passwordConfirmation,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || '회원가입에 실패했습니다.');
  }

  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('user', JSON.stringify(data.user));

  return data;
};

export const signIn = async ({
  email,
  password,
}: SignInRequest): Promise<AuthResponse> => {
  const response = await fetch(`${BASE_URL}/auth/signIn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || '로그인에 실패했습니다.');
  }

  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  localStorage.setItem('user', JSON.stringify(data.user));

  return data;
};

export const logOut = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};