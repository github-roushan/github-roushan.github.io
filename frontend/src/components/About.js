import React from 'react';
import { skills } from '../data/skills';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="container mx-auto py-20 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About <span className="text-orange text-shadow-glow">Me</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          I am a passionate software engineer with a love for building web applications and learning new technologies. I am always looking for new challenges and opportunities to grow my skills.
        </p>
      </div>
      
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">My <span className="text-cyan">Skills</span></h2>
        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-bold text-purple mb-6 text-center">{category}</h3>
            <motion.div 
              className="flex flex-wrap justify-center"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05 } }
              }}
            >
              {skillList.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg m-2 shadow-lg flex items-center space-x-3"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {skill.icon && <span className="text-2xl">{skill.icon}</span>}
                  <span>{skill.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <a 
          href="/resume.pdf" 
          download 
          className="bg-purple hover:bg-purple/80 text-white font-bold py-3 px-8 rounded-full transition-colors text-lg"
        >
          Download My Resume
        </a>
      </div>
    </div>
  );
};

export default About;
