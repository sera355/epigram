import noticeIc from '@/assets/icons/notice.png';

type ConfirmModalProps = {
  title: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  pendingConfirmText?: string;
  isPending?: boolean;
  variant?: 'primary' | 'danger';
  onCancel: () => void;
  onConfirm: () => void;
};

const confirmButtonClassName = {
  primary: 'bg-(--color-blue-200)',
  danger: 'bg-(--color-blue-900)',
};

export default function ConfirmModal({
  title,
  description,
  cancelText = '취소',
  confirmText = '삭제하기',
  pendingConfirmText,
  isPending = false,
  variant = 'primary',
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  const titleId = 'confirm-modal-title';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-[20px]">
      <button
        type="button"
        aria-label="확인 모달 닫기"
        onClick={onCancel}
        disabled={isPending}
        className="absolute inset-0 cursor-default bg-black/70 disabled:cursor-not-allowed"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex w-full max-w-[452px] flex-col items-center justify-center rounded-[24px] bg-white px-[38px] py-[40px] text-center shadow-xl"
      >
        <img
          src={noticeIc}
          alt=""
          aria-hidden="true"
          className="mb-[32px] h-[56px] w-[56px]"
        />

        <h2
          id={titleId}
          className="text-[24px] font-semibold leading-[32px] text-(--color-black-700)"
        >
          {title}
        </h2>

        {description && (
          <p className="mt-[10px] text-[18px] leading-[26px] text-[#8B95A1]">
            {description}
          </p>
        )}

        <div className="mt-[40px] flex w-full gap-[16px]">
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="h-[60px] flex-1 rounded-[12px] bg-[#EEF1F6] text-[20px] font-semibold text-(--color-gray-300) disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isPending}
            className={`h-[60px] flex-1 rounded-[12px] text-[20px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 ${confirmButtonClassName[variant]}`}
          >
            {isPending && pendingConfirmText ? pendingConfirmText : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
