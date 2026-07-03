'use client';

import { useState, useTransition, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { updateSiteSettings } from '@/actions/settings';

type AdminSettingsFormProps = {
  settings: Record<string, unknown>;
};

export function AdminSettingsForm({ settings }: AdminSettingsFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const s = (key: string) => (settings[key] as string) ?? '';

  const [whatsapp, setWhatsapp] = useState(s('whatsapp_number'));
  const [instagram, setInstagram] = useState(s('instagram_handle'));
  const [heroTagline, setHeroTagline] = useState(s('hero_tagline'));
  const [featuredSectionTitle, setFeaturedSectionTitle] = useState(s('featured_section_title'));
  const [shippingInfo, setShippingInfo] = useState(s('shipping_info'));
  const [announcementBar, setAnnouncementBar] = useState(s('announcement_bar'));
  const [announcementBarActive, setAnnouncementBarActive] = useState(s('announcement_bar_active') === 'true');

  const inputCls = 'w-full rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-black shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black';
  const labelCls = 'block text-sm font-medium text-[#6B7280] mb-1';

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(''); setSuccess(false);
    startTransition(async () => {
      const result = await updateSiteSettings({
        whatsapp_number: whatsapp,
        instagram_handle: instagram,
        hero_tagline: heroTagline,
        featured_section_title: featuredSectionTitle,
        shipping_info: shippingInfo,
        announcement_bar: announcementBar,
        announcement_bar_active: announcementBarActive,
      });
      if (!result.success) { setError(result.error ?? 'Failed.'); return; }
      setSuccess(true);
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {success && <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">Settings saved!</div>}

      <section className="space-y-4">
        <h3 className="font-display text-xl font-semibold text-black">Contact</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className={labelCls}>WhatsApp number (e.g. 977XXXXXXXXXX)</label>
            <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className={inputCls} />
          </div>
          <div className="space-y-1.5">
            <label className={labelCls}>Instagram handle (without @)</label>
            <input value={instagram} onChange={(e) => setInstagram(e.target.value)} className={inputCls} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-display text-xl font-semibold text-black">Content</h3>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className={labelCls}>Hero tagline</label>
            <input value={heroTagline} onChange={(e) => setHeroTagline(e.target.value)} className={inputCls} />
          </div>
          <div className="space-y-1.5">
            <label className={labelCls}>Featured section title</label>
            <input value={featuredSectionTitle} onChange={(e) => setFeaturedSectionTitle(e.target.value)} className={inputCls} />
          </div>
          <div className="space-y-1.5">
            <label className={labelCls}>Shipping info text</label>
            <textarea rows={2} value={shippingInfo} onChange={(e) => setShippingInfo(e.target.value)} className={inputCls} />
          </div>
          <div className="space-y-1.5">
            <label className={labelCls}>Announcement bar text</label>
            <input value={announcementBar} onChange={(e) => setAnnouncementBar(e.target.value)} placeholder="e.g., Free shipping on orders above NPR 1500" className={inputCls} />
          </div>
          <label className="flex cursor-pointer items-center gap-3">
            <input type="checkbox" checked={announcementBarActive} onChange={(e) => setAnnouncementBarActive(e.target.checked)} className="h-4 w-4 rounded border-[#E5E7EB]" />
            <span className="text-sm font-medium text-black">Show announcement bar</span>
          </label>
        </div>
      </section>

      <div className="border-t border-[#E5E7EB] pt-6">
        <button type="submit" disabled={isPending} className="rounded-md bg-black px-5 py-2 text-sm font-medium text-white hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-60 transition-colors">
          {isPending ? 'Saving…' : 'Save settings'}
        </button>
      </div>
    </form>
  );
}
