import { Card } from '@/components/ui/card';
import { categories } from '@/config/categories';
import { cn } from '@/lib/utils';

type CategoryShellProps = {
  slug: string;
};

export function CategoryShell({ slug }: CategoryShellProps) {
  const category = categories.find((item) => item.slug === slug);

  return (
    <Card className="overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className={cn('min-h-72 bg-earthy-cosmos')}>
          <div className="flex h-full items-end p-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted">
                Category shell
              </p>
              <h1 className="mt-3 font-display text-4xl text-primary">
                {category?.name ?? 'Collection'}
              </h1>
            </div>
          </div>
        </div>
        <div className="space-y-4 p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted">Category detail</p>
          <p className="font-heading text-3xl text-primary">
            {category?.description ?? 'A collection shell for future category-driven product listings.'}
          </p>
          <p className="text-sm leading-7 text-text-muted">
            This page is ready for category filtering, metadata, and product listing behavior later.
          </p>
        </div>
      </div>
    </Card>
  );
}
