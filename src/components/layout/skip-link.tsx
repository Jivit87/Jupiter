import { cn } from '@/lib/utils';

type SkipLinkProps = {
  href?: string;
  children?: string;
};

export function SkipLink({ href = '#main-content', children = 'Skip to content' }: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'sr-only',
        'focus:not-sr-only',
        'focus:fixed focus:left-4 focus:top-4 focus:z-50',
        'rounded-full bg-brand px-4 py-2 text-sm font-semibold text-starlight shadow-glow',
      )}
    >
      {children}
    </a>
  );
}
