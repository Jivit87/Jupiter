import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'w-full rounded-lg border border-border bg-starlight px-4 py-3 text-base sm:text-base text-text-primary min-h-[128px]',
        'placeholder:text-text-muted/70 shadow-none transition-colors duration-200 ease-standard',
        'focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20 focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';
