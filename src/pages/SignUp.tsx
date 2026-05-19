import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import SimpleHeader from '@/components/Header/SimpleHeader';
import Logo from '@/assets/images/logo-lg.svg';
import Input from '@/components/Input';
import { signUp } from '../apis/auth'          

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [nickname, setNickname] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    nickname: '',
  });

  {/*정규식(몰라도됨)*/}
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (emailValue: string) => {
    if (!emailRegex.test(emailValue)) {
      return '올바르지 않은 이메일 형식입니다.';
    }

    return '';
  };

  const validatePassword = (passwordValue: string) => {
    if (passwordValue.length < 12) {
      return '비밀번호는 12자 이상이어야 합니다.';
    }

    return '';
  };

  const validatePasswordConfirm = (
    passwordValue: string,
    passwordConfirmValue: string,
  ) => {
    if (passwordValue !== passwordConfirmValue) {
      return '비밀번호가 서로 일치하지 않습니다.';
    }

    return '';
  };

  const validateNickname = (nicknameValue: string) => {
    if (nicknameValue.trim().length === 0) {
      return '닉네임을 입력해주세요.';
    }

    return '';
  };

  const handleBlur = (
    field: 'email' | 'password' | 'passwordConfirmation' | 'nickname',
  ) => {
    let errorMessage = '';

    if (field === 'email') {
      errorMessage = validateEmail(email);
    }

    if (field === 'password') {
      errorMessage = validatePassword(password);
    }

    if (field === 'passwordConfirmation') {
      errorMessage = validatePasswordConfirm(password, passwordConfirmation);
    }

    if (field === 'nickname') {
      errorMessage = validateNickname(nickname);
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMessage,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
      passwordConfirmation: validatePasswordConfirm(
        password,
        passwordConfirmation,
      ),
      nickname: validateNickname(nickname),
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === '');
  };

  const isFormValid =
    emailRegex.test(email) &&
    password.length >= 12 &&
    password === passwordConfirmation &&
    nickname.trim().length > 0;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    try {
      const data = await signUp({
        email,
        nickname,
        password,
        passwordConfirmation,
      });

      console.log('회원가입 성공:', data);
      navigate('/login');
    } catch (error) {
      console.error('회원가입 요청 실패:', error);
      
      {/*이미 존재하는 이메일일 경우*/}
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: '이미 존재하는 이메일입니다.',
      }));

      
    }
  };

  return (
    <main className="min-h-screen bg-[#F4F6F8]">
      <SimpleHeader />

      <section className="flex justify-center pt-[160px]">
        <div className="w-[640px]">
          <Link to="/epigramlist" className="mb-[64px] flex justify-center">
            <img src={Logo} alt="Epigram" className="h-[48px] w-[158px]" />
          </Link>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col">
            <Input
              id="email"
              label="이메일"
              type="email"
              placeholder="이메일"
              value={email}
              error={errors.email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur('email')}
              className="mb-[32px]"
            />

            <Input
              id="password"
              label="비밀번호"
              type="password"
              placeholder="비밀번호"
              value={password}
              error={errors.password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur('password')}
              className="mb-[12px]"
            />

            <Input
              id="passwordConfirmation"
              type="password"
              placeholder="비밀번호 확인"
              value={passwordConfirmation}
              error={errors.passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              onBlur={() => handleBlur('passwordConfirmation')}
              className="mb-[32px]"
            />

            <Input
              id="nickname"
              label="닉네임"
              type="text"
              placeholder="닉네임"
              value={nickname}
              error={errors.nickname}
              onChange={(e) => setNickname(e.target.value)}
              onBlur={() => handleBlur('nickname')}
              className="mb-[32px]"
            />

            <button
              type="submit"
              disabled={!isFormValid}
              className={`h-[56px] rounded-[12px] text-[16px] font-semibold text-white ${
                isFormValid
                  ? 'cursor-pointer bg-(--color-blue-900)'
                  : 'cursor-not-allowed bg-(--color-blue-300)'
              }`}
            >
              가입하기
            </button>
          </form>

          <div className="mt-[44px] flex items-center justify-center gap-[16px]">
            <div className="h-px w-[132px] bg-(--color-gray-200)" />
            <div className="h-px w-[132px] bg-(--color-gray-200)" />
          </div>
        </div>
      </section>
    </main>
  );
}
