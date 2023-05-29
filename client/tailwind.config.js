/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{

        "productRegular":["ProductSansRegular","sans-serif"], 
        "productBold":["ProductSansBold","sans-serif"],

        "helveticaRegular":["HelveticaNeueRoman", 'sans-serif'],
        "helveticaThin":["HelveticaNeueThin", 'sans-serif'],
        "helveticaBold":["HelveticaNeueBold", 'sans-serif'],
        "helveticaBlack":["HelveticaNeueBlack", 'sans-serif'],

        "inter":["Inter", 'sans-serif'],
        "plus":["Plus Jakarta Sans", "sans-serif"] 
      }
    },
  },
  plugins: [],
}