'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchOverlay } from '@/components/shop/search-overlay';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/shop', label: 'Shop' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/the-craft', label: 'The Craft' },
  { href: '/custom', label: 'Custom Orders' },
  { href: '/reviews', label: 'Wall of Love' },
  { href: '/contact', label: 'Contact' },
] as const;

import type { Category } from '@/types';

type MobileNavProps = { categories?: Category[] };

export function MobileNav({  }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-background md:hidden"
      >
        <span className={cn('block h-px w-5 bg-primary transition-all', open && 'translate-y-[4px] rotate-45')} />
        <span className={cn('block h-px w-5 bg-primary transition-all', open && 'opacity-0')} />
        <span className={cn('block h-px w-5 bg-primary transition-all', open && '-translate-y-[4px] -rotate-45')} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background md:hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <span className="font-heading text-xl text-primary">Jupiter</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Search"
                onClick={() => { setSearchOpen(true); setOpen(false); }}
                className="rounded-xl border border-border px-3 py-1.5 text-sm text-text-muted"
              >
                <i className="ri-search-line"></i>
              </button>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-border px-3 py-1.5 text-sm text-text-muted"
              >
                Close
              </button>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-6">
            <ul className="space-y-1">
              {navItems.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block rounded-xl px-4 py-3 font-medium transition-colors',
                      (pathname === href || pathname?.startsWith(href)) ? 'bg-brand/10 text-brand' : 'text-primary hover:bg-surface',
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

          </nav>
        </div>
      )}

      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
