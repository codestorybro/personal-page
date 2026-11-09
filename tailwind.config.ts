import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'canvas': 'var(--color-canvas)',
        'ink': 'var(--color-ink)',
        'muted': 'var(--color-muted)',
        'accent': 'var(--color-accent)',
        'accent-strong': 'var(--color-accent-strong)',
        'surface': 'var(--color-surface)',
        'rule': 'var(--color-rule)',
        'control': 'var(--color-control)',
        'success': 'var(--color-success)',
        'error': 'var(--color-error)',
      },
      fontFamily: {
        sans: ['var(--font-inter, Arial)', 'sans-serif'],
        editorial: ['var(--font-editorial)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
