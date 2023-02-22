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
            500: '#3b82f6'
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
        text: {
          primary: '#171717',
          secondary: 'white'
        },
        warning: '#fb923c',
        info: '#9ca3af',
        tag: {
          400: '#5eead4',
          500: '#2dd4bf'
        }
      }
    }
  },
  plugins: []
};
