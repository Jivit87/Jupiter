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
  const [slugManual, setSlugManual] = useState(false);
  const [price, setPrice] = useState(product?.price?.toString() ?? '');
  const [categoryId, setCategoryId] = useState(product?.categoryId ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [material, setMaterial] = useState(product?.material ?? '');
  const [dimensions, setDimensions] = useState(product?.dimensions ?? '');
  const [weight, setWeight] = useState(product?.weight ?? '');
  const [sku, setSku] = useState(product?.sku ?? '');
  const [handmadeTime, setHandmadeTime] = useState(product?.handmadeTime ?? '');
  const [videoUrl, setVideoUrl] = useState(product?.videoUrl ?? '');
  const [stockStatus, setStockStatus] = useState<'in_stock' | 'out_of_stock' | 'made_to_order' | 'low_stock'>(product?.stockStatus ?? 'in_stock');
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [metaTitle, setMetaTitle] = useState(product?.metaTitle ?? '');
  const [metaDescription, setMetaDescription] = useState(product?.metaDescription ?? '');
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
      dimensions: dimensions || undefined,
      weight: weight || undefined,
      sku: sku || undefined,
      handmadeTime: handmadeTime || undefined,
      videoUrl: videoUrl || undefined,
      stockStatus,
      images: images,
      isCustomizable,
      isFeatured,
      isNew,
      isBestseller,
      isPublished,
      metaTitle: metaTitle || undefined,
      metaDescription: metaDescription || undefined,
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

  const inputCls = 'w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand';
  const labelCls = 'block text-sm font-medium text-primary';
  const toggleCls = (on: boolean) =>
    `relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors ${on ? 'bg-brand' : 'bg-border'}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {/* Basic Info */}
      <section className="space-y-4">
        <h3 className="font-heading text-xl text-primary">Basic info</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="name" className={labelCls}>Name *</label>
            <input id="name" value={name} onChange={(e) => handleNameChange(e.target.value)} required className={inputCls} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="slug" className={labelCls}>Slug</label>
            <input id="slug" value={slug} onChange={(e) => { setSlugManual(true); setSlug(e.target.value); }} className={inputCls} />
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
            <label htmlFor="sku" className={labelCls}>SKU</label>
            <input id="sku" value={sku} onChange={(e) => setSku(e.target.value)} className={inputCls} />
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
        <h3 className="font-heading text-xl text-primary">Description & details</h3>
        <div className="space-y-1.5">
          <label htmlFor="description" className={labelCls}>Description</label>
          <textarea id="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className={inputCls} />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <label htmlFor="material" className={labelCls}>Material</label>
            <input id="material" value={material} onChange={(e) => setMaterial(e.target.value)} className={inputCls} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="dimensions" className={labelCls}>Dimensions</label>
            <input id="dimensions" value={dimensions} onChange={(e) => setDimensions(e.target.value)} className={inputCls} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="weight" className={labelCls}>Weight</label>
            <input id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} className={inputCls} />
          </div>
        </div>
      </section>

      {/* Media */}
      <section className="space-y-4">
        <h3 className="font-heading text-xl text-primary">Images</h3>
        <CloudinaryUploader images={images} onChange={setImages} />
        <div className="space-y-1.5">
          <label htmlFor="videoUrl" className={labelCls}>Video URL</label>
          <input
            id="videoUrl"
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Cloudinary video URL"
            className={inputCls}
          />
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-4">
        <h3 className="font-heading text-xl text-primary">Badges & settings</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              ['Featured', isFeatured, setIsFeatured],
              ['New Arrival', isNew, setIsNew],
              ['Bestseller', isBestseller, setIsBestseller],
              ['Customizable', isCustomizable, setIsCustomizable],
              ['Published', isPublished, setIsPublished],
            ] as const
          ).map(([label, val, set]) => (
            <label key={label} className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-border bg-background px-4 py-3">
              <span className="text-sm font-medium text-primary">{label}</span>
              <button type="button" role="switch" aria-checked={val} onClick={() => set(!val)} className={toggleCls(val)}>
                <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${val ? 'translate-x-5' : ''}`} />
              </button>
            </label>
          ))}
        </div>
      </section>

      {/* SEO */}
      <section className="space-y-4">
        <h3 className="font-heading text-xl text-primary">SEO</h3>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="metaTitle" className={labelCls}>Meta title ({metaTitle.length}/60)</label>
            <input id="metaTitle" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} maxLength={60} className={inputCls} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="metaDesc" className={labelCls}>Meta description ({metaDescription.length}/160)</label>
            <textarea id="metaDesc" rows={3} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} maxLength={160} className={inputCls} />
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-3 border-t border-border pt-6">
        <button type="submit" disabled={isPending} className="rounded-2xl bg-primary px-6 py-2.5 text-sm font-semibold text-starlight disabled:opacity-60">
          {isPending ? 'Saving…' : isEdit ? 'Save changes' : 'Create product'}
        </button>
        <button type="button" onClick={() => router.push('/admin/products')} className="rounded-2xl border border-border px-6 py-2.5 text-sm font-medium text-text-primary hover:border-primary">
          Cancel
        </button>
      </div>
    </form>
  );
}
