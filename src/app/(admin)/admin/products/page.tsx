import type { Metadata } from 'next';
import Link from 'next/link';
import { AdminPageFrame } from '@/components/admin/admin-page-frame';
import { AdminToolbar } from '@/components/admin/admin-toolbar';
import { Button } from '@/components/ui/button';
import { getAdminProducts } from '@/actions/products';
import { AdminProductActions } from '@/components/admin/product-actions';
import { formatPrice } from '@/lib/utils';

export const metadata: Metadata = { title: 'Products | Jupiter Admin' };

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <AdminPageFrame eyebrow="Products" title="Products" description={`${products.length} products total`}>
      <div className="space-y-6">
        <AdminToolbar
          title="Product inventory"
          description="Create, edit, publish, and delete products."
          actions={
            <Button asChild variant="primary" size="sm">
              <Link href="/admin/products/new">Add product</Link>
            </Button>
          }
        />

        <div className="overflow-hidden rounded-2xl border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-background/80">
              <tr>
                {['Name', 'Category', 'Price', 'Stock', 'Published', 'Actions'].map((col) => (
                  <th key={col} className="border-b border-border px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-text-muted">
                    No products yet.{' '}
                    <Link href="/admin/products/new" className="text-brand underline">Add one.</Link>
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-background/50">
                    <td className="px-4 py-3 font-medium text-primary">
                      <Link href={`/admin/products/${p.id}/edit`} className="hover:underline">{p.name}</Link>
                    </td>
                    <td className="px-4 py-3 text-text-muted">{p.category?.name ?? '—'}</td>
                    <td className="px-4 py-3 text-text-muted">
                      {typeof p.price === 'number' ? formatPrice(p.price) : '—'}
                    </td>
                    <td className="px-4 py-3 text-text-muted">{p.stockStatus ?? '—'}</td>
                    <td className="px-4 py-3">{p.isPublished ? '✅' : '⬜'}</td>
                    <td className="px-4 py-3">
                      <AdminProductActions id={p.id} isPublished={p.isPublished ?? false} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminPageFrame>
  );
}
