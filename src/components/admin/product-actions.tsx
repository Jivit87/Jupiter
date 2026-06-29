'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteProduct, toggleProductPublished, duplicateProduct } from '@/actions/products';

export function AdminProductActions({ id, isPublished }: { id: string; isPublished: boolean }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function run(fn: () => Promise<unknown>) {
    startTransition(async () => { await fn(); router.refresh(); });
  }

  return (
    <div className="flex items-center gap-2">
      <button disabled={isPending} onClick={() => run(() => toggleProductPublished(id, !isPublished))}
        className="rounded-lg border border-border px-2.5 py-1 text-xs text-text-primary hover:border-brand disabled:opacity-50">
        {isPublished ? 'Unpublish' : 'Publish'}
      </button>
      <button disabled={isPending} onClick={() => run(() => duplicateProduct(id))}
        className="rounded-lg border border-border px-2.5 py-1 text-xs text-text-primary hover:border-brand disabled:opacity-50">
        Duplicate
      </button>
      <button disabled={isPending} onClick={() => { if (confirm('Delete this product?')) run(() => deleteProduct(id)); }}
        className="rounded-lg border border-red-200 px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50">
        Delete
      </button>
    </div>
  );
}
