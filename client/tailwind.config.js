/** @type {import('tailwindcss').Config} */
export default {
  content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "Nuteral": "#F9FCFF",
        "Nuteral-900": "#ffffff",
        "Primary": "#183B56", 
        "Primary-700": "#959ead",
        "Primary-800": "#5a7184",
        "Primary-900": "#0d2436",
        "Secondary": "#1565D8",
        "Success": "#36b37e",
        "Success-100": "#e1f4ec",
        "Danger": "#FC5A5A",              
                                             
      },
      maxWidth: {
        "10xl": "1440px" 
      }

    },
  },
  plugins: [],       
}

