'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Category } from '@/types';
import { SearchTrigger } from './search-trigger';
import { WishlistNavButton } from './wishlist-nav-button';
import { MobileNav } from './mobile-nav';
import { siteConfig } from '@/config/site';

function JupiterLogoMark() {
  return (
    <Link href={siteConfig.links.home} className="flex items-center gap-2.5 no-underline group" aria-label="Jupiter — Home">
      <svg viewBox="0 0 40 40" fill="none" width="28" height="28" aria-hidden="true" className="shrink-0 transition-transform group-hover:scale-105">
        <circle cx="20" cy="20" r="18.5" stroke="black" strokeWidth="1.5" />
        <path d="M20 30c-5.5 0-10-3.6-10-8s4.5-8 10-8 6 2.2 6 5-2.6 5-6 5-4-1.4-4-3 1.3-3 3-3" stroke="black" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl tracking-[0.1em] text-black font-semibold">JUPITER</span>
        <span className="mt-1 text-[8.5px] font-bold uppercase tracking-[0.3em] text-[#6B7280]">MADE IN NEPAL</span>
      </span>
    </Link>
  );
}

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: siteConfig.links.shop },
  { label: 'Custom Orders', href: siteConfig.links.custom },
  { label: 'Our Story', href: siteConfig.links.story },
  { label: 'The Craft', href: siteConfig.links.craft },
  { label: 'Contact', href: siteConfig.links.contact },
];

type NavbarProps = { categories?: Category[]; className?: string };

export function Navbar({ categories, className }: NavbarProps) {
  const pathname = usePathname();
  return (
    <header
      className={className}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: '1px solid #E5E7EB',
      }}
    >
      <div className="flex items-center justify-between px-4 sm:px-8 lg:px-14 py-4 mx-auto max-w-[1320px]">
        <JupiterLogoMark />

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.label}
                href={item.href ?? '#'}
                className={`inline-flex items-center gap-1 text-sm font-medium pb-1.5 relative no-underline transition-colors duration-200
                  ${isActive
                    ? 'text-black after:content-[""] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-black'
                    : 'text-[#4B5563] hover:text-black'
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-6">
          <SearchTrigger className="w-5 h-5 text-black hover:text-[#4B5563] transition-colors relative inline-flex" />
          <WishlistNavButton className="w-5 h-5 text-black hover:text-[#4B5563] transition-colors relative inline-flex" />
          <MobileNav categories={categories} />
        </div>
      </div>
    </header>
  );
}
