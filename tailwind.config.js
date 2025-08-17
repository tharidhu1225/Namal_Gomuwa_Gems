/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      colors:{
        "primary" : "#0F52BA",
        "secondary" : "#D4AF37",
        "accent" : "#2E8B57",
        "accent-light" : "#F8F5F2",
      }
    },
  },
  plugins: [],
}