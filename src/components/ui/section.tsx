import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';

const sectionSpacing = {
  sm: 'py-8 sm:py-16',
  md: 'py-10 sm:py-20',
  lg: 'py-12 sm:py-24',
  xl: 'py-16 sm:py-32',
} as const;

export type SectionSpacing = keyof typeof sectionSpacing;

type SectionProps<T extends ElementType = 'section'> = {
  as?: T;
  children: ReactNode;
  spacing?: SectionSpacing;
  container?: boolean;
  className?: string;
} & Omit<HTMLAttributes<HTMLElement>, 'as' | 'children' | 'className'>;

export function Section<T extends ElementType = 'section'>({
  as,
  children,
  spacing = 'lg',
  container = true,
  className,
  ...props
}: SectionProps<T>) {
  const Component = (as ?? 'section') as ElementType;

  const content = container ? <Container>{children}</Container> : children;

  return (
    <Component className={cn(sectionSpacing[spacing], className)} {...props}>
      {content}
    </Component>
  );
}
