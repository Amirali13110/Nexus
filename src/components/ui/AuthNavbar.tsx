"use client";
import Link from "next/link";
import AuthThemeToggle from "../Button/AuthThemeToggle";

export default function AuthNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 sm:px-4 md:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-1">
          <div className="h-7 w-7 sm:h-8 sm:w-8">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0066ff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 3V9" />
              <path d="M12 15V21" />
              <path d="M20 7.5L14.5 10.5" />
              <path d="M9.5 13.5L4 16.5" />
              <path d="M20 16.5L14.5 13.5" />
              <path d="M9.5 10.5L4 7.5" />
            </svg>
          </div>
          <span className="hidden text-lg font-bold tracking-tighter text-[#0066ff] sm:inline sm:text-2xl">
            NEXUS
          </span>
        </Link>
        <AuthThemeToggle />
      </div>
    </header>
  );
}
