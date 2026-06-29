import Link from 'next/link';
import type { Category } from '@/types';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { CollectionsDropdown } from './collections-dropdown';
import { MobileNav } from './mobile-nav';
import { NavLinks } from './nav-links';
import { NavLogo } from './nav-logo';
import { SearchTrigger } from './search-trigger';
import { WishlistNavButton } from './wishlist-nav-button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/shop', label: 'Shop' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/the-craft', label: 'The Craft' },
  { href: '/custom', label: 'Custom Orders' },
  { href: '/contact', label: 'Contact' },
] as const;

type NavbarProps = {
  categories?: Category[];
  className?: string;
};

export function Navbar({ categories, className }: NavbarProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl',
        className,
      )}
    >
      <Container>
        <div className="flex min-h-20 items-center justify-between gap-4 py-3">
          <NavLogo />

          <div className="hidden items-center gap-1 lg:flex">
            <CollectionsDropdown categories={categories} />
            <NavLinks items={navItems} />
          </div>

          <div className="flex items-center gap-2">
            <SearchTrigger className="hidden sm:inline-flex" />
            <WishlistNavButton className="hidden sm:inline-flex" />
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
              <Link href={siteConfig.links.shop}>Explore</Link>
            </Button>
            <Button asChild variant="primary" size="sm" className="hidden sm:inline-flex">
              <Link href={siteConfig.links.custom}>Custom</Link>
            </Button>
            <MobileNav categories={categories} />
          </div>
        </div>
      </Container>
    </header>
  );
}
