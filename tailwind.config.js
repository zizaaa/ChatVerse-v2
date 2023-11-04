/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        "beige":"#B3A492",
        "lightBeige":"#b99569",
        "taupe":"#675D50",
        "darkBeige":"#a69988"
      },
      colors:{
        "black":"rgba(0,0,0,0.66)",
        "taupe":"#675D50",
        "grayishWhite":"rgba(255,255,255,0.86)"
      },
      screens:{
        "large":"961px",
        "medium":"700px",
        "small":"450px",
        "extraSmall":"400px"
      }
    },
  },
  plugins: [],
}

