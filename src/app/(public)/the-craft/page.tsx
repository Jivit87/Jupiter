import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { buildMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

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
    image: '/story/7.jpg',
  },
  {
    step: '02',
    title: 'Shaping by hand',
    body: 'Using round-nose pliers, cutters, and mandrels, the wire is bent, coiled, and formed into the base shape. No heat, no machines — just hands, tools, and patience.',
    image: '/story/9.jpg',
  },
  {
    step: '03',
    title: 'Detail and weaving',
    body: 'This is where a piece comes alive. Intricate wire wrapping, spiral details, stone setting, and mandala patterns are added one pass at a time. The most complex pieces take several hours.',
    image: '/story/10.jpg',
  },
  {
    step: '04',
    title: 'Quality check',
    body: 'Every piece is inspected under good light. Sharp wire ends are smoothed. Settings are tested. Proportions are checked. If something is off, it goes back — not to the customer.',
    image: '/story/11.jpg',
  },
  {
    step: '05',
    title: 'Wrapped with love',
    body: 'The finished piece is cleaned, photographed, and packed carefully. Custom orders get a handwritten note. Every package leaves with the intention that it will make someone genuinely happy.',
    image: '/story/12.jpg',
  },
] as const;

const materials = [
  {
    name: 'Copper wire',
    color: 'Warm rose-gold tone',
    properties: 'Soft, highly workable, develops a beautiful patina over time. The easiest metal to shape into complex wire forms.',
    care: 'Keep dry, store in a pouch. Occasional polish with a soft cloth keeps it bright.',
    image: '/products/img1.jpg',
  },
  {
    name: 'Brass',
    color: 'Yellow-gold tone',
    properties: 'Harder than copper, holds shape well, and has a bold golden look. Great for statement rings and structural pieces.',
    care: 'Wipe with a dry cloth after wearing. Avoid prolonged water contact.',
    image: '/products/img3.jpg',
  },
  {
    name: 'Mixed metals',
    color: 'Varies by piece',
    properties: 'Some pieces combine copper and brass for contrast and dimension. These are often the most visually interesting and take the longest to make.',
    care: 'Follow the care instructions for the most delicate metal in the piece — usually copper.',
    image: '/products/img5.jpg',
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
        <div className="space-y-4 mb-16 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#4B5563]">The process</p>
          <h2 className="font-heading text-3xl text-black md:text-4xl">Five steps from wire to wearable</h2>
        </div>
        
        <div className="space-y-24 md:space-y-32">
          {steps.map(({ step, title, body, image }, index) => (
            <div key={step} className={cn("flex flex-col gap-10 md:items-center", index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse")}>
              <div className="flex-1 w-full relative aspect-[4/3] md:aspect-square lg:aspect-[4/3] overflow-hidden rounded-sm border border-[#E5E7EB] shadow-sm bg-[#F9FAFB]">
                <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="flex-1 space-y-4 md:px-6 lg:px-12 relative">
                <span className="absolute -top-16 -left-6 md:-left-4 text-[120px] lg:text-[180px] font-display font-bold text-[#F9FAFB] -z-10 leading-none select-none tracking-tighter">
                  {step}
                </span>
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#4B5563]">Phase {step}</p>
                <h3 className="font-heading text-3xl text-black md:text-4xl">{title}</h3>
                <p className="text-base leading-relaxed text-[#4B5563] relative z-10">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Materials */}
      <Section spacing="md">
        <div className="space-y-4 mb-16 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#4B5563]">Materials guide</p>
          <h2 className="font-heading text-3xl text-black md:text-4xl">What we work with</h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#4B5563]">
            Each material has its own personality. Understanding them helps you care for your piece for years to come.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {materials.map((m) => (
            <div key={m.name} className="flex flex-col rounded-sm border border-[#E5E7EB] bg-white overflow-hidden shadow-sm">
              <div className="relative aspect-square w-full border-b border-[#E5E7EB] bg-[#F9FAFB]">
                <Image src={m.image} alt={m.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="flex flex-col flex-1 p-8 space-y-6">
                <div>
                  <h3 className="font-heading text-2xl text-black">{m.name}</h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.28em] text-[#4B5563]">{m.color}</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-black border-b border-[#E5E7EB] pb-2 mb-3">Properties</p>
                  <p className="text-sm leading-relaxed text-[#4B5563]">{m.properties}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-black border-b border-[#E5E7EB] pb-2 mb-3">Care</p>
                  <p className="text-sm leading-relaxed text-[#4B5563]">{m.care}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section spacing="md">
        <div className="rounded-sm bg-black p-12 md:p-20 text-center shadow-xl">
          <div className="flex flex-col items-center gap-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gray-400">Ready to own one?</p>
            <h2 className="font-heading text-3xl md:text-4xl text-white">Take a piece of the craft home</h2>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Button asChild className="rounded-sm bg-white text-black hover:bg-gray-100 px-8"><Link href="/shop">Shop collection</Link></Button>
              <Button asChild variant="outline" className="rounded-sm border-gray-600 text-white hover:bg-white/10 hover:text-white px-8 bg-transparent">
                <Link href="/custom">Custom order</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
