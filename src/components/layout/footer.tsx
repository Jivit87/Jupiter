import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import type { SiteSettingsState } from '@/lib/site-settings';

const footerLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/the-craft', label: 'The Craft' },
  { href: '/custom', label: 'Custom Orders' },
  { href: '/contact', label: 'Contact' },
] as const;

type FooterProps = {
  className?: string;
  settings?: SiteSettingsState;
};

export function Footer({ className, settings }: FooterProps) {
  const instagramHandle = settings?.instagramHandle ?? siteConfig.handles.instagram;
  const instagramUrl = `https://www.instagram.com/${instagramHandle}/`;

  return (
    <footer className={cn('border-t border-border/70 bg-surface/70 py-14', className)}>
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-4">
            <Link href="/" className="inline-flex flex-col gap-2">
              <span className="font-display text-3xl text-primary">Jupiter</span>
              <span className="max-w-sm text-sm leading-6 text-text-muted">
                {siteConfig.description}
              </span>
            </Link>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-muted">
              Handmade in Nepal
            </p>
          </div>

          <nav aria-label="Footer" className="space-y-4">
            <p className="font-heading text-lg text-primary">Navigate</p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-muted transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4">
            <p className="font-heading text-lg text-primary">Connect</p>
            <div className="space-y-3 text-sm text-text-muted">
              <p>Instagram: @{instagramHandle}</p>
              <Link
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="block transition-colors hover:text-primary"
              >
                Follow on Instagram
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/70 pt-6 text-sm text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Jupiter. All rights reserved.</p>
          <p>Made with care, cosmic intention, and Nepali craftsmanship.</p>
        </div>
      </Container>
    </footer>
  );
}
