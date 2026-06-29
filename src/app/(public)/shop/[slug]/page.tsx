import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductReviews } from '@/actions/reviews';
import { ProductImageGallery } from '@/components/product/product-image-gallery';
import { ProductInfo } from '@/components/product/product-info';
import { ProductDetails } from '@/components/product/product-details';
import { WhatsAppOrderButton } from '@/components/product/whatsapp-order-button';
import { ProductWishlistButton } from '@/components/product/wishlist-button';
import { ProductReviews } from '@/components/product/product-reviews';
import { RelatedProducts } from '@/components/product/related-products';
import { Section } from '@/components/ui/section';
import { ShareButton } from '@/components/ui/share-button';
import { Container } from '@/components/ui/container';
import { JsonLd } from '@/lib/json-ld';
import { buildProductJsonLd } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { readProductBySlug, readRelatedProducts } from '@/lib/product-queries';

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await readProductBySlug(slug).catch(() => null);
  if (!product) return { title: 'Not found' };

  return {
    title: product.metaTitle ?? `${product.name} | Jupiter — Handmade in Nepal`,
    description: product.metaDescription ?? product.description?.slice(0, 160) ?? siteConfig.description,
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160),
      images: product.images?.[0] ? [{ url: product.images[0], width: 1200, height: 630 }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await readProductBySlug(slug).catch(() => null);
  if (!product) notFound();

  const [reviews, related] = await Promise.all([
    getProductReviews(product.id),
    product.categoryId
      ? readRelatedProducts(product.id, product.categoryId, 4)
      : Promise.resolve([]),
  ]);

  const productUrl = `${siteConfig.url}/shop/${product.slug}`;

  const availabilityMap = {
    in_stock: 'InStock',
    low_stock: 'InStock',
    made_to_order: 'PreOrder',
    out_of_stock: 'OutOfStock',
  } as const;

  const jsonLd = buildProductJsonLd({
    name: product.name,
    description: product.description,
    imageUrls: product.images,
    price: product.price,
    availability: availabilityMap[product.stockStatus ?? 'in_stock'],
  });

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-background py-3">
        <Container>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/shop" className="hover:text-primary">Shop</Link></li>
              {product.category && (
                <>
                  <li aria-hidden>/</li>
                  <li>
                    <Link href={`/collections/${product.category.slug}`} className="hover:text-primary">
                      {product.category.name}
                    </Link>
                  </li>
                </>
              )}
              <li aria-hidden>/</li>
              <li className="text-primary" aria-current="page">{product.name}</li>
            </ol>
          </nav>
        </Container>
      </div>

      <Section spacing="md">
        <div className="grid gap-8 lg:grid-cols-2">
          <ProductImageGallery
            images={product.images}
            videoUrl={product.videoUrl}
            alt={product.name}
          />
          <div className="space-y-6">
            <ProductInfo product={{ ...product, categoryName: product.category?.name ?? null }} />
            <div className="flex flex-col gap-3">
              <WhatsAppOrderButton
                product={{ ...product, category: product.category ?? undefined }}
                productUrl={productUrl}
                className="w-full"
              />
              <div className="flex gap-3">
                <ProductWishlistButton product={product} className="flex-1" />
                <ShareButton url={productUrl} title={product.name} label="📤 Share" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section spacing="md">
        <ProductDetails
          details={[
            { label: 'Material', value: product.material },
            { label: 'Dimensions', value: product.dimensions },
            { label: 'Weight', value: product.weight },
            { label: 'Colors', value: product.colors?.join(', ') },
            { label: 'SKU', value: product.sku },
            { label: 'Handmade time', value: product.handmadeTime },
          ].filter((d): d is { label: string; value: string } => typeof d.value === 'string')}
        />
      </Section>

      {reviews.length > 0 && (
        <Section spacing="md">
          <ProductReviews reviews={reviews} />
        </Section>
      )}

      {related.length > 0 && (
        <Section spacing="md">
          <RelatedProducts products={related} />
        </Section>
      )}
    </>
  );
}
