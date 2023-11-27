/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      // sm: "640px",
      // md: "768px",
      // lg: "1024px",
      // xl: "1280px",
      // "2xl": "1536px",
      
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  "2xl": "1600px"


    },
    container: {
      center: true,
      padding: "0rem",
    },

    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        plus: ["Plus Jakarta Sans", "sans-serif"],
        general: ["General Sans", "sans-serif"],
        'satoshi': ['Satoshi', 'sans-serif'],
        'product': ['product', 'sans-serif'],
        'productBold': ['productBold', 'sans-serif'],
        'productSemiBold': ['productSemiBold', 'sans-serif'],

      },
    },
  },
  plugins: [require("daisyui")],
};
