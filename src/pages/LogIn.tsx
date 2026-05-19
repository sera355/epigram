import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SimpleHeader from '@/components/Header/SimpleHeader';
import logo from '@/assets/images/logo-lg.svg';
import { signIn } from '@/apis/auth';

export default function LogIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return '이메일은 필수 입력입니다.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      return '이메일 형식으로 작성해 주세요.';
    }

    return '';
  };

  const validatePassword = (value: string) => {
    if (!value.trim()) {
      return '비밀번호는 필수 입력입니다.';
    }

    return '';
  };

  const handleEmailBlur = () => {
    setEmailError(validateEmail(email));
  };

  const handlePasswordBlur = () => {
    setPasswordError(validatePassword(password));
  };

  const isFormValid =
    email.trim().length > 0 &&
    password.trim().length > 0 &&
    !validateEmail(email) &&
    !validatePassword(password);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextEmailError = validateEmail(email);
    const nextPasswordError = validatePassword(password);

    setEmailError(nextEmailError);
    setPasswordError(nextPasswordError);
    setLoginError('');

    if (nextEmailError || nextPasswordError) return;

    try {
      setIsSubmitting(true);

      await signIn({
        email,
        password,
      });

      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError('로그인에 실패했습니다.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SimpleHeader />

      <main className="min-h-screen bg-(--color-background) pt-[293px]">
        <section className="mx-auto flex w-[640px] flex-col items-center">
          <img
            src={logo}
            alt="Epigram"
            className="mb-[72px] h-[48px] w-[158px]"
          />

          <form onSubmit={handleSubmit} className="flex w-full flex-col">
            <div className="mb-[16px]">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setLoginError('');
                }}
                onBlur={handleEmailBlur}
                placeholder="이메일"
                className={`flex h-[64px] w-[640px] items-center gap-[8px] rounded-[12px] border bg-white px-[16px] text-[16px] font-medium text-(--color-black-500) placeholder:text-(--color-gray-300) outline-none ${
                  emailError
                    ? 'border-(--color-state)'
                    : 'border-(--color-line-100)'
                }`}
              />

              {emailError && (
                <p className="mt-[8px] text-[14px] font-medium text-(--color-state)">
                  {emailError}
                </p>
              )}
            </div>

            <div className="mb-[16px]">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginError('');
                }}
                onBlur={handlePasswordBlur}
                placeholder="비밀번호"
                className={`flex h-[64px] w-[640px] items-center gap-[8px] rounded-[12px] border bg-white px-[16px] text-[16px] font-medium text-(--color-black-500) placeholder:text-(--color-gray-300) outline-none ${
                  passwordError
                    ? 'border-(--color-state)'
                    : 'border-(--color-line-100)'
                }`}
              />

              {passwordError && (
                <p className="mt-[8px] text-[14px] font-medium text-(--color-state)">
                  {passwordError}
                </p>
              )}
            </div>

            {loginError && (
              <p className="mb-[16px] text-[14px] font-medium text-(--color-state)">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`h-[64px] w-[640px] rounded-[12px] text-[20px] font-semibold text-white ${
                isFormValid && !isSubmitting
                  ? 'cursor-pointer bg-(--color-black-500) '
                  : 'cursor-not-allowed bg-(--color-blue-300) border border-(--color-blue-200)'
              }`}
            >
              {isSubmitting ? '로그인 중...' : '로그인'}
            </button>
          </form>
          
          <div className="mt-[24px] w-full text-right">
            <p className="text-[20px] font-medium text-(--color-blue-400)">
            회원이 아니신가요?{' '}
            <Link
              to="/signup"
              className="text-(--color-black-500) text-[20px] underline underline-offset-2"
            >
              가입하기
            </Link>
          </p>
          </div>
          
        </section>
      </main>
    </>
  );
}