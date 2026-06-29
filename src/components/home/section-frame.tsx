import type { ReactNode } from 'react';
import { Container } from '@/components/ui/container';

type SectionFrameProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function SectionFrame({ eyebrow, title, description, children }: SectionFrameProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="space-y-10">
          <div className="max-w-2xl space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">{eyebrow}</p>
            <h2 className="font-heading text-3xl text-primary sm:text-4xl">{title}</h2>
            <p className="text-base leading-7 text-text-muted sm:text-lg">{description}</p>
          </div>
          {children}
        </div>
      </Container>
    </section>
  );
}
