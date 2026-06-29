import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { siteConfig } from '@/config/site';

type HeroProps = {
  tagline?: string;
};

export function Hero({ tagline }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-jupiter-aura text-starlight">
      <div aria-hidden className="absolute inset-0 opacity-25 texture-linen" />
      <Container className="relative z-10 py-20 sm:py-28 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="max-w-2xl space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-starlight/75">
              Made in Nepal
            </p>
            <h1 className="max-w-xl font-display text-5xl leading-[0.95] text-starlight sm:text-6xl lg:text-7xl">
              Made with cosmic intention
            </h1>
            <p className="max-w-xl text-base leading-8 text-starlight/80 sm:text-lg">
              {tagline ?? 'Handmade arts and gifts shaped slowly, with texture, warmth, and a premium handcrafted feel rooted in Nepal.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="primary" size="lg">
                <Link href={siteConfig.links.shop}>Explore Collection</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-starlight/30 text-starlight hover:bg-starlight/10">
                <Link href={siteConfig.links.custom}>Custom Order</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            {/* Decorative orbit rings */}
            <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full border border-starlight/20" />
            <div className="absolute -bottom-8 right-0 h-32 w-32 rounded-full border border-starlight/15" />

            {/* Main image frame */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
              {/* Atmospheric gradient — replaces with a real photo via bg-image in production */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2a1a5e] via-[#4a3080] to-[#c89430]/60" />

              {/* Subtle texture overlay */}
              <div className="absolute inset-0 opacity-30 texture-linen" />

              {/* Radial light bloom */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_rgba(200,148,48,0.25),_transparent_55%)]" />

              {/* Inner frame accent */}
              <div className="absolute inset-4 rounded-[1.5rem] border border-starlight/10" />

              {/* Corner spiral motif (CSS-only) */}
              <div className="absolute right-6 top-6 h-16 w-16 rounded-full border border-brand/30" />
              <div className="absolute right-9 top-9 h-10 w-10 rounded-full border border-brand/20" />

              {/* Product badge overlay — signals image content */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary/80 to-transparent p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-brand/80">
                  Handmade in Nepal
                </p>
                <p className="mt-1 font-display text-xl leading-snug text-starlight/90">
                  Wire · Mandala · Moon · Copper
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
