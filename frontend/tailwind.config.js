const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'background': '#282a36',
        'cyan': '#8be9fd',
        'orange': '#ffb86c', // Replaced pink with orange
        'purple': '#bd93f9',
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      textShadow: {
        'glow': '0 0 5px rgba(255, 184, 108, 0.5), 0 0 10px rgba(255, 184, 108, 0.5)', // Adjusted glow for orange
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
