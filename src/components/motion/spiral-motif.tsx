'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type SpiralMotifProps = {
  className?: string;
  animated?: boolean;
};

export function SpiralMotif({ className, animated = true }: SpiralMotifProps) {
  const icon = (
    <svg viewBox="0 0 120 120" fill="none" role="img" aria-label="Spiral motif" className={cn('h-full w-full', className)}>
      <path
        d="M60 18c-16.6 0-30 13.4-30 30 0 15 11.6 27.3 26.3 29.5 2.9.4 5.9.5 8.8.1 11.9-1.5 21.4-11.2 21.4-23.4 0-10.8-8.8-19.6-19.6-19.6-9.8 0-17.8 8-17.8 17.8 0 8.8 7.1 15.9 15.9 15.9 7.8 0 14.1-6.3 14.1-14.1"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="2" strokeOpacity="0.18" />
    </svg>
  );

  if (!animated) {
    return icon;
  }

  return (
    <motion.div animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} className={cn('will-change-transform', className)}>
      {icon}
    </motion.div>
  );
}
