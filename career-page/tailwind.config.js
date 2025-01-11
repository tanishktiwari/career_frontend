/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This ensures Tailwind purges unused styles in all JS/JSX/TS/TSX files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
