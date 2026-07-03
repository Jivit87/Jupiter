'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateCustomOrderRequestNotes, updateCustomOrderRequestStatus } from '@/actions/custom-orders';

type Status = 'pending' | 'in_progress' | 'completed' | 'declined';

type AdminOrderActionsProps = {
  id: string;
  currentStatus: Status;
  currentNotes?: string | null;
};

export function AdminOrderActions({ id, currentStatus, currentNotes }: AdminOrderActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [notes, setNotes] = useState(currentNotes ?? '');

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as Status;
    startTransition(async () => {
      await updateCustomOrderRequestStatus(id, newStatus, notes);
      router.refresh();
    });
  }

  function saveNotes() {
    startTransition(async () => {
      await updateCustomOrderRequestNotes(id, notes);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-end">
        <div className="flex-1 space-y-1">
          <label className="text-xs uppercase tracking-wider text-[#4B5563]">Status</label>
          <select
            value={currentStatus}
            disabled={isPending}
            onChange={handleStatusChange}
            className="w-full rounded-sm border border-[#E5E7EB] bg-white px-3 py-2 text-[13px] text-black shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="declined">Declined</option>
          </select>
        </div>
        <div className="flex-1 space-y-1">
          <label className="text-xs uppercase tracking-wider text-[#4B5563]">Notes</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Private admin notes..."
            className="w-full rounded-sm border border-[#E5E7EB] bg-white px-3 py-2 text-[13px] text-black shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
        <button
          type="button"
          disabled={isPending}
          onClick={saveNotes}
          className="rounded-sm border border-[#E5E7EB] bg-black px-4 py-2 text-[13px] font-medium text-white shadow-sm hover:bg-black/90 transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {isPending ? 'Saving...' : 'Save Notes'}
        </button>
      </div>
    </div>
  );
}
