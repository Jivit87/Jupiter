import { cn } from '@/lib/utils';

type StarRatingProps = {
  value: number;
  max?: number;
  label?: string;
  className?: string;
};

export function StarRating({ value, max = 5, label, className }: StarRatingProps) {
  const clampedValue = Math.max(0, Math.min(value, max));

  return (
    <div className={cn('inline-flex items-center gap-1', className)} aria-label={label ?? `${clampedValue} out of ${max} stars`}>
      {Array.from({ length: max }, (_, index) => {
        const filled = index < clampedValue;
        return (
          <span
            key={`star-${index}`}
            aria-hidden
            className={cn('text-base leading-none', filled ? 'text-brand' : 'text-border')}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
