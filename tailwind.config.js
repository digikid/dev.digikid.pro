import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import lineClamp from '@tailwindcss/line-clamp';
import aspectRatio from '@tailwindcss/aspect-ratio';

import defaultTheme from 'tailwindcss/defaultTheme.js';

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,jsx,ts,tsx}',
  ],
  safelist: [
    'z-[0]',
    'z-[1]',
    'z-[2]',
    'z-[3]'
  ],
  theme: {
    screens: {
      'xs': '420px',
      ...defaultTheme.screens
    },
    extend: {
      colors: {
        dusky: {
          '50': '#f7f7f7',
          '100': '#e3e3e3',
          '200': '#c8c8c8',
          '300': '#a4a4a4',
          '400': '#818181',
          '500': '#666666',
          '600': '#515151',
          '700': '#434343',
          '800': '#383838',
          '900': '#0c0c0c',
        },
        coral: {
          '50': '#fff1f2',
          '100': '#ffdfe1',
          '200': '#ffc5c9',
          '300': '#ff9da3',
          '400': '#ff646d',
          '500': '#ff3945',
          '600': '#ed1522',
          '700': '#c80d18',
          '800': '#a50f18',
          '900': '#88141b',
        },
        sun: {
          '50': '#fffde7',
          '100': '#fffcc1',
          '200': '#fff787',
          '300': '#ffeb42',
          '400': '#ffda0f',
          '500': '#f8c602',
          '600': '#cf9400',
          '700': '#a56903',
          '800': '#88520b',
          '900': '#74430f',
        },
      },
      screens: {
        '3xl': '1780px',
      },
      fontFamily: {
        sans: [
          'Inter var',
          ...defaultTheme.fontFamily.sans,
        ]
      },
    },
  },
  plugins: [
    forms,
    typography,
    lineClamp,
    aspectRatio,
  ],
};
