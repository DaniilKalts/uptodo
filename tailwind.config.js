/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    extend: {
      colors: {
        // white colors:
        white: {
          DEFAULT: '#fff',
          pale: '#ffffffdd',
          darker: '#cbd5e1',
        },

        // gray colors:
        gray: {
          dark: '#3d3d3d',
          light: '#555',
          100: '#e5e5e5',
          200: '#AFAFAF',
          300: '#979797',
          400: '#ffffff70',
          500: '#4C4C4C',
          600: '#444444',
          700: '#363636',
          800: '#272727',
        },

        // black colors:
        black: {
          DEFAULT: '#000',
          pre: '#121212',
          light: '#1D1D1D',
        },

        // purple colors:
        purple: {
          DEFAULT: '#8875FF',
          dark: '#7969e1',
          light: '#a79aff',
        },

        // red colors:
        red: {
          DEFAULT: '#FF4949',
          dark: '#e03b3b',
        },

        // category colors:
        'cyan-light': '#80FFFF',
        'beige-light': '#FF9680',
        'blue-light': '#809CFF',
        'pink-light': '#FC80FF',
        'mint-light': '#80FFA3',
        'lemon-chiffon': '#CCFF80',
        'aquamarine-mist': '#80FFD9',
        'raspberry-sorbet': '#FF80EB',
        'sky-blue': '#80D1FF',
        'coral-pink': '#FF8080',
        'turquoise-haze': '#80FFD1',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
