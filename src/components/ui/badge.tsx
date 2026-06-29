import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const badgeStyles = {
  neutral: 'bg-primary/10 text-primary',
  brand: 'bg-brand/15 text-brand',
  sage: 'bg-sage/15 text-sage',
  lavender: 'bg-lavender/15 text-lavender',
  copper: 'bg-copper/15 text-copper',
  outline: 'border border-border bg-transparent text-text-primary',
} as const;

export type BadgeTone = keyof typeof badgeStyles;

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone = 'neutral', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide',
          badgeStyles[tone],
          className,
        )}
        {...props}
      />
    );
  },
);

Badge.displayName = 'Badge';
