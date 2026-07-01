import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import { AppProviders } from '@/components/providers/app-providers';
import { SkipLink } from '@/components/layout/skip-link';
import { siteConfig } from '@/config/site';
import { getPublicEnv } from '@/lib/env';
import { JsonLd } from '@/lib/json-ld';
import { buildOrganizationJsonLd } from '@/lib/seo';
import { cn } from '@/lib/utils';
import 'remixicon/fonts/remixicon.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
    images: [{ url: '/og-image.svg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['/og-image.svg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1A1040',
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const publicEnv = getPublicEnv();

  return (
    <html lang={siteConfig.language} suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans text-text-primary antialiased')}>
        <JsonLd data={buildOrganizationJsonLd()} />
        <ClerkProvider>
          <AppProviders>
            <SkipLink />
            {children}
          </AppProviders>
        </ClerkProvider>
        {publicEnv.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${publicEnv.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${publicEnv.NEXT_PUBLIC_GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        )}
        {publicEnv.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
          <Script id="clarity-init" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${publicEnv.NEXT_PUBLIC_CLARITY_PROJECT_ID}");`}
          </Script>
        )}
      </body>
    </html>
  );
}
