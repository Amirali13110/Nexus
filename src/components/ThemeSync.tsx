"use client";

import Script from "next/script";

export default function ThemeSync() {
  return (
    <Script
      id="theme-script"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              const stored = localStorage.getItem("nexus-theme");
        
              const theme = stored === "dark" ? "dark" : "dark";
              if (theme === "dark") {
                document.documentElement.classList.add("dark");
              } else {
                document.documentElement.classList.remove("dark");
              }
            } catch (e) {}
          })();
        `,
      }}
    />
  );
}
