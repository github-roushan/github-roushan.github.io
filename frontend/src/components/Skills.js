import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FaAws } from 'react-icons/fa';
import {
  SiPython, SiCplusplus, SiOpenjdk, SiGo, SiRust, SiTypescript, SiPerl,
  SiSpringboot, SiReact, SiNodedotjs, SiFlutter, SiTensorflow, SiScikitlearn,
  SiBoost, SiSfml, SiJasmine, SiJunit5, SiSelenium,
  SiMongodb, SiNeo4J, SiMysql, SiPostgresql, SiInfluxdb,
  SiGooglecloud, SiFirebase, SiDocker, SiGit, SiApachecassandra, SiAmazondynamodb,
  SiKubernetes
} from 'react-icons/si';
import GrpcIcon from '../assets/GrpcIcon';
import ProtobufIcon from '../assets/ProtobufIcon';

// 1) Data Model (embedded as requested)
const skillsData = {
  skillsCategories: [
    {
      id: 'programmingLanguages',
      name: 'Programming Languages',
      previewSkills: ['Python', 'C++', 'Java', 'Go'],
      fullSkillsList: [
        { name: 'Python', iconId: 'SiPython', details: 'Versatile language for backend, data science, and scripting.' },
        { name: 'C++', iconId: 'SiCplusplus', details: 'High-performance language for systems, game development, and high-frequency trading.' },
        { name: 'Java', iconId: 'SiOpenjdk', details: 'Robust language for large-scale enterprise applications and Android development.' },
        { name: 'Golang', iconId: 'SiGo', details: 'Efficient language with excellent concurrency support, ideal for microservices.' },
        { name: 'Rust', iconId: 'SiRust', details: 'A systems programming language focused on safety, speed, and concurrency.' },
        { name: 'Typescript', iconId: 'SiTypescript', details: 'Adds static typing to JavaScript, enhancing scalability and code quality.' },
        { name: 'Perl', iconId: 'SiPerl', details: 'A scripting language known for its text manipulation capabilities.' }
      ]
    },
    {
      id: 'frameworks',
      name: 'Frameworks & Libraries',
      previewSkills: ['React', 'Spring Boot', 'Node.js'],
      fullSkillsList: [
        { name: 'Spring Boot', iconId: 'SiSpringboot', details: 'Simplifies the creation of production-grade, stand-alone Java applications.' },
        { name: 'React', iconId: 'SiReact', details: 'A JavaScript library for building user interfaces with a component-based approach.' },
        { name: 'Node.js', iconId: 'SiNodedotjs', details: 'A JavaScript runtime environment for server-side application development.' },
        { name: 'Flutter', iconId: 'SiFlutter', details: "Google's UI toolkit for building natively compiled applications from a single codebase." },
        { name: 'TensorFlow', iconId: 'SiTensorflow', details: 'An open-source machine learning framework for building and training models.' },
        { name: 'scikit-learn', iconId: 'SiScikitlearn', details: 'A popular Python library for machine learning, data mining, and data analysis.' },
        { name: 'LangChain', iconId: null, details: 'A framework for developing applications powered by language models.' },
        { name: 'Scapy', iconId: null, details: 'A powerful interactive packet manipulation program and library.' },
        { name: 'Boost', iconId: 'SiBoost', details: 'A set of high-quality, peer-reviewed C++ libraries.' },
        { name: 'SFML', iconId: 'SiSfml', details: 'Simple and Fast Multimedia Library for creating games and multimedia applications.' },
        { name: 'gRPC', iconId: 'GrpcIcon', details: 'A high-performance, open-source universal RPC framework.' },
        { name: 'Protobuf', iconId: 'ProtobufIcon', details: 'A language-neutral, platform-neutral, extensible mechanism for serializing structured data.' },
        { name: 'Jasmine', iconId: 'SiJasmine', details: 'A behavior-driven development framework for testing JavaScript code.' },
        { name: 'Mockito', iconId: null, details: 'A mocking framework for unit tests in Java.' },
        { name: 'JUnit', iconId: 'SiJunit5', details: 'A widely used unit testing framework for the Java programming language.' },
        { name: 'Selenium', iconId: 'SiSelenium', details: 'A powerful tool for automating web browsers for testing.' }
      ]
    },
    {
      id: 'databases',
      name: 'Databases',
      previewSkills: ['MongoDB', 'MySQL', 'PostgreSQL'],
      fullSkillsList: [
        { name: 'MongoDB', iconId: 'SiMongodb', details: 'A NoSQL database that stores data in flexible, JSON-like documents.' },
        { name: 'MySQL', iconId: 'SiMysql', details: 'An open-source relational database management system.' },
        { name: 'PostgreSQL', iconId: 'SiPostgresql', details: 'A powerful, open-source relational database with advanced features.' },
        { name: 'InfluxDB', iconId: 'SiInfluxdb', details: 'An open-source time series database for handling large volumes of data.' },
        { name: 'Neo4j', iconId: 'SiNeo4J', details: 'A popular graph database for storing and querying complex, connected data.' },
        { name: 'Cassandra', iconId: 'SiApachecassandra', details: 'A highly scalable, distributed NoSQL database for handling large amounts of data.' },
        { name: 'AWS DynamoDB', iconId: 'SiAmazondynamodb', details: 'A key-value and document database service offered by AWS.' }
      ]
    },
    {
      id: 'cloudDevOps',
      name: 'Cloud & DevOps',
      previewSkills: ['AWS', 'GCP', 'Docker', 'Kubernetes'],
      fullSkillsList: [
        { name: 'AWS', iconId: 'FaAws', details: 'Amazon Web Services, a comprehensive cloud computing platform.' },
        { name: 'GCP', iconId: 'SiGooglecloud', details: 'Google Cloud Platform, a suite of cloud computing services.' },
        { name: 'Firebase', iconId: 'SiFirebase', details: 'A mobile and web application development platform by Google.' },
        { name: 'Docker', iconId: 'SiDocker', details: 'A platform for developing, shipping, and running applications in containers.' },
        { name: 'Kubernetes', iconId: 'SiKubernetes', details: 'An open-source container orchestration system for automating deployment, scaling, and management.' },
        { name: 'Git', iconId: 'SiGit', details: 'A distributed version control system for tracking changes in source code.' }
      ]
    },
    {
      id: 'otherSkills',
      name: 'Other Technical Skills',
      previewSkills: ['System Design', 'Backend Development', 'Testing'],
      fullSkillsList: [
        { name: 'Backend Development', iconId: null, details: 'Expertise in server-side logic, APIs, and business logic implementation.' },
        { name: 'Frontend Development', iconId: null, details: 'Expertise in user-facing web development with a focus on UI/UX.' },
        { name: 'System Design', iconId: null, details: 'Designing and architecting complex software systems.' },
        { name: 'Distributed Systems', iconId: null, details: 'Building systems where components are on different networked computers.' },
        { name: 'Networking', iconId: null, details: 'Understanding of network protocols, security, and infrastructure.' },
        { name: 'Design Patterns', iconId: null, details: 'Knowledge of standard solutions to common software design problems.' },
        { name: 'Concurrency', iconId: null, details: 'Managing multiple computations at the same time for increased performance.' },
        { name: 'Testing', iconId: null, details: 'Implementing unit, integration, and end-to-end tests for quality assurance.' },
        { name: 'Machine Learning', iconId: null, details: 'Experience with building and deploying machine learning models.' }
      ]
    }
  ]
};

