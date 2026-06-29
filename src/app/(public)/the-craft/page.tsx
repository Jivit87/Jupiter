import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'The Craft | Jupiter — Handmade in Nepal',
  description: 'Discover how Jupiter pieces are made — from raw wire and metal to finished handmade jewelry and art, crafted in Nepal.',
  path: '/the-craft',
});

const steps = [
  {
    step: '01',
    title: 'Gathering materials',
    body: 'It starts with raw copper wire, brass sheets, and small beads sourced locally in Nepal. The quality of the material determines everything — so we choose slowly and carefully.',
  },
  {
    step: '02',
    title: 'Shaping by hand',
    body: 'Using round-nose pliers, cutters, and mandrels, the wire is bent, coiled, and formed into the base shape. No heat, no machines — just hands, tools, and patience.',
  },
  {
    step: '03',
    title: 'Detail and weaving',
    body: 'This is where a piece comes alive. Intricate wire wrapping, spiral details, stone setting, and mandala patterns are added one pass at a time. The most complex pieces take several hours.',
  },
  {
    step: '04',
    title: 'Quality check',
    body: 'Every piece is inspected under good light. Sharp wire ends are smoothed. Settings are tested. Proportions are checked. If something is off, it goes back — not to the customer.',
  },
  {
    step: '05',
    title: 'Wrapped with love',
    body: 'The finished piece is cleaned, photographed, and packed carefully. Custom orders get a handwritten note. Every package leaves with the intention that it will make someone genuinely happy.',
  },
] as const;

const materials = [
  {
    name: 'Copper wire',
    color: 'Warm rose-gold tone',
    properties: 'Soft, highly workable, develops a beautiful patina over time. The easiest metal to shape into complex wire forms.',
    care: 'Keep dry, store in a pouch. Occasional polish with a soft cloth keeps it bright.',
  },
  {
    name: 'Brass',
    color: 'Yellow-gold tone',
    properties: 'Harder than copper, holds shape well, and has a bold golden look. Great for statement rings and structural pieces.',
    care: 'Wipe with a dry cloth after wearing. Avoid prolonged water contact.',
  },
  {
    name: 'Mixed metals',
    color: 'Varies by piece',
    properties: 'Some pieces combine copper and brass for contrast and dimension. These are often the most visually interesting and take the longest to make.',
    care: 'Follow the care instructions for the most delicate metal in the piece — usually copper.',
  },
] as const;

export default function TheCraftPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Craft"
        title="Where magic meets materials"
        description="Every Jupiter piece is made entirely by hand. Here is how it happens — from raw wire to wearable art."
      />

      {/* Process steps */}
      <Section spacing="md">
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">The process</p>
          <h2 className="font-heading text-3xl text-primary">Five steps from wire to wearable</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {steps.map(({ step, title, body }) => (
            <Card key={step}>
              <div className="space-y-3 p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-brand">{step}</p>
                <h3 className="font-heading text-2xl text-primary">{title}</h3>
                <p className="text-sm leading-6 text-text-muted">{body}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Materials */}
      <Section spacing="md">
        <div className="space-y-4">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Materials guide</p>
          <h2 className="font-heading text-3xl text-primary">What we work with</h2>
          <p className="max-w-2xl text-base leading-7 text-text-muted">
            Each material has its own personality. Understanding them helps you care for your piece for years to come.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {materials.map((m) => (
            <Card key={m.name}>
              <div className="space-y-4 p-6">
                <div>
                  <h3 className="font-heading text-2xl text-primary">{m.name}</h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">{m.color}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">Properties</p>
                  <p className="mt-1 text-sm leading-6 text-text-muted">{m.properties}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">Care</p>
                  <p className="mt-1 text-sm leading-6 text-text-muted">{m.care}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section spacing="md">
        <Card className="bg-primary">
          <div className="flex flex-col items-center gap-4 p-10 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-starlight/70">Ready to own one?</p>
            <h2 className="font-heading text-3xl text-starlight">Take a piece of the craft home</h2>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="primary"><Link href="/shop">Shop collection</Link></Button>
              <Button asChild variant="outline" className="border-starlight/30 text-starlight hover:bg-starlight/10">
                <Link href="/custom">Custom order</Link>
              </Button>
            </div>
          </div>
        </Card>
      </Section>
    </>
  );
}
