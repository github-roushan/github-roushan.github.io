import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-center min-h-screen text-center md:text-left px-4">
      <motion.div 
        className="md:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold">Roushan Kumar</h1>
        <p className="text-xl md:text-2xl mt-4 text-gray-400">Software Developer | Tech Blogger</p>
        <p className="mt-6 max-w-xl mx-auto md:mx-0">
          I build beautiful and responsive web applications. Welcome to my digital garden.
        </p>
        <div className="mt-8">
          <Link to="/projects" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full mr-4 transition-colors">
            View Projects
          </Link>
          <Link to="/contact" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition-colors">
            Contact Me
          </Link>
        </div>
      </motion.div>
      <motion.div 
        className="md:w-1/2 mt-10 md:mt-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img src="https://via.placeholder.com/400" alt="Profile" className="rounded-full mx-auto" />
      </motion.div>
    </div>
  );
};

export default Home;

