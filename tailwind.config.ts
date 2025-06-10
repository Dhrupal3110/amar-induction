/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#4A00E0',
          pink: '#DD41C4',
          purple: '#8E2DE2', // This is your main accent
        },
        neutral: {
          charcoal: '#22222A', // For text
          gray: '#F4F4F7',     // For backgrounds
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-in-delay': 'fadeIn 1s ease-out 0.5s forwards',
        'fade-in-delay-2': 'fadeIn 1s ease-out 1s forwards',
        'fade-in-delay-3': 'fadeIn 1s ease-out 1.5s forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};