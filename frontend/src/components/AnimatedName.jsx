import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const letterVariants = {
  initial: { y: -80, opacity: 0, rotate: 0 },
  drop: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 400, damping: 24 },
  },
};

/**
 * AnimatedName renders the provided text with:
 * - Per-letter drop-in animation
 * - Brief shuffle/jitter after drop
 * - Continuous shimmering gradient wave via CSS class on the wrapper
 */
const AnimatedName = ({ text = 'Roushan', className = '' }) => {
  const letters = useMemo(() => text.split(''), [text]);

  const [isShuffling, setIsShuffling] = useState(false);
  const [offsets, setOffsets] = useState(() =>
    letters.map(() => ({ x: 0, y: 0, r: 0 }))
  );

  useEffect(() => {
    const shuffleTimeout = setTimeout(() => {
      // Start shuffle phase
      setOffsets(
        letters.map(() => ({
          x: (Math.random() - 0.5) * 24,
          y: (Math.random() - 0.5) * 24,
          r: (Math.random() - 0.5) * 30,
        }))
      );
      setIsShuffling(true);

      // End shuffle, return to original layout
      const endTimeout = setTimeout(() => {
        setIsShuffling(false);
        setOffsets(letters.map(() => ({ x: 0, y: 0, r: 0 })));
      }, 600);

      return () => clearTimeout(endTimeout);
    }, 1100);

    return () => clearTimeout(shuffleTimeout);
  }, [letters]);

  return (
    <motion.span
      className={`inline-block align-baseline ${className}`}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {letters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className="inline-block letter-gradient"
          variants={letterVariants}
          initial="initial"
          animate={isShuffling ? { x: offsets[index].x, y: offsets[index].y, rotate: offsets[index].r, opacity: 1 } : 'drop'}
          transition={isShuffling ? { type: 'spring', stiffness: 220, damping: 16 } : undefined}
          style={{ animationDelay: `${index * -0.12}s` }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default AnimatedName;


