type NoticeModalProps = {
  title: string;
  confirmText?: string;
  onConfirm: () => void;
};

export default function NoticeModal({
  title,
  confirmText = '확인',
  onConfirm,
}: NoticeModalProps) {
  const titleId = 'notice-modal-title';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-[20px]">
      <div className="absolute inset-0 bg-black/70" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-[364px] rounded-[24px] bg-white px-[38px] py-[32px] text-center shadow-xl"
      >
        <h2
          id={titleId}
          className="text-[24px] font-semibold leading-[40px] text-(--color-black-700)"
        >
          {title}
        </h2>

        <div className="mt-[48px] flex">
          <button
            type="button"
            onClick={onConfirm}
            className="w-[286px] h-[64px] flex-1 rounded-[12px] bg-(--color-blue-900) text-[24px] font-semibold text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
