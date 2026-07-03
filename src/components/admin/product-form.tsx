'use client';

import { useState, useTransition, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { Product, Category } from '@/types';
import { createProduct, updateProduct } from '@/actions/products';
import { CloudinaryUploader } from './cloudinary-uploader';
import { generateSlug } from '@/lib/utils';

type ProductFormProps = {
  product?: Product;
  categories: Category[];
};

const STOCK_OPTIONS = [
  { value: 'in_stock', label: 'In Stock' },
  { value: 'out_of_stock', label: 'Out of Stock' },
  { value: 'made_to_order', label: 'Made to Order' },
  { value: 'low_stock', label: 'Low Stock' },
] as const;

export function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const isEdit = Boolean(product?.id);

  const [name, setName] = useState(product?.name ?? '');
  const [slug, setSlug] = useState(product?.slug ?? '');
  const [slugManual] = useState(false);
  const [price, setPrice] = useState(product?.price?.toString() ?? '');
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [material, setMaterial] = useState(product?.material ?? '');
  const [sku, setSku] = useState(product?.sku ?? '');
  const [handmadeTime, setHandmadeTime] = useState(product?.handmadeTime ?? '');
  const [videoUrl, setVideoUrl] = useState(product?.videoUrl ?? '');
  const [stockStatus, setStockStatus] = useState<'in_stock' | 'out_of_stock' | 'made_to_order' | 'low_stock'>(product?.stockStatus ?? 'in_stock');
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [isCustomizable, setIsCustomizable] = useState(product?.isCustomizable ?? false);
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured ?? false);
  const [isNew, setIsNew] = useState(product?.isNew ?? false);
  const [isBestseller, setIsBestseller] = useState(product?.isBestseller ?? false);
  const [isPublished, setIsPublished] = useState(product?.isPublished ?? false);

  function handleNameChange(value: string) {
    setName(value);
    if (!slugManual) setSlug(generateSlug(value));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    const data = {
      name,
      slug: slug || generateSlug(name),
      price: price ? Number(price) : undefined,
      categoryId: categoryId || undefined,
      description: description || undefined,
      material: material || undefined,
      sku: sku.trim() || (!isEdit ? `JUP-${Date.now().toString(36).toUpperCase()}` : undefined),
      handmadeTime: handmadeTime || undefined,
      videoUrl: videoUrl || undefined,
      stockStatus,
      images: images,
      isCustomizable,
      isFeatured,
      isNew,
      isBestseller,
      isPublished,
    };

    startTransition(async () => {
      const result = isEdit
        ? await updateProduct(product!.id, data)
        : await createProduct(data);

      if (!result.success) {
        setError(result.error ?? 'Something went wrong.');
        return;
      }
      router.push('/admin/products');
    });
  }

  const inputCls = 'w-full rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-black shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black';
  const labelCls = 'block text-sm font-medium text-[#6B7280] mb-1';
  const toggleCls = (on: boolean) =>
    `relative inline-flex h-5 w-9 cursor-pointer rounded-full transition-colors ${on ? 'bg-black' : 'bg-[#E5E7EB]'}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {/* Basic Info */}
      <section className="space-y-4">
        <h3 className="font-display text-xl font-semibold text-black">Basic Info</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="name" className={labelCls}>Name *</label>
            <input id="name" value={name} onChange={(e) => handleNameChange(e.target.value)} required className={inputCls} />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="price" className={labelCls}>Price (NPR)</label>
            <input id="price" type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Leave blank for 'Price on request'" className={inputCls} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="category" className={labelCls}>Category</label>
            <select id="category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={inputCls}>
              <option value="">No category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="sku" className={labelCls}>Product Code / ID (Optional)</label>
            <input id="sku" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="Auto-generates if left blank" className={inputCls} />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="stock" className={labelCls}>Stock status</label>
            <select id="stock" value={stockStatus} onChange={(e) => setStockStatus(e.target.value as 'in_stock' | 'out_of_stock' | 'made_to_order' | 'low_stock')} className={inputCls}>
              {STOCK_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label htmlFor="handmadeTime" className={labelCls}>Handmade time (e.g. 3–5 days)</label>
            <input id="handmadeTime" value={handmadeTime} onChange={(e) => setHandmadeTime(e.target.value)} className={inputCls} />
          </div>
        </div>
      </section>

      {/* Description & Details */}
      <section className="space-y-4">
        <h3 className="font-display text-xl font-semibold text-black">Description & Details</h3>
        <div className="space-y-1.5">
          <label htmlFor="description" className={labelCls}>Description</label>
          <textarea id="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className={inputCls} />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="material" className={labelCls}>Material</label>
          <input id="material" value={material} onChange={(e) => setMaterial(e.target.value)} placeholder="e.g. Copper wire, Brass" className={inputCls} />
        </div>
      </section>

      {/* Media */}
      <section className="space-y-4">
        <h3 className="font-display text-xl font-semibold text-black">Images & Video</h3>
        <CloudinaryUploader images={images} onChange={setImages} />
        <div className="space-y-1.5">
          <label htmlFor="videoUrl" className={labelCls}>Instagram Reel / Video URL (Optional)</label>
          <input
            id="videoUrl"
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="e.g. https://instagram.com/reel/..."
            className={inputCls}
          />
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-4">
        <h3 className="font-display text-xl font-semibold text-black">Badges & Settings</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              ['Featured', isFeatured, setIsFeatured],
              ['New Arrival', isNew, setIsNew],
              ['Bestseller', isBestseller, setIsBestseller],
              ['Customizable', isCustomizable, setIsCustomizable],
              ['Published', isPublished, setIsPublished],
            ] as const
          ).map(([label, val, set]) => (
            <label key={label} className="flex cursor-pointer items-center justify-between gap-4 rounded-md border border-[#E5E7EB] bg-white px-4 py-3 shadow-sm hover:border-[#D9D9D7] transition-colors">
              <span className="text-sm font-medium text-black">{label}</span>
              <button type="button" role="switch" aria-checked={val} onClick={() => set(!val)} className={toggleCls(val)}>
                <span className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${val ? 'translate-x-4' : ''}`} />
              </button>
            </label>
          ))}
        </div>
      </section>



      <div className="flex flex-wrap gap-3 border-t border-[#E5E7EB] pt-6">
        <button type="submit" disabled={isPending} className="rounded-md bg-black px-5 py-2 text-sm font-medium text-white hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-60 transition-colors">
          {isPending ? 'Saving…' : isEdit ? 'Save changes' : 'Create product'}
        </button>
        <button type="button" onClick={() => router.push('/admin/products')} className="rounded-md border border-[#E5E7EB] bg-white px-5 py-2 text-sm font-medium text-black shadow-sm hover:bg-[#F9FAFB] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
