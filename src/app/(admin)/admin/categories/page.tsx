import type { Metadata } from 'next';
import { AdminPageFrame } from '@/components/admin/admin-page-frame';
import { AdminToolbar } from '@/components/admin/admin-toolbar';
import { getAdminCategories } from '@/actions/categories';
import { AdminCategoryActions } from '@/components/admin/category-actions';
import { AdminCategoryForm } from '@/components/admin/category-form';
import { AdminCategorySortAction } from '@/components/admin/category-sort-action';

export const metadata: Metadata = { title: 'Categories | Jupiter Admin' };

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories();
  return (
    <AdminPageFrame eyebrow="Categories" title="Categories" description={`${categories.length} categories total`}>
      <div className="space-y-6">
        <AdminToolbar title="Add category" description="Create a new product category." />
        <AdminCategoryForm />

        <div className="overflow-x-auto overflow-y-hidden rounded-sm border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-background/80">
              <tr>
                {['Name', 'Slug', 'Sort', 'Active', 'Actions'].map((col) => (
                  <th key={col} className="border-b border-border px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-text-muted">No categories yet.</td></tr>
              ) : categories.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-background/50">
                  <td className="px-4 py-3 font-medium text-primary">{c.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-text-muted">{c.slug}</td>
                  <td className="px-4 py-3 text-text-muted">
                    <AdminCategorySortAction id={c.id} initialSortOrder={c.sortOrder ?? 0} />
                  </td>
                  <td className="px-4 py-3">{c.isActive ? <i className="ri-checkbox-circle-fill text-green-500 text-lg" title="Active"></i> : <i className="ri-close-circle-line text-[#E5E7EB] text-lg"></i>}</td>
                  <td className="px-4 py-3"><AdminCategoryActions id={c.id} isActive={c.isActive ?? true} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminPageFrame>
  );
}
