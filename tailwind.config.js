/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      // fontFamily: {'Almarai': ['Almarai', 'sans-serif']}, // Add Almarai font
      fontFamily: {'Alexandria': ['Alexandria', 'sans-serif']}, // Add Cairo font
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // require('flowbite/plugin'),
  ],
}