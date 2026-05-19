import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getEpigrams, type Epigram } from '@/apis/epigram';
import plus_blue from '@/assets/icons/plus-blue.svg';
import plus_white from '@/assets/icons/plus-white.svg';
import EpigramCard from '@/components/EpigramCard';
import Header from '@/components/Header/Header';

export default function MainPage() {
  const [epigrams, setEpigrams] = useState<Epigram[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadInitialEpigrams = async () => {
      try {
        const data = await getEpigrams(null, 6);

        setEpigrams(data.list);
        setCursor(data.nextCursor);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('에피그램을 불러오지 못했습니다.');
        }
      }
    };

    loadInitialEpigrams();
  }, []);

  const handleLoadMore = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const data = await getEpigrams(cursor, 6);

      setEpigrams((prev) => [...prev, ...data.list]);
      setCursor(data.nextCursor);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('에피그램을 불러오지 못했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-(--color-background) px-[120px] pt-[120px]">
        <section className="mx-auto w-full max-w-[986px] pb-[114px]">
          <h1 className="mb-[32px] text-[24px] font-semibold text-[#2B2B2B]">
            피드
          </h1>

          {errorMessage && (
            <p className="mb-[24px] text-[16px] text-red-500">
              {errorMessage}
            </p>
          )}

          <div className="grid grid-cols-2 gap-x-[30px] gap-y-[40px]">
            {epigrams.map((epigram) => (
              <EpigramCard
                key={epigram.id}
                id={epigram.id}
                content={epigram.content}
                author={epigram.author}
                tags={epigram.tags}
              />
            ))}
          </div>

          {cursor !== null && (
            <div className="mt-[64px] flex justify-center">
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={isLoading}
                className="font-['Pretendard'] flex h-[56px] cursor-pointer items-center justify-center 
                gap-[8px] rounded-full border border-[#CFDBEA] px-[40px] 
                text-[20px] font-medium text-(--color-blue-500) disabled:cursor-not-allowed disabled:opacity-50"
              >
                <img src={plus_blue} className="w-[24px]" alt="" />
                {isLoading ? '불러오는 중...' : '에피그램 더보기'}
              </button>
            </div>
          )}
        </section>

        <Link
          to="/addepigram"
          className="font-['Pretendard'] fixed right-[80px] bottom-[60px] flex 
          cursor-pointer items-center justify-center gap-[8px] rounded-full bg-[#263346] 
          px-[20px] py-[16px] text-[20px] font-normal text-white shadow-md"
        >
          <img src={plus_white} alt="" />
          에피그램 만들기
        </Link>
      </main>
    </>
  );
}
