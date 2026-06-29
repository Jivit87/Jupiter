import type { Metadata } from 'next';
import { AccordionFaqs } from '@/components/shop/accordion-faqs';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'FAQs | Jupiter — Handmade in Nepal',
  description: 'Answers to common questions about ordering, shipping, custom pieces, and caring for your Jupiter handmade jewelry.',
  path: '/faq',
});

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQs"
        title="Questions, answered"
        description="Everything you need to know about ordering, shipping, custom pieces, and caring for your Jupiter jewelry."
      />
      <Section spacing="md">
        <AccordionFaqs />
      </Section>
    </>
  );
}
