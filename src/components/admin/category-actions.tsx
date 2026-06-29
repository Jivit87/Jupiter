'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteCategory, updateCategory } from '@/actions/categories';

export function AdminCategoryActions({ id, isActive }: { id: string; isActive: boolean }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const run = (fn: () => Promise<unknown>) => startTransition(async () => { await fn(); router.refresh(); });

  return (
    <div className="flex gap-2">
      <button disabled={isPending} onClick={() => run(() => updateCategory(id, { isActive: !isActive }))}
        className="rounded-lg border border-border px-2.5 py-1 text-xs text-text-primary hover:border-brand disabled:opacity-50">
        {isActive ? 'Deactivate' : 'Activate'}
      </button>
      <button disabled={isPending} onClick={() => { if (confirm('Delete this category?')) run(() => deleteCategory(id)); }}
        className="rounded-lg border border-red-200 px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50">
        Delete
      </button>
    </div>
  );
}
