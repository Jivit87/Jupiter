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

  const next: Record<string, Status> = {
    pending: 'in_progress',
    in_progress: 'completed',
  };

  const nextStatus = next[currentStatus];

  function advance() {
    if (!nextStatus) return;
    startTransition(async () => {
      await updateCustomOrderRequestStatus(id, nextStatus);
      router.refresh();
    });
  }

  function decline() {
    if (!confirm('Decline this request?')) return;
    startTransition(async () => {
      await updateCustomOrderRequestStatus(id, 'declined', notes);
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
    <div className="flex gap-2">
      {nextStatus && (
        <button disabled={isPending} onClick={advance}
          className="rounded-lg border border-border px-2.5 py-1 text-xs text-text-primary hover:border-brand disabled:opacity-50 capitalize">
          → {nextStatus.replace('_', ' ')}
        </button>
      )}
      {currentStatus !== 'declined' && currentStatus !== 'completed' && (
        <button disabled={isPending} onClick={decline}
          className="rounded-lg border border-red-200 px-2.5 py-1 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50">
          Decline
        </button>
      )}
      <div className="flex flex-col gap-2">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Admin note"
          rows={2}
          className="w-48 rounded-lg border border-border bg-background px-2 py-1 text-xs text-text-primary"
        />
        <button
          type="button"
          disabled={isPending}
          onClick={saveNotes}
          className="rounded-lg border border-border px-2.5 py-1 text-xs text-text-primary hover:border-brand disabled:opacity-50"
        >
          Save note
        </button>
      </div>
    </div>
  );
}
