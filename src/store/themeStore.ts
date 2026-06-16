import { create } from "zustand";

interface ThemeState {
  theme: "dark" | "light";
  toggleTheme: () => void;
  setTheme: (theme: "dark" | "light") => void;
}

export const useThemeStore = create<ThemeState>((set) => {
  const initialTheme =
    typeof window !== "undefined"
      ? (localStorage.getItem("nexus-theme") as "dark" | "light") || "dark"
      : "dark";

  if (typeof window !== "undefined") {
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return {
    theme: initialTheme,

    toggleTheme: () =>
      set((state) => {
        const nextTheme = state.theme === "dark" ? "light" : "dark";
        localStorage.setItem("nexus-theme", nextTheme);
        if (typeof window !== "undefined") {
          if (nextTheme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        }
        return { theme: nextTheme };
      }),
    setTheme: (theme) => {
      localStorage.setItem("nexus-theme", theme);
      if (typeof window !== "undefined") {
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
      set({ theme });
    },
  };
});
