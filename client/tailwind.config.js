/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "helvetica":["helvetica","sans-serif"],
        "helvetica-bold":["helvetica-bold","sans-serif"],
        "helvetica-boldOblique":["helvetica-boldOblique","sans-serif"],
        "helvetica-oblique":["helvetica-oblique","sans-serif"],
        "helvetica-roundedBold":["helvetica-roundedBold","sans-serif"],

        "inter":["Inter", 'sans-serif'],
        "plus":["Plus Jakarta Sans", "sans-serif"] 
      }
    },
  },
  plugins: [],
}