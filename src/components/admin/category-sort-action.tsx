'use client';

import { useState, useTransition } from 'react';
import { updateCategory } from '@/actions/categories';

type CategorySortActionProps = {
  id: string;
  initialSortOrder?: number;
};

export function AdminCategorySortAction({ id, initialSortOrder = 0 }: CategorySortActionProps) {
  const [value, setValue] = useState(String(initialSortOrder));
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    startTransition(async () => {
      await updateCategory(id, { sortOrder: Number(value) });
    });
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-20 rounded-lg border border-border bg-background px-2 py-1 text-xs text-text-primary"
      />
      <button
        type="button"
        disabled={isPending}
        onClick={handleSave}
        className="rounded-lg border border-border px-2.5 py-1 text-xs text-text-primary hover:border-brand disabled:opacity-50"
      >
        Save
      </button>
    </div>
  );
}
