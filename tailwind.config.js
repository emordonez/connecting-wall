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
    fontFamily: {
      sans: ['Roboto', 'ui-sans']
    },
    extend: {
      colors: {
        cyan: colors.cyan,
        pink: {
          1000: '#5c1045'
        }
      },
      transitionProperty: {
        'width': 'width'
      },
      width: {
        '5/8': '62.5%'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-heropatterns')({
      patterns: ['floating-cogs'],
      colors: {
        default: '#1F2937'
      },
      opacity: {
        default: '1.0'
      }
    }),
    require('tailwindcss-debug-screens')
  ],
}
