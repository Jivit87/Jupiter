'use client';

import { useState, useTransition, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createCategory } from '@/actions/categories';
import { generateSlug } from '@/lib/utils';

export function AdminCategoryForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManual, setSlugManual] = useState(false);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const inputCls = 'w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand';

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(''); setSuccess(false);
    startTransition(async () => {
      const result = await createCategory({ name, slug: slug || generateSlug(name), description: description || undefined, isActive: true });
      if (!result.success) { setError(result.error ?? 'Failed.'); return; }
      setName(''); setSlug(''); setDescription(''); setSlugManual(false); setSuccess(true);
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-background p-6">
      <p className="mb-4 font-heading text-xl text-primary">New category</p>
      {error && <p className="mb-3 text-sm text-red-500">{error}</p>}
      {success && <p className="mb-3 text-sm text-green-600">Category created!</p>}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-primary">Name *</label>
          <input required value={name} onChange={(e) => { setName(e.target.value); if (!slugManual) setSlug(generateSlug(e.target.value)); }} className={inputCls} />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-primary">Slug</label>
          <input value={slug} onChange={(e) => { setSlugManual(true); setSlug(e.target.value); }} className={inputCls} />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-primary">Description</label>
          <input value={description} onChange={(e) => setDescription(e.target.value)} className={inputCls} />
        </div>
      </div>
      <button type="submit" disabled={isPending} className="mt-4 rounded-2xl bg-primary px-5 py-2 text-sm font-semibold text-starlight disabled:opacity-60">
        {isPending ? 'Creating…' : 'Create category'}
      </button>
    </form>
  );
}
