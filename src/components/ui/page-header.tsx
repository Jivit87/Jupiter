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
    <section className={cn('pt-12 pb-0 sm:pt-16 sm:pb-0', className)}>
      <Container>
        <div className={cn('flex max-w-3xl flex-col gap-4', alignClass)}>
          {eyebrow ? (
            <span className={cn(
              "flex items-center gap-2.5 text-[11px] tracking-[0.28em] uppercase text-black font-medium before:content-[''] before:w-5 before:h-px before:bg-black",
              align === 'center' && "justify-center after:content-[''] after:w-5 after:h-px after:bg-black"
            )}>
              {eyebrow}
            </span>
          ) : null}
          <div className="space-y-3">
            <h1 className="font-display text-4xl leading-tight text-black sm:text-5xl lg:text-6xl tracking-[0.005em]">{title}</h1>
            {description ? (
              <p className="text-base leading-7 text-[#4B5563] sm:text-lg font-body">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex flex-wrap gap-3 pt-2">{actions}</div> : null}
        </div>
      </Container>
    </section>
  );
}
