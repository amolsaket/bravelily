export const Sparkle = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M12 2 C 12.6 7.2, 14.2 9.8, 22 12 C 14.2 14.2, 12.6 16.8, 12 22 C 11.4 16.8, 9.8 14.2, 2 12 C 9.8 9.8, 11.4 7.2, 12 2 Z"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
  </svg>
);

export const CurlyArrow = ({ className = "" }) => (
  <svg viewBox="0 0 120 60" fill="none" className={className} aria-hidden>
    <path d="M6 10 C 34 44, 72 12, 100 40" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path
      d="M92 33 L 101 42 L 110 33"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
