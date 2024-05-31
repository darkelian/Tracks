/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        'blue-light': '#b1d4e6',
        'blue-dark': '#2d6a88',
        'blue-darkest': '#205d7b',
        'red-light': '#d46e51',
        'red-dark': '#9b442b',
        'red-darkest': '#803520',
        'white': '#f8f6f6',
        'gray-light': '#efefef',
        'gray-dark': '#b2afaf',
        'black': '#222222',
      },
      fontFamily: {
        'title': ['Montserrat', 'sans-serif'],
        'paragraph': ['Myriad-pro','sans-serif']
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

