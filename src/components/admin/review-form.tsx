'use client';

import { useState, useTransition, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { Review } from '@/types';
import { createReview, updateReview } from '@/actions/reviews';

const PLATFORMS = ['whatsapp', 'instagram', 'in_person', 'other'] as const;

type AdminReviewFormProps = {
  review?: Review;
};

export function AdminReviewForm({ review }: AdminReviewFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [reviewerName, setReviewerName] = useState(review?.reviewerName ?? '');
  const [reviewText, setReviewText] = useState(review?.reviewText ?? '');
  const [rating, setRating] = useState(String(review?.rating ?? '5'));
  const [platform, setPlatform] = useState<'whatsapp' | 'instagram' | 'in_person' | 'other'>(review?.platform ?? 'whatsapp');
  const [isFeatured, setIsFeatured] = useState(review?.isFeatured ?? false);
  const [reviewDate, setReviewDate] = useState(review?.reviewDate ?? '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const inputCls = 'w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand';
  const isEditing = Boolean(review?.id);
  const title = isEditing ? 'Edit review' : 'New review';
  const buttonLabel = isEditing ? 'Save review' : 'Add review';
  const successLabel = isEditing ? 'Review updated!' : 'Review added!';

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess(false);
    startTransition(async () => {
      const payload = {
        reviewerName,
        reviewText,
        rating: rating ? Number(rating) : undefined,
        platform,
        isFeatured,
        reviewDate: reviewDate || undefined,
      };
      const result = review?.id
        ? await updateReview(review.id, payload)
        : await createReview(payload);
      if (!result.success) {
        setError(result.error ?? 'Failed.');
        return;
      }
      if (!isEditing) {
        setReviewerName('');
        setReviewText('');
        setRating('5');
        setReviewDate('');
        setIsFeatured(false);
        setPlatform('whatsapp');
      }
      setSuccess(true); router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-background p-6">
      <p className="mb-4 font-heading text-xl text-primary">{title}</p>
      {error && <p className="mb-3 text-sm text-red-500">{error}</p>}
      {success && <p className="mb-3 text-sm text-green-600">{successLabel}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-primary">Reviewer name *</label>
          <input required value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} className={inputCls} />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-primary">Platform</label>
          <select value={platform} onChange={(e) => setPlatform(e.target.value as 'whatsapp' | 'instagram' | 'in_person' | 'other')} className={inputCls}>
            {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-primary">Rating (1–5)</label>
          <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} className={inputCls} />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-primary">Review date</label>
          <input type="date" value={reviewDate} onChange={(e) => setReviewDate(e.target.value)} className={inputCls} />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className="block text-sm font-medium text-primary">Review text *</label>
          <textarea required rows={3} value={reviewText} onChange={(e) => setReviewText(e.target.value)} className={inputCls} />
        </div>
        <label className="flex cursor-pointer items-center gap-3">
          <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="h-4 w-4 rounded border-border" />
          <span className="text-sm font-medium text-primary">Feature on homepage</span>
        </label>
      </div>
      <button type="submit" disabled={isPending} className="mt-4 rounded-2xl bg-primary px-5 py-2 text-sm font-semibold text-starlight disabled:opacity-60">
        {isPending ? 'Saving…' : buttonLabel}
      </button>
    </form>
  );
}
