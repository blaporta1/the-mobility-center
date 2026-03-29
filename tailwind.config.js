/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        opensans: ['"Open Sans"', 'sans-serif'],
      },
      colors: {
        obsidian: '#0D0D12',
        teal: '#2EBFA5',
        navy: '#1A4FBB',
        cream: '#F4F7F9',
        ivory: '#FAF8F5',
        slate: '#2A2A35',
        'slate-light': '#3A3A47',
      },
    },
  },
  plugins: [],
}
