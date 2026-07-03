'use client';

import { useState, type FormEvent } from 'react';
import { generateCustomOrderWhatsAppURL } from '@/lib/whatsapp';
import { useSiteSettings } from '@/components/providers/site-settings-provider';
import { createCustomOrderRequest } from '@/actions/custom-orders';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleMaterial = (m: string) =>
    setMaterials((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!description.trim()) {
      setError('Please describe what you want.');
      return;
    }
    
    setError('');
    setIsSubmitting(true);

    const result = await createCustomOrderRequest({
      description,
      occasion: occasion || undefined,
      budgetRange: budget || undefined,
      deadline: deadline || undefined,
      referenceUrl: referenceUrl || undefined,
      materials: materials.length ? materials : undefined,
      customerName: name || undefined,
      customerPhone: phone || undefined,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error || 'Failed to submit request.');
      return;
    }

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
        <label htmlFor="description" className="block text-sm font-medium text-black">
          What do you want? <span className="text-amber-600">*</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your dream piece — type, style, colors, size, anything..."
          rows={4}
          className="w-full rounded-sm border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="occasion" className="block text-sm font-medium text-black">Occasion</label>
          <select
            id="occasion"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="w-full rounded-sm border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select occasion (optional)</option>
            {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="budget" className="block text-sm font-medium text-black">Budget</label>
          <select
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full rounded-sm border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select budget (optional)</option>
            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-black">Your name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Optional"
            className="w-full rounded-sm border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-black">Your WhatsApp number</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Optional"
            className="w-full rounded-sm border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="deadline" className="block text-sm font-medium text-black">Need it by <span className="font-normal text-gray-500">(optional)</span></label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full rounded-sm border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="reference" className="block text-sm font-medium text-black">Reference image URL <span className="font-normal text-gray-500">(optional)</span></label>
          <input
            type="url"
            id="reference"
            value={referenceUrl}
            onChange={(e) => setReferenceUrl(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-sm border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-black">Preferred material <span className="font-normal text-gray-500">(optional)</span></p>
        <div className="flex flex-wrap gap-2">
          {MATERIALS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => toggleMaterial(m)}
              className={`rounded-sm px-4 py-2 text-sm font-medium transition-colors ${
                materials.includes(m)
                  ? 'bg-black text-white'
                  : 'border border-[#E5E7EB] bg-white text-black hover:border-black'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#25D366] px-6 py-4 text-base font-semibold text-white transition-opacity hover:bg-[#25D366]/90 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <i className="ri-loader-4-line text-xl animate-spin"></i>
        ) : (
          <i className="ri-whatsapp-line text-xl"></i>
        )}
        {isSubmitting ? 'Sending...' : 'Send via WhatsApp'}
      </button>

      <p className="text-center text-xs text-[#4B5563]">
        This will open WhatsApp with your request pre-filled. We&apos;ll respond within 2–3 hours.
      </p>
    </form>
  );
}
