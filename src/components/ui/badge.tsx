import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const badgeStyles = {
  black: 'bg-black text-white',
  amber: 'bg-amber-100 text-amber-800',
  gray: 'bg-[#F3F4F6] text-[#4B5563]',
  outline: 'border border-[#E5E7EB] bg-transparent text-[#4B5563]',
} as const;

export type BadgeTone = keyof typeof badgeStyles;

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone = 'gray', ...props }, ref) => {
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
