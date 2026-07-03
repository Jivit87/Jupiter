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
        className="rounded-md border border-[#E5E7EB] bg-white px-3 py-1.5 text-[13px] font-medium text-black shadow-sm hover:bg-[#F9FAFB] transition-colors disabled:opacity-50">
        {isActive ? 'Deactivate' : 'Activate'}
      </button>
      <button disabled={isPending} onClick={() => { if (confirm('Delete this category?')) run(() => deleteCategory(id)); }}
        className="rounded-md border border-red-200 bg-white px-3 py-1.5 text-[13px] font-medium text-red-600 shadow-sm hover:bg-red-50 transition-colors disabled:opacity-50">
        Delete
      </button>
    </div>
  );
}
