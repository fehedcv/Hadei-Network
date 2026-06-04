/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Fixed: Added ** to scan all subdirectories
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['MEIRO', 'sans-serif'], // Exclusive brand typeface
      },
      colors: {
        hadei: {
          yellow: '#F5F216', // Signature brand color
          black: '#000000',
          white: '#FFFFFF',
        },
        surface: {
          light: '#F8F8F8', // Container background
          border: '#000000', // Bold border style
        },
        state: {
          error: '#EF4444',
        }
      },
      borderRadius: {
        'xs': '8px',
        'md': '16px',
        'xl': '24px', // Standard HADEI card radius
      },
    },
  },
  plugins: [],
}