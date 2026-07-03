import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { siteConfig } from '@/config/site';
import { getSiteSettings } from '@/actions/settings';
import { buildMetadata } from '@/lib/seo';
import { normalizeSiteSettings } from '@/lib/site-settings';
import { getPublicEnv } from '@/lib/env';

export const metadata: Metadata = buildMetadata({
  title: 'Contact | Jupiter — Handmade in Nepal',
  description: 'Get in touch with Jupiter. Chat with us on WhatsApp or DM us on Instagram.',
  path: '/contact',
});

export default async function ContactPage() {
  const publicEnv = getPublicEnv();
  const settings = normalizeSiteSettings(await getSiteSettings().catch(() => ({} as Record<string, unknown>)));
  const whatsappNumber = settings.whatsappNumber || publicEnv.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const instagramHandle = settings.instagramHandle ?? siteConfig.handles.instagram;
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi Jupiter! 🪐 I'd like to know more about your products.")}`
    : null;
  const instagramUrl = `https://www.instagram.com/${instagramHandle}/`;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk ✨"
        description="We typically respond within 2–3 hours on WhatsApp."
      />

      <Section spacing="md">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* WhatsApp Box */}
          <div className="flex h-full flex-col justify-between rounded-sm border border-[#E5E7EB] bg-[#25D366]/[0.03] p-6 sm:p-8">
            <div className="space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#4B5563] flex items-center">
                <i className="ri-whatsapp-fill mr-1.5 text-lg text-[#25D366]"></i> Primary contact
              </p>
              <h2 className="font-heading text-[clamp(1.75rem,3vw+1rem,2.25rem)] text-black">Chat on WhatsApp</h2>
              <p className="text-sm leading-7 text-[#4B5563]">
                The fastest way to reach us. Ask about products, place an order, or request a custom piece.
              </p>
            </div>
            <div className="mt-8">
              {whatsappUrl ? (
                <Button asChild className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1DA851] text-white border-none rounded-sm min-h-[44px]">
                  <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    Open WhatsApp →
                  </Link>
                </Button>
              ) : (
                <p className="text-sm text-[#4B5563]">
                  WhatsApp number will appear here once site settings are configured.
                </p>
              )}
            </div>
          </div>

          {/* Instagram Box */}
          <div className="flex h-full flex-col justify-between rounded-sm border border-[#E5E7EB] bg-[#E1306C]/[0.03] p-6 sm:p-8">
            <div className="space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#4B5563] flex items-center">
                <i className="ri-instagram-fill mr-1.5 text-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] bg-clip-text text-transparent inline-block"></i> Instagram
              </p>
              <h2 className="font-heading text-[clamp(1.75rem,3vw+1rem,2.25rem)] text-black">@{instagramHandle}</h2>
              <p className="text-sm leading-7 text-[#4B5563]">
                Follow us for new arrivals, behind-the-scenes, and crafting process reels.
              </p>
            </div>
            <div className="mt-8">
              <Button asChild variant="outline" className="w-full sm:w-auto rounded-sm border-[#E5E7EB] text-black hover:bg-black hover:text-white transition-colors min-h-[44px]">
                <Link href={instagramUrl} target="_blank" rel="noopener noreferrer">
                  Follow on Instagram →
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-sm border border-[#E5E7EB] bg-blue-500/[0.03] p-6 sm:p-8 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#4B5563] flex items-center justify-center">
            <i className="ri-map-pin-2-fill mr-1.5 text-lg text-blue-500"></i> Based in
          </p>
          <p className="mt-2 font-heading text-[clamp(1.75rem,3vw+1rem,2.25rem)] text-black">Nepal 🇳🇵</p>
          <p className="mt-2 text-sm text-[#4B5563]">
            Shipping within Nepal
          </p>
          <p className="mt-1 text-xs text-[#4B5563]">Available Mon–Sat, 10am–7pm NPT</p>
        </div>
      </Section>
    </>
  );
}
