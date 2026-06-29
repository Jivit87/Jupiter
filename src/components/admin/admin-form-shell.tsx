import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

type AdminFormShellProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function AdminFormShell({ title, description, children }: AdminFormShellProps) {
  return (
    <Card>
      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted">Form shell</p>
          <h3 className="font-heading text-3xl text-primary">{title}</h3>
          <p className="max-w-3xl text-sm leading-7 text-text-muted">{description}</p>
        </div>
        {children}
      </div>
    </Card>
  );
}
