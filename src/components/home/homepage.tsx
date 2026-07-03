import { getSiteSettings } from '@/actions/settings';
import { getFeaturedProducts } from '@/actions/products';
import { normalizeSiteSettings } from '@/lib/site-settings';
import { isBuildPhase } from '@/lib/supabase/utils';
import { Hero } from './hero';
import { TrustFeatures } from './trust-features';
import { ExploreUniverse } from './explore-universe';
import { CuratedCollections } from './curated-collections';
import { HowToOrder } from './how-to-order';
import { WallOfLove } from './wall-of-love';
import { FollowJourney } from './follow-journey';
import { InstagramSection } from './instagram-section';
import { FeatureStrip } from './feature-strip';
import { FadeIn } from '@/components/ui/fade-in';

export async function HomePage() {
  const [settings, featuredProducts] = isBuildPhase()
    ? [{} as Record<string, unknown>, []]
    : await Promise.all([
        getSiteSettings().catch(() => ({} as Record<string, unknown>)),
        getFeaturedProducts(5).catch(() => []),
      ]);

  const siteSettings = normalizeSiteSettings(settings);

  return (
    <div>
      <Hero tagline={siteSettings.heroTagline} />
      <FadeIn delay={0.05}><TrustFeatures /></FadeIn>
      <FadeIn delay={0.05}><ExploreUniverse /></FadeIn>
      <FadeIn delay={0.05}><CuratedCollections products={featuredProducts} /></FadeIn>
      <FadeIn delay={0.05}><InstagramSection /></FadeIn>
      <FadeIn delay={0.05}><HowToOrder /></FadeIn>
      <FadeIn delay={0.05}><WallOfLove /></FadeIn>
      <FadeIn delay={0.05}><FollowJourney /></FadeIn>
      <FadeIn delay={0.05}><FeatureStrip /></FadeIn>
    </div>
  );
}
