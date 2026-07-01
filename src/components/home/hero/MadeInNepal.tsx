import { CSSProperties } from 'react';

type Props = {
  className?: string;
  style?: CSSProperties;
  color?: string;
};

/**
 * Compact "Made in Nepal." tagline with an ornamental divider above:
 *
 *   ───── ✦ ─────
 *   Made in Nepal.
 *
 * Used as a small accent piece — an order#-tracking line, a trusted-by
 * banner, or a footer signature. The divider line is a hand-drawn SVG
 * featuring a tiny 4-point diamond glyph flanked by twin gold guide-lines
 * that taper at their ends to feel like a printed ornament, not a CSS rule.
 */
export function MadeInNepal({
  className,
  style,
  color = '#C89430',
}: Props) {
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        ...style,
      }}
      aria-hidden="true"
    >
      {/* Ornamental divider line w/ diamond */}
      <svg
        width="120"
        height="10"
        viewBox="0 0 120 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* Left line */}
        <line
          x1="0"
          y1="5"
          x2="50"
          y2="5"
          stroke={color}
          strokeOpacity="0.55"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
        {/* Right line */}
        <line
          x1="70"
          y1="5"
          x2="120"
          y2="5"
          stroke={color}
          strokeOpacity="0.55"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
        {/* Center diamond */}
        <path
          d="M60 1 L64 5 L60 9 L56 5 Z"
          fill={color}
          fillOpacity="0.85"
        />
        {/* Tiny accent dot */}
        <circle cx="48" cy="5" r="0.9" fill={color} fillOpacity="0.7" />
        <circle cx="72" cy="5" r="0.9" fill={color} fillOpacity="0.7" />
      </svg>

      {/* Caption */}
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '13px',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color,
          fontWeight: 500,
        }}
      >
        Made in Nepal.
      </span>
    </div>
  );
}
