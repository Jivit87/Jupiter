'use client';

import { useState, useEffect, useTransition, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { Review, Product } from '@/types';
import { createReview, updateReview } from '@/actions/reviews';
import { getAdminProducts } from '@/actions/products';

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
  const [reviewerImage, setReviewerImage] = useState(review?.reviewerImage ?? '');
  const [reviewImage, setReviewImage] = useState(review?.reviewImage ?? '');
  const [productId, setProductId] = useState(review?.productId ?? '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products for dropdown
  useEffect(() => {
    getAdminProducts().then(setProducts).catch(() => setProducts([]));
  }, []);

  const inputCls = 'w-full rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-black shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black';
  const labelCls = 'block text-sm font-medium text-[#6B7280] mb-1';
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
        reviewerImage: reviewerImage || undefined,
        reviewImage: reviewImage || undefined,
        productId: productId || undefined,
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
    <form onSubmit={handleSubmit} className="rounded-md border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <p className="mb-4 font-display text-xl font-semibold text-black">{title}</p>
      {error && <p className="mb-3 text-sm text-red-500">{error}</p>}
      {success && <p className="mb-3 text-sm text-green-600">{successLabel}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className={labelCls}>Reviewer name *</label>
          <input required value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} className={inputCls} />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Platform</label>
          <select value={platform} onChange={(e) => setPlatform(e.target.value as 'whatsapp' | 'instagram' | 'in_person' | 'other')} className={inputCls}>
            {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Rating (1–5)</label>
          <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} className={inputCls} />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Review date</label>
          <input type="date" value={reviewDate} onChange={(e) => setReviewDate(e.target.value)} className={inputCls} />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className={labelCls}>Review text *</label>
          <textarea required rows={3} value={reviewText} onChange={(e) => setReviewText(e.target.value)} className={inputCls} />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className={labelCls}>Reviewer image (Cloudinary URL)</label>
          <input value={reviewerImage} onChange={(e) => setReviewerImage(e.target.value)} placeholder="https://res.cloudinary.com/..." className={inputCls} />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className={labelCls}>Review image (Cloudinary URL)</label>
          <input value={reviewImage} onChange={(e) => setReviewImage(e.target.value)} placeholder="https://res.cloudinary.com/..." className={inputCls} />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className={labelCls}>Linked product (optional)</label>
          <select value={productId} onChange={(e) => setProductId(e.target.value)} className={inputCls}>
            <option value="">No product linked</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <label className="flex cursor-pointer items-center gap-3">
          <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="h-4 w-4 rounded border-[#E5E7EB]" />
          <span className="text-sm font-medium text-black">Feature on homepage</span>
        </label>
      </div>
      <button type="submit" disabled={isPending} className="mt-5 rounded-md bg-black px-5 py-2 text-sm font-medium text-white hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-60 transition-colors">
        {isPending ? 'Saving…' : buttonLabel}
      </button>
    </form>
  );
}
