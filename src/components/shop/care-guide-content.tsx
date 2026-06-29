'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';

const materials = [
  {
    name: 'Wire jewelry (copper & brass)',
    daily: 'Remove before washing hands, swimming, or showering. Put on after applying perfume or lotion.',
    cleaning: 'Wipe with a soft dry cloth after wearing. For deeper cleaning, use a very slightly damp cloth and dry immediately.',
    storage: 'Store in a small pouch or zip-lock bag to slow tarnishing. Keep pieces separate to avoid scratching.',
    avoid: 'Chlorine, saltwater, harsh chemicals, hand sanitizer, and extended sun exposure.',
  },
  {
    name: 'Brass rings',
    daily: 'Remove before water exposure. Brass can leave a temporary green mark on some skin — harmless and washes off.',
    cleaning: 'Use a brass-specific polish cloth occasionally. Or rub with a cut lemon, rinse quickly, dry completely.',
    storage: 'Keep in an airtight pouch when not wearing. Wrap in anti-tarnish paper if storing long-term.',
    avoid: 'Water, sweat, perfume, and acidic substances (except for intentional cleaning).',
  },
  {
    name: 'Mandala art (framed)',
    daily: 'Keep away from direct sunlight and humidity. Do not hang in bathrooms or kitchens.',
    cleaning: 'Dust lightly with a dry soft brush. Do not use water or cleaning sprays on the paper surface.',
    storage: 'Store flat between acid-free paper if not displayed. Keep in a dry, room-temperature space.',
    avoid: 'Water, humidity, direct sun, and physical pressure on the paper.',
  },
  {
    name: 'Moon lamps',
    daily: 'Handle with dry hands. Keep the USB cable unplugged when not in use for extended periods.',
    cleaning: 'Wipe the surface with a barely damp cloth. Dry immediately. Do not immerse in water.',
    storage: 'Keep in the original box or wrap in soft cloth. Avoid dropping — the resin can crack.',
    avoid: 'Dropping, excessive heat, and prolonged direct sunlight.',
  },
] as const;

const dos = [
  'Store in a pouch or airtight bag when not wearing',
  'Put jewelry on last — after perfume, lotion, and hairspray',
  'Remove before water activities, exercise, and sleep',
  'Wipe with a soft dry cloth after each wear',
  'Keep pieces separated to avoid scratches',
];

const donts = [
  "Don't wear in pools, the ocean, or the shower",
  "Don't spray perfume directly onto metal",
  "Don't store in humid environments like bathrooms",
  "Don't use harsh chemical cleaners",
  "Don't bend or force wire shapes — they are hand-formed and delicate",
];

const faqs = [
  { q: 'Will my copper or brass ring turn my finger green?', a: 'It can, especially if your skin is naturally acidic or if you sweat a lot. This is completely harmless — it is just a chemical reaction between the metal and your skin. The green mark washes off with soap and water. Keeping the ring dry and clean minimizes this.' },
  { q: 'Can I wear wire jewelry in water?', a: 'We strongly advise against it. Water — especially chlorinated or salty water — accelerates tarnishing and can weaken wire wrapping over time. Always remove your Jupiter pieces before swimming, showering, or washing dishes.' },
  { q: 'How do I restore shine to a tarnished piece?', a: 'For copper: rub gently with a mix of lemon juice and a pinch of salt, rinse quickly with clean water, and dry immediately and completely. For brass: use a small amount of brass polish on a soft cloth. A polishing cloth designed for copper/brass works well and is gentler.' },
] as const;

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-4 py-4 text-left" aria-expanded={open}>
        <span className="font-medium text-primary">{q}</span>
        <span className="shrink-0 text-lg text-text-muted" aria-hidden>{open ? '−' : '+'}</span>
      </button>
      {open && <p className="pb-4 text-sm leading-7 text-text-muted">{a}</p>}
    </div>
  );
}

export function CareGuideContent() {
  return (
    <>
      {/* Material sections */}
      <div className="space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">By material</p>
        <h2 className="font-heading text-3xl text-primary">Material-specific care</h2>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {materials.map((m) => (
          <Card key={m.name}>
            <div className="space-y-4 p-6">
              <h3 className="font-heading text-xl text-primary">{m.name}</h3>
              <dl className="space-y-3 text-sm">
                {([['Daily wear', m.daily], ['Cleaning', m.cleaning], ['Storage', m.storage], ['Avoid', m.avoid]] as const).map(([label, val]) => (
                  <div key={label}>
                    <dt className="font-semibold text-primary">{label}</dt>
                    <dd className="mt-0.5 leading-6 text-text-muted">{val}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Card>
        ))}
      </div>

      {/* Do's and Don'ts */}
      <div className="mt-12 space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Quick reference</p>
        <h2 className="font-heading text-3xl text-primary">Do&apos;s and don&apos;ts</h2>
      </div>
      <Card className="mt-8">
        <div className="grid gap-0 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
          <div className="space-y-3 p-6">
            <p className="font-heading text-xl text-primary">✓ Do</p>
            <ul className="space-y-2">
              {dos.map((tip) => <li key={tip} className="flex gap-2 text-sm text-text-muted"><span className="mt-0.5 text-brand">•</span>{tip}</li>)}
            </ul>
          </div>
          <div className="space-y-3 p-6">
            <p className="font-heading text-xl text-primary">✗ Don&apos;t</p>
            <ul className="space-y-2">
              {donts.map((tip) => <li key={tip} className="flex gap-2 text-sm text-text-muted"><span className="mt-0.5 text-copper">•</span>{tip}</li>)}
            </ul>
          </div>
        </div>
      </Card>

      {/* FAQ accordion */}
      <div className="mt-12 space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Common questions</p>
        <h2 className="font-heading text-3xl text-primary">Care FAQs</h2>
      </div>
      <Card className="mt-8">
        <div className="px-6">
          {faqs.map((faq) => <AccordionItem key={faq.q} q={faq.q} a={faq.a} />)}
        </div>
      </Card>
    </>
  );
}
