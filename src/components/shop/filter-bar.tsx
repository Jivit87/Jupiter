import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const sortOptions = ['Newest First', 'Featured', 'Price: Low to High', 'Price: High to Low', 'Alphabetical'] as const;

type FilterBarProps = {
  className?: string;
};

export function FilterBar({ className }: FilterBarProps) {
  return (
    <Card className={cn('sticky top-24 z-20', className)}>
      <div className="space-y-5 p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">Filters</p>
            <h2 className="mt-2 font-heading text-2xl text-primary">Refine the collection</h2>
          </div>
          <div className="rounded-full border border-border bg-background px-4 py-2 text-sm text-text-muted">
            Search, filters, and sort slots ready for future data wiring
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {['All', 'Wire Jewelry', 'Rings', 'Mandala Art', 'Moon Lamps'].map((item) => (
            <span key={item} className="rounded-full border border-border bg-background px-3 py-1 text-sm text-text-muted">
              {item}
            </span>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {sortOptions.map((option) => (
            <span key={option} className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-text-muted">
              {option}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
