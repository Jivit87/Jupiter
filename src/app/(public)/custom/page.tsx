import type { Metadata } from 'next';
import { CustomOrderForm } from '@/components/shop/custom-order-form';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Custom Orders | Jupiter — Handmade in Nepal',
  description: 'Request a custom handmade piece from Jupiter. Tell us your vision and we\'ll bring it to life from Nepal.',
  path: '/custom',
});

const steps = [
  { step: '01', title: 'Fill the form', desc: 'Tell us what you have in mind.' },
  { step: '02', title: 'We discuss on WhatsApp', desc: "We'll talk details, timeline, and materials." },
  { step: '03', title: 'We create your piece', desc: 'Handcrafted with care in Nepal.' },
  { step: '04', title: 'Delivered to you', desc: 'Shipped anywhere in Nepal.' },
] as const;

export default function CustomPage() {
  return (
    <>
      <PageHeader
        eyebrow="Custom Orders"
        title="Something made just for you"
        description="Tell us your vision — we'll bring it to life from Nepal ✨"
      />

      <Section spacing="md">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ step, title, desc }) => (
            <div key={step} className="rounded-sm border border-[#E5E7EB] bg-[#F9FAFB] p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#4B5563]">Step {step}</p>
              <p className="mt-3 font-heading text-2xl text-black">{title}</p>
              <p className="mt-2 text-sm leading-6 text-[#4B5563]">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section spacing="md">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#4B5563]">Your request</p>
            <h2 className="mt-2 font-heading text-3xl text-black">Tell us your vision</h2>
          </div>
          <div className="rounded-sm border border-[#E5E7EB] bg-white p-6 sm:p-8">
            <CustomOrderForm />
          </div>
        </div>
      </Section>
    </>
  );
}
