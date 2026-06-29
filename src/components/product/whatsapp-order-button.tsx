'use client';

import Link from 'next/link';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { generateWhatsAppURL } from '@/lib/whatsapp';
import { useSiteSettings } from '@/components/providers/site-settings-provider';

type WhatsAppOrderButtonProps = {
  product: Pick<Product, 'name' | 'sku' | 'price' | 'images'> & {
    category?: { name: string } | null;
  };
  productUrl: string;
  className?: string;
};

export function WhatsAppOrderButton({ product, productUrl, className }: WhatsAppOrderButtonProps) {
  const siteSettings = useSiteSettings();
  const url = generateWhatsAppURL(product, productUrl, { phoneNumber: siteSettings?.whatsappNumber });

  return (
    <Button asChild variant="whatsapp" className={className}>
      <Link href={url} target="_blank" rel="noreferrer">
        Order via WhatsApp
      </Link>
    </Button>
  );
}
