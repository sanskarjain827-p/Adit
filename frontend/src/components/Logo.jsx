// Insyd wordmark — the "inn" mark: a dotted-i, an ink arch, and a blue arch.
// The ink parts use currentColor so the mark inverts by context: white on the
// dark header, dark on the light preloader panels. The dot + second arch stay
// brand blue in both. Sized via CSS (.logo-mark height).
export default function Logo({ className = '' }) {
  const blue = { fill: 'var(--blue)' }
  const blueStroke = { stroke: 'var(--blue)' }
  return (
    <svg
      className={`logo-mark ${className}`}
      viewBox="0 0 95 48"
      fill="none"
      role="img"
      aria-label="Insyd"
    >
      {/* i — dot + stem */}
      <circle cx="9" cy="8" r="6.5" style={blue} />
      <line x1="9" y1="20" x2="9" y2="40" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
      {/* first arch (ink) */}
      <path
        d="M28 40 V27 Q28 16 39 16 Q50 16 50 27 V40"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* second arch (blue) */}
      <path
        d="M64 40 V27 Q64 16 75 16 Q86 16 86 27 V40"
        style={blueStroke}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
