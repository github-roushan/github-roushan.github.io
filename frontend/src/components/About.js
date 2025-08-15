import React from 'react';
import { skills } from '../data/skills';

const About = () => {
  return (
    <div className="container mx-auto py-20 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold">About Me</h1>
        <p className="mt-8 text-lg text-gray-400 max-w-2xl mx-auto">
          I am a passionate software developer with a love for building web applications and learning new technologies. I am always looking for new challenges and opportunities to grow my skills.
        </p>
      </div>
      
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center">My Skills</h2>
        <div className="flex flex-wrap justify-center mt-8">
          {skills.map((skill, index) => (
            <div key={index} className="bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg m-2">
              {skill}
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-16">
        <a 
          href="/resume.pdf" 
          download 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
        >
          Download My Resume
        </a>
      </div>
    </div>
  );
};

export default About;
