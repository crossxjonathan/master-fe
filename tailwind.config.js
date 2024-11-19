/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tosca: {
          light: '#a0e8e6',
          DEFAULT: '#40E0D0',
          dark: '#0093AE',
        },
      },
    },
  },
  plugins: [],
}
