import { getFeaturedReviews } from '@/actions/reviews';
import { getCategories } from '@/actions/categories';
import { readFeaturedProducts, readNewArrivals } from '@/lib/product-queries';
import { getSiteSettings } from '@/actions/settings';
import { normalizeSiteSettings } from '@/lib/site-settings';
import { Hero } from './hero';
import { CategoryGrid } from './category-grid';
import { FeatureList } from './feature-list';
import { BrandStoryStrip } from './brand-story-strip';
import { InstagramFeed } from './instagram-feed';
import { SectionFrame } from './section-frame';
import { ProductCardReal } from '@/components/shop/product-card-real';
import { ReviewCard } from '@/components/reviews/review-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export async function HomePage() {
  const [featured, newArrivals, reviews, categories, settings] = await Promise.all([
    readFeaturedProducts(6).catch(() => []),
    readNewArrivals(6).catch(() => []),
    getFeaturedReviews(3).catch(() => []),
    getCategories().catch(() => []),
    getSiteSettings().catch(() => ({} as Record<string, unknown>)),
  ]);
  const siteSettings = normalizeSiteSettings(settings);
  const featuredSectionTitle = siteSettings.featuredSectionTitle ?? 'Pieces Made with Magic';

  return (
    <div>
      <Hero tagline={siteSettings.heroTagline} />

      <CategoryGrid categories={categories} />

      {featured.length > 0 && (
        <SectionFrame
          eyebrow="Featured Products"
          title={featuredSectionTitle}
          description="Handpicked pieces from our collection, crafted with care in Nepal."
        >
          <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
            {featured.map((product) => (
              <div key={product.id} className="mb-4 break-inside-avoid">
                <ProductCardReal product={product} />
              </div>
            ))}
          </div>
          <div className="pt-4 text-center">
            <Button asChild variant="outline">
              <Link href="/shop">View all products</Link>
            </Button>
          </div>
        </SectionFrame>
      )}

      <FeatureList />

      <BrandStoryStrip />

      {newArrivals.length > 0 && (
        <SectionFrame
          eyebrow="New Arrivals"
          title="Fresh from the workshop"
          description="Latest pieces just added to the collection."
        >
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {newArrivals.map((product) => (
              <ProductCardReal key={product.id} product={product} />
            ))}
          </div>
        </SectionFrame>
      )}

      {reviews.length > 0 && (
        <SectionFrame
          eyebrow="Wall of Love"
          title="What they're saying ✨"
          description="Real feedback from our customers."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          <div className="pt-4 text-center">
            <Button asChild variant="outline">
              <Link href="/reviews">See all reviews</Link>
            </Button>
          </div>
        </SectionFrame>
      )}

      <InstagramFeed handle={siteSettings.instagramHandle} />
    </div>
  );
}
