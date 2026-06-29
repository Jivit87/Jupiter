import type { Review } from '@/types';
import { Card } from '@/components/ui/card';
import { StarRating } from '@/components/ui/star-rating';
import { cn } from '@/lib/utils';

type ProductReviewsProps = {
  reviews?: ReadonlyArray<Review>;
  className?: string;
};

export function ProductReviews({ reviews, className }: ProductReviewsProps) {
  return (
    <Card className={cn(className)}>
      <div className="space-y-5 p-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted">Reviews</p>
          <h2 className="mt-2 font-heading text-3xl text-primary">Wall of love shell</h2>
        </div>

        <div className="grid gap-4">
          {(reviews?.length ? reviews : [null]).map((review, index) => (
            <div key={review?.id ?? `review-${index}`} className="rounded-2xl border border-border bg-background p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="font-medium text-primary">{review?.reviewerName ?? 'Verified customer'}</p>
                <StarRating value={review?.rating ?? 5} />
              </div>
              <p className="mt-3 text-sm leading-7 text-text-muted">
                {review?.reviewText ?? 'Verified reviews will appear here once they are published in the admin dashboard.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
