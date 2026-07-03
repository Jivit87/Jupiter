import type { Review } from '@/types';
import { StarRating } from '@/components/ui/star-rating';
import { cn } from '@/lib/utils';

type ProductReviewsProps = {
  reviews?: ReadonlyArray<Review>;
  className?: string;
};

export function ProductReviews({ reviews, className }: ProductReviewsProps) {
  return (
    <div className={cn('', className)}>
      <div className="space-y-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#4B5563]">Reviews</p>
          <h2 className="mt-2 font-heading text-3xl text-black">Customer feedback</h2>
        </div>

        <div className="flex flex-row md:grid md:grid-cols-2 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {(reviews?.length ? reviews : [null]).map((review, index) => (
            <div key={review?.id ?? `review-${index}`} className="w-[85vw] md:w-auto shrink-0 md:shrink rounded-sm border border-[#E5E7EB] bg-[#F9FAFB] p-6 snap-start">
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
