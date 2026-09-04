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
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          light: '#3B82F6', // Blue 500
          dark: '#06B6D4', // Cyan 500
          neon: '#0EA5E9', // Sky 500
        },
        background: {
          light: '#FFFFFF',
          dark: '#000000',
        },
        surface: {
          light: '#F8FAFC', // Slate 50
          dark: '#111827', // Gray 900
        }
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      }
    },
  },
  plugins: [],
}
