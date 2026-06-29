import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { siteConfig } from '@/config/site';
import { getSiteSettings } from '@/actions/settings';
import { buildMetadata } from '@/lib/seo';
import { normalizeSiteSettings } from '@/lib/site-settings';

export const metadata: Metadata = buildMetadata({
  title: 'Contact | Jupiter — Handmade in Nepal',
  description: 'Get in touch with Jupiter. Chat with us on WhatsApp or DM us on Instagram.',
  path: '/contact',
});

export default async function ContactPage() {
  const settings = normalizeSiteSettings(await getSiteSettings().catch(() => ({} as Record<string, unknown>)));
  const whatsappNumber = settings.whatsappNumber;
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
          <Card>
            <div className="flex h-full flex-col justify-between p-8">
              <div className="space-y-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">Primary contact</p>
                <h2 className="font-heading text-3xl text-primary">Chat on WhatsApp</h2>
                <p className="text-sm leading-7 text-text-muted">
                  The fastest way to reach us. Ask about products, place an order, or request a custom piece.
                </p>
              </div>
              <div className="mt-6">
                {whatsappUrl ? (
                  <Button asChild variant="whatsapp" className="w-full sm:w-auto">
                    <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      Open WhatsApp →
                    </Link>
                  </Button>
                ) : (
                  <p className="text-sm text-text-muted">
                    WhatsApp number will appear here once site settings are configured.
                  </p>
                )}
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex h-full flex-col justify-between p-8">
              <div className="space-y-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">Instagram</p>
                <h2 className="font-heading text-3xl text-primary">@{instagramHandle}</h2>
                <p className="text-sm leading-7 text-text-muted">
                  Follow us for new arrivals, behind-the-scenes, and crafting process reels.
                </p>
              </div>
              <div className="mt-6">
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link href={instagramUrl} target="_blank" rel="noopener noreferrer">
                    Follow on Instagram →
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <Card className="mt-6">
          <div className="p-8 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">Based in</p>
            <p className="mt-2 font-heading text-3xl text-primary">Nepal 🇳🇵</p>
            <p className="mt-2 text-sm text-text-muted">
              Shipping within Nepal • Kathmandu Valley: 1–2 days • Outside Valley: 3–7 days
            </p>
            <p className="mt-1 text-xs text-text-muted">Available Mon–Sat, 10am–7pm NPT</p>
          </div>
        </Card>
      </Section>
    </>
  );
}
