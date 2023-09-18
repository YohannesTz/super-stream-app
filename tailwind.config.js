/** @type {import('tailwindcss').Config} */
export default {
  purge: {
    options: {
      safelist: [
        {
          pattern: /\b(bg-\S+)(?:\s+opacity-(?:[0-9]|10{2}))?\b/g
        }
      ],
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        twitch: [
          'Inter',
          'Roobert',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}

