import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4 rounded-t-3xl shadow-lg mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="text-center md:text-left">
          <p className="text-lg font-semibold mb-1">Thanks for stopping by!</p>
          <p className="text-sm">&copy; {currentYear} Roushan. All Rights Reserved.</p>
        </div>

        <div className="group flex items-center space-x-6 text-xl">
          <a
            href="https://github.com/github-roushan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transform origin-bottom transition-colors transition-transform duration-300 ease-out hover:scale-[2] hover:-translate-y-3 hover:z-10 group-hover:-translate-y-2 first:group-hover:-translate-x-2"
            aria-label="GitHub"
          >
            <FaGithub size={28} />
          </a>
          <a
            href="https://www.linkedin.com/in/pro-coder-roshu/"
            target="_blank"
            rel="noopener noreferrer"
            className="transform origin-bottom transition-colors transition-transform duration-300 ease-out hover:scale-[2] hover:-translate-y-3 hover:z-10 group-hover:-translate-y-2"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={28} color="#0A66C2" />
          </a>
          <a
            href="https://x.com/Roushan01550155"
            target="_blank"
            rel="noopener noreferrer"
            className="transform origin-bottom transition-colors transition-transform duration-300 ease-out hover:scale-[2] hover:-translate-y-3 hover:z-10 group-hover:-translate-y-2 last:group-hover:translate-x-2"
            aria-label="X"
          >
            <FaXTwitter size={28} color="#1DA1F2" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

