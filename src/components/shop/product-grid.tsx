import { ProductCard } from './product-card';

type ProductGridProps = {
  title?: string;
  products?: ReadonlyArray<{
    id: string;
    title: string;
    category: string;
    priceLabel: string;
  }>;
};

const products = [
  { id: 'wire-wrapped-ring', title: 'Wire wrapped ring', category: 'Wire Jewelry', priceLabel: 'NPR 1,200' },
  { id: 'moon-lamp', title: 'Moon lamp', category: 'Moon Lamps', priceLabel: 'Price on request' },
  { id: 'mandala-frame', title: 'Mandala frame', category: 'Mandala Art', priceLabel: 'NPR 3,800' },
  { id: 'custom-gift-box', title: 'Custom gift box', category: 'Custom Gifts', priceLabel: 'Price on request' },
  { id: 'copper-spiral-pendant', title: 'Copper spiral pendant', category: 'Wire Jewelry', priceLabel: 'NPR 950' },
  { id: 'brass-statement-ring', title: 'Brass statement ring', category: 'Rings', priceLabel: 'NPR 1,500' },
] as const;

export function ProductGrid({ title, products: productItems = products }: ProductGridProps) {
  return (
    <div className="space-y-5">
      {title ? (
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">{title}</p>
        </div>
      ) : null}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {productItems.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            category={product.category}
            priceLabel={product.priceLabel}
          />
        ))}
      </div>
    </div>
  );
}
