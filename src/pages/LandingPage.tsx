import Header from '@/components/Header/Header';
export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <section
          className="relative h-[640px] bg-white"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to_bottom, #ffffff_0px, #ffffff_39px, red_40px)',
          }}
        >
          <div className="mt-[320px] font-['Iropke_Batang_OTF'] text-center justify-start">
            <h1 className=" text-zinc-700 text-4xl font-normal leading-[64px] text-[var(--color-black-500)]">
              나만 갖고 있기엔
              <br />
              아까운 글이 있지 않나요?
            </h1>

            <div className="mt-[40px] text-zinc-600 text-xl font-normal leading-7 text-[var(--color-black-300)]">
              다른 사람들과 감정을 공유해 보세요.
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-background-100)] w-full"></section>
      </main>
    </>
  );
}
