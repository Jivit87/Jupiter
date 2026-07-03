/**
 * SacredSpiralBadge — pixel-perfect ornamental seal
 *
 * Outermost: dotted gold ring (84)
 * Ring 2:   thin solid (80)
 * Ring 3:   thin solid (76) with 32 tiny tick marks
 * Ring 4:   thin solid (70) — text-path baseline
 * Ring 5:   thin solid (56)
 * Ring 6:   thin solid (44) — 8 accent dots live here
 * 16 radial spokes from 38→70 (alternating long/short)
 * 8 accent dots on r=44
 * Petal dots on r=56 (16)
 * Inner concentric rings at 38, 34, 26, 22, 18, 14, 10
 * Center: spiral path + 2 eye dots + 1 center dot
 * Arched text: top "INSPIRED BY THE UNIVERSE", bottom "MADE BY HAND"
 */
type Props = {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
};

export function SacredSpiralBadge({ size = 130, className, style }: Props) {
  const cx = 100;
  const cy = 100;

  const spoke = (i: number, count: number, inner: number, outer: number, op: number, sw: number) => {
    const angle = (i * 360) / count - 90;
    const rad = (angle * Math.PI) / 180;
    return { x1: cx + inner * Math.cos(rad), y1: cy + inner * Math.sin(rad), x2: cx + outer * Math.cos(rad), y2: cy + outer * Math.sin(rad), op, sw };
  };

  return (
    <div
      className={className}
      style={{ width: size, height: size, position: 'relative', pointerEvents: 'none', ...style }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style={{ display: 'block' }}>
        <defs>
          <path id="badgeTopArc" d="M 30 100 A 70 70 0 0 1 170 100" fill="none" />
          <path id="badgeBottomArc" d="M 30 100 A 70 70 0 0 0 170 100" fill="none" />
        </defs>

        {/* Outer dotted ring */}
        <circle cx={cx} cy={cy} r="86" fill="none" stroke="rgb(var(--gold))" strokeOpacity="0.5" strokeWidth="0.5" strokeDasharray="1.2 5" />

        {/* Thin solid ring — outer edge of text track */}
        <circle cx={cx} cy={cy} r="80" fill="none" stroke="rgb(var(--gold))" strokeOpacity="0.4" strokeWidth="0.4" />

        {/* Ring with 32 tiny tick marks */}
        <circle cx={cx} cy={cy} r="76" fill="none" stroke="rgb(var(--gold))" strokeOpacity="0.3" strokeWidth="0.35" />
        {Array.from({ length: 32 }).map((_, i) => {
          const s = spoke(i, 32, 74, 78, 0.2, 0.25);
          return <line key={`tick-${i}`} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="rgb(var(--gold))" strokeOpacity={s.op} strokeWidth={s.sw} />;
        })}

        {/* Text-baseline ring */}
        <circle cx={cx} cy={cy} r="70" fill="none" stroke="rgb(var(--gold))" strokeOpacity="0.25" strokeWidth="0.3" />

        {/* Mid ring */}
        <circle cx={cx} cy={cy} r="56" fill="none" stroke="rgb(var(--gold))" strokeOpacity="0.28" strokeWidth="0.35" />

        {/* 16 petal dots on r=56 */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16 - 90;
          const rad = (angle * Math.PI) / 180;
          return <circle key={`petal-${i}`} cx={cx + 56 * Math.cos(rad)} cy={cy + 56 * Math.sin(rad)} r="0.9" fill="rgb(var(--gold))" fillOpacity="0.45" />;
        })}

        {/* Ring at r=48 */}
        <circle cx={cx} cy={cy} r="48" fill="none" stroke="rgb(var(--gold))" strokeOpacity="0.22" strokeWidth="0.3" />

        {/* Ring at r=44 */}
        <circle cx={cx} cy={cy} r="44" fill="none" stroke="rgb(var(--gold))" strokeOpacity="0.3" strokeWidth="0.35" />

        {/* 8 accent dots on r=44 */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8 - 90;
          const rad = (angle * Math.PI) / 180;
          return <circle key={`dot8-${i}`} cx={cx + 44 * Math.cos(rad)} cy={cy + 44 * Math.sin(rad)} r="1.6" fill="rgb(var(--gold))" fillOpacity="0.55" />;
        })}

        {/* 16 radial sun-ray spokes — alternating long/short */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16 - 90;
          const rad = (angle * Math.PI) / 180;
          const innerR = 22;
          const outerR = i % 2 === 0 ? 48 : 38;
          const opacity = i % 2 === 0 ? 0.35 : 0.18;
          const sw = i % 2 === 0 ? 0.4 : 0.3;
          return (
            <line
              key={`ray-${i}`}
              x1={cx + innerR * Math.cos(rad)}
              y1={cy + innerR * Math.sin(rad)}
              x2={cx + outerR * Math.cos(rad)}
              y2={cy + outerR * Math.sin(rad)}
              stroke="rgb(var(--gold))"
              strokeOpacity={opacity}
              strokeWidth={sw}
              strokeLinecap="round"
            />
          );
        })}

        {/* Inner rings — concentric circles for "spiral" feel */}
        {[38, 34, 26, 22, 18, 14, 10].map((r, idx) => (
          <circle key={`inner-${r}`} cx={cx} cy={cy} r={r} fill="none" stroke="rgb(var(--gold))" strokeOpacity={0.28 - idx * 0.025} strokeWidth="0.35" />
        ))}

        {/* Spiral path — a simple Archimedean spiral approximation */}
        <path
          d="M100 100 C100 97, 103 94, 106 97 C109 100, 106 106, 100 106 C92 106, 88 100, 88 94 C88 86, 94 82, 100 82 C112 82, 118 92, 118 100"
          fill="none"
          stroke="rgb(var(--gold))"
          strokeOpacity="0.2"
          strokeWidth="0.4"
          strokeLinecap="round"
        />

        {/* Center marks */}
        <circle cx={cx - 3.5} cy={cy} r="1.4" fill="rgb(var(--gold))" fillOpacity="0.8" />
        <circle cx={cx + 3.5} cy={cy} r="1.4" fill="rgb(var(--gold))" fillOpacity="0.8" />
        <circle cx={cx} cy={cy} r="0.9" fill="rgb(var(--gold))" fillOpacity="0.9" />

        {/* Top arched text */}
        <text fill="rgb(var(--gold))" fillOpacity="0.82" fontFamily="var(--font-body)" fontSize="8.2" fontWeight={600} letterSpacing="2.2">
          <textPath href="#badgeTopArc" startOffset="50%" textAnchor="middle">
            INSPIRED BY THE UNIVERSE
          </textPath>
        </text>

        {/* Bottom arched text */}
        <text fill="rgb(var(--gold))" fillOpacity="0.82" fontFamily="var(--font-body)" fontSize="8.2" fontWeight={600} letterSpacing="2.2">
          <textPath href="#badgeBottomArc" startOffset="50%" textAnchor="middle">
            MADE BY HAND
          </textPath>
        </text>
      </svg>
    </div>
  );
}
