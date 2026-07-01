import { getSiteSettings } from '@/actions/settings';
import { normalizeSiteSettings } from '@/lib/site-settings';
import { isBuildPhase } from '@/lib/supabase/utils';
import { Hero } from './hero';
import { TrustFeatures } from './trust-features';
import { ExploreUniverse } from './explore-universe';
import { CuratedCollections } from './curated-collections';
import { FreshWorkshop } from './fresh-workshop';
import { HowToOrder } from './how-to-order';
import { WallOfLove } from './wall-of-love';
import { FollowJourney } from './follow-journey';
import { FeatureStrip } from './feature-strip';

export async function HomePage() {
  const settings = isBuildPhase()
    ? ({} as Record<string, unknown>)
    : await getSiteSettings().catch(() => ({} as Record<string, unknown>));

  const siteSettings = normalizeSiteSettings(settings);
  void siteSettings;

  return (
    <div>
      <Hero />
      <TrustFeatures />
      <ExploreUniverse />
      <CuratedCollections />
      <FreshWorkshop />
      <HowToOrder />
      <WallOfLove />
      <FollowJourney />
      <FeatureStrip />
    </div>
  );
}
