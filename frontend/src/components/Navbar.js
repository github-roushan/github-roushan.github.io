import React, { useState, useEffect } from "react";
import { AnimatePresence } from 'framer-motion';
import Menu from './Menu';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ toggleTheme, theme }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md dark:bg-dark-background/80 transition-shadow border-b-0 ${elevated ? '' : ''}`}>
        <div className="container mx-auto px-6 py-4 flex justify-end items-center space-x-4">
          <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
          <button 
            onClick={() => setMenuOpen(true)}
            className="font-semibold text-text tracking-widest dark:text-dark-text with-ripple"
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

