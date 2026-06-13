// components/ui/FormCard.tsx
import { ReactNode } from "react";

interface FormCardProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function FormCard({ children, title, subtitle }: FormCardProps) {
  return (
    <div className="relative rounded-xl border border-gray-200 dark:border-[#424656] bg-white dark:bg-[#1c1b1b] p-6 shadow-2xl md:p-8">
      <div className="absolute left-0 top-0 h-12 w-1 bg-[#0066ff]"></div>
      <div className="mb-6">
        <h1 className="mb-1 text-4xl font-bold tracking-tight text-gray-900 dark:text-[#e5e2e1] md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base text-gray-500 dark:text-[#c2c6d8]">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
