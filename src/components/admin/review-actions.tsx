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
        className="rounded-md border border-[#E5E7EB] bg-white px-3 py-1.5 text-[13px] font-medium text-black shadow-sm hover:bg-[#F9FAFB] transition-colors"
      >
        Edit
      </Link>
      <button disabled={isPending} onClick={() => run(() => toggleReviewFeatured(id))}
        className="rounded-md border border-[#E5E7EB] bg-white px-3 py-1.5 text-[13px] font-medium text-black shadow-sm hover:bg-[#F9FAFB] transition-colors disabled:opacity-50">
        {isFeatured ? 'Unfeature' : 'Feature'}
      </button>
      <button disabled={isPending} onClick={() => { if (confirm('Delete review?')) run(() => deleteReview(id)); }}
        className="rounded-md border border-red-200 bg-white px-3 py-1.5 text-[13px] font-medium text-red-600 shadow-sm hover:bg-red-50 transition-colors disabled:opacity-50">
        Delete
      </button>
    </div>
  );
}
