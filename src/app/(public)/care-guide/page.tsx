import type { Metadata } from 'next';
import { CareGuideContent } from '@/components/shop/care-guide-content';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Care Guide | Jupiter — Handmade Jewelry Care',
  description: 'How to care for your Jupiter handmade jewelry and art. Material-specific care tips for copper, brass, wire jewelry, and more.',
  path: '/care-guide',
});

export default function CareGuidePage() {
  return (
    <>
      <PageHeader
        eyebrow="Care Guide"
        title="Caring for your Jupiter piece"
        description="Handmade jewelry deserves handmade love. These guidelines will keep your pieces looking beautiful for years."
      />
      <Section spacing="md">
        <CareGuideContent />
      </Section>
    </>
  );
}
