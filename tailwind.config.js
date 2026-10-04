/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mineral: {
          dark: '#030712',
          card: '#0B132B',
          accent: '#F59E0B',
          critical: '#EF4444',
          alert: '#F97316',
          amber: '#D97706'
        }
      }
    },
  },
  plugins: [],
}
