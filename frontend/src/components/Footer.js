import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 mt-auto">
      <div className="container mx-auto text-center text-gray-400">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://github.com/github-roushan" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaGithub size={24} />
          </a>
          <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaLinkedin size={24} />
          </a>
          <a href="https://twitter.com/procoder9973" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaTwitter size={24} />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Roushan Kumar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

