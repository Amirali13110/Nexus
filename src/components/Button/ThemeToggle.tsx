"use client";
import { useThemeStore } from "@/store/themeStore";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "dark";

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
