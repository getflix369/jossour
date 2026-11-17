/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        latin: ['Plus Jakarta Sans', 'sans-serif']
      }
    }
  },
  plugins: []
};
