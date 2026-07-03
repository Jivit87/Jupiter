import type { Review } from '@/types';
import { StarRating } from '@/components/ui/star-rating';
import { cn } from '@/lib/utils';

type ProductReviewsProps = {
  reviews?: ReadonlyArray<Review>;
  className?: string;
};

export function ProductReviews({ reviews, className }: ProductReviewsProps) {
  return (
    <div className={cn('border-t border-[#E5E7EB] pt-12', className)}>
      <div className="space-y-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#4B5563]">Reviews</p>
          <h2 className="mt-2 font-heading text-3xl text-black">Customer feedback</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {(reviews?.length ? reviews : [null]).map((review, index) => (
            <div key={review?.id ?? `review-${index}`} className="rounded-sm border border-[#E5E7EB] bg-[#F9FAFB] p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="font-medium text-black">{review?.reviewerName ?? 'Verified customer'}</p>
                <StarRating value={review?.rating ?? 5} />
              </div>
              <p className="mt-3 text-sm leading-7 text-[#4B5563]">
                {review?.reviewText ?? 'Verified reviews will appear here once they are published in the admin dashboard.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
