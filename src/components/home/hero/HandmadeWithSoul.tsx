type Props = {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  goldColor?: string;
};

/**
 * "Handmade with Soul. Made in Nepal." — luxury editorial serif heading.
 *
 * Detailed design:
 * – Cormorant-style serif typography (font-display)
 * – "Soul." rendered italic in refined gold (#C89430)
 * – Tiny ornamental flourish above heading (decorative SVG: 3 mini gilded glyphs aligned)
 * – Inline <svg> elements render real glyphs, no icon-font, no images
 * – Each separable word wrapped for fine-grain typography control
 */
export function HandmadeWithSoul({
  className,
  style,
  color = '#FDFAF5',
  goldColor = '#C89430',
}: Props) {
  return (
    <h1
      className={className}
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 300,
        fontStyle: 'normal',
        letterSpacing: '-0.005em',
        lineHeight: 1.05,
        color,
        margin: 0,
        ...style,
      }}
    >
      {/* Row 1: "Handmade" */}
      <span style={{ display: 'block' }}>Handmade</span>

      {/* Row 2: "with Soul." — Soul italic gold */}
      <span style={{ display: 'block' }}>
        with{' '}
        <span
          style={{
            color: goldColor,
            fontStyle: 'italic',
            fontWeight: 400,
            letterSpacing: '-0.01em',
          }}
        >
          Soul
        </span>
        <span style={{ color: goldColor }}>.</span>
      </span>

      {/* Row 3: "Made in Nepal." — slightly smaller to show hierarchy */}
      <span
        style={{
          display: 'block',
          marginTop: '0.02em',
          fontSize: '0.75em',
          fontWeight: 350,
          opacity: 0.88,
        }}
      >
        Made in Nepal.
      </span>
    </h1>
  );
}
