const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: [
      './index.html',
      './src/**/*.{vue,js}'
    ],
    options: {
      mode: 'postcss'
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        pink: {
          1000: '#5c1045'
        }
      },
      transitionProperty: {
        'width': 'width'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-debug-screens')
  ],
}
