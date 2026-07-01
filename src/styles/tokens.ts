export const colors = {
  background: 'rgb(var(--color-background) / <alpha-value>)',
  surface: 'rgb(var(--color-surface) / <alpha-value>)',
  primary: 'rgb(var(--color-primary) / <alpha-value>)',
  brand: 'rgb(var(--color-brand) / <alpha-value>)',
  sage: 'rgb(var(--color-sage) / <alpha-value>)',
  lavender: 'rgb(var(--color-lavender) / <alpha-value>)',
  copper: 'rgb(var(--color-copper) / <alpha-value>)',
  text: {
    primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
    muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
    heading: 'rgb(var(--color-text-heading) / <alpha-value>)',
  },
  border: 'rgb(var(--color-border) / <alpha-value>)',
  starlight: 'rgb(var(--color-white) / <alpha-value>)',
};

export const typography = {
  sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
  display: ['var(--font-display)', 'Georgia', 'serif'],
  heading: ['var(--font-heading)', 'Georgia', 'serif'],
  mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
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

export const spacing = {
  '1': '0.25rem',
  '2': '0.5rem',
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '8': '2rem',
  '10': '2.5rem',
  '12': '3rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '32': '8rem',
} as const;

export const motion = {
  durationFast: '120ms',
  durationStandard: '200ms',
  durationSlow: '320ms',
  easeStandard: 'var(--ease-standard)',
} as const;
