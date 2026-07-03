import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { buildMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

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
    image: '/story/1.jpg',
  },
  {
    eyebrow: 'The place',
    title: 'Made in the mountains',
    body: 'Nepal is not just where we make things — it is why we make them. The colors of the mountains, the textures of old stone, the warmth of copper in morning light. Every piece from Jupiter is rooted in this landscape, shaped by hands that grew up surrounded by its beauty.',
    image: '/story/2.jpg',
  },
  {
    eyebrow: 'The philosophy',
    title: 'Every spiral tells a story',
    body: 'The spiral is our signature — a symbol of growth, energy, and the infinite. You will find it in our wire wrapping, our mandala art, and our brand identity. We design with intention. Nothing is random. Every curve, every knot, every bead has a reason.',
    image: '/story/3.jpg',
  },
  {
    eyebrow: 'The craft',
    title: 'Handmade means human',
    body: 'No two Jupiter pieces are identical. Small variations in wire tension, the way light catches a twist, a slightly different patina on copper — these are not flaws. They are proof that a real person made your piece, not a machine. We wear our imperfections proudly.',
    image: '/story/4.jpg',
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
        <div className="space-y-24 md:space-y-32">
          {story.map((item, index) => (
            <div key={item.title} className={cn("flex flex-col gap-10 md:items-center", index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse")}>
              <div className="flex-1 w-full relative aspect-[4/3] md:aspect-square lg:aspect-[4/3] overflow-hidden rounded-sm border border-[#E5E7EB] shadow-sm bg-[#F9FAFB]">
                <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div className="flex-1 space-y-4 md:px-6 lg:px-12">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#4B5563]">{item.eyebrow}</p>
                <h2 className="font-heading text-3xl text-black md:text-4xl">{item.title}</h2>
                <p className="text-base leading-relaxed text-[#4B5563]">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* By the numbers */}
      <Section spacing="md">
        <div className="overflow-hidden rounded-sm bg-black text-white shadow-xl">
          <div className="grid gap-0 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 p-12">
                <span className="font-display text-5xl text-white">{value}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Artisan profile */}
      <Section spacing="md">
        <div className="overflow-hidden rounded-sm border border-[#E5E7EB] bg-[#F9FAFB] shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1fr_1.5fr]">
            <div className="relative min-h-[350px] lg:min-h-full">
               <Image src="/story/6.jpg" alt="Meet the maker" fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
            <div className="space-y-6 p-8 lg:p-14 flex flex-col justify-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#4B5563]">Meet the maker</p>
              <h2 className="font-heading text-3xl text-black md:text-4xl">Hands behind Jupiter</h2>
              <p className="max-w-lg text-base leading-relaxed text-[#4B5563]">
                Jupiter is made by a young artisan in Nepal who learned wire wrapping and metal craft through
                curiosity and countless hours of practice. Every collection reflects a personal journey —
                from raw wire to finished piece, from idea to wearable art.
              </p>
              <p className="text-base leading-relaxed text-[#4B5563]">
                @jupiterrrr_11 on Instagram is the window into the studio — process reels, new arrivals,
                and the occasional mistake that becomes a happy accident.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section spacing="md">
        <div className="text-center rounded-sm border border-[#E5E7EB] bg-[#F9FAFB] p-12 md:p-20 shadow-sm">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#4B5563]">Experience it</p>
          <h2 className="mt-3 font-heading text-3xl text-black">See the collection</h2>
          <p className="mt-3 text-base text-[#4B5563]">Every piece is ready to be yours.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild className="rounded-sm bg-black text-white hover:bg-black/90 px-8"><Link href="/shop">Browse collection</Link></Button>
            <Button asChild variant="outline" className="rounded-sm border-[#E5E7EB] hover:bg-white text-black px-8 bg-transparent"><Link href="/custom">Custom order</Link></Button>
          </div>
        </div>
      </Section>
    </>
  );
}
