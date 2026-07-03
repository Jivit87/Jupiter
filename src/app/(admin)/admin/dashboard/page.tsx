import type { Metadata } from 'next';
import Link from 'next/link';
import { AdminPageFrame } from '@/components/admin/admin-page-frame';
import { AdminSummaryGrid } from '@/components/admin/admin-summary-grid';
import { AdminToolbar } from '@/components/admin/admin-toolbar';
import { Button } from '@/components/ui/button';
import { getAdminProducts } from '@/actions/products';
import { getAllReviews } from '@/actions/reviews';
import { getCustomOrderRequests } from '@/actions/custom-orders';
import { isBuildPhase } from '@/lib/supabase/utils';

export const metadata: Metadata = { title: 'Admin Dashboard | Jupiter' };

export default async function AdminDashboardPage() {
  const [products, reviews, orders] = isBuildPhase()
    ? [[], [], []]
    : await Promise.all([getAdminProducts(), getAllReviews(), getCustomOrderRequests()]);

  const published = products.filter((p) => p.isPublished).length;
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const featuredReviews = reviews.filter((r) => r.isFeatured).length;

  const stats = [
    { label: 'Total products', value: String(products.length), note: `${published} published` },
    { label: 'Published', value: String(published), note: `${products.length - published} drafts` },
    { label: 'Pending orders', value: String(pendingOrders), note: `${orders.length} total requests` },
    { label: 'Featured reviews', value: String(featuredReviews), note: `${reviews.length} total reviews` },
  ];

  const recent = products.slice(0, 5);

  return (
    <AdminPageFrame eyebrow="Dashboard" title="Overview" description="Live snapshot of your Jupiter store.">
      <div className="space-y-6">
        <AdminSummaryGrid items={stats} />
        <AdminToolbar
          title="Quick actions"
          description={`${recent.length} most recent products`}
          actions={
            <>
              <Button asChild variant="primary" size="sm">
                <Link href="/admin/products/new">Add product</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/admin/custom-orders">View requests</Link>
              </Button>
            </>
          }
        />
        {recent.length > 0 && (
          <div className="overflow-hidden rounded-sm border border-border">
            <table className="min-w-full text-sm">
              <thead className="bg-background/80">
                <tr>
                  {['Name', 'Category', 'Stock', 'Published'].map((col) => (
                    <th key={col} className="border-b border-border px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-background/50">
                    <td className="px-4 py-3 font-medium text-primary">
                      <Link href={`/admin/products/${p.id}/edit`} className="hover:underline">{p.name}</Link>
                    </td>
                    <td className="px-4 py-3 text-text-muted">{p.category?.name ?? '—'}</td>
                    <td className="px-4 py-3 text-text-muted">{p.stockStatus ?? '—'}</td>
                    <td className="px-4 py-3">{p.isPublished ? <i className="ri-checkbox-circle-fill text-green-500 text-lg" title="Published"></i> : <i className="ri-close-circle-line text-[#E5E7EB] text-lg"></i>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminPageFrame>
  );
}
