/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',        // every file under app/
    './components/**/*.{js,ts,jsx,tsx}'  // every file under components/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};