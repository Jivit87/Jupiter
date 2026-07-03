'use client';

import { useState, useTransition, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createCategory } from '@/actions/categories';
import { generateSlug } from '@/lib/utils';
import { CloudinaryUploader } from './cloudinary-uploader';

export function AdminCategoryForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManual, setSlugManual] = useState(false);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const inputCls = 'w-full rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-black shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black';
  const labelCls = 'block text-sm font-medium text-[#6B7280] mb-1';

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(''); setSuccess(false);
    startTransition(async () => {
      const result = await createCategory({ name, slug: slug || generateSlug(name), description: description || undefined, imageUrl: imageUrl || undefined, sortOrder, isActive });
      if (!result.success) { setError(result.error ?? 'Failed.'); return; }
      setName(''); setSlug(''); setDescription(''); setImageUrl(''); setSortOrder(0); setIsActive(true); setSlugManual(false); setSuccess(true);
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-md border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <p className="mb-4 font-display text-xl font-semibold text-black">New category</p>
      {error && <p className="mb-3 text-sm text-red-500">{error}</p>}
      {success && <p className="mb-3 text-sm text-green-600">Category created!</p>}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <label className={labelCls}>Name *</label>
          <input required value={name} onChange={(e) => { setName(e.target.value); if (!slugManual) setSlug(generateSlug(e.target.value)); }} className={inputCls} />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Slug</label>
          <input value={slug} onChange={(e) => { setSlugManual(true); setSlug(e.target.value); }} className={inputCls} />
        </div>
        <div className="space-y-1.5">
          <label className={labelCls}>Sort order</label>
          <input type="number" min="0" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} className={inputCls} />
        </div>
      </div>
      <div className="mt-4 space-y-1.5">
        <label className={labelCls}>Description</label>
        <input value={description} onChange={(e) => setDescription(e.target.value)} className={inputCls} />
      </div>
      <div className="mt-4 space-y-1.5">
        <label className={labelCls}>Image URL</label>
        <CloudinaryUploader images={[imageUrl].filter(Boolean)} onChange={(images) => setImageUrl(images[0] || '')} maxImages={1} />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <input type="checkbox" id="isActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="h-4 w-4 rounded border-[#E5E7EB]" />
        <label htmlFor="isActive" className="text-sm font-medium text-black">Active</label>
      </div>
      <button type="submit" disabled={isPending} className="mt-4 rounded-md bg-black px-5 py-2 text-sm font-medium text-white hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-60 transition-colors">
        {isPending ? 'Creating…' : 'Create category'}
      </button>
    </form>
  );
}
