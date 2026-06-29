import type { Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';

type ProductInfoProps = {
  product: Pick<
    Product,
    | 'name'
    | 'price'
    | 'description'
    | 'categoryId'
    | 'sku'
    | 'stockStatus'
    | 'isCustomizable'
    | 'isFeatured'
    | 'isNew'
    | 'isBestseller'
    | 'handmadeTime'
  > & {
    categoryName?: string | null;
  };
};

export function ProductInfo({ product }: ProductInfoProps) {
  const stockLabel =
    product.stockStatus === 'in_stock'
      ? 'In stock'
      : product.stockStatus === 'out_of_stock'
        ? 'Out of stock'
        : product.stockStatus === 'made_to_order'
          ? 'Made to order'
          : product.stockStatus === 'low_stock'
            ? 'Low stock'
            : 'Stock pending';

  return (
    <Card>
      <div className="space-y-6 p-6">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {product.isNew ? <Badge tone="brand">New</Badge> : null}
            {product.isFeatured ? <Badge tone="lavender">Featured</Badge> : null}
            {product.isBestseller ? <Badge tone="copper">Bestseller</Badge> : null}
            {product.isCustomizable ? <Badge tone="sage">Customizable</Badge> : null}
            <Badge tone="outline">{stockLabel}</Badge>
          </div>
          <div className="space-y-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted">
              {product.categoryName ?? 'Handmade collection'}
            </p>
            <h1 className="font-display text-4xl text-primary">{product.name}</h1>
          </div>
          <p className="text-sm leading-7 text-text-muted">
            {product.description ?? 'Product description shell reserved for the full product record.'}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Card className="bg-background">
            <div className="p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted">Price</p>
              <p className="mt-2 font-heading text-3xl text-primary">
                {typeof product.price === 'number' ? formatPrice(product.price) : 'Price on request'}
              </p>
            </div>
          </Card>
          <Card className="bg-background">
            <div className="p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted">Handmade time</p>
              <p className="mt-2 font-heading text-2xl text-primary">
                {product.handmadeTime ?? (product.stockStatus === 'made_to_order' ? 'Made to order' : 'On request')}
              </p>
            </div>
          </Card>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Primary action shell</Button>
          <Button variant="outline">Secondary action shell</Button>
        </div>

        {product.sku ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">SKU: {product.sku}</p>
        ) : null}
      </div>
    </Card>
  );
}
