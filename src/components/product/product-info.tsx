import type { Product } from '@/types';
import { Badge } from '@/components/ui/badge';
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
    <div className="space-y-6 lg:pl-6">
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {product.isNew ? <Badge tone="amber">New</Badge> : null}
            {product.isFeatured ? <Badge tone="outline">Featured</Badge> : null}
            {product.isBestseller ? <Badge tone="black">Bestseller</Badge> : null}
            {product.isCustomizable ? <Badge tone="gray">Customizable</Badge> : null}
            <Badge tone="outline">{stockLabel}</Badge>
          </div>
          <div className="space-y-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#4B5563]">
              {product.categoryName ?? 'Handmade collection'}
            </p>
            <h1 className="font-display leading-tight text-black tracking-[0.005em] text-[clamp(1.875rem,5vw,2.5rem)]">{product.name}</h1>
          </div>
          <p className="text-sm leading-7 text-[#4B5563]">
            {product.description ?? 'Product description shell reserved for the full product record.'}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-sm border border-[#E5E7EB] bg-[#F9FAFB] p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#4B5563]">Price</p>
            <p className="mt-2 font-heading text-3xl text-black">
              {typeof product.price === 'number' ? formatPrice(product.price) : 'Price on request'}
            </p>
          </div>
          <div className="rounded-sm border border-[#E5E7EB] bg-[#F9FAFB] p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#4B5563]">Handmade time</p>
            <p className="mt-2 font-heading text-2xl text-black">
              {product.handmadeTime ?? (product.stockStatus === 'made_to_order' ? 'Made to order' : 'On request')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
