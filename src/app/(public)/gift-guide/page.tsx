import type { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Gift Guide | Jupiter — Handmade Gifts from Nepal',
  description: 'Find the perfect handmade gift from Jupiter. Curated ideas by occasion — birthdays, anniversaries, weddings, festivals, and more.',
  path: '/gift-guide',
});

const occasions = [
  {
    occasion: 'Birthday',
    emoji: '🎂',
    tagline: 'Something personal, something lasting',
    description: 'A handmade piece is better than anything you can buy off a shelf. Wire jewelry, custom rings, or a mandala art frame — all unique, all made with intention.',
    suggestions: ['Wire wrapped ring', 'Custom name pendant', 'Mandala art frame', 'Moon lamp'],
    shopLink: '/shop',
    customLink: '/custom',
  },
  {
    occasion: 'Anniversary',
    emoji: '💍',
    tagline: 'Mark the moment with something made to last',
    description: 'Matching wire rings, a custom piece made from a detail in your story, or a framed mandala as a keepsake. We can engrave meaning into every twist of wire.',
    suggestions: ['Matching copper rings', 'Custom couple piece', 'Brass statement ring', 'Custom gift box'],
    shopLink: '/collections/rings',
    customLink: '/custom',
  },
  {
    occasion: 'Wedding',
    emoji: '🌸',
    tagline: 'For the couple, the bridesmaids, or the host',
    description: 'Bulk custom orders for wedding favors, bridesmaid gifts, or a one-of-a-kind piece for the bride. We love working on wedding orders — reach out early.',
    suggestions: ['Wire jewelry set', 'Dried bouquets', 'Custom favors', 'Handmade keepsakes'],
    shopLink: '/collections/dried-bouquets',
    customLink: '/custom',
  },
  {
    occasion: 'Dashain & Tihar',
    emoji: '🪔',
    tagline: 'A Nepali gift for a Nepali festival',
    description: 'Give something rooted in Nepal. Handmade jewelry, moon lamps, and gift boxes carry meaning and warmth that imported products never can.',
    suggestions: ['Moon lamp', 'Wire jewelry set', 'Custom gift box', 'Home décor piece'],
    shopLink: '/shop',
    customLink: '/custom',
  },
  {
    occasion: 'Just Because',
    emoji: '💛',
    tagline: 'The best gifts need no reason',
    description: 'Sometimes you see something and just know someone will love it. Browse the full collection and trust your instincts — every piece is already a good gift.',
    suggestions: ['Browse the shop', 'Keychains & accessories', 'Mandala art', 'Small wire pieces'],
    shopLink: '/shop',
    customLink: null,
  },
] as const;

export default function GiftGuidePage() {
  return (
    <>
      <PageHeader
        eyebrow="Gift Guide"
        title="The perfect handmade gift"
        description="Every Jupiter piece makes a meaningful gift. Find the right one for your person and your moment."
      />

      <Section spacing="md">
        <div className="space-y-6">
          {occasions.map((item) => (
            <Card key={item.occasion}>
              <div className="grid gap-6 p-7 md:grid-cols-[auto_1fr_auto] md:items-start">
                <div className="text-4xl">{item.emoji}</div>
                <div className="space-y-3">
                  <div>
                    <h2 className="font-heading text-2xl text-primary">{item.occasion}</h2>
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">{item.tagline}</p>
                  </div>
                  <p className="text-sm leading-7 text-text-muted">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.suggestions.map((s) => (
                      <span key={s} className="rounded-full border border-border bg-background px-3 py-1 text-xs text-text-muted">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:items-end">
                  <Link
                    href={item.shopLink}
                    className="rounded-xl border border-brand px-4 py-2 text-sm font-medium text-brand hover:bg-brand hover:text-white transition-colors"
                  >
                    Browse →
                  </Link>
                  {item.customLink && (
                    <Link
                      href={item.customLink}
                      className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-text-primary hover:border-primary transition-colors"
                    >
                      Custom order
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section spacing="md">
        <Card className="bg-primary">
          <div className="p-8 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-starlight/70">Not sure?</p>
            <h2 className="mt-2 font-heading text-3xl text-starlight">Let us help you choose</h2>
            <p className="mt-3 text-sm text-starlight/80">
              Tell us about the person and the occasion on WhatsApp — we will suggest the perfect piece.
            </p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-primary hover:opacity-90"
              >
                Chat with us
              </Link>
            </div>
          </div>
        </Card>
      </Section>
    </>
  );
}
