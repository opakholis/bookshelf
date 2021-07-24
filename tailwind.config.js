const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: 'class',
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
          blue: '#00C4CF',
          red: '#FE8957',
          orange: '#FECA07',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/custom-forms')],
};
