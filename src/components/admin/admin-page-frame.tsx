import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';

type AdminPageFrameProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function AdminPageFrame({ eyebrow, title, description, children }: AdminPageFrameProps) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <Section spacing="md">
        <Card>
          <div className="p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted">
              Admin shell
            </p>
            <div className="mt-4 text-sm leading-7 text-text-muted">
              Manage products, categories, reviews, custom orders, and site content from this dashboard.
            </div>
          </div>
        </Card>
      </Section>
      {children}
    </>
  );
}
