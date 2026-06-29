'use client';

import Link from 'next/link';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteReview, toggleReviewFeatured } from '@/actions/reviews';

export function AdminReviewActions({ id, isFeatured }: { id: string; isFeatured: boolean }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const run = (fn: () => Promise<unknown>) => startTransition(async () => { await fn(); router.refresh(); });

  return (
    <div className="flex gap-2">
      <Link
        href={`/admin/reviews/${id}/edit`}
        className="rounded-lg border border-border px-2.5 py-1 text-xs text-text-primary hover:border-brand"
      >
        Edit
      </Link>
      <button disabled={isPending} onClick={() => run(() => toggleReviewFeatured(id))}
        className="rounded-lg border border-border px-2.5 py-1 text-xs text-text-primary hover:border-brand disabled:opacity-50">
        {isFeatured ? 'Unfeature' : 'Feature'}
      </button>
      <button disabled={isPending} onClick={() => { if (confirm('Delete review?')) run(() => deleteReview(id)); }}
        className="rounded-lg border border-red-200 px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50">
        Delete
      </button>
    </div>
  );
}
