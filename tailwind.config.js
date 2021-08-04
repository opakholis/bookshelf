const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false,
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.blueGray
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        groovy: {
          purple: '#A78BFA',
          violet: '#ac39fe',
          blue: '#00C4CF',
          orange: '#FE8957',
          red: '#FF5381',
          lilac: '#FF68D4',
          yellow: '#FECA07',
          green: '#22C55E'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
