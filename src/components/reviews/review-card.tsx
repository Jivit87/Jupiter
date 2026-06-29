import type { Review } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { StarRating } from '@/components/ui/star-rating';
import { cn } from '@/lib/utils';

type ReviewCardProps = {
  review: Pick<
    Review,
    'reviewerName' | 'reviewText' | 'rating' | 'reviewerImage' | 'reviewImage' | 'platform' | 'reviewDate'
  > & {
    linkedProductName?: string | null;
  };
  className?: string;
};

const platformToneMap = {
  whatsapp: 'brand',
  instagram: 'lavender',
  in_person: 'sage',
  other: 'neutral',
} as const;

const platformLabelMap = {
  whatsapp: 'WhatsApp',
  instagram: 'Instagram',
  in_person: 'In person',
  other: 'Other',
} as const;

export function ReviewCard({ review, className }: ReviewCardProps) {
  const tone = platformToneMap[review.platform ?? 'other'];
  const platformLabel = platformLabelMap[review.platform ?? 'other'];

  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <Badge tone={tone}>{platformLabel}</Badge>
            <div>
              <p className="font-medium text-primary">{review.reviewerName}</p>
              {review.reviewDate ? <p className="text-xs text-text-muted">{review.reviewDate}</p> : null}
            </div>
          </div>
          <StarRating value={review.rating ?? 5} />
        </div>

        <p className="text-sm leading-7 text-text-muted">“{review.reviewText}”</p>

        {review.reviewImage ? (
          <div className="rounded-2xl border border-border bg-earthy-cosmos p-4 text-xs uppercase tracking-[0.25em] text-text-muted">
            Review image shell
          </div>
        ) : null}

        {review.linkedProductName ? (
          <p className="text-xs uppercase tracking-[0.28em] text-text-muted">
            Linked product: {review.linkedProductName}
          </p>
        ) : null}
      </div>
    </Card>
  );
}
