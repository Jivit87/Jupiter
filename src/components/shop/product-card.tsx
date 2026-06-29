import { Card } from '@/components/ui/card';

type ProductCardProps = {
  title: string;
  category: string;
  priceLabel: string;
};

export function ProductCard({ title, category, priceLabel }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="min-h-72 bg-earthy-cosmos" />
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">{category}</p>
            <h3 className="mt-2 font-heading text-2xl text-primary">{title}</h3>
          </div>
          <span className="rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand">
            Wishlist
          </span>
        </div>
        <div className="flex items-center justify-between text-sm text-text-muted">
          <span>{priceLabel}</span>
          <span>View details</span>
        </div>
      </div>
    </Card>
  );
}
