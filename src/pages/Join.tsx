import SimpleHeader from '@/components/Header/SimpleHeader';
import Logo from '@/assets/images/logo-lg.svg';

export default function Join() {
  return (
    <main className="min-h-screen bg-[#F4F6F8]">
      <SimpleHeader />

      {/*로그인 영역*/}
      <section className="flex justify-center pt-[150px]">
        <div className="w-[448px]">

          {/*로고 스타일 적용*/}
          <div className="mb-[40px] flex justify-center">
            <img src={Logo} alt="logo" className="h-12" />
          </div>

          {/*폼*/}
          {/*폼 안의 자식 요소들을 flex배치로, flex-col -> 자식 요소들을 세로 방향으로 쌓음*/}
          <form className="flex flex-col"> 
            <input type="email" placeholder="이메일" />
            <input type="password" placeholder="비밀번호" />
            <button type="submit">로그인</button>
          </form>

          {/*회원가입*/}
          <div className="mt-[16px]  flex justify-end gap-2 text-[14px]">
            <span className="">회원이 아니신가요?</span>
            <button className="">가입하기</button>
          </div>

        </div>
      </section>
    </main>
  );
}
