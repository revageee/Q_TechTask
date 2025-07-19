/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/globals.css',
  ],
  theme: {
    extend: {
      fontFamily: {
        dos: ['var(--font-dos)', 'monospace'],
      },
      colors: {
        dosBlue: '#0000AA',
        dosCyan: '#00AAAA',
        dosYellow: '#FFFF55',
        dosWhite: '#FFFFFF',
        dosGray: '#AAAAAA',
        dosBlack: '#000000',
        dosBorder: '#55FFFF',
      },
    },
  },
  plugins: [],
};
