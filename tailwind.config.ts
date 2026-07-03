import type { Config } from 'tailwindcss';
import { breakpoints, colors, radii, shadows, typography } from './src/styles/tokens';

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
      colors,
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
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up var(--duration-emphasis) var(--ease-decelerate) both',
        'slide-in-right': 'slide-in-right 0.4s var(--ease-decelerate) both',
        'fade-in': 'fade-in 0.3s ease-out both',
        shimmer:      'shimmer 1.6s linear infinite',
        marquee:      'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
