/**
 * The ridgeline — Coorg's layered hills abstracted to three overlapping gold
 * hairlines. Used in place of a generic wave divider between sections.
 */
export default function RidgeDivider({ flip = false, tone = 'gold', className = '' }) {
  const stroke = tone === 'light' ? 'rgba(228, 211, 168, 0.5)' : 'var(--color-gold)'

  return (
    <div
      className={`pointer-events-none w-full overflow-hidden ${flip ? 'rotate-180' : ''} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="h-[52px] w-full sm:h-[70px]"
        fill="none"
      >
        <path
          d="M0 78 L180 40 L300 62 L470 18 L640 58 L820 26 L980 66 L1150 34 L1290 60 L1440 30"
          stroke={stroke}
          strokeWidth="1"
          strokeOpacity="0.85"
        />
        <path
          d="M0 88 L150 58 L340 80 L520 44 L700 76 L880 50 L1060 82 L1240 56 L1440 74"
          stroke={stroke}
          strokeWidth="1"
          strokeOpacity="0.45"
        />
        <path
          d="M0 62 L220 30 L400 52 L560 12 L760 44 L940 16 L1120 48 L1320 22 L1440 46"
          stroke={stroke}
          strokeWidth="1"
          strokeOpacity="0.22"
        />
      </svg>
    </div>
  )
}
