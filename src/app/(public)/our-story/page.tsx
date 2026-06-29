import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Our Story | Jupiter — Handmade in Nepal',
  description: 'Jupiter was born from a love of making. Discover the story behind our handmade jewelry and gifts crafted in Nepal.',
  path: '/our-story',
});

const story = [
  {
    eyebrow: 'The beginning',
    title: 'Born from a love of making',
    body: 'Jupiter started as a personal obsession with wire and metal — bending, twisting, and shaping raw materials into something wearable and meaningful. What began in a small room in Nepal grew into a brand that believes every handmade piece carries the energy of the person who made it.',
  },
  {
    eyebrow: 'The place',
    title: 'Made in the mountains',
    body: 'Nepal is not just where we make things — it is why we make them. The colors of the mountains, the textures of old stone, the warmth of copper in morning light. Every piece from Jupiter is rooted in this landscape, shaped by hands that grew up surrounded by its beauty.',
  },
  {
    eyebrow: 'The philosophy',
    title: 'Every spiral tells a story',
    body: 'The spiral is our signature — a symbol of growth, energy, and the infinite. You will find it in our wire wrapping, our mandala art, and our brand identity. We design with intention. Nothing is random. Every curve, every knot, every bead has a reason.',
  },
  {
    eyebrow: 'The craft',
    title: 'Handmade means human',
    body: 'No two Jupiter pieces are identical. Small variations in wire tension, the way light catches a twist, a slightly different patina on copper — these are not flaws. They are proof that a real person made your piece, not a machine. We wear our imperfections proudly.',
  },
] as const;

const stats = [
  { value: '8+', label: 'Product categories' },
  { value: '100%', label: 'Handmade in Nepal' },
  { value: '0', label: 'Machines involved' },
] as const;

export default function OurStoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="Born from a love of making"
        description="A handmade brand rooted in Nepal, shaped by cosmic intention and the quiet power of things made by hand."
      />

      {/* Story sections */}
      <Section spacing="md">
        <div className="grid gap-6 md:grid-cols-2">
          {story.map((item) => (
            <Card key={item.title}>
              <div className="space-y-3 p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">{item.eyebrow}</p>
                <h2 className="font-heading text-2xl text-primary">{item.title}</h2>
                <p className="text-sm leading-7 text-text-muted">{item.body}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* By the numbers */}
      <Section spacing="md">
        <Card className="overflow-hidden bg-primary text-starlight">
          <div className="grid gap-0 divide-y divide-starlight/10 p-0 md:grid-cols-3 md:divide-x md:divide-y-0">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 p-10">
                <span className="font-display text-5xl text-brand">{value}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-starlight/70">{label}</span>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Artisan profile */}
      <Section spacing="md">
        <Card>
          <div className="grid gap-0 lg:grid-cols-[1fr_2fr]">
            <div className="min-h-64 rounded-tl-2xl rounded-bl-2xl bg-earthy-cosmos" />
            <div className="space-y-4 p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">Meet the maker</p>
              <h2 className="font-heading text-3xl text-primary">Hands behind Jupiter</h2>
              <p className="max-w-lg text-sm leading-7 text-text-muted">
                Jupiter is made by a young artisan in Nepal who learned wire wrapping and metal craft through
                curiosity and countless hours of practice. Every collection reflects a personal journey —
                from raw wire to finished piece, from idea to wearable art.
              </p>
              <p className="text-sm leading-7 text-text-muted">
                @jupiterrrr_11 on Instagram is the window into the studio — process reels, new arrivals,
                and the occasional mistake that becomes a happy accident.
              </p>
            </div>
          </div>
        </Card>
      </Section>

      {/* CTA */}
      <Section spacing="md">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Experience it</p>
          <h2 className="mt-3 font-heading text-3xl text-primary">See the collection</h2>
          <p className="mt-3 text-sm text-text-muted">Every piece is ready to be yours.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild variant="primary"><Link href="/shop">Browse collection</Link></Button>
            <Button asChild variant="outline"><Link href="/custom">Custom order</Link></Button>
          </div>
        </div>
      </Section>
    </>
  );
}
