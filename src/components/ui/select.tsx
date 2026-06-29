import type { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  hint?: string;
};

export function Select({ className, label, hint, id, children, ...props }: SelectProps) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <label className="flex flex-col gap-2 text-sm text-text-primary" htmlFor={selectId}>
      {label ? <span className="font-medium">{label}</span> : null}
      <select
        id={selectId}
        className={cn(
          'min-h-11 w-full rounded-xl border border-border bg-starlight px-4 py-3 text-sm text-text-primary shadow-soft transition-colors',
          'focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {hint ? <span className="text-xs leading-5 text-text-muted">{hint}</span> : null}
    </label>
  );
}
