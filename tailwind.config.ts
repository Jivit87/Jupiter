import type { Config } from 'tailwindcss';
import { breakpoints, radii, shadows, typography } from './src/styles/tokens';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: ['class'],
  theme: {
    screens: breakpoints,
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
    },
    extend: {
      colors: {
        /* ── Design system — Jupiter warm-ivory + cosmic purple ── */
        'nav-bg':       'rgb(var(--nav-bg) / <alpha-value>)',
        'hero-bg':      'rgb(var(--hero-bg) / <alpha-value>)',
        'hero-purple':  'rgb(var(--hero-bg-alt) / <alpha-value>)',
        forest: {
          DEFAULT: 'rgb(var(--forest) / <alpha-value>)',
          dark:    'rgb(var(--forest-dark) / <alpha-value>)',
          strip:   'rgb(var(--forest-strip) / <alpha-value>)',
        },
        gold: {
          DEFAULT: 'rgb(var(--gold) / <alpha-value>)',
          light:   'rgb(var(--gold-light) / <alpha-value>)',
        },
        cream: {
          DEFAULT: 'rgb(var(--cream) / <alpha-value>)',
          dark:    'rgb(var(--cream-dark) / <alpha-value>)',
          warm:    'rgb(var(--cream-warm) / <alpha-value>)',
        },
        ivory: 'rgb(var(--ivory) / <alpha-value>)',
        'soft-brown': 'rgb(var(--soft-brown) / <alpha-value>)',

        /* ── Legacy aliases (kept so other pages don't break) ── */
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface:    'rgb(var(--color-surface) / <alpha-value>)',
        primary:    'rgb(var(--color-primary) / <alpha-value>)',
        brand:      'rgb(var(--color-brand) / <alpha-value>)',
        sage:       'rgb(var(--color-sage) / <alpha-value>)',
        lavender:   'rgb(var(--color-lavender) / <alpha-value>)',
        copper:     'rgb(var(--color-copper) / <alpha-value>)',
        text: {
          primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
          muted:   'rgb(var(--color-text-muted) / <alpha-value>)',
          heading: 'rgb(var(--color-text-heading) / <alpha-value>)',
        },
        border:     'rgb(var(--color-border) / <alpha-value>)',
        starlight:  'rgb(var(--color-white) / <alpha-value>)',
      },
      fontFamily: {
        ...typography,
        display: ['var(--font-display)', 'Georgia', 'serif'],
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        sans:    ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderRadius: radii,
      boxShadow: {
        ...shadows,
        gold:    '0 0 0 1px rgb(var(--gold) / 0.3)',
        'gold-lg': '0 4px 20px rgb(var(--gold) / 0.22)',
      },
      keyframes: {
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.55s cubic-bezier(0.2,0.8,0.2,1) both',
        shimmer:      'shimmer 1.6s linear infinite',
        marquee:      'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
