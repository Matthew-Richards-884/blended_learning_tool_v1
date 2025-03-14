import { type Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{html,js,jsx,ts,tsx}',
    './App/**/*.{html,js,jsx,ts,tsx}',
    './Components/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './_build/**/*.{js,ts,jsx,tsx}',
    './_Build/**/*.{js,ts,jsx,tsx}',
    './_server/**/*.{js,ts,jsx,tsx}',
    './_Server/**/*.{js,ts,jsx,tsx}',
    './assets/**/*.{js,ts,jsx,tsx}',
    './Assets/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'ui-sans-serif', 'system-ui'],
        serif: ['ui-serif', 'Georgia'],
        mono: ['ui-monospace', 'SFMono-Regular'],
      },
    },
  },
  plugins: [],
  important: true,
} satisfies Config;
