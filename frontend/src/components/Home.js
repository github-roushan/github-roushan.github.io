import React from 'react';
// import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import InteractiveGraph from './InteractiveGraph';
import AnimatedName from './AnimatedName';

const Home = () => {
  return (
    <div className="relative">
      <InteractiveGraph />
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center min-h-screen text-center md:text-left px-4">
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold">
            Hi, I'm <AnimatedName text="Roushan" />.
          </h1>
          <p className="text-2xl md:text-2xl mt-4 text-gray-600 dark:text-gray-400">Software Engineer | AI/ML Enthusiast</p>
          <p className="mt-6 max-w-xl mx-auto md:mx-0 text-xl text-gray-700 dark:text-gray-300">
            I’m a software engineer specializing in building robust, scalable backend and distributed systems. Now, I’m diving into the fascinating world of machine learning to push my craft even further.
          </p>
          {/* <div className="mt-8">
          <Link to="/projects" className="with-ripple bg-primary hover:bg-primary/80 text-white font-bold py-3 px-6 rounded-full transition-colors dark:bg-dark-primary dark:hover:bg-dark-primary/80 md-elevation-2 inline-block">
            View My Work
          </Link>
        </div> */}
        </motion.div>
        <motion.div
          className="md:w-1/2 mt-10 md:mt-0"
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: [0, -2, 2, -2, 0],
            y: ["-10px", "10px"],
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
            type: 'spring',
            stiffness: 120,
            damping: 14,
            y: {
              duration: 1.8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
            rotate: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <img src="/images/robot1.png" alt="Profile" className="rounded-full mx-auto w-80 h-80 object-cover md-elevation-3" />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;

