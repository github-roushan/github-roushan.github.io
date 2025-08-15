const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class', // Enable dark mode
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light Theme
        'background': '#f0f2f5',
        'text': '#111827',
        'primary': '#3b82f6', 
        'secondary': '#10b981', 
        'accent': '#f97316', 

        // Dark Theme (VS Code Inspired)
        'dark-background': '#1e1e1e',
        'dark-text': '#d4d4d4',
        'dark-primary': '#569cd6',
        'dark-secondary': '#4ec9b0',
        'dark-accent': '#ce9178',
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      textShadow: {
        'glow': '0 2px 8px rgba(59, 130, 246, 0.3)', 
        'dark-glow': '0 0 8px rgba(86, 156, 214, 0.5)',
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
