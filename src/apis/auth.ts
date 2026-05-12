type SignUpRequest = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

export const signUp = async ({
  email,
  nickname,
  password,
  passwordConfirmation,
}: SignUpRequest) => {
  const response = await fetch(
    'https://fe-project-epigram-api.vercel.app/22-수정/auth/signUp',
    {
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
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || '회원가입에 실패했습니다.');
  }

  return data;
};