'use client';

import { useEffect, useId } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Card } from './card';

type DrawerProps = {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  onOpenChange: (open: boolean) => void;
  side?: 'left' | 'right';
  className?: string;
};

export function Drawer({
  open,
  title,
  description,
  children,
  onOpenChange,
  side = 'right',
  className,
}: DrawerProps) {
  const titleId = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    }

    if (!open) {
      return undefined;
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onOpenChange, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-primary/50 backdrop-blur-sm" role="presentation">
      <div
        aria-hidden
        className="absolute inset-0"
        onClick={() => onOpenChange(false)}
      />
      <Card
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          'absolute inset-y-0 z-10 flex w-[min(92vw,28rem)] flex-col rounded-none border-y-0 shadow-lift',
          side === 'right' ? 'right-0' : 'left-0',
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div className="space-y-1">
            <h2 id={titleId} className="font-heading text-2xl text-primary">
              {title}
            </h2>
            {description ? <p className="text-sm leading-6 text-text-muted">{description}</p> : null}
          </div>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} aria-label="Close drawer">
            Close
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </Card>
    </div>
  );
}
