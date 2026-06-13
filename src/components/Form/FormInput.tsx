import { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function FormInput({
  label,
  error,
  className,
  ...props
}: FormInputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-[#c2c6d8]">
          {label}
        </label>
      )}
      <input
        className={`w-full rounded-xl border border-gray-300 dark:border-[#424656] bg-gray-50 dark:bg-[#2a2a2a] px-4 py-2 text-sm text-gray-900 dark:text-[#e5e2e1] placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-[#0066ff] focus:outline-none focus:ring-0 ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
