import React from 'react';
import { projects } from '../data/projects';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {
  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
        My <span className="text-primary text-shadow-glow">Projects</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div 
            key={index} 
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover"/>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-bold mb-2 text-primary">{project.title}</h2>
              <p className="text-gray-700 mb-4 flex-grow">{project.description}</p>
              <div className="mb-4">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tech}</span>
                ))}
              </div>
              <div className="flex justify-end space-x-4 mt-auto">
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-text transition-colors">
                  <FaGithub size={24} />
                </a>
                <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-text transition-colors">
                  <FaExternalLinkAlt size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
