import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: ['./app/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
      },
    },
  },
  purge: ['./app/**/*.{js,ts,jsx,tsx}', './App/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
  important: true,
} satisfies Config;
