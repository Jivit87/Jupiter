import type { Review } from '@/types';
import { ReviewCard } from './review-card';

type ReviewsGridProps = {
  reviews: ReadonlyArray<
    Pick<
      Review,
      'id' | 'reviewerName' | 'reviewText' | 'rating' | 'reviewerImage' | 'location' | 'platform' | 'reviewDate'
    > & {
      linkedProductName?: string | null;
    }
  >;
};

export function ReviewsGrid({ reviews }: ReviewsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
