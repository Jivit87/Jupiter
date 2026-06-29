import { Container } from '@/components/ui/container';

type HighlightStripProps = {
  title: string;
  description: string;
};

export function HighlightStrip({ title, description }: HighlightStripProps) {
  return (
    <section className="py-6">
      <Container>
        <div className="rounded-[2rem] bg-primary px-6 py-8 text-starlight shadow-soft sm:px-10">
          <div className="grid gap-4 md:grid-cols-[0.75fr_1.25fr] md:items-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-starlight/70">{title}</p>
            <p className="max-w-3xl text-base leading-7 text-starlight/85 sm:text-lg">{description}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
