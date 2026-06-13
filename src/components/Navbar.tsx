"use client";
import Link from "next/link";
import ThemeToggle from "./Button/ThemeToggle";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity active:opacity-80"
        >
          <div className="h-8 w-8">
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
          <span className="text-2xl font-bold tracking-tighter text-[#0066ff]">
            NEXUS
          </span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}