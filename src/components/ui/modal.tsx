'use client';

import { useEffect, useId } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Card } from './card';

type ModalProps = {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  onOpenChange: (open: boolean) => void;
  className?: string;
};

export function Modal({ open, title, description, children, onOpenChange, className }: ModalProps) {
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
    <div className="fixed inset-0 z-50 grid place-items-center bg-primary/50 px-4 py-6 backdrop-blur-sm" role="presentation">
      <div
        aria-hidden
        className="absolute inset-0"
        onClick={() => onOpenChange(false)}
      />
      <Card
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn('relative z-10 w-full max-w-2xl overflow-hidden', className)}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div className="space-y-1">
            <h2 id={titleId} className="font-heading text-2xl text-primary">
              {title}
            </h2>
            {description ? <p className="text-sm leading-6 text-text-muted">{description}</p> : null}
          </div>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} aria-label="Close dialog">
            Close
          </Button>
        </div>
        <div className="p-6">{children}</div>
      </Card>
    </div>
  );
}
