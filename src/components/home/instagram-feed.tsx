import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { siteConfig } from '@/config/site';

type InstagramFeedProps = {
  handle?: string;
};

export function InstagramFeed({ handle }: InstagramFeedProps) {
  const resolvedHandle = handle ?? siteConfig.handles.instagram;
  const profileUrl = `https://www.instagram.com/${resolvedHandle}/`;

  const highlights = [
    { title: 'Studio light', note: 'Warm metals, soft shadows, and slow mornings.' },
    { title: 'Spiral details', note: 'Signature forms shaped one curve at a time.' },
    { title: 'Wrapped gifts', note: 'Finished pieces prepared with care.' },
    { title: 'Copper tones', note: 'Earthy finishes and handcrafted texture.' },
    { title: 'Work in progress', note: 'Sketches, tools, and the making process.' },
    { title: 'Custom moments', note: 'Personal commissions and one-off requests.' },
  ] as const;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="space-y-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Instagram</p>
              <h2 className="mt-2 font-heading text-3xl text-primary sm:text-4xl">
                Follow our journey
              </h2>
              <p className="mt-1 text-base text-text-muted">@{resolvedHandle}</p>
            </div>
            <Link
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex self-start rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:border-primary sm:self-auto"
            >
              Follow on Instagram →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Link
                key={i}
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View post ${i + 1} on Instagram`}
                className="group aspect-square overflow-hidden rounded-2xl border border-border bg-earthy-cosmos/90 transition-transform hover:-translate-y-0.5 hover:shadow-lift"
              >
                <div className="flex h-full flex-col justify-between p-4">
                  <div className="flex items-start justify-between">
                    <span className="rounded-full border border-border bg-background/70 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-lg opacity-70 transition-transform group-hover:scale-110">🪐</span>
                  </div>
                  <div className="space-y-1">
                    <p className="font-heading text-lg text-primary">{highlights[i].title}</p>
                    <p className="text-xs leading-5 text-text-muted">{highlights[i].note}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <p className="text-center font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted">
            @{resolvedHandle} on Instagram
          </p>
        </div>
      </Container>
    </section>
  );
}
