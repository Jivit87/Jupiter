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
import { getProductBySlug, getRelatedProducts, getAllProductSlugs } from '@/actions/products';

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const slugs = await getAllProductSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
  const params = await props.params;
  const product = await getProductBySlug(params.slug).catch(() => null);
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
  const product = await getProductBySlug(slug).catch(() => null);
  if (!product) notFound();

  const [reviews, related] = await Promise.all([
    getProductReviews(product.id),
    getRelatedProducts(product.id, product.categoryId || '', 4).catch(() => []),
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
      <div className="border-b border-[#E5E7EB] bg-white py-3">
        <Container>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#4B5563]">
              <li><Link href="/" className="hover:text-black">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/shop" className="hover:text-black">Shop</Link></li>
              {product.category && (
                <>
                  <li aria-hidden>/</li>
                  <li>
                    <Link href={`/collections/${product.category.slug}`} className="hover:text-black">
                      {product.category.name}
                    </Link>
                  </li>
                </>
              )}
              <li aria-hidden>/</li>
              <li className="text-black" aria-current="page">{product.name}</li>
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
                <ShareButton url={productUrl} title={product.name} label="Share" />
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
