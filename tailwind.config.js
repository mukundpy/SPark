/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007BFF',
          50: '#E6F2FF',
          100: '#CCE5FF',
          200: '#99CCFF',
          300: '#66B2FF',
          400: '#3399FF',
          500: '#007BFF',
          600: '#0062CC',
          700: '#004A99',
          800: '#003166',
          900: '#001933',
        },
        secondary: {
          DEFAULT: '#FFC107',
          50: '#FFF9E6',
          100: '#FFF3CC',
          200: '#FFE799',
          300: '#FFDB66',
          400: '#FFCF33',
          500: '#FFC107',
          600: '#CC9A06',
          700: '#997404',
          800: '#664D03',
          900: '#332701',
        },
        background: {
          DEFAULT: '#FFFFFF',
          secondary: '#F8F9FA',
        },
        text: {
          DEFAULT: '#1E293B',
          secondary: '#6C757D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['3rem', { lineHeight: '1.2' }],
        'h1': ['2.25rem', { lineHeight: '1.2' }],
        'h2': ['1.875rem', { lineHeight: '1.3' }],
        'h3': ['1.5rem', { lineHeight: '1.4' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'caption': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
