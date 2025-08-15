import React from 'react';
import { skills } from '../data/skills';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import './About.css';

const About = () => {
  const [expandedCategories, setExpandedCategories] = React.useState({});
  const categoryNames = Object.keys(skills);
  const [activeCategories, setActiveCategories] = React.useState(() => Object.fromEntries(categoryNames.map(c => [c, true])));
  const [hoveredCard, setHoveredCard] = React.useState(null);
  const VISIBLE_THRESHOLD = 4;
  return (
    <div className="container mx-auto py-20 px-4">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About <span className="text-primary text-shadow-glow dark:text-dark-primary dark:text-shadow-dark-glow">Me</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto dark:text-gray-300">
          A relentless problem-solver driven by mathematics, competitive programming, and machine learning. I engineer high-performance software, delve into low-level systems, and optimize code with advanced CPU instructions. My goal is to build cutting-edge solutions across diverse domains, from Networks to AI.
        </p>
      </div>
      
      <div className="rounded-2xl animated-dots bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 p-4 md:p-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">My <span className="text-secondary dark:text-dark-secondary">Skills</span></h2>
        <div className="flex flex-wrap justify-center gap-2 mb-8" role="group" aria-label="Filter skill categories">
          <button
            type="button"
            onClick={() => setActiveCategories(Object.fromEntries(categoryNames.map(c => [c, true])))}
            className="px-4 py-2 rounded-full text-sm font-semibold transition duration-200 ease-in-out border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
            aria-pressed={Object.values(activeCategories).every(Boolean)}
          >
            All
          </button>
          {categoryNames.map((cat) => {
            const pressed = !!activeCategories[cat];
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategories(prev => ({ ...prev, [cat]: !prev[cat] }))}
                className={`${pressed ? 'bg-secondary text-white shadow' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600'} px-4 py-2 rounded-full text-sm font-semibold transition duration-200 ease-in-out hover:shadow`}
                aria-pressed={pressed}
                aria-label={`Toggle category ${cat}`}
              >
                {cat}
              </button>
            );
          })}
        </div>
        <AnimatePresence initial={false}>
        {Object.entries(skills).filter(([category]) => !!activeCategories[category]).map(([category, skillList], idx, arr) => (
          <React.Fragment key={category}>
          <motion.div
            className="mt-4 mb-16"
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <motion.h3 
              className="text-2xl font-bold text-accent mb-6 text-center dark:text-dark-accent inline-block hover:text-secondary dark:hover:text-dark-secondary transition duration-200 ease-in-out hover:drop-shadow"
              whileHover={{ scale: 1.05 }}
            >
              {category}
            </motion.h3>
            {(() => {
              const visibleSkills = skillList.slice(0, VISIBLE_THRESHOLD);
              const hiddenSkills = skillList.slice(VISIBLE_THRESHOLD);
              const isExpanded = !!expandedCategories[category];
              const toggleCategory = () => {
                setExpandedCategories(prev => ({
                  ...prev,
                  [category]: !prev[category]
                }));
              };
              const categoryId = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return (
                <div>
                  <motion.div 
                    className="flex flex-wrap justify-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                      visible: { transition: { staggerChildren: 0.05 } }
                    }}
                    role="list"
                    layout
                  >
                    {visibleSkills.map((skill, index) => {
                      const hasIcon = !!skill.icon;
                      return (
                        <motion.div 
                          key={index} 
                          className={`${hasIcon ? 'bg-white dark:bg-gray-800 text-text dark:text-dark-text' : 'bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-sky-800 text-gray-900 dark:text-gray-100'} group font-semibold py-3 px-6 rounded-lg m-2 shadow-[0_1px_6px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition flex items-center space-x-3`}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
                          }}
                          onHoverStart={() => setHoveredCard(`${category}-${index}`)}
                          onHoverEnd={() => setHoveredCard(null)}
                          animate={hoveredCard === `${category}-${index}` ? { y: -8, scale: 1.05, marginTop: 0, marginBottom: 16 } : { y: 0, scale: 1, marginTop: 8, marginBottom: 8 }}
                          transition={hoveredCard === `${category}-${index}` ? { type: 'spring', stiffness: 500, damping: 24 } : { duration: 0.12, ease: 'easeOut' }}
                          layout
                          role="listitem"
                        >
                          {hasIcon && <span aria-hidden="true" className="text-2xl filter transition duration-200 ease-in-out group-hover:brightness-110">{skill.icon}</span>}
                          <span>{skill.name}</span>
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  {hiddenSkills.length > 0 && (
                    <div className="flex flex-col items-center">
                      <button
                        onClick={toggleCategory}
                        className="mt-4 text-sm font-semibold text-accent hover:underline flex items-center gap-2 dark:text-dark-accent"
                        aria-expanded={isExpanded}
                        aria-controls={`hidden-${categoryId}`}
                      >
                        {isExpanded ? 'Show Less' : `Show ${hiddenSkills.length} More`}
                        <motion.span
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                          </svg>
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="w-full"
                            id={`hidden-${categoryId}`}
                          >
                            <motion.div
                              className="flex flex-wrap justify-center mt-2"
                              role="list"
                              initial="hidden"
                              animate="visible"
                              variants={{
                                visible: { transition: { staggerChildren: 0.05 } }
                              }}
                            >
                              {hiddenSkills.map((skill, index) => {
                                const hasIcon = !!skill.icon;
                                return (
                                  <motion.div 
                                    key={index} 
                                    className={`${hasIcon ? 'bg-white dark:bg-gray-800 text-text dark:text-dark-text' : 'bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-sky-800 text-gray-900 dark:text-gray-100'} group font-semibold py-3 px-6 rounded-lg m-2 shadow-[0_1px_6px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition flex items-center space-x-3`}
                                    variants={{
                                      hidden: { opacity: 0, y: 10 },
                                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
                                    }}
                                    exit={{ opacity: 0, y: -10 }}
                                    onHoverStart={() => setHoveredCard(`${category}-${VISIBLE_THRESHOLD + index}`)}
                                    onHoverEnd={() => setHoveredCard(null)}
                                    animate={hoveredCard === `${category}-${VISIBLE_THRESHOLD + index}` ? { y: -8, scale: 1.05, marginTop: 0, marginBottom: 16 } : { y: 0, scale: 1, marginTop: 8, marginBottom: 8 }}
                                    transition={hoveredCard === `${category}-${VISIBLE_THRESHOLD + index}` ? { type: 'spring', stiffness: 500, damping: 24 } : { duration: 0.12, ease: 'easeOut' }}
                                    layout
                                    role="listitem"
                                  >
                                    {hasIcon && <span aria-hidden="true" className="text-2xl filter transition duration-200 ease-in-out group-hover:brightness-110">{skill.icon}</span>}
                                    <span>{skill.name}</span>
                                  </motion.div>
                                );
                              })}
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              );
            })()}
          </motion.div>
          {idx < arr.length - 1 && <div className="soft-divider w-full mx-auto my-8" aria-hidden="true"></div>}
          </React.Fragment>
        ))}
        </AnimatePresence>
      </div>
      
      <div className="text-center">
        <motion.a 
          href="/resume.pdf" 
          download 
          className="group inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out dark:bg-dark-secondary dark:hover:bg-dark-secondary/90"
          whileHover="hover"
          initial={false}
        >
          <span>Download My Resume</span>
          <motion.span
            className="inline-flex"
            variants={{
              hover: {
                y: [0, -3, 0],
                transition: { duration: 0.4, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }
              }
            }}
          >
            <FiDownload className="w-5 h-5" />
          </motion.span>
        </motion.a>
      </div>
    </div>
  );
};

export default About;
