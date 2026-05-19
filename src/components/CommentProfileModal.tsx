import closeIcon from '@/assets/icons/X.png';

type CommentProfileModalProps = {
  image: string;
  name: string;
  content: string;
  onClose: () => void;
};

export default function CommentProfileModal({
  image,
  name,
  onClose,
}: CommentProfileModalProps) {
  const titleId = 'comment-profile-modal-title';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-[20px]">
      
      {/* 배경 */}
      <button
        type="button"
        aria-label="댓글 프로필 모달 닫기"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/70"
      />

      {/* 모달 박스 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 h-[188px] w-full max-w-[360px] rounded-[24px] bg-(--color-background) text-center shadow-xl"
      >

        {/* 닫기 버튼 */}
        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className="absolute right-[24px] top-[24px] h-[20px] w-[20px] cursor-pointer"
        >
          <img
            src={closeIcon}
            alt=""
            aria-hidden="true"
            className="h-full w-full"
          />
        </button>

        {/* 프로필 영역 */}
        <div className="pt-[52px]">
          <img
            src={image}
            alt={`${name} 프로필`}
            className="mx-auto h-[48px] w-[48px] rounded-full border border-[#CBD5E1] object-cover"
          />

          <h2
            id={titleId}
            className="mt-[24px] text-[20px] font-semibold leading-[32px] text-[#555555]"
          >
            {name}
          </h2>
        </div>
      </div>
    </div>
  );
}