import Link from 'next/link';
import { Container } from '@/components/ui/container';

const steps = [
  {
    n: '01',
    title: 'Browse & fall in love',
    description:
      'Explore our handmade collection — jewelry, art, lamps, and gifts. Filter by category or search for exactly what you have in mind.',
    href: '/shop',
    cta: 'Browse collection',
  },
  {
    n: '02',
    title: 'Order via WhatsApp',
    description:
      'Click "Order via WhatsApp" on any product. Your message is pre-filled — just hit send. We confirm availability and arrange delivery.',
    href: null,
    cta: null,
  },
  {
    n: '03',
    title: 'We craft & deliver',
    description:
      'Your piece is made by hand in Nepal and delivered to your door. Custom orders take a little longer — but they are worth the wait.',
    href: '/the-craft',
    cta: 'See how we make it',
  },
] as const;

export function FeatureList() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        {/* Section label */}
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-text-muted">
            How to order
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Steps */}
        <div className="divide-y divide-border">
          {steps.map(({ n, title, description, href, cta }) => (
            <div
              key={n}
              className="group grid gap-4 py-8 sm:grid-cols-[4rem_1fr_auto] sm:items-start"
            >
              {/* Number */}
              <span className="font-mono text-4xl font-light leading-none text-brand/30 group-hover:text-brand/60 transition-colors duration-300">
                {n}
              </span>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="font-heading text-2xl text-primary">{title}</h3>
                <p className="max-w-lg text-sm leading-7 text-text-muted">{description}</p>
              </div>

              {/* CTA */}
              {href && cta && (
                <Link
                  href={href}
                  className="mt-1 hidden shrink-0 text-sm font-medium text-brand hover:underline underline-offset-4 sm:block"
                >
                  {cta} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
