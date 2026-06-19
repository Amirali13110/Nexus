"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AuthThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-20 animate-pulse rounded-xl bg-gray-200 dark:bg-zinc-800" />
    );
  }

  const isDark = theme === "dark";

  return (
    <div className="relative flex h-9 w-20 items-center rounded-xl border border-gray-200 bg-gray-100 p-1 dark:border-gray-800 dark:bg-[#131313]">
      <div
        className={`absolute bottom-1 top-1 w-[34px] rounded-lg transition-all duration-200 ease-out
          ${isDark ? "left-[42px] bg-[#0066ff]" : "left-1 bg-white shadow-sm"}`}
      />

      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`relative z-10 flex h-full w-1/2 items-center justify-center transition-colors duration-200
          ${isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-900"}`}
        aria-label="Switch to light theme"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`relative z-10 flex h-full w-1/2 items-center justify-center transition-colors duration-200
          ${isDark ? "text-white" : "text-gray-400 hover:text-gray-700"}`}
        aria-label="Switch to dark theme"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </button>
    </div>
  );
}
