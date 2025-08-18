import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

const Menu = ({ close }) => {
  const menuVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  };

  const navLinkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-background dark:bg-dark-background z-50 p-8 flex flex-col items-center justify-center"
      variants={menuVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <button onClick={close} className="absolute top-8 right-8 font-semibold text-gray-500 hover:text-text dark:text-gray-400 dark:hover:text-dark-text">
        CLOSE
      </button>

      <nav className="text-center space-y-8 mb-16">
        <motion.div variants={navLinkVariants}><NavLink to="/" onClick={close} className="text-5xl font-bold text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-dark-primary transition-colors">Home</NavLink></motion.div>
        <motion.div variants={navLinkVariants}><NavLink to="/about" onClick={close} className="text-5xl font-bold text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-dark-primary transition-colors">About</NavLink></motion.div>
        <motion.div variants={navLinkVariants}><NavLink to="/skills" onClick={close} className="text-5xl font-bold text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-dark-primary transition-colors">Skills</NavLink></motion.div>
        <motion.div variants={navLinkVariants}><NavLink to="/projects" onClick={close} className="text-5xl font-bold text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-dark-primary transition-colors">Projects</NavLink></motion.div>
        <motion.div variants={navLinkVariants}><NavLink to="/courses" onClick={close} className="text-5xl font-bold text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-dark-primary transition-colors">Courses</NavLink></motion.div>
        <motion.div variants={navLinkVariants}><NavLink to="/blog" onClick={close} className="text-5xl font-bold text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-dark-primary transition-colors">Blog</NavLink></motion.div>
      </nav>

      <div className="flex space-x-6">
        <a href="https://github.com/github-roushan" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-text dark:text-gray-400 dark:hover:text-dark-text"><FaGithub size={24} /></a>
        <a href="https://www.linkedin.com/in/pro-coder-roshu/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-text dark:text-gray-400 dark:hover:text-dark-text"><FaLinkedin size={24} /></a>
        <a href="https://x.com/procoder973" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-text dark:text-gray-400 dark:hover:text-dark-text"><FaTwitter size={24} /></a>
      </div>
    </motion.div>
  );
};

export default Menu;
