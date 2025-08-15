import React, { useState } from "react";
import { AnimatePresence } from 'framer-motion';
import Menu from './Menu';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ toggleTheme, theme }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md shadow-sm dark:bg-dark-background/80">
        <div className="container mx-auto px-6 py-4 flex justify-end items-center space-x-4">
          <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
          <button 
            onClick={() => setMenuOpen(true)}
            className="font-semibold text-text tracking-widest dark:text-dark-text"
          >
            MENU
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {menuOpen && <Menu close={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

