import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = ({ toggleTheme, theme }) => {
  return (
    <button onClick={toggleTheme} className="p-2 rounded-full focus:outline-none">
      {theme === 'light' ? (
        <FaMoon className="text-gray-500 hover:text-text" size={20} />
      ) : (
        <FaSun className="text-yellow-400 hover:text-yellow-300" size={20} />
      )}
    </button>
  );
};

export default ThemeToggle;
