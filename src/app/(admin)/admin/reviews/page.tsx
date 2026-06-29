import type { Metadata } from 'next';
import { AdminPageFrame } from '@/components/admin/admin-page-frame';
import { AdminToolbar } from '@/components/admin/admin-toolbar';
import { getAllReviews } from '@/actions/reviews';
import { AdminReviewActions } from '@/components/admin/review-actions';
import { AdminReviewForm } from '@/components/admin/review-form';

export const metadata: Metadata = { title: 'Reviews | Jupiter Admin' };

export default async function AdminReviewsPage() {
  const reviews = await getAllReviews();
  return (
    <AdminPageFrame eyebrow="Reviews" title="Reviews" description={`${reviews.length} reviews`}>
      <div className="space-y-6">
        <AdminToolbar title="Add review" description="Curate a customer review." />
        <AdminReviewForm />

        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-background/80">
              <tr>
                {['Reviewer', 'Text', 'Platform', 'Rating', 'Featured', 'Actions'].map((col) => (
                  <th key={col} className="border-b border-border px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reviews.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-sm text-text-muted">No reviews yet.</td></tr>
              ) : reviews.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-background/50">
                  <td className="px-4 py-3 font-medium text-primary">{r.reviewerName}</td>
                  <td className="max-w-xs px-4 py-3 text-text-muted">
                    <span className="line-clamp-1">{r.reviewText}</span>
                  </td>
                  <td className="px-4 py-3 text-text-muted">{r.platform ?? '—'}</td>
                  <td className="px-4 py-3 text-text-muted">{r.rating ?? '—'}</td>
                  <td className="px-4 py-3">{r.isFeatured ? '⭐' : '⬜'}</td>
                  <td className="px-4 py-3"><AdminReviewActions id={r.id} isFeatured={r.isFeatured ?? false} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminPageFrame>
  );
}
