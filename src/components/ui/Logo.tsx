export default function Logo() {
  return  <svg
      width="40"
      height="40"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="blueGradient" x1="20" y1="20" x2="80" y2="80">
          <stop offset="0%" stopColor="#0066ff" />
          <stop offset="100%" stopColor="##0066ff" />
        </linearGradient>
      </defs>

      <path
        d="M25 75V25"
        stroke="#3887ff"
        strokeWidth="18"
        strokeLinecap="round"
      />

      <path
        d="M75 75V25"
        stroke="#3887ff"
        strokeWidth="18"
        strokeLinecap="round"
      />

      {/* Diagonal */}
      <path
        d="M25 25L75 75"
        stroke="url(#blueGradient)"
        strokeWidth="18"
        strokeLinecap="round"
      />
    </svg>;
}
