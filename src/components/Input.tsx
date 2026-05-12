import type { ChangeEvent, FocusEvent } from 'react';

type InputProps = {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function Input({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  error,
  onChange,
  onBlur,
  className = '',
}: InputProps) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="mb-[16px] block text-[16px] font-semibold text-(--color-blue-900)"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`h-[52px] w-full rounded-[12px] bg-(--color-blue-200) px-[16px] text-[16px] text-(--color-blue-900) outline-none placeholder:text-(--color-blue-400) ${
          error ? 'border border-(--color-state)' : ''
        }`}
      />

      {error && (
        <p className="mt-[8px] text-right text-[14px] font-medium text-(--color-state)">
          {error}
        </p>
      )}
    </div>
  );
}