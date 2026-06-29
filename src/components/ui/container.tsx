import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const containerSizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-none',
} as const;

export type ContainerSize = keyof typeof containerSizes;

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: ContainerSize;
};

export function Container({ className, size = 'xl', ...props }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', containerSizes[size], className)} {...props} />
  );
}
