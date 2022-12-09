/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "card-bg": 'url("/src/assets/imgs/card.jpeg")'
      }
    },
  },
  plugins: [],
}
