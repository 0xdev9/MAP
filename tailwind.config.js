/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      dropShadow: {
        'glow-green': '0 0 8px rgba(74, 222, 128, 0.5)',
        'glow-red': '0 0 8px rgba(248, 113, 113, 0.5)',
      },
    },
  },
  plugins: [],
};