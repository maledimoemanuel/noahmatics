/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['Rubik', 'sans-serif'],
      },
      keyframes: {
        talking: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.2)', opacity: '0.2' },
        },
      },
      animation: {
        talking: 'talking 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