// 2) Icon mapping utility
const iconComponentMap = {
  SiPython,
  SiCplusplus,
  SiOpenjdk,
  SiGo,
  SiRust,
  SiTypescript,
  SiPerl,
  SiSpringboot,
  SiReact,
  SiNodedotjs,
  SiFlutter,
  SiTensorflow,
  SiScikitlearn,
  SiBoost,
  SiSfml,
  GrpcIcon,
  ProtobufIcon,
  SiJasmine,
  SiJunit5,
  SiSelenium,
  SiMongodb,
  SiNeo4J,
  SiMysql,
  SiPostgresql,
  SiInfluxdb,
  SiGooglecloud,
  SiFirebase,
  SiDocker,
  SiGit,
  SiApachecassandra,
  SiAmazondynamodb,
  SiKubernetes,
  FaAws
};

const getIconById = (iconId, className = 'w-6 h-6 text-primary dark:text-dark-primary') => {
  try {
    if (!iconId) return null;
    const Comp = iconComponentMap[iconId];
    if (!Comp) return null;
    return <Comp className={className} />;
  } catch (error) {
    return null;
  }
};

// 3) Small helpers
const findIconIdForSkillName = (category, skillName) => {
  const match = category.fullSkillsList.find(s => s.name === skillName);
  return match ? match.iconId : null;
};

