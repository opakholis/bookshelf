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
      gray: colors.blueGray,
      purple: {
        light: '#D8B4FE',
        DEFAULT: '#C084FC',
        dark: '#A855F7',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          darkest: '#171923',
          dark: '#1A202C',
          light: '#FFFFFF',
          lightest: '#F7FAFC',
        },
        groovy: {
          purple: '#A78BFA',
          violet: '#ac39fe',
          blue: '#00C4CF',
          orange: '#FE8957',
          red: '#FF5381',
          yellow: '#FECA07',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
