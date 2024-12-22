/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // You can add your custom colors or extend existing theme here
      colors: {
        primary: '#9c55df',
        secondary: '#3b82f6',
      }
    },
  },
  plugins: [],
}