import type { Metadata } from 'next';
import { AdminPageFrame } from '@/components/admin/admin-page-frame';
import { ProductForm } from '@/components/admin/product-form';
import { getAdminCategories } from '@/actions/categories';

export const metadata: Metadata = { title: 'New Product | Jupiter Admin' };

export default async function NewProductPage() {
  const categories = await getAdminCategories();
  return (
    <AdminPageFrame eyebrow="Products" title="Create a product" description="Fill in the details below.">
      <ProductForm categories={categories} />
    </AdminPageFrame>
  );
}
