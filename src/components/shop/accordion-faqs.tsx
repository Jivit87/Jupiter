'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

const faqGroups = [
  {
    group: 'Shipping & Delivery',
    faqs: [
      { q: 'Do you ship outside Nepal?', a: 'Currently we ship within Nepal only. We are working on international shipping for India and beyond — follow @jupiterrrr_11 on Instagram for updates.' },
      { q: 'How long does delivery take?', a: 'Kathmandu Valley: 1–2 business days. Outside the Valley: 3–7 business days. Custom orders take longer — expect the handmade time (shown on the product) plus shipping time.' },
      { q: 'What shipping service do you use?', a: 'We ship via Pathao and other trusted local delivery partners. You will receive tracking details on WhatsApp once your order is dispatched.' },
    ],
  },
  {
    group: 'Custom Orders',
    faqs: [
      { q: 'How do I place a custom order?', a: 'Visit our Custom Orders page, fill in the form, and click "Send via WhatsApp." We get back to you within 2–3 hours to discuss details, timeline, and pricing.' },
      { q: 'How long do custom orders take?', a: 'Most custom pieces take 3–10 days depending on complexity. We give you an exact timeline on WhatsApp after discussing your request.' },
      { q: 'Can I send a reference image?', a: 'Absolutely. Share a reference image URL in the custom order form, or send it directly on WhatsApp. Pinterest boards, Instagram posts, and sketches all work.' },
      { q: 'Can I get a ring in my exact size?', a: 'Yes. We make rings to order in your exact size. Let us know your ring size (in mm inner diameter or US size) when placing your custom order.' },
    ],
  },
  {
    group: 'Products & Materials',
    faqs: [
      { q: 'What materials do you use?', a: 'We primarily work with copper wire, brass wire, and brass sheet metal. Some pieces also incorporate semi-precious stones, glass beads, and natural elements.' },
      { q: 'Will copper or brass turn my finger green?', a: 'It can — especially if your skin is naturally acidic. The green mark is harmless and washes off with soap and water. Keeping rings dry and clean significantly reduces this.' },
      { q: 'Are your products hypoallergenic?', a: 'Copper and brass are not certified hypoallergenic. If you have known metal allergies, please message us before ordering so we can advise the best option.' },
      { q: 'Do prices include tax?', a: 'All listed prices are in Nepalese Rupees (NPR) and are inclusive of any applicable taxes. No hidden charges.' },
    ],
  },
  {
    group: 'Ordering & Payment',
    faqs: [
      { q: 'How does WhatsApp ordering work?', a: 'Click "Order via WhatsApp" on any product. This opens WhatsApp with a pre-filled message. We confirm availability, discuss customizations, and arrange payment and delivery — all on WhatsApp.' },
      { q: 'What payment methods do you accept?', a: 'We accept eSewa, Khalti, bank transfer, and cash on delivery for Kathmandu Valley. Payment details are shared on WhatsApp when you confirm your order.' },
      { q: 'Can I cancel or change my order?', a: 'Contact us on WhatsApp as soon as possible. We can usually cancel or modify orders not yet in production. Custom orders cannot be cancelled once crafting has begun.' },
    ],
  },
] as const;

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-medium text-primary">{q}</span>
        <span className="shrink-0 text-lg text-text-muted" aria-hidden>{open ? '−' : '+'}</span>
      </button>
      {open && <p className="pb-4 text-sm leading-7 text-text-muted">{a}</p>}
    </div>
  );
}

export function AccordionFaqs() {
  return (
    <>
      <div className="space-y-8">
        {faqGroups.map((group) => (
          <div key={group.group}>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-text-muted">{group.group}</h2>
            <Card>
              <div className="px-6">
                {group.faqs.map((faq) => (
                  <AccordionItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-background p-6 text-center">
        <p className="font-medium text-primary">Still have a question?</p>
        <p className="mt-1 text-sm text-text-muted">We typically respond within 2–3 hours.</p>
        <div className="mt-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1DA851] min-h-[44px] w-full sm:w-auto transition-colors"
          >
            Chat with us on WhatsApp
          </Link>
        </div>
      </div>
    </>
  );
}
