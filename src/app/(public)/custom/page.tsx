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
        <div className="flex flex-row sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {steps.map(({ step, title, desc }) => (
            <div key={step} className="w-[85vw] sm:w-auto shrink-0 sm:shrink rounded-sm border border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 to-teal-50/30 p-6 snap-start">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-600 font-semibold">Step {step}</p>
              <p className="mt-3 font-heading text-2xl text-emerald-950">{title}</p>
              <p className="mt-2 text-sm leading-6 text-emerald-900/70">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section spacing="md">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-600 font-semibold">Your request</p>
            <h2 className="mt-2 font-heading text-3xl text-emerald-950">Tell us your vision</h2>
          </div>
          <div className="rounded-sm border border-emerald-200/60 bg-white p-6 sm:p-8 shadow-[0_8px_30px_rgb(5,150,105,0.06)]">
            <CustomOrderForm />
          </div>
        </div>
      </Section>
    </>
  );
}
