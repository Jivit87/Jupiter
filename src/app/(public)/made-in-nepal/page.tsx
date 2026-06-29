import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Made in Nepal | Jupiter — Handmade Jewelry & Gifts',
  description: 'Jupiter is proudly made in Nepal. Discover why Nepali craftsmanship is special and what it means to own something made by hand in the mountains.',
  path: '/made-in-nepal',
});

const reasons = [
  {
    title: 'A tradition of craft',
    body: 'Nepal has one of the oldest living craft traditions in the world. From Thanka paintings to metalwork, from carved wood to handwoven textiles — artisanship is embedded in daily life here. Jupiter is part of that lineage: a modern interpretation of an ancient relationship with materials.',
  },
  {
    title: 'Made by real people',
    body: 'When you buy from Jupiter, you are buying from a real person in Nepal — not a factory, not an aggregator, not a middleman. Every rupee supports local craft and the continuation of handmade culture in a country that values it deeply.',
  },
  {
    title: 'Materials from the region',
    body: 'The copper and brass we use are sourced from local suppliers. The colors in our work — warm terracotta, deep indigo, copper ember — are drawn directly from the Nepali landscape: mountains, temples, prayer flags, and the light that hits them at dusk.',
  },
  {
    title: 'Slow, intentional making',
    body: 'Nepal is not a fast country. Things here take time — and that is not a flaw. Our pieces reflect that pace. We do not rush production. A complex ring might take three hours. A mandala frame might take a full day. The time shows in the result.',
  },
] as const;

const facts = [
  { value: '🇳🇵', label: 'Made in Nepal', sub: '100% locally crafted' },
  { value: '✋', label: 'By hand', sub: 'No machines' },
  { value: '⚡', label: 'Copper & brass', sub: 'Locally sourced metals' },
  { value: '💛', label: 'Small batch', sub: 'Never mass-produced' },
] as const;

export default function MadeInNepalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Made in Nepal"
        title="Proudly made in Nepal 🇳🇵"
        description="Jupiter exists because Nepal produces extraordinary craftsmanship — and because that craft deserves a modern brand behind it."
      />

      {/* Hero split */}
      <Section spacing="md">
        <Card className="overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="min-h-72 bg-jupiter-aura" />
            <div className="space-y-5 p-8 lg:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted">Provenance</p>
              <h2 className="font-heading text-3xl text-primary">
                The mountains are in the metal
              </h2>
              <p className="text-sm leading-7 text-text-muted">
                Nepal sits between the highest peaks on Earth and the fertile plains of the subcontinent.
                It is a country of extremes — brutal cold and warm hospitality, ancient ritual and modern
                hustle. Jupiter pieces carry that tension: cosmic and earthy, delicate and durable.
              </p>
              <p className="text-sm leading-7 text-text-muted">
                When you wear a Jupiter ring or hang a Jupiter mandala on your wall, you are carrying a
                small piece of Nepal with you — its colors, its textures, its energy.
              </p>
            </div>
          </div>
        </Card>
      </Section>

      {/* Why it matters */}
      <Section spacing="md">
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Why it matters</p>
          <h2 className="font-heading text-3xl text-primary">What "Made in Nepal" really means</h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {reasons.map((r) => (
            <Card key={r.title}>
              <div className="space-y-3 p-6">
                <h3 className="font-heading text-xl text-primary">{r.title}</h3>
                <p className="text-sm leading-7 text-text-muted">{r.body}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Facts strip */}
      <Section spacing="md">
        <Card>
          <div className="grid grid-cols-2 gap-0 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0">
            {facts.map(({ value, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-1 p-8 text-center">
                <span className="text-3xl">{value}</span>
                <span className="font-heading text-lg text-primary">{label}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted">{sub}</span>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* CTA */}
      <Section spacing="md">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Own a piece</p>
          <h2 className="mt-3 font-heading text-3xl text-primary">Take Nepal home with you</h2>
          <p className="mt-3 max-w-sm mx-auto text-sm text-text-muted">
            Browse our full collection of handmade jewelry, art, and gifts — all made by hand in Nepal.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild variant="primary"><Link href="/shop">Shop the collection</Link></Button>
            <Button asChild variant="outline"><Link href="/our-story">Our story</Link></Button>
          </div>
        </div>
      </Section>
    </>
  );
}
