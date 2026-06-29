import type { Metadata } from 'next';
import { AdminPageFrame } from '@/components/admin/admin-page-frame';
import { AdminToolbar } from '@/components/admin/admin-toolbar';
import { getCustomOrderRequests } from '@/actions/custom-orders';
import { AdminOrderActions } from '@/components/admin/order-actions';
import { isBuildPhase } from '@/lib/supabase/utils';

export const metadata: Metadata = { title: 'Custom Orders | Jupiter Admin' };

const STATUS_LABELS: Record<string, string> = {
  pending: '🟡 Pending',
  in_progress: '🔵 In Progress',
  completed: '✅ Completed',
  declined: '❌ Declined',
};

export default async function AdminCustomOrdersPage() {
  const orders = isBuildPhase() ? [] : await getCustomOrderRequests();
  return (
    <AdminPageFrame eyebrow="Custom Orders" title="Custom orders" description={`${orders.length} requests`}>
      <div className="space-y-6">
        <AdminToolbar title="Request queue" description="Update status and add notes." />
        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-background/80">
              <tr>
                {['Description', 'Occasion', 'Budget', 'Status', 'Notes', 'Received', 'Actions'].map((col) => (
                  <th key={col} className="border-b border-border px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-sm text-text-muted">No custom orders yet.</td></tr>
              ) : orders.map((o) => (
                <tr key={o.id} className="border-b border-border last:border-0 hover:bg-background/50">
                  <td className="max-w-xs px-4 py-3 text-primary">
                    <span className="line-clamp-2">{o.description}</span>
                  </td>
                  <td className="px-4 py-3 text-text-muted">{o.occasion ?? '—'}</td>
                  <td className="px-4 py-3 text-text-muted">{o.budgetRange ?? '—'}</td>
                  <td className="px-4 py-3 text-text-muted">{STATUS_LABELS[o.status] ?? o.status}</td>
                  <td className="max-w-xs px-4 py-3 text-text-muted">
                    <span className="line-clamp-2">{o.adminNotes ?? '—'}</span>
                  </td>
                  <td className="px-4 py-3 text-text-muted">
                    {o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-NP') : '—'}
                  </td>
                  <td className="px-4 py-3"><AdminOrderActions id={o.id} currentStatus={o.status} currentNotes={o.adminNotes} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminPageFrame>
  );
}
