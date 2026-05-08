import Header from '@/components/Header/Header';
import waveLine from '@/assets/images/waveLine.svg';
import more from '@/assets/icons/more-md.png';
import share from '@/assets/icons/Share.png';
import like from '@/assets/icons/like.png';
import profileImage from '@/assets/profileImages/profile01.png';

const mockEpigrams = {
    id: 1,
    content: '오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아 간다.',
    tags: ['나아가야 할때', '꿈을 이루고 싶을 때'],
    author: '안나',
    likeCount: 21,
  }

const mockComments = [
  {
    id: 1,
    image: '/src/assets/profileImages/profile01.png',
    userName: '지킬과 하이드',
    time: '1시간 전',
    content: '오늘 하루 우울했는데 덕분에 많은 힘 얻고 갑니다.',
    isMine: true, 
  },

  {
    id: 2,
    image: '/src/assets/profileImages/profile01.png',
    userName: '노인과 바다',
    time: '2시간 전',
    content: '별로네요...',
    isMine: false, 
  },

  {
    id: 3,
    image: '/src/assets/profileImages/profile01.png',
    userName: '빨간머리 앤',
    time: '2시간 전',
    content: '재밌겠다...',
    isMine: false, 
  }
]

export default function EpigramDetailPage() {
  
  
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F5F7FA]">

        {/* 에피그램 상세 영역 */}
        <section className="bg-white relative h-[472px] bg-position-[center_top]">
          <div className="mx-auto w-[640px] pt-[120px] pb-[32px]">


            {/* 태그 + 더보기 버튼 */}
            <div className="mb-[24px] flex items-center justify-between">

              {/*태그*/}
              <div className="font-['Pretendard'] flex gap-[12px] text-[20px] text-(--color-blue-400)">
                {mockEpigrams.tags.map((tag)=> (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>

              {/*더보기 버튼*/}
              <button type="button">
                <img src={more} className="w-[36px]"/>
              </button>
            </div>


            {/* 본문 */}
            <p className="font-['Iropke_Batang'] text-[32px] leading-[40px] text-(--color-black-700)">
              {mockEpigrams.content}
            </p>


            {/* 작가 */}
            <p className="mt-[32px] font-['Iropke_Batang'] text-right text-[24px] text-[#ABB8CE]">
              - {mockEpigrams.author} -
            </p>


            {/* 좋아요 / 공유 버튼 */}
            <div className="mt-[36px] flex justify-center gap-[12px]">
              <button
                type="button"
                className="flex h-[48px] items-center gap-[6px] rounded-full bg-(--color-black-600) px-[16px] text-[20px] font-['Pretendard'] font-semibold text-white"
              >
                <img src={like} className="w-[36px] h-[36px]" />
                <span>{mockEpigrams.likeCount}</span>
              </button>

              <button
                type="button"
                className="flex h-[48px] items-center gap-[6px] rounded-full bg-(--color-line-100) px-[16px] text-[20px] font-['Pretendard'] font-medium text-(--color-gray-300)"
              >
                <span>왕도로 가는 길</span>
                <img src={share} className="w-[21px] h-[21px]"/>
              </button>
            </div>
          </div>

          
          <img src={waveLine} alt="" className="absolute bottom-[-24px] w-full"/>
        </section>

        {/* 댓글 영역 */}
        <section className="mx-auto w-[640px] pt-[36px]">
          <h2 className="mb-[16px] text-[16px] font-semibold text-[#2B2B2B]">
            댓글 <span>({mockComments.length})</span>
          </h2>

          {/* 댓글 입력 */}
          <div className="mb-[28px] flex gap-[16px]">
            <img
              src={profileImage}
              alt="profile"
              className="h-[40px] w-[40px] rounded-full object-cover"
            />

            <textarea
              placeholder="100자 이내로 입력해주세요."
              maxLength={100}
              className="h-[68px] flex-1 resize-none rounded-[8px] border border-[#D7E0EE] bg-white px-[16px] py-[14px] text-[14px] outline-none placeholder:text-[#ABB8CE]"
            />
          </div>

          {/*이미 달린 댓글*/}
          <div className="border-t border-[#D7E0EE]">
            {mockComments.map((comment)=>(
              <CommentItem
                key={comment.id}
                image={comment.image}
                name={comment.userName}
                time={comment.time}
                content={comment.content}
                isMine={comment.isMine}
              />
            ))}
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
