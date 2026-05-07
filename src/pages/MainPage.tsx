import EpigramCard from "@/components/EpigramCard";
import Header from '@/components/Header/Header';
import plus_blue from '@/assets/icons/plus-blue.svg';
import plus_white from '@/assets/icons/plus-white.svg';

const mockEpigrams = [
  {id: 1,
    content: '아무거나',
    tags: ['나아가야 할때', '꿈을 이루고 싶을 때'],
    author: '안나',
  },
  {id: 2,
    content: '러ㅓㄹ러러',
    tags: ['메롱', '꿈을 이루고 싶을 때'],
    author: '수정',
  },
  {id: 3,
    content: 'ㅋㅋㅋ',
    tags: ['ㄹㅇㄹㅇㅇ', '꿈을 이루고 싶을 때'],
    author: 'lina',
  },
  {id: 3,
    content: 'ㅋㅋㅋ',
    tags: ['ㄹㅇㄹㅇㅇ', '꿈을 이루고 싶을 때'],
    author: 'lina',
  },
  {id: 3,
    content: 'ㅋㅋㅋ',
    tags: ['ㄹㅇㄹㅇㅇ', '꿈을 이루고 싶을 때'],
    author: 'lina',
  },
  {id: 3,
    content: 'ㅋㅋㅋ',
    tags: ['ㄹㅇㄹㅇㅇ', '꿈을 이루고 싶을 때'],
    author: 'lina',
  },
  {id: 3,
    content: 'ㅋㅋㅋ',
    tags: ['ㄹㅇㄹㅇㅇ', '꿈을 이루고 싶을 때'],
    author: 'lina',
  },
];

export default function MainPage(){
  return(
    <>
      <Header />

      <main className="min-h-screen bg-(--color-background) px-[120px] pt-[120px]">

        {/*카드부분*/}
        <section className="mx-auto w-[986px]">
          <h1 className="mb-[32px] text-[24px] font-semibold text-[#2B2B2B]">
            피드
          </h1>

          <div className="grid grid-cols-2 gap-x-[30px] gap-y-[40px]">
            {mockEpigrams.map((epigram) => (
              <EpigramCard
                key={epigram.id}
                id={epigram.id}
                content={epigram.content}
                author={epigram.author}
                tags={epigram.tags}
              />
              ))}
          </div>

          {/* 더보기 버튼 */}
          <div className="mt-[64px] flex justify-center">
            <button className="font-['Pretendard'] flex h-[56px] items-center justify-center 
            gap-[8px] rounded-full border border-[#CFDBEA] bg-white px-[40px] 
            text-[20px] font-medium text-(--color-blue-500)">
              <img src={plus_blue}  className="w-[24px]" />
              에피그램 더보기
            </button>
          </div>

        </section>

         {/* 만들기 버튼 */}
        <button className="w-[210px] h-[32px] font-['Pretendard'] fixed right-[80px] bottom-[60px] flex h-[56px] items-center justify-center gap-[8px] rounded-full bg-[#263346] 
        px-[20px] text-[20px] font-normal text-white shadow-md">
          <img src={plus_white}/>
          에피그램 만들기
        </button>
      </main>
    </>
    
  );
}