// 4) UI Components
const SkillTile = ({ category, onSelect }) => {
  const previewIcons = useMemo(() => {
    return (category.previewSkills || []).map(name => getIconById(
      findIconIdForSkillName(category, name),
      'w-6 h-6 md:w-7 md:h-7 text-primary dark:text-dark-primary'
    ));
  }, [category]);

  return (
    <motion.button
      onClick={() => onSelect(category.id)}
      className="w-full h-full rounded-xl bg-white/80 dark:bg-zinc-900/80 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50 p-4 flex flex-col justify-between hover:shadow-md transition-shadow"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="text-left">
        <div className="text-xs tracking-wide text-zinc-500 dark:text-zinc-400 uppercase">Category</div>
        <div className="text-lg md:text-xl font-semibold mt-1 text-zinc-800 dark:text-zinc-100">{category.name}</div>
      </div>
      <div className="flex gap-3 mt-4 flex-wrap">
        {previewIcons.map((icon, idx) => (
          <div key={idx} className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
            {icon || <span className="text-xs text-zinc-400">N/A</span>}
          </div>
        ))}
      </div>
    </motion.button>
  );
};

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 }
};

const SkillTilesGrid = ({ categories, onSelect }) => {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      variants={gridContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {categories.map((cat, index) => {
        const sizeClass = index % 7 === 0 ? 'sm:col-span-2 sm:row-span-2' : index % 5 === 0 ? 'sm:col-span-2' : '';
        return (
          <motion.div key={cat.id} variants={gridItemVariants} className={`${sizeClass} pointer-events-auto`}>
            <SkillTile category={cat} onSelect={onSelect} />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

const SkillCard = ({ skill }) => {
  return (
    <motion.div
      layout
      className="h-28 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 bg-white/80 dark:bg-zinc-900/80 p-4 flex items-center gap-4 overflow-hidden"
    >
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 shrink-0">
        {getIconById(skill.iconId, 'w-6 h-6 text-primary dark:text-dark-primary') || (
          <span className="text-xs text-zinc-400">N/A</span>
        )}
      </div>
      <div className="min-w-0">
        <div className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">{skill.name}</div>
        <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2">{skill.details}</div>
      </div>
    </motion.div>
  );
};

const SkillListCycler = ({ skills }) => {
  const controls = useAnimation();
  const listRef = useRef(null);
  const [items, setItems] = useState(skills);

  useEffect(() => {
    setItems(skills);
  }, [skills]);

  useEffect(() => {
    let isActive = true;
    const pause = (ms) => new Promise((r) => setTimeout(r, ms));

    const loop = async () => {
      // wait for first paint
      await pause(50);
      while (isActive) {
        const el = listRef.current;
        if (!el || el.children.length === 0) {
          await pause(250);
          continue;
        }

        let stepPx = 0;
        if (el.children.length > 1) {
          const a = el.children[0].getBoundingClientRect();
          const b = el.children[1].getBoundingClientRect();
          stepPx = Math.max(1, Math.round(b.top - a.top));
        } else {
          stepPx = Math.round(el.children[0].getBoundingClientRect().height);
        }

        await controls.start({ y: -stepPx, transition: { duration: 0.7, ease: 'easeInOut' } });
        await pause(200);
        if (!isActive) break;
        controls.set({ y: 0 });
        setItems((prev) => {
          if (!prev || prev.length === 0) return prev;
          const [first, ...rest] = prev;
          return [...rest, first];
        });
      }
    };

    loop();
    return () => {
      isActive = false;
      controls.stop();
    };
  }, [controls, skills]);

  return (
    <div className="relative h-[60vh] overflow-hidden">
      <motion.div animate={controls} className="will-change-transform">
        <div ref={listRef} className="space-y-3">
          {items.map((s, idx) => (
            <SkillCard key={`${s.name}-${idx}`} skill={s} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const ExpandedSkillView = ({ category, onClose }) => {
  const modalRoot = useMemo(() => {
    let el = document.getElementById('modal-root');
    if (!el) {
      el = document.createElement('div');
      el.id = 'modal-root';
      document.body.appendChild(el);
    }
    return el;
  }, []);

  return createPortal(
    (
      <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-md" onClick={onClose} />
        <div className="relative z-10 h-full w-full flex items-center justify-center p-4 sm:p-6">
          <motion.div
            className="w-full max-w-6xl h-[80vh] rounded-2xl bg-white/90 dark:bg-zinc-900/90 border border-zinc-200/60 dark:border-zinc-700/60 shadow-xl overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 140, damping: 18 }}
          >
            <div className="absolute top-3 right-3">
              <button
                onClick={onClose}
                className="h-10 w-10 rounded-lg bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                ✕
              </button>
            </div>

            <div className="h-full grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 md:p-8 flex items-center justify-center bg-gradient-to-br from-zinc-50/80 to-white/80 dark:from-zinc-950/80 dark:to-zinc-900/80">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-center md:text-left"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0, color: ['#0ea5e9', '#22c55e', '#a855f7', '#0ea5e9'] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  {category.name}
                </motion.h2>
              </div>
              <div className="p-6 md:p-8">
                <SkillListCycler skills={category.fullSkillsList} />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    ),
    modalRoot
  );
};

// 5) Root Component orchestrating states and transitions
const Skills = () => {
  const [state, setState] = useState('grid'); // 'grid' | 'expanded'
  const [selectedTileId, setSelectedTileId] = useState(null);
  const [gridKey, setGridKey] = useState(0);
  const [pageKey, setPageKey] = useState(0);

  const categories = skillsData.skillsCategories;
  const selectedCategory = useMemo(
    () => categories.find(c => c.id === selectedTileId) || null,
    [categories, selectedTileId]
  );

  const handleSelect = useCallback((tileId) => {
    setSelectedTileId(tileId);
    setState('expanded');
  }, []);

  const handleClose = useCallback(() => {
    setState('grid');
    setSelectedTileId(null);
    setGridKey(k => k + 1);
    setPageKey(pk => pk + 1);
  }, []);

  return (
    <div key={pageKey} className="container mx-auto px-4 md:px-6 py-24">
      <div className="mb-8 md:mb-12">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Skills
        </motion.h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-3 max-w-2xl">
          Explore my toolkit by category. Click a tile to dive deeper into the full list with details.
        </p>
      </div>

      <SkillTilesGrid key={gridKey} categories={categories} onSelect={handleSelect} />

      <AnimatePresence mode="wait">
        {state === 'expanded' && selectedCategory && (
          <ExpandedSkillView category={selectedCategory} onClose={handleClose} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Skills;


