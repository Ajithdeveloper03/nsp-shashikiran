/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF8C00', // New Orange
        secondary: '#CC0000', // New Red
        accent: '#FFFFFF', // White
        orange: '#FF8C00',
        'brand-red': '#CC0000',
        'brand-white': '#FFFFFF',
        black: '#121212',
        white: '#FFFFFF',
        'gray-100': '#F8F9FA',
        'gray-200': '#E9ECEF',
        'gray-300': '#DEE2E6',
        'gray-800': '#343A40',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Helvetica', 'Arial', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['"Plus Jakarta Sans"', 'serif'],
        tamil: ['Hind Madurai', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
