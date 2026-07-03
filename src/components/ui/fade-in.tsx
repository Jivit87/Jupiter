'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
};

export function FadeIn({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: 30 },
    right: { y: 0, x: -30 },
    none: { y: 0, x: 0 },
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directions[direction],
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
