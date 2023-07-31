/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      fontFamily:{


        
        "inter":["Inter", 'sans-serif'],
        "plus":["Plus Jakarta Sans", "sans-serif"] ,
        "general":["General Sans", "sans-serif"] ,
        
        "passengerRegular":["PassengerSans-Regular","sans-serif"],
        
        "passengerMedium":["PassengerSans-Medium","sans-serif"],
        
        "passengerSemibold":["PassengerSans-Semibold","sans-serif"],
        
        "passengerBold":["PassengerSans-Bold","sans-serif"],
      }
    },
  },
   plugins: [require('daisyui')],
}