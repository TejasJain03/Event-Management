/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF893A', 
        background: '#EBEBEB', 
        secondary: '#C0C0C0', 
        accent: '#3A6EA5', 
        darkBlue: '#004E98', 
      },
    },
  },
  plugins: [],
}
