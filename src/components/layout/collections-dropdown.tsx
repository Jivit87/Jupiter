import Link from 'next/link';
import type { Category } from '@/types';
import { cn } from '@/lib/utils';
import { getCatalogCategories } from '@/lib/catalog';

type CollectionsDropdownProps = {
  categories?: Category[];
  className?: string;
};

export function CollectionsDropdown({ categories, className }: CollectionsDropdownProps) {
  const items = getCatalogCategories(categories);

  return (
    <details className={cn('group relative', className)}>
      <summary className={cn(
        'list-none rounded-full px-4 py-2 text-sm font-medium text-text-primary transition-colors duration-200',
        'cursor-pointer hover:bg-surface hover:text-primary',
        'marker:hidden [&::-webkit-details-marker]:hidden',
      )}>
        Collections
      </summary>

      <div className="absolute left-0 top-[calc(100%+0.5rem)] z-50 w-[min(34rem,90vw)] rounded-2xl border border-border bg-starlight p-3 shadow-lift">
        <div className="grid gap-2 sm:grid-cols-2">
          {items.map((category) => (
            <Link
              key={category.slug}
              href={`/collections/${category.slug}`}
              className={cn(
                'rounded-xl border border-transparent px-4 py-3 transition-colors duration-200',
                'hover:border-brand/20 hover:bg-background',
              )}
            >
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand/10 text-lg">
                  {category.emoji}
                </span>
                <div className="space-y-1">
                  <p className="font-medium text-primary">{category.name}</p>
                  <p className="text-sm leading-6 text-text-muted">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </details>
  );
}
