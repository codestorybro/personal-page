import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        desktop: '1506px',
      },
      maxWidth: {
        'screen-xl': '1506px',
      },
      height: {
        22: '88px',
      },
      colors: {
        background: '#03050a',
        darkerBackground: '#1f1e1e',
        bodyText: '#a6a6a6',
        success: '#79c142',
      },
      fontFamily: {
        logoText: ['var(--font-rush-driver)', 'sans-serif'],
        bodyText: ['var(--font-inter)'],
      },
      boxShadow: {
        page: '4px 4px 16px rgba(0, 0, 0, .5), -4px -4px 16px hsla(0, 0%, 100%, .05);',
        input: 'inset 2px 2px 5px #141414,inset -5px -5px 10px #212121',
      },
      borderRadius: {
        page: '112px',
        button: '320px',
      },
      borderColor: {
        button: '#3b3b3b',
      },
      backgroundImage: {
        link: 'linear-gradient(90deg, #3b5566, #4ca1af)',
      },
      transition: {
        link: 'width 0.5s',
      },
      animation: {
        circle: 'spin 1.5s linear infinite',
        fadeIn: 'fadeIn 0.3s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
