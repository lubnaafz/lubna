/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#0B485A',
        secondary: '#35A7A8',
        darkGray: '#3A3A3A',
        semiGray: '#969696',
        lightGray: '#DCDCDC',
        Tosca: '#E2F0F1',
        whiteBone: '#FCF7F4',
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")],
})
