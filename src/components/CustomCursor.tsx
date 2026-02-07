'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Main cursor - no spring/debounce, instant tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Glow effect - with spring for smooth trailing effect
  const glowSpringConfig = { damping: 20, stiffness: 150 };
  const glowX = useSpring(cursorX, glowSpringConfig);
  const glowY = useSpring(cursorY, glowSpringConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A'
        || target.tagName === 'BUTTON'
        || target.closest('a')
        || target.closest('button')
        || target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleHoverStart);
    document.addEventListener('mouseout', handleHoverEnd);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
    };
  }, [cursorX, cursorY]);

  // Hide custom cursor on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Cursor glow - trailing with blur effect */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden lg:block"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full bg-indigo-500"
          style={{
            filter: 'blur(10px)',
          }}
          animate={{
            width: isHovering ? 30 : 40,
            height: isHovering ? 30 : 40,
            opacity: isVisible ? 0.8 : 0,
          }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 200,
          }}
        />
      </motion.div>

      {/* Main cursor dot - instant tracking, no debounce */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden mix-blend-difference lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: isHovering ? 8 : 16,
            height: isHovering ? 8 : 16,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 300,
          }}
        />
      </motion.div>
    </>
  );
};
