import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type AdminToolbarProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export function AdminToolbar({ title, description, actions, className }: AdminToolbarProps) {
  return (
    <Card className={cn(className)}>
      <div className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted">Admin surface</p>
          <h2 className="font-heading text-3xl text-primary">{title}</h2>
          {description ? <p className="max-w-2xl text-sm leading-7 text-text-muted">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </Card>
  );
}
