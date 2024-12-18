/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '#272727',
                darkerBackground: '#1f1e1e',
                bodyText: '#a6a6a6',
                success: '#79c142',
            },
            fontFamily: {
                logoText: ['Adrip', 'sans-serif'],
                bodyText: ['Noto Sans', 'sans-serif'],
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
                checkmark: 'checkmark-draw 0.6s forwards',
                fadeIn: 'fadeIn 0.3s forwards',
            },
            keyframes: {
                'checkmark-draw': {
                    '0%': { strokeDasharray: '0, 24' },
                    '100%': { strokeDasharray: '24, 0' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
