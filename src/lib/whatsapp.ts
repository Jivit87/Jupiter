import type { Category, Product } from '@/types';
import { getPublicEnv } from './env';
import { formatPrice } from './utils';

type WhatsAppProduct = Pick<
  Product,
  'name' | 'sku' | 'price' | 'images'
> & {
  category?: Pick<Category, 'name'> | null;
};

type WhatsAppContact = {
  phoneNumber?: string;
};

export function generateWhatsAppURL(product: WhatsAppProduct, productUrl: string, contact?: WhatsAppContact): string {
  let phoneNumber = contact?.phoneNumber;

  if (!phoneNumber) {
    const env = getPublicEnv();
    phoneNumber = env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  }

  if (!phoneNumber) {
    throw new Error('NEXT_PUBLIC_WHATSAPP_NUMBER is required to build WhatsApp links.');
  }

  const message = [
    'Hi Jupiter!',
    '',
    "I'm interested in ordering:",
    '',
    `*Product:* ${product.name}`,
    product.sku ? `*SKU:* ${product.sku}` : null,
    typeof product.price === 'number' ? `*Price:* ${formatPrice(product.price)}` : null,
    `*Category:* ${product.category?.name ?? 'Handmade'}`,
    '',
    `*Product Link:* ${productUrl}`,
    product.images?.[0] ? `*Product Image:* ${product.images[0]}` : null,
    '',
    'Could you please confirm availability and delivery details?',
  ]
    .filter((line): line is string => Boolean(line))
    .join('\n');

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

export function generateCustomOrderWhatsAppURL(details: {
  description: string;
  occasion?: string;
  budget?: string;
  referenceImage?: string;
  deadline?: string;
  materials?: string[];
  customerName?: string;
  customerPhone?: string;
}, contact?: WhatsAppContact): string {
  let phoneNumber = contact?.phoneNumber;

  if (!phoneNumber) {
    const env = getPublicEnv();
    phoneNumber = env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  }

  if (!phoneNumber) {
    throw new Error('NEXT_PUBLIC_WHATSAPP_NUMBER is required to build WhatsApp links.');
  }

  const message = [
    'Hi Jupiter!',
    '',
    "I'd like to place a *Custom Order*:",
    '',
    `*What I want:* ${details.description}`,
    details.occasion ? `*For:* ${details.occasion}` : null,
    details.budget ? `*Budget (approx):* ${details.budget}` : null,
    details.materials?.length ? `*Preferred materials:* ${details.materials.join(', ')}` : null,
    details.customerName ? `*Name:* ${details.customerName}` : null,
    details.customerPhone ? `*WhatsApp:* ${details.customerPhone}` : null,
    details.referenceImage ? `*Reference Image:* ${details.referenceImage}` : null,
    details.deadline ? `*Deadline:* ${details.deadline}` : null,
    '',
    'Looking forward to hearing from you!',
  ]
    .filter((line): line is string => Boolean(line))
    .join('\n');

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
