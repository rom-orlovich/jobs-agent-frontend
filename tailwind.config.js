/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '.src/app/**/*.{js,ts,jsx,tsx}',
    '.src/pages/**/*.{js,ts,jsx,tsx}',
    '.src/components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        success: {
          primary: {
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#4a6f9c'
          },
          secondary: {
            400: '#38bdf8',
            500: '#0ea5e9'
          }
        },
        adding: {
          primary: {
            400: '#86efac',
            500: '#4ade80'
          }
        },
        error: {
          primary: {
            400: '#f87171',
            500: '#ef4444'
          }
        },

        warning: '#fb923c',
        info: '#9ca3af',
        tag: {
          400: '#5eead4',
          500: '#2dd4bf'
        },
        loading: {
          400: '#8153ec',
          500: '#8b5cf6',
          600: '#715e9e'
        },
        nav: {
          500: '#64748b'
        },
        background: '#e2e8f0'
      }
    }
  },
  plugins: []
};
