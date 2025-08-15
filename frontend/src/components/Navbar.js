import React, { useState } from "react";
import { AnimatePresence } from 'framer-motion';
import Menu from './Menu';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-end items-center">
          <button 
            onClick={() => setMenuOpen(true)}
            className="font-semibold text-text tracking-widest"
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

