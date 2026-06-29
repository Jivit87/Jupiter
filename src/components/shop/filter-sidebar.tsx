import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { cn } from '@/lib/utils';

type FilterSidebarProps = {
  className?: string;
};

export function FilterSidebar({ className }: FilterSidebarProps) {
  return (
    <Card className={cn(className)}>
      <div className="space-y-5 p-5">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">Filters</p>
          <h2 className="mt-2 font-heading text-2xl text-primary">Sidebar shell</h2>
        </div>

        <Select label="Category" defaultValue="">
          <option value="">All categories</option>
          <option value="wire-jewelry">Wire Jewelry</option>
          <option value="rings">Rings</option>
          <option value="mandala-art">Mandala Art</option>
        </Select>

        <Select label="Sort" defaultValue="">
          <option value="">Newest first</option>
          <option value="featured">Featured</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </Select>
      </div>
    </Card>
  );
}
