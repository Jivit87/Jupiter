import type { Metadata } from 'next';
import { getAllReviews } from '@/actions/reviews';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { ReviewsGrid } from '@/components/reviews';
import { buildMetadata } from '@/lib/seo';
import { isBuildPhase } from '@/lib/supabase/utils';

export const metadata: Metadata = buildMetadata({
  title: 'Wall of Love | Jupiter — Handmade in Nepal',
  description: 'Read what our customers say about Jupiter handmade jewelry and gifts made in Nepal.',
  path: '/reviews',
});

export default async function ReviewsPage() {
  const reviews = isBuildPhase() ? [] : await getAllReviews().catch(() => []);

  const rated = reviews.filter((r) => typeof r.rating === 'number');
  const avgRating = rated.length
    ? Math.round((rated.reduce((s, r) => s + (r.rating ?? 0), 0) / rated.length) * 10) / 10
    : null;

  return (
    <>
      <PageHeader
        eyebrow="Wall of Love"
        title="What our community says ✨"
        description="Real feedback from real customers — every review is personally verified."
      />

      {/* Stats bar */}
      {reviews.length > 0 && (
        <Section spacing="sm">
          <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-border bg-background px-6 py-4">
            {avgRating && (
              <div className="flex items-center gap-2">
                <span className="font-display text-3xl text-brand">{avgRating}</span>
                <div>
                  <div className="flex gap-0.5 text-brand">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} aria-hidden className={i < Math.round(avgRating) ? 'text-brand' : 'text-border'}>★</span>
                    ))}
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">avg rating</p>
                </div>
              </div>
            )}
            <div className="h-8 w-px bg-border" aria-hidden />
            <div>
              <p className="font-display text-3xl text-primary">{reviews.length}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">reviews</p>
            </div>
            <div className="h-8 w-px bg-border" aria-hidden />
            <div>
              <p className="font-display text-3xl text-primary">{reviews.length}+</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">happy customers</p>
            </div>
          </div>
        </Section>
      )}

      <Section spacing="md">
        {reviews.length > 0 ? (
          <ReviewsGrid reviews={reviews} />
        ) : (
          <div className="rounded-2xl border border-border bg-background px-6 py-10 text-center">
            <p className="font-heading text-2xl text-primary">No reviews published yet</p>
            <p className="mt-2 text-sm text-text-muted">
              We&apos;re collecting verified customer feedback and will share it here soon.
            </p>
          </div>
        )}
      </Section>
    </>
  );
}
