/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        slate: { 950: '#020617' },
        emerald: { 400: '#34d399' },
        sky: { 500: '#0ea5e9' }
      }
    },
  },
  plugins: [],
}
