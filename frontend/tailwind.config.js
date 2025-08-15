const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'background': '#f0f2f5',
        'text': '#111827',
        'primary': '#3b82f6', // Vibrant Blue
        'secondary': '#10b981', // Vibrant Green
        'accent': '#f97316', // Vibrant Orange
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      textShadow: {
        'glow': '0 2px 8px rgba(59, 130, 246, 0.3)', // A subtle shadow for the primary color
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities, theme }) {
      const newUtilities = {}
      Object.entries(theme('textShadow')).forEach(([key, value]) => {
        newUtilities[`.text-shadow-${key}`] = {
          textShadow: value
        }
      })
      addUtilities(newUtilities)
    })
  ],
};
