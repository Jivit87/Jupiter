'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { deleteProduct, toggleProductPublished } from '@/actions/products';

export function AdminProductActions({ id, isPublished }: { id: string; isPublished: boolean }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function run(fn: () => Promise<unknown>) {
    startTransition(async () => { await fn(); router.refresh(); });
  }

  return (
    <div className="flex items-center gap-2">
      <button disabled={isPending} onClick={() => run(() => toggleProductPublished(id, !isPublished))}
        className="rounded-sm border border-[#E5E7EB] bg-white px-3 py-1.5 text-[13px] font-medium text-black shadow-sm hover:bg-[#F9FAFB] transition-colors disabled:opacity-50">
        {isPublished ? 'Unpublish' : 'Publish'}
      </button>
      <Link href={`/admin/products/${id}/edit`}
        className="rounded-sm border border-[#E5E7EB] bg-white px-3 py-1.5 text-[13px] font-medium text-black shadow-sm hover:bg-[#F9FAFB] transition-colors">
        Edit
      </Link>
      <button disabled={isPending} onClick={() => { if (confirm('Delete this product?')) run(() => deleteProduct(id)); }}
        className="rounded-sm border border-red-200 bg-white px-3 py-1.5 text-[13px] font-medium text-red-600 shadow-sm hover:bg-red-50 transition-colors disabled:opacity-50">
        Delete
      </button>
    </div>
  );
}
