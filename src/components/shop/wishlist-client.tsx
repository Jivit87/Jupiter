'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/hooks/use-wishlist';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { generateWhatsAppURL } from '@/lib/whatsapp';
import { siteConfig } from '@/config/site';
import { useSiteSettings } from '@/components/providers/site-settings-provider';

export function WishlistClient() {
  const { items, removeItem, isEmpty, ready } = useWishlist();
  const siteSettings = useSiteSettings();

  return (
    <>
      <PageHeader
        eyebrow="Wishlist"
        title="Saved pieces ❤️"
        description={ready ? (isEmpty ? 'Your wishlist is empty.' : `${items.length} saved piece${items.length !== 1 ? 's' : ''}`) : ''}
      />
      <Section spacing="md">
        {!ready ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-2xl bg-surface" />
            ))}
          </div>
        ) : isEmpty ? (
          <div className="py-20 text-center">
            <p className="font-heading text-3xl text-primary">Nothing saved yet</p>
            <p className="mt-2 text-sm text-text-muted">Tap the heart on any product to save it here.</p>
            <div className="mt-6">
              <Button asChild variant="primary"><Link href="/shop">Browse the shop</Link></Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => {
              const productUrl = `${siteConfig.url}/shop/${item.slug}`;
              const whatsappUrl = generateWhatsAppURL(item, productUrl, { phoneNumber: siteSettings?.whatsappNumber });
              return (
                <div key={item.id} className="overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
                  <div className="relative aspect-square overflow-hidden bg-earthy-cosmos">
                    {item.images?.[0] ? (
                      <Image src={item.images[0]} alt={item.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                    ) : <div className="absolute inset-0 bg-earthy-cosmos" />}
                  </div>
                  <div className="space-y-3 p-4">
                    <div>
                      <Link href={`/shop/${item.slug}`} className="font-heading text-xl text-primary hover:underline">{item.name}</Link>
                      <p className="mt-1 text-sm text-brand">{typeof item.price === 'number' ? formatPrice(item.price) : 'Price on request'}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                        className="flex-1 rounded-xl bg-[#25D366] py-2 text-center text-xs font-semibold text-white">
                        Order via WhatsApp
                      </Link>
                      <button onClick={() => removeItem(item.id)}
                        className="rounded-xl border border-border px-3 py-2 text-xs text-text-muted hover:border-red-300 hover:text-red-500">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Section>
    </>
  );
}
