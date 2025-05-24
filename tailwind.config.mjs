// tailwind.config.mjs
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['Urbanist', 'sans-serif'],
      },
      colors: {
        primary: '#669999',
        secondary: '#212121',
        // accent: '#3B82F6',
        // neutral: '#374151',
      },
    },
  },
  plugins: [ ],
}