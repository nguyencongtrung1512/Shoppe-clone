const plugins = require('tailwindcss/plugin')


/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {},
  },
  plugins: [
    plugins(function ({ addUtilities }) {
      addUtilities({
        '.container': {
          maxWidth: '80rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        },
      })
    }),
    require('@tailwindcss/line-clamp'),
  ],
}

