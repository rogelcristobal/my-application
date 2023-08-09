/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
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

        passengerRegular: ["PassengerSans-Regular", "sans-serif"],

        passengerMedium: ["PassengerSans-Medium", "sans-serif"],

        passengerSemibold: ["PassengerSans-Semibold", "sans-serif"],

        passengerBold: ["PassengerSans-Bold", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
