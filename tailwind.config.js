/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter','system-ui','sans-serif'],
        mono: ['JetBrains Mono','ui-monospace','monospace'],
      },
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        violet: {
          500: '#8b5cf6',
          600: '#7c3aed',
        }
      },
      boxShadow: {
        soft: '0 2px 10px rgba(0,0,0,0.04)',
        card: '0 4px 24px rgba(0,0,0,0.06)',
      }
    },
  },
  plugins: [],
}
