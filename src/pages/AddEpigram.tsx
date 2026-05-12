 import Header from '@/components/Header/Header';
// import {useNavigate} from 'react-router-dom';
// import {useState} from 'react';

export default function AddEpigram() {
  
  //const navigate = useNavigate();

  // const [content, setContent] = useState('');
  // const [author, setAuthor] = useState('');
  // const [tags, setTags] = useState<string[]>([]);

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const savedEpigrams = localStorage.getItem('epigams');
  //   const epigrams = savedEpigrams ? JSON.parse(savedEpigrams) : [];

  //   const newEpigram = {
  //     id: Date.now(),
  //     content,
  //     author,
  //     tags,
  //   };
    
  //   {/*새로 작성한 에피그램을 맨 앞에 추가하는 코드 */}
  //   const nextEpigrams = [newEpigram, ...epigrams];

  //   localStorage.setItem('epigrams', JSON.stringify(nextEpigrams));

  //   navigate('/feed');
  // };

  

  return (
    <>
      <Header />

      <main className="flex justify-center bg-white pt-[80px] pt-[136px]">
        <form className="w-[640px] mb-[52px]">
          <h1 className="mb-[40px] text-[24px] font-semibold text-(--color-black-600)">
            에피그램 만들기
          </h1>

          <section className="mb-[54px]">
            <label className="mb-[27px] block text-[20px] font-semibold text-(--color-black-600)">
              내용 <span className="text-(--color-state) text-[20px] leading-[32px]">*</span>
            </label>

            <textarea
              placeholder="500자 이내로 입력해주세요."
              maxLength={500}
              className="h-[150px] w-full resize-none rounded-[8px] border border-[#D6DCE5] px-[16px] py-[18px] text-[16px] text-(--color-black-950) outline-none placeholder-(--color-blue-400) focus:border-[#2D6CDF]"
            />
          </section>

          <section className="mb-[54px]">
            <label className="mb-[20px] block text-[20px] font-semibold text-[#2B2B2B]">
              저자 <span className="text-(--color-state) text-[24px]">*</span>
            </label>

            <div className="mb-[16px] flex items-center gap-[24px]">
              <label className="flex cursor-pointer items-center gap-[8px] text-[20px] font-medium
               text-(--color-black-600)">
                <input
                  type="radio"
                  name="authorType"
                  defaultChecked
                  className="h-[24px] w-[24px] accent-[#2D6CDF]"
                />
                직접 입력
              </label>

              <label className="flex cursor-pointer items-center gap-[8px] text-[20px] font-medium 
              text-(--color-black-600)">
                <input
                  type="radio"
                  name="authorType"
                  className="h-[24px] w-[24px] accent-[#2D6CDF]"
                />
                알 수 없음
              </label>

              <label className="flex cursor-pointer items-center gap-[8px] text-[20px] font-medium
               text-(--color-black-600)">
                <input
                  type="radio"
                  name="authorType"
                  className="h-[24px] w-[24px] accent-[#2D6CDF]"
                />
                본인
              </label>
            </div>

            <input
              type="text"
              placeholder="저자 이름 입력"
              className="h-[64px] w-full rounded-[8px] border border-(--color-blue-300) px-[16px] text-[16px] 
              text-(--color-black-950) outline-none placeholder:text-(--color-blue-400) focus:border-[#2D6CDF]"
            />
          </section>

          <section className="mb-[54px]">
            <label className="mb-[16px] block text-[20px] font-semibold text-(--color-black-950)">
              출처
            </label>

            <div className="flex flex-col gap-[16px]">
              <input
                type="text"
                placeholder="출처 제목 입력"
                className="h-[64px] w-full rounded-[8px] border border-(--color-blue-300) px-[16px] text-[16px] text-(--color-black-950) outline-none placeholder:text-(--color-blue-400) focus:border-[#2D6CDF]"
              />

              <input
                type="url"
                placeholder="URL (ex. https://www.website.com)"
                className="h-[64px] w-full rounded-[8px] border border-(--color-blue-300) px-[16px] text-[16px] text-(--color-black-950) outline-none placeholder:text-(--color-blue-400) focus:border-[#2D6CDF]"
              />
            </div>
          </section>

          <section className="mb-[40px]">
            <label className="mb-[16px] block text-[18px] font-semibold text-(--color-black-600)">
              태그
            </label>

            <input
              type="text"
              placeholder="입력하여 태그 작성 (최대 10자)"
              className="h-[64px] w-full rounded-[8px] border border-(--color-blue-300) px-[16px] text-[16px] 
              text-(--color-black-950) outline-none placeholder:text-(--color-blue-400) focus:border-[#2D6CDF]"
            />
          </section>

          <button
            type="submit"
            className="h-[64px] w-full rounded-[8px] bg-(--color-blue-300) text-[20px] font-semibold text-white"
          >
            작성 완료
          </button>
        </form>
      </main>
    </>
  );
}