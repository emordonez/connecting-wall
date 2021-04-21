const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './index.html',
    './src/**/*.{vue,js}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        teal: colors.teal
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio')
  ],
}
