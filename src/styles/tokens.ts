export const colors = {
  /* ── Semantic palette (maps 1:1 to :root CSS vars) ────────── */
  background:        'rgb(var(--background) / <alpha-value>)',
  surface:           'rgb(var(--surface) / <alpha-value>)',
  'surface-elevated': 'rgb(var(--surface-elevated) / <alpha-value>)',
  'brand-dark':      'rgb(var(--brand-dark) / <alpha-value>)',
  'brand-accent':    'rgb(var(--brand-accent) / <alpha-value>)',

  /* ── Text ──────────────────────────────────────────────────── */
  text: {
    DEFAULT:  'rgb(var(--text) / <alpha-value>)',
    primary:  'rgb(var(--text) / <alpha-value>)',
    heading:  'rgb(var(--text-heading) / <alpha-value>)',
    muted:    'rgb(var(--text-muted) / <alpha-value>)',
    inverse:  'rgb(var(--text-inverse) / <alpha-value>)',
    accent:   'rgb(var(--text-accent) / <alpha-value>)',
  },

  /* ── Border ────────────────────────────────────────────────── */
  border: {
    DEFAULT: 'rgb(var(--border) / <alpha-value>)',
    subtle:  'rgb(var(--border-subtle) / <alpha-value>)',
  },

  /* ── Primitives by family (for dark sections / one-offs) ──── */
  purple: {
    cosmic: 'rgb(var(--purple-cosmic) / <alpha-value>)',
    mystic: 'rgb(var(--purple-mystic) / <alpha-value>)',
    brand:  'rgb(var(--purple-brand) / <alpha-value>)',
    deep:   'rgb(var(--purple-deep) / <alpha-value>)',
    strip:  'rgb(var(--purple-strip) / <alpha-value>)',
  },
  gold: {
    DEFAULT: 'rgb(var(--gold) / <alpha-value>)',
    light:   'rgb(var(--gold-light) / <alpha-value>)',
    deep:    'rgb(var(--gold-deep) / <alpha-value>)',
    soft:    'rgb(var(--gold-soft) / <alpha-value>)',
  },
  cream: {
    DEFAULT: 'rgb(var(--cream) / <alpha-value>)',
    dark:    'rgb(var(--cream-dark) / <alpha-value>)',
    warm:    'rgb(var(--cream-warm) / <alpha-value>)',
  },
  brown: {
    ink:    'rgb(var(--brown-ink) / <alpha-value>)',
    warm:   'rgb(var(--brown-warm) / <alpha-value>)',
    muted:  'rgb(var(--brown-muted) / <alpha-value>)',
    soft:   'rgb(var(--brown-soft) / <alpha-value>)',
  },
  ivory:    'rgb(var(--ivory) / <alpha-value>)',
  whatsapp: 'rgb(var(--whatsapp) / <alpha-value>)',
  sage:     'rgb(var(--sage) / <alpha-value>)',
  lavender: 'rgb(var(--lavender) / <alpha-value>)',
  copper:   'rgb(var(--copper) / <alpha-value>)',

  /* ── Feedback ──────────────────────────────────────────────── */
  error:   'rgb(var(--error) / <alpha-value>)',
  success: 'rgb(var(--success) / <alpha-value>)',
  disabled: 'rgb(var(--disabled) / <alpha-value>)',

  /* ── Legacy aliases (kept so existing Tailwind classes work) ─ */
  primary:   'rgb(var(--brand-dark) / <alpha-value>)',
  brand:     'rgb(var(--brand-accent) / <alpha-value>)',
  starlight: 'rgb(var(--ivory) / <alpha-value>)',
};

export const typography = {
  sans:    ['var(--font-body)', 'system-ui', 'sans-serif'],
  display: ['var(--font-display)', 'Georgia', 'serif'],
  heading: ['var(--font-heading)', 'Georgia', 'serif'],
  script:  ['var(--font-script)', 'Georgia', 'serif'],
  hand:    ['var(--font-hand)', 'cursive'],
  mono:    ['var(--font-mono)', 'ui-monospace', 'monospace'],
};

export const radii = {
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  xl: 'var(--radius-xl)',
  '2xl': 'var(--radius-2xl)',
  full: '9999px',
};

export const shadows = {
  soft: 'var(--shadow-soft)',
  card: 'var(--shadow-card)',
  lift: 'var(--shadow-lift)',
  glow: 'var(--shadow-glow)',
};

export const breakpoints = {
  xs: '375px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const motion = {
  durationFast: 'var(--duration-fast)',
  durationStandard: 'var(--duration-standard)',
  durationSlow: 'var(--duration-slow)',
  durationEmphasis: 'var(--duration-emphasis)',
  easeStandard: 'var(--ease-standard)',
  easeDecelerate: 'var(--ease-decelerate)',
} as const;
