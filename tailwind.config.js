/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#C4DAD2",
        secondary: "#417D7A",
        tertiary: "#16423C",
        quaternary: "#EDE6DB",
        white: "#FFFF",
        greenstat: "#417D7A",
        redstat: "#E56060",
        yellowstat: "#E5E558",
        bluestat: "#2661A7",
        indigoBlue: "#3E588F"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        sansita: ["Sansita", "sans-serif"],
      },
    },
  },
  plugins: [],
};