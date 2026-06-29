import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import type { BuildMetadataOptions, JsonLdGraph } from '@/types/seo';
import { truncateText } from './utils';

export function buildMetadata({
  title,
  description = siteConfig.description,
  path,
  image = '/og-image.svg',
}: BuildMetadataOptions): Metadata {
  const url = path ? new URL(path, siteConfig.url).toString() : siteConfig.url;

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export function buildOrganizationJsonLd(): JsonLdGraph {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: new URL('/logo.svg', siteConfig.url).toString(),
    sameAs: [siteConfig.socials.instagram],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Nepali'],
    },
  };
}

export function buildProductJsonLd(input: {
  name: string;
  description?: string | null;
  imageUrls?: string[] | null;
  price?: number | null;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: input.name,
    description: input.description ? truncateText(input.description, 160) : undefined,
    image: input.imageUrls ?? [],
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
    offers: {
      '@type': 'Offer',
      price: input.price ?? undefined,
      priceCurrency: 'NPR',
      availability: `https://schema.org/${input.availability ?? 'PreOrder'}`,
      seller: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
    },
  };
}
