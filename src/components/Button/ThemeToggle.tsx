"use client";
import { useState, useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full focus:outline-none"
        aria-label="Toggle theme"
        style={{ opacity: 0, pointerEvents: "none" }}
      >
        <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 translate-x-0.5" />
      </button>
    );
  }

  return (
    // <button
    //   onClick={toggleTheme}
    //   className="relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-300 focus:outline-none"
    //   style={{ backgroundColor: isDark ? "#0066ff" : "#cbd5e1" }}
    //   aria-label="Toggle theme"
    // >
    //   <span
    //     className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
    //       isDark ? "translate-x-6" : "translate-x-0.5"
    //     }`}
    //   />
    // </button>
    <div className="flex items-center gap-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-2 py-1">
      {/* Sun icon */}
      <span className="flex h-4 w-4 items-center justify-center text-gray-500 dark:text-gray-400">
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 1V3M10 17V19M3 10H1M19 10H17M4.22 4.22L5.64 5.64M14.36 14.36L15.78 15.78M15.78 4.22L14.36 5.64M5.64 14.36L4.22 15.78M10 7C11.6569 7 13 8.34315 13 10C13 11.6569 11.6569 13 10 13C8.34315 13 7 11.6569 7 10C7 8.34315 8.34315 7 10 7Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>

      {/* Slider button */}
      <button
        onClick={toggleTheme}
        className="relative flex h-5 w-10 cursor-pointer items-center rounded-full bg-[#0066ff] transition-colors duration-300 focus:outline-none"
        aria-label="Toggle theme"
      >
        <div
          className={`absolute flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 ${
            isDark ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>

      {/* Moon icon */}
      <span className="flex h-4 w-4 items-center justify-center text-[#0066ff]">
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5 10.5C17.5 13.5 15 16.5 11.5 16.5C8.5 16.5 5.5 14 5 10.5C4.5 7 7 4 10 3.5C9.5 5 10 8.5 12.5 11C15 13.5 17 11.5 17.5 10.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}
