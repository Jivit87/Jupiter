'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type SlideInProps = {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
};

const offsets = {
  left: { x: -24, y: 0 },
  right: { x: 24, y: 0 },
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
} as const;

export function SlideIn({ children, className, direction = 'up', delay = 0 }: SlideInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
