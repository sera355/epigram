import Header from '@/components/Header/Header';

export default function EpigramDetailPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F5F7FA]">
        {/* 에피그램 상세 영역 */}
        <section className="bg-white">
          <div className="mx-auto w-[640px] pt-[36px] pb-[32px]">
            {/* 태그 + 더보기 버튼 */}
            <div className="mb-[24px] flex items-center justify-between">
              <div className="flex gap-[12px] text-[14px] text-[#ABB8CE]">
                <span>#꿈을이루고싶을때</span>
                <span>#나아가야할때</span>
              </div>

              <button
                type="button"
                className="text-[24px] leading-none text-[#ABB8CE]"
              >
                ⋮
              </button>
            </div>

            {/* 본문 */}
            <p className="font-['Iropke_Batang_OTF'] text-[24px] leading-[40px] text-[#2B2B2B]">
              오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아간다.
            </p>

            {/* 작가 */}
            <p className="mt-[32px] text-center text-[18px] text-[#ABB8CE]">
              - 앙드레 말로 -
            </p>

            {/* 좋아요 / 공유 버튼 */}
            <div className="mt-[32px] flex justify-center gap-[12px]">
              <button
                type="button"
                className="flex h-[36px] items-center gap-[6px] rounded-full bg-[#2B2B2B] px-[16px] text-[14px] font-semibold text-white"
              >
                👍
                <span>123</span>
              </button>

              <button
                type="button"
                className="h-[36px] rounded-full bg-[#F2F4F7] px-[16px] text-[14px] font-semibold text-[#8B95A1]"
              >
                왕도로 가는 길 ↗
              </button>
            </div>
          </div>

          {/* 흰 영역 아래 지그재그 느낌 */}
          <div className="h-[12px] bg-[repeating-linear-gradient(135deg,#ffffff_0px,#ffffff_8px,#F5F7FA_8px,#F5F7FA_16px)]" />
        </section>

        {/* 댓글 영역 */}
        <section className="mx-auto w-[640px] pt-[36px]">
          <h2 className="mb-[16px] text-[16px] font-semibold text-[#2B2B2B]">
            댓글 <span>(3)</span>
          </h2>

          {/* 댓글 입력 */}
          <div className="mb-[28px] flex gap-[16px]">
            <img
              src="/src/assets/images/profile.png"
              alt="profile"
              className="h-[40px] w-[40px] rounded-full object-cover"
            />

            <textarea
              placeholder="100자 이내로 입력해주세요."
              maxLength={100}
              className="h-[68px] flex-1 resize-none rounded-[8px] border border-[#D7E0EE] bg-white px-[16px] py-[14px] text-[14px] outline-none placeholder:text-[#ABB8CE]"
            />
          </div>

          <div className="border-t border-[#D7E0EE]">
            <CommentItem
              image="/src/assets/images/profile.png"
              name="지킬과 하이드"
              time="1시간 전"
              content="오늘 하루 우울했는데 덕분에 많은 힘 얻고 갑니다. 연금술사 책 다시 사서 오랜만에 읽어봐야겠어요!"
              isMine
            />

            <CommentItem
              image="/src/assets/images/profile.png"
              name="지킬과 하이드"
              time="1시간 전"
              content="오늘 하루 우울했는데 덕분에 많은 힘 얻고 갑니다. 연금술사 책 다시 사서 오랜만에 읽어봐야겠어요!"
            />

            <CommentItem
              image="/src/assets/images/profile.png"
              name="지킬과 하이드"
              time="1시간 전"
              content="오늘 하루 우울했는데 덕분에 많은 힘 얻고 갑니다. 연금술사 책 다시 사서 오랜만에 읽어봐야겠어요!"
            />
          </div>
        </section>
      </main>
    </>
  );
}

type CommentItemProps = {
  image: string;
  name: string;
  time: string;
  content: string;
  isMine?: boolean;
};

function CommentItem({
  image,
  name,
  time,
  content,
  isMine = false,
}: CommentItemProps) {
  return (
    <article className="flex gap-[16px] border-b border-[#D7E0EE] py-[24px]">
      <img
        src={image}
        alt="profile"
        className="h-[40px] w-[40px] rounded-full object-cover"
      />

      <div className="flex-1">
        <div className="mb-[8px] flex items-center justify-between">
          <div className="flex items-center gap-[6px] text-[13px] text-[#8B95A1]">
            <span>{name}</span>
            <span>{time}</span>
          </div>

          {isMine && (
            <div className="flex gap-[8px] text-[13px]">
              <button type="button" className="text-[#8B95A1]">
                수정
              </button>
              <button type="button" className="text-[#FF6577]">
                삭제
              </button>
            </div>
          )}
        </div>

        <p className="text-[15px] leading-[26px] text-[#2B2B2B]">{content}</p>
      </div>
    </article>
  );
}

