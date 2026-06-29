import Link from 'next/link';
import { cn } from '@/lib/utils';

type NavLink = {
  href: string;
  label: string;
};

type NavLinksProps = {
  items: ReadonlyArray<NavLink>;
  className?: string;
};

export function NavLinks({ items, className }: NavLinksProps) {
  return (
    <nav aria-label="Primary" className={cn('flex items-center gap-1', className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium text-text-primary transition-colors duration-200',
            'hover:bg-surface hover:text-primary',
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
