import Header from '@/components/Header/Header';
import bgImage from '@/assets/images/landing-bg.png';
import waveLine from '@/assets/images/waveLine.svg';
import waveLine2 from '@/assets/images/waveLine2.svg';
import landing01 from '@/assets/images/img_Desktop_landing01.png';
import landing02 from '@/assets/images/img_Desktop_landing02.png';
import landing03 from '@/assets/images/img_Desktop_landing03.png';
import landing04 from '@/assets/images/img_Desktop_landing04.png';
import logo from '@/assets/images/logo2-xl.png';

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <section
          className="relative h-240 bg-position-[center_top] bg-white bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="pt-80 font-['Iropke_Batang'] text-center justify-start">
            <h1 className="text-4xl font-normal leading-16 text-(--color-black-500)">
              나만 갖고 있기엔
              <br />
              아까운 글이 있지 않나요?
            </h1>

            <div className="mt-10 text-xl font-normal leading-7 text-(--color-black-300)">
              다른 사람들과 감정을 공유해 보세요.
            </div>
          </div>
        </section>

        <img
          src={waveLine}
          className="relative z-10 -mb-5 block w-full translate-y-1"
        ></img>

        <section className="w-full bg-(--color-background) ">
          <div className="mx-auto flex max-w-7xl flex-col gap-95 px-10 py-60">
            {/*1번*/}

            <div className="flex items-end gap-20 mt-30">
              <img src={landing01} className="w-186" />
              <div className="shrink-0 text-left">
                <h2 className="font-['Pretendard'] text-[32px] font-bold leading-11.5">
                  명언이나 글귀,
                  <br />
                  토막 상식들을 공유해 보세요.
                </h2>

                <h3 className="mt-10 font-['Pretendard'] text-[24px] font-normal leading-8 text-blue-600">
                  나만 알던 소중한 글들을
                  <br />
                  다른 사람들에게 전파하세요.
                </h3>
              </div>
            </div>

            {/* 2번 */}
            <div className="flex items-end justify-between">
              <div className="shrink-0 text-right">
                <h2 className="font-['Pretendard'] text-[32px] font-bold leading-11.5">
                  감정 상태에 따라,
                  <br />
                  알맞은 위로를 받을 수 있어요.
                </h2>
                <h3 className="mt-10 font-['Pretendard'] text-[24px] font-normal leading-8 text-blue-600">
                  태그를 통해 글을 모아 볼 수 있어요.
                </h3>
              </div>

              <img src={landing02} width="744" />
            </div>

            {/*3번*/}
            <div className="flex items-end gap-20">
              <img src={landing03} width="744" />

              <div className="shrink-0 text-left">
                <h2 className="font-['Pretendard'] text-[32px] font-bold leading-11.5">
                  내가 요즘 어떤 감정 상태인지
                  <br />
                  통계로 한눈에 볼 수 있어요.
                </h2>
                <h3 className="mt-10 font-['Pretendard'] text-[24px] font-normal leading-8 text-blue-600">
                  감정 달력으로
                  <br />내 마음에 담긴 감정을 확인해보세요
                </h3>
              </div>
            </div>

            <div className="shrink-0 text-center pt-25">
              <h2 className="font-['Pretendard'] text-[32px] font-bold leading-11.5">
                사용자들이 직접
                <br />
                인용한 에피그램들
              </h2>
              <img
                src={landing04}
                width="640px"
                className="mx-auto mt-25 w-160"
              />
            </div>
          </div>
        </section>

        <img
          src={waveLine2}
          className="relative z-10 -mt-5 block w-full -translate-y-1"
        ></img>

        <section
          className="relative h-240 bg-position-[center_top] bg-white bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <img src={logo} className="mx-auto py-105 w-[184px]"></img>
        </section>
      </main>
    </>
  );
}
