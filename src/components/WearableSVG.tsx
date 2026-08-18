export default function WearableSVG({
  seed = 'hero',
  className = '',
}: {
  seed?: string
  className?: string
}) {
  const g = (id: string) => `${seed}-${id}`
  return (
    <svg viewBox="0 0 420 360" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={g('pod')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2b5c49" />
          <stop offset="100%" stopColor="#122b21" />
        </linearGradient>
        <linearGradient id={g('screen')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16382c" />
          <stop offset="100%" stopColor="#1e4a3a" />
        </linearGradient>
        <linearGradient id={g('band')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8d6b34" />
          <stop offset="50%" stopColor="#c99a52" />
          <stop offset="100%" stopColor="#8d6b34" />
        </linearGradient>
        <linearGradient id={g('soft')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#597c6b" />
          <stop offset="100%" stopColor="#16382c" />
        </linearGradient>
        <filter id={g('shadow')} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#0b1410" floodOpacity="0.35" />
        </filter>
        <filter id={g('glow')} x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* orbit rings */}
      <g transform="translate(210 178)">
        <circle r="150" fill="none" stroke="#9cd9bc" strokeOpacity="0.25" strokeWidth="1.6" strokeDasharray="4 8" />
        <circle r="112" fill="none" stroke="#9cd9bc" strokeOpacity="0.18" strokeWidth="1.2" />
        <circle r="112" fill="none" stroke="#9cd9bc" strokeOpacity="0.1" strokeWidth="1.2" className="ring-sweep" />
      </g>

      {/* wearer limb silhouette hint */}
      <ellipse cx="210" cy="330" rx="120" ry="26" fill="#16382c" opacity="0.5" />

      {/* strap */}
      <path
        d="M60 168 C 60 108, 360 108, 360 168 C 360 228, 60 228, 60 168 Z"
        fill={`url(#${g('band')})`}
        stroke="#6f5430"
        strokeWidth="3"
      />
      {/* strap weave lines */}
      <path d="M60 168c150 18 150 40 300 0" fill="none" stroke="#7a5c33" strokeWidth="1.5" opacity="0.7" />
      <path d="M60 168c150-18 150-40 300 0" fill="none" stroke="#e6c98e" strokeWidth="1" opacity="0.35" />

      {/* device pod */}
      <g filter={`url(#${g('shadow')})`}>
        <rect x="118" y="76" width="184" height="184" rx="44" fill={`url(#${g('pod')})`} />
        <rect x="124" y="82" width="172" height="172" rx="40" fill="none" stroke="#9cd9bc" strokeOpacity="0.35" strokeWidth="1.4" />
      </g>

      {/* top accents / screws */}
      <circle cx="140" cy="98" r="5" fill="#0b1410" opacity="0.5" />
      <circle cx="280" cy="98" r="5" fill="#0b1410" opacity="0.5" />
      <circle cx="140" cy="238" r="5" fill="#0b1410" opacity="0.5" />
      <circle cx="280" cy="238" r="5" fill="#0b1410" opacity="0.5" />

      {/* OLED-ish screen */}
      <rect x="152" y="104" width="116" height="80" rx="12" fill={`url(#${g('screen')})`} />
      <path d="M162 158c14-12 26-12 40 2s30 6 40-6" fill="none" stroke="#9cd9bc" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M162 170c14-10 26-6 40 4s30-2 40-10" fill="none" stroke="#e0704f" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
      <circle cx="258" cy="114" r="4" fill="#e0704f" filter={`url(#${g('glow')})`} className="animate-pulse-dot" />

      {/* status LEDs */}
      <circle cx="162" cy="238" r="6" fill="#e0704f" filter={`url(#${g('glow')})`} />
      <circle cx="182" cy="238" r="6" fill="#9cd9bc" filter={`url(#${g('glow')})`} opacity="0.9" />
      <circle cx="252" cy="238" r="6" fill="#d9b45a" filter={`url(#${g('glow')})`} opacity="0.85" />

      {/* sensor pods hub */}
      <g>
        <rect x="196" y="196" width="28" height="78" rx="14" fill="#122b21" opacity="0.6" />
        <rect x="226" y="196" width="6" height="70" rx="3" fill="#122b21" opacity="0.6" />
        {/* IMU chip */}
        <rect x="200" y="236" width="20" height="20" rx="4" fill="#0b1410" />
        <path d="M206 246l3-5 3 4 3-6" fill="none" stroke="#9cd9bc" strokeWidth="1.4" />
        <rect x="200" y="202" width="20" height="12" rx="3" fill="#0b1410" />
      </g>

      {/* chip identifiers */}
      <text x="148" y="262" fill="#bfe9d4" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="2" opacity="0.9">MPU6050</text>
      <text x="148" y="276" fill="#bfe9d4" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="2" opacity="0.9">ESP32-S3</text>
    </svg>
  )
}