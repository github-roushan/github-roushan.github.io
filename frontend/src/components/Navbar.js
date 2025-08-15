import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800/30 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
          Roushan
        </NavLink>
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink to="/" className={({ isActive }) => (isActive ? "text-blue-400" : "text-gray-300 hover:text-white transition-colors")}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "text-blue-400" : "text-gray-300 hover:text-white transition-colors")}>About</NavLink>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? "text-blue-400" : "text-gray-300 hover:text-white transition-colors")}>Projects</NavLink>
          <NavLink to="/blog" className={({ isActive }) => (isActive ? "text-blue-400" : "text-gray-300 hover:text-white transition-colors")}>Blog</NavLink>
          <NavLink to="/contact" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors">Contact</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

