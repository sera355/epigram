import Header from '@/components/Header/Header';

export default function LandingPage() {
  return (
    <>
      <Header />
      <div className="mt-[320px] font-['Iropke_Batang_OTF'] text-center justify-start">
        <div className=" text-zinc-700 text-4xl font-normal leading-[64px] text-[var(--color-black-500)]">
          나만 갖고 있기엔
          <br />
          아까운 글이 있지 않나요?
        </div>

        <div className="mt-[40px] text-zinc-600 text-xl font-normal leading-7 text-[var(--color-black-300)]">
          다른 사람들과 감정을 공유해 보세요.
        </div>
      </div>
    </>
  );
}
