import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Pretendard', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      colors: {
        coal: '#101111',
        field: '#74725f',
        paper: '#d6c8aa',
        signal: '#b14f3f',
        steel: '#7f8d92',
      },
    },
  },
  plugins: [],
} satisfies Config;
