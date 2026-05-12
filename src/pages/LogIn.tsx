import SimpleHeader from '@/components/Header/SimpleHeader';
import logo from '@/assets/images/logo-lg.svg';
import {Link} from 'react-router-dom';

export default function LogIn() {
  return(
    <>
      <SimpleHeader />
      <main className="min-h-[calc(100vh-80px)] bg-(--color-background) pt-[293px] pb-[447px]">
        <section className="mx-auto flex w-[608px] flex-col items-center">
          
          <Link to="/epigramlist" >
            <img src={logo} alt="Epigram" className="mb-[72px] w-[158px] h-[48px]"/>
          </Link>
          

          <form className="flex w-full flex-col gap-[16px]">
            <input
              type="email"
              placeholder="이메일"
              className="flex h-[64px] w-[608px] items-center gap-[8px] rounded-[12px] border border-(--color-line-100) bg-white px-[16px] text-[16px] font-medium text-(--color-black-500) placeholder:text-(--color-gray-300) outline-none"
            />

            <input
              type="password"
              placeholder="비밀번호"
              className="flex h-[64px] w-[608px] items-center gap-[8px] rounded-[12px] border border-(--color-line-100) bg-white px-[16px] text-[16px] font-medium text-(--color-black-500) placeholder:text-(--color-gray-300) outline-none"
            />

            <button
              type="submit"
              className="mt-[8px] flex h-[64px] w-[608px] items-center justify-center gap-[8px] rounded-[8px] bg-(--color-blue-300) px-[16px] text-[16px] font-semibold text-white"
            >
              로그인
            </button>
          </form>

          <div className="mt-[16px] flex items-center w-full justify-end gap-[8px] text-[14px] font-medium">
            <span className="text-(--color-gray-300)">회원이 아니신가요?</span>
            <Link to="/signup" className="text-(--color-black-400) underline">
              가입하기
            </Link>
          </div>

          <div className="mt-[40px] flex w-full items-center gap-[16px]">
            <div className="h-px flex-1 bg-(--color-line-100)" />
            <span className="text-[14px] font-medium text-(--color-gray-300)">
              
            </span>
            <div className="h-px flex-1 bg-(--color-line-100)" />
          </div>
        </section>
      </main>
    </>
  );
}
