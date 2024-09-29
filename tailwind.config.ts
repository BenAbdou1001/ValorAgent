import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'barlow-condensed': ['"Barlow Condensed"', 'sans-serif'],
      },
      keyframes: {
        typewriterFast: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        }
      },
      animation: {
        'typewriter-fast': 'typewriterFast 1s steps(10) forwards'
      }
    },
  },
  plugins: [require('daisyui')],
};
export default config;
