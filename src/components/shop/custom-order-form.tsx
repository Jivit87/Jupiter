'use client';

import { useState, type FormEvent } from 'react';
import { generateCustomOrderWhatsAppURL } from '@/lib/whatsapp';
import { useSiteSettings } from '@/components/providers/site-settings-provider';

const OCCASIONS = ['Birthday', 'Anniversary', 'Wedding', 'Festival', 'Just Because', 'Other'] as const;
const BUDGETS = ['Under NPR 500', 'NPR 500–1,000', 'NPR 1,000–2,000', 'NPR 2,000–5,000', 'NPR 5,000+'] as const;
const MATERIALS = ['Wire', 'Brass', 'Copper', 'Mixed'] as const;

export function CustomOrderForm() {
  const siteSettings = useSiteSettings();
  const [description, setDescription] = useState('');
  const [occasion, setOccasion] = useState('');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [materials, setMaterials] = useState<string[]>([]);
  const [referenceUrl, setReferenceUrl] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const toggleMaterial = (m: string) =>
    setMaterials((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!description.trim()) {
      setError('Please describe what you want.');
      return;
    }
    setError('');
    const url = generateCustomOrderWhatsAppURL({
      description,
      occasion: occasion || undefined,
      budget: budget || undefined,
      deadline: deadline || undefined,
      referenceImage: referenceUrl || undefined,
      materials: materials.length ? materials : undefined,
      customerName: name || undefined,
      customerPhone: phone || undefined,
    }, { phoneNumber: siteSettings?.whatsappNumber });
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-primary">
          What do you want? <span className="text-brand">*</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your dream piece — type, style, colors, size, anything..."
          rows={4}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand"
          required
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="occasion" className="block text-sm font-medium text-primary">Occasion</label>
          <select
            id="occasion"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <option value="">Select occasion (optional)</option>
            {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="budget" className="block text-sm font-medium text-primary">Budget</label>
          <select
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <option value="">Select budget (optional)</option>
            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-primary">Your name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Optional"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-primary">Your WhatsApp number</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Optional"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="deadline" className="block text-sm font-medium text-primary">Need it by</label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="reference" className="block text-sm font-medium text-primary">Reference image URL</label>
          <input
            type="url"
            id="reference"
            value={referenceUrl}
            onChange={(e) => setReferenceUrl(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-primary">Preferred material</p>
        <div className="flex flex-wrap gap-2">
          {MATERIALS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => toggleMaterial(m)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                materials.includes(m)
                  ? 'bg-primary text-starlight'
                  : 'border border-border bg-background text-text-primary hover:border-primary'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 text-base font-semibold text-white shadow-soft transition-opacity hover:opacity-90"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.985-1.349A9.952 9.952 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
        </svg>
        Send via WhatsApp
      </button>

      <p className="text-center text-xs text-text-muted">
        This will open WhatsApp with your request pre-filled. We&apos;ll respond within 2–3 hours.
      </p>
    </form>
  );
}
