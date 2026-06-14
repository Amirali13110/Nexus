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
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-300 focus:outline-none"
      style={{ backgroundColor: isDark ? "#0066ff" : "#cbd5e1" }}
      aria-label="Toggle theme"
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
          isDark ? "translate-x-6" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
