import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header/Header';
import { createEpigram } from '@/apis/epigram';

type AuthorType = 'direct' | 'unknown' | 'me';

export default function AddEpigram() {
  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [authorType, setAuthorType] = useState<AuthorType>('direct');
  const [author, setAuthor] = useState('');
  const [referenceTitle, setReferenceTitle] = useState('');
  const [referenceUrl, setReferenceUrl] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagError, setTagError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isContentOverLimit = content.length > 500;

  const getFinalAuthor = () => {
    if (authorType === 'unknown') return '알 수 없음';

    if (authorType === 'me') {
      const savedUser = localStorage.getItem('user');
      const parsedUser = savedUser ? JSON.parse(savedUser) : null;

      return parsedUser?.nickname || '본인';
    }

    return author.trim();
  };

  const finalAuthor = getFinalAuthor();

  const isFormValid =
    content.trim().length > 0 &&
    !isContentOverLimit &&
    finalAuthor.trim().length > 0 &&
    tags.length <= 3 &&
    tags.every((tag) => tag.length <= 10) &&
    !tagError;

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();

    if (!trimmedTag) return;

    if (trimmedTag.length > 10) {
      setTagError('태그는 10자 이내로 입력해 주세요.');
      return;
    }

    if (tags.length >= 3) {
      setTagError('태그는 최대 3개까지 추가할 수 있습니다.');
      return;
    }

    if (tags.includes(trimmedTag)) {
      setTagError('이미 추가한 태그입니다.');
      return;
    }

    setTags([...tags, trimmedTag]);
    setTagInput('');
    setTagError('');
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (targetTag: string) => {
    setTags(tags.filter((tag) => tag !== targetTag));
    setTagError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      setIsSubmitting(true);

      const newEpigram = await createEpigram({
        content: content.trim(),
        author: finalAuthor,
        referenceTitle: referenceTitle.trim() || undefined,
        referenceUrl: referenceUrl.trim() || undefined,
        tags,
      });

      navigate(`/epigrams/${newEpigram.id}`);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('에피그램 작성에 실패했습니다.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <main className="flex justify-center bg-white pt-[136px]">
        <form onSubmit={handleSubmit} className="mb-[52px] w-[640px]">
          <h1 className="mb-[40px] text-[24px] font-semibold text-(--color-black-600)">
            에피그램 만들기
          </h1>

          {/* 내용 */}
          <section className="mb-[54px]">
            <label className="mb-[27px] block text-[20px] font-semibold text-(--color-black-600)">
              내용{' '}
              <span className="text-[20px] leading-[32px] text-(--color-state)">
                *
              </span>
            </label>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="500자 이내로 입력해주세요."
              className={`h-[150px] w-full resize-none rounded-[8px] border px-[16px] py-[18px] text-[16px] text-(--color-black-950) outline-none placeholder:text-(--color-blue-400) focus:border-[#2D6CDF] ${
                isContentOverLimit
                  ? 'border-(--color-state)'
                  : 'border-[#D6DCE5]'
              }`}
            />

            <div className="mt-[8px] flex justify-between text-[14px]">
              <p className="text-(--color-state)">
                {isContentOverLimit
                  ? '내용은 500자 이내로 입력해 주세요.'
                  : ''}
              </p>

              <p
                className={
                  isContentOverLimit
                    ? 'text-(--color-state)'
                    : 'text-(--color-gray-300)'
                }
              >
                {content.length}/500
              </p>
            </div>
          </section>

          {/* 저자 */}
          <section className="mb-[54px]">
            <label className="mb-[20px] block text-[20px] font-semibold text-[#2B2B2B]">
              저자{' '}
              <span className="text-[24px] text-(--color-state)">*</span>
            </label>

            <div className="mb-[16px] flex items-center gap-[24px]">
              <label className="flex cursor-pointer items-center gap-[8px] text-[20px] font-medium text-(--color-black-600)">
                <input
                  type="radio"
                  name="authorType"
                  checked={authorType === 'direct'}
                  onChange={() => setAuthorType('direct')}
                  className="h-[24px] w-[24px] accent-[#2D6CDF]"
                />
                직접 입력
              </label>

              <label className="flex cursor-pointer items-center gap-[8px] text-[20px] font-medium text-(--color-black-600)">
                <input
                  type="radio"
                  name="authorType"
                  checked={authorType === 'unknown'}
                  onChange={() => setAuthorType('unknown')}
                  className="h-[24px] w-[24px] accent-[#2D6CDF]"
                />
                알 수 없음
              </label>

              <label className="flex cursor-pointer items-center gap-[8px] text-[20px] font-medium text-(--color-black-600)">
                <input
                  type="radio"
                  name="authorType"
                  checked={authorType === 'me'}
                  onChange={() => setAuthorType('me')}
                  className="h-[24px] w-[24px] accent-[#2D6CDF]"
                />
                본인
              </label>
            </div>

            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              disabled={authorType !== 'direct'}
              placeholder={
                authorType === 'direct'
                  ? '저자 이름 입력'
                  : authorType === 'unknown'
                    ? '알 수 없음'
                    : '본인'
              }
              className="h-[64px] w-full rounded-[8px] border border-(--color-blue-300) px-[16px] text-[16px] text-(--color-black-950) outline-none placeholder:text-(--color-blue-400) focus:border-[#2D6CDF] disabled:bg-gray-100"
            />
          </section>

          {/* 출처 */}
          <section className="mb-[54px]">
            <label className="mb-[16px] block text-[20px] font-semibold text-(--color-black-950)">
              출처
            </label>

            <div className="flex flex-col gap-[16px]">
              <input
                type="text"
                value={referenceTitle}
                onChange={(e) => setReferenceTitle(e.target.value)}
                placeholder="출처 제목 입력"
                className="h-[64px] w-full rounded-[8px] border border-(--color-blue-300) px-[16px] text-[16px] text-(--color-black-950) outline-none placeholder:text-(--color-blue-400) focus:border-[#2D6CDF]"
              />

              <input
                type="url"
                value={referenceUrl}
                onChange={(e) => setReferenceUrl(e.target.value)}
                placeholder="URL (ex. https://www.website.com)"
                className="h-[64px] w-full rounded-[8px] border border-(--color-blue-300) px-[16px] text-[16px] text-(--color-black-950) outline-none placeholder:text-(--color-blue-400) focus:border-[#2D6CDF]"
              />
            </div>
          </section>

          {/* 태그 */}
          <section className="mb-[40px]">
            <label className="mb-[16px] block text-[18px] font-semibold text-(--color-black-600)">
              태그
            </label>

            <div className="flex gap-[8px]">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => {
                  setTagInput(e.target.value);

                  if (e.target.value.length > 10) {
                    setTagError('태그는 10자 이내로 입력해 주세요.');
                  } else {
                    setTagError('');
                  }
                }}
                onKeyDown={handleTagKeyDown}
                placeholder="입력하여 태그 작성 (최대 10자)"
                className={`h-[64px] flex-1 rounded-[8px] border px-[16px] text-[16px] text-(--color-black-950) outline-none placeholder:text-(--color-blue-400) focus:border-[#2D6CDF] ${
                  tagError
                    ? 'border-(--color-state)'
                    : 'border-(--color-blue-300)'
                }`}
              />

              <button
                type="button"
                onClick={handleAddTag}
                disabled={!tagInput.trim() || tags.length >= 3}
                className="h-[64px] rounded-[8px] bg-(--color-blue-300) px-[20px] text-[16px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                추가
              </button>
            </div>

            {tagError && (
              <p className="mt-[8px] text-[14px] text-(--color-state)">
                {tagError}
              </p>
            )}

            <div className="mt-[12px] flex flex-wrap gap-[8px]">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="rounded-full bg-(--color-blue-100) px-[12px] py-[6px] text-[14px] text-(--color-blue-500)"
                >
                  #{tag} ×
                </button>
              ))}
            </div>

            <p className="mt-[8px] text-[14px] text-(--color-gray-300)">
              {tags.length}/3
            </p>
          </section>

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`h-[64px] w-full rounded-[8px] text-[20px] font-semibold text-white ${
              isFormValid && !isSubmitting
                ? 'cursor-pointer bg-(--color-blue-300)'
                : 'cursor-not-allowed bg-(--color-blue-200) opacity-50'
            }`}
          >
            {isSubmitting ? '작성 중...' : '작성 완료'}
          </button>
        </form>
      </main>
    </>
  );
}