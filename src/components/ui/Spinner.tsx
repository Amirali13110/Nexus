"use client";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "white";
  fullscreen?: boolean;
}

export default function Spinner({ 
  size = "md", 
  color = "primary", 
  fullscreen = false 
}: SpinnerProps) {
  
  // Increased stroke values relative to the 50x50 SVG viewbox for a bolder look
  const sizeClasses = {
    sm: "w-5 h-5 stroke-[5.2px]",
    md: "w-8 h-8 stroke-[5px]",
    lg: "w-12 h-12 stroke-[4.5px]",
    xl: "w-16 h-16 stroke-[3.5px]",
  };

  const colorClasses = {
    primary: "text-[#0066ff]",
    white: "text-white",
  };

  const spinnerContent = (
    <div className="relative flex items-center justify-center shrink-0">
      <svg
        className={`animate-spin ${colorClasses[color]} ${sizeClasses[size]}`}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          animationDuration: "0.85s",
          animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Track Ring (Lowered opacity slightly so the thicker background isn't distracting) */}
        <circle
          className="opacity-[0.12]"
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
        />
        {/* Thicker Animated Progress Arc */}
        <circle
          className="opacity-100"
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeLinecap="round"
          strokeDasharray="125"
          strokeDashoffset="50"
        />
      </svg>
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-[#0a0a0a]/60 backdrop-blur-md">
        <div className="flex flex-col items-center gap-3">
          {spinnerContent}
          <span className="text-xs font-semibold tracking-wider font-mono text-zinc-400 dark:text-zinc-500 uppercase animate-pulse">
            Loading Nexus
          </span>
        </div>
      </div>
    );
  }

  return spinnerContent;
}