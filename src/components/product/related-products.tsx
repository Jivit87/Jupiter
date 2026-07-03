import type { Product } from '@/types';
import { ProductCardReal } from '@/components/shop/product-card-real';
import { cn } from '@/lib/utils';

type RelatedProductsProps = {
  products?: ReadonlyArray<Product>;
  className?: string;
};

export function RelatedProducts({ products, className }: RelatedProductsProps) {
  if (!products?.length) return null;

  return (
    <div className={cn('space-y-5', className)}>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#4B5563]">You may also like</p>
        <h2 className="mt-2 font-heading text-3xl text-black">Related pieces</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCardReal key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
