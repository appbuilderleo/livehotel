/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#0D0B09',
        panel: '#161310',
        surface: '#1F1A15',
        accent: '#C8A468',
        'accent-hover': '#DFBE84',
        'ocean-tint': '#2B5B66',
        ivory: '#F4EFE6',
        travertine: '#B8AEA0',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'silk': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
