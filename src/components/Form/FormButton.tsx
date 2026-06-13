import { ButtonHTMLAttributes, ReactNode } from "react";

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
}

export default function FormButton({
  children,
  loading,
  disabled,
  ...props
}: FormButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0066ff] py-3 text-sm font-semibold uppercase tracking-wider text-white dark:text-[#f8f7ff] transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
    >
      {loading ? "Loading..." : children}
      <span className="text-sm">→</span>
    </button>
  );
}
