import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SiteShellProps = {
  children: ReactNode;
  className?: string;
};

export function SiteShell({ children, className }: SiteShellProps) {
  return (
    <div
      className={cn(
        'relative min-h-[calc(100vh-1px)] overflow-hidden bg-background text-text-primary',
        'texture-paper',
        className,
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-earthy-cosmos opacity-30" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
