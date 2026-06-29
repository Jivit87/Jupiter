import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export function BrandStoryStrip() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="overflow-hidden rounded-3xl bg-primary">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="relative min-h-72 overflow-hidden bg-earthy-cosmos lg:min-h-full">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,148,48,0.15),_transparent_70%)]" />
              <div className="absolute inset-6 rounded-2xl border border-starlight/10" />
              <div className="absolute bottom-8 left-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-starlight/50">
                  Made in Nepal
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-6 p-10 lg:p-14">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-starlight/60">
                Our story
              </p>
              <h2 className="font-display text-4xl leading-tight text-starlight sm:text-5xl">
                Every piece carries a piece of Nepal
              </h2>
              <p className="text-base leading-8 text-starlight/75">
                Jupiter started as a love for wire, metal, and the act of making something with your hands.
                Every ring, every mandala, every lamp is shaped slowly and intentionally — the way things
                have been made in Nepal for generations.
              </p>
              <p className="text-base leading-8 text-starlight/75">
                When you wear Jupiter, you wear that intention.
              </p>
              <div>
                <Button
                  asChild
                  variant="outline"
                  className="border-starlight/30 text-starlight hover:bg-starlight/10"
                >
                  <Link href="/our-story">Read our story →</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
