import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-background/50 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-orange text-shadow-glow hover:text-orange/80 transition-colors">
          Roushan
        </NavLink>
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink to="/" className={({ isActive }) => (isActive ? "text-cyan" : "text-gray-300 hover:text-white transition-colors")}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "text-cyan" : "text-gray-300 hover:text-white transition-colors")}>About</NavLink>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? "text-cyan" : "text-gray-300 hover:text-white transition-colors")}>Projects</NavLink>
          <NavLink to="/blog" className={({ isActive }) => (isActive ? "text-cyan" : "text-gray-300 hover:text-white transition-colors")}>Blog</NavLink>
          <NavLink to="/contact" className="bg-orange hover:bg-orange/80 text-white font-bold py-2 px-4 rounded-full transition-colors">Contact</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

