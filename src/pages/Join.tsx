import SimpleHeader from '@/components/Header/SimpleHeader';
import Logo from '@/assets/images/logo-lg.svg';

export default function Join() {
  return (
    <main className="min-h-screen bg-[#F4F6F8]">
      <SimpleHeader />

      {/* 회원가입 영역 */}
      <section className="pt-[160px] flex justify-center pt-[80px]">
        <div className="w-[448px]">
          {/* 큰 로고 */}
          <div className="mb-[64px] flex justify-center">
            <img src={Logo} alt="Epigram" className="h-[40px]" />
          </div>

          <form className="flex flex-col">
            {/* 이메일 */}
            <label
              htmlFor="email"
              className="mb-[16px] text-[16px] font-semibold text-[#4b5563]"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일"
              className="mb-[32px] h-[52px] rounded-[12px] bg-[#eef1f5] px-[16px] text-[16px] text-[#111827] outline-none placeholder:text-[#a8b1c1]"
            />

            {/* 비밀번호 */}
            <label
              htmlFor="password"
              className="mb-[16px] text-[16px] font-semibold text-[#4b5563]"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호"
              className="mb-[12px] h-[52px] rounded-[12px] bg-[#eef1f5] px-[16px] text-[16px] text-[#111827] outline-none placeholder:text-[#a8b1c1]"
            />

            <input
              id="passwordConfirm"
              type="password"
              placeholder="비밀번호 확인"
              className="mb-[32px] h-[52px] rounded-[12px] bg-[#eef1f5] px-[16px] text-[16px] text-[#111827] outline-none placeholder:text-[#a8b1c1]"
            />

            {/* 닉네임 */}
            <label
              htmlFor="nickname"
              className="mb-[16px] text-[16px] font-semibold text-[#4b5563]"
            >
              닉네임
            </label>
            <input
              id="nickname"
              type="text"
              placeholder="닉네임"
              className="mb-[32px] h-[52px] rounded-[12px] bg-[#eef1f5] px-[16px] text-[16px] text-[#111827] outline-none placeholder:text-[#a8b1c1]"
            />

            {/* 가입 버튼 */}
            <button
              type="submit"
              className="h-[56px] rounded-[12px] bg-[#cbd5e1] text-[16px] font-semibold text-white"
            >
              가입하기
            </button>
          </form>

          {/* 아래 구분선 */}
          <div className="mt-[44px] flex items-center justify-center gap-[16px]">
            <div className="h-px w-[132px] bg-[#e5e7eb]" />
            <div className="h-px w-[132px] bg-[#e5e7eb]" />
          </div>
        </div>
      </section>
    </main>
  );
}
