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
        className,
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
