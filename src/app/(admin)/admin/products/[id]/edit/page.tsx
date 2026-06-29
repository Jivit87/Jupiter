import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminPageFrame } from '@/components/admin/admin-page-frame';
import { ProductForm } from '@/components/admin/product-form';
import { getAdminProductById } from '@/actions/products';
import { getAdminCategories } from '@/actions/categories';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getAdminProductById(id);
  return { title: product ? `Edit: ${product.name} | Jupiter Admin` : 'Edit Product | Jupiter Admin' };
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const [product, categories] = await Promise.all([getAdminProductById(id), getAdminCategories()]);
  if (!product) notFound();
  return (
    <AdminPageFrame eyebrow="Products" title={`Edit: ${product.name}`} description="Update product details below.">
      <ProductForm product={product} categories={categories} />
    </AdminPageFrame>
  );
}
