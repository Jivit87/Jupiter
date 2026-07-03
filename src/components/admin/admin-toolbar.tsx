import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type AdminToolbarProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export function AdminToolbar({ title, description, actions, className }: AdminToolbarProps) {
  return (
    <div className={cn("rounded-md border border-[#E5E7EB] bg-white p-5 shadow-sm", className)}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-black">{title}</h2>
          {description ? <p className="mt-1 max-w-2xl text-sm text-[#6B7280]">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
      </div>
    </div>
  );
}
