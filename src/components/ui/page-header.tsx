import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './container';

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  align = 'left',
  className,
}: PageHeaderProps) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <section className={cn('py-12 sm:py-16', className)}>
      <Container>
        <div className={cn('flex max-w-3xl flex-col gap-4', alignClass)}>
          {eyebrow ? (
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">{eyebrow}</p>
          ) : null}
          <div className="space-y-3">
            <h1 className="font-display text-4xl leading-tight text-primary sm:text-5xl lg:text-6xl">{title}</h1>
            {description ? (
              <p className="text-base leading-7 text-text-muted sm:text-lg">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex flex-wrap gap-3 pt-2">{actions}</div> : null}
        </div>
      </Container>
    </section>
  );
}
