'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SearchOverlay } from '@/components/shop/search-overlay';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/the-craft', label: 'The Craft' },
  { href: '/custom', label: 'Custom Orders' },
  { href: '/contact', label: 'Contact' },
] as const;

import type { Category } from '@/types';

type MobileNavProps = { categories?: Category[] };

export function MobileNav({  }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full hover:bg-[#F9FAFB] transition-colors md:hidden"
      >
        <span className={cn('block h-px w-5 bg-black transition-all', open && 'translate-y-[4px] rotate-45')} />
        <span className={cn('block h-px w-5 bg-black transition-all', open && 'opacity-0')} />
        <span className={cn('block h-px w-5 bg-black transition-all', open && '-translate-y-[4px] -rotate-45')} />
      </button>

      {mounted && open && createPortal(
        <div className="fixed inset-0 z-[100] flex justify-end md:hidden">
          {/* Translucent Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setOpen(false)}
          />
          
          {/* Side Drawer */}
          <div className="relative w-[85vw] max-w-[360px] h-full flex flex-col bg-white shadow-2xl animate-slide-in-right border-l border-[#E5E7EB]">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
              <span className="font-display text-xl tracking-[0.1em] text-black font-semibold">JUPITER</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] text-[#4B5563] transition-colors hover:bg-[#F9FAFB]"
              >
                <i className="ri-close-line text-lg"></i>
              </button>
            </div>

            <div className="border-b border-[#E5E7EB] px-5 py-4 bg-white">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const q = formData.get('q');
                  if (q && typeof q === 'string') {
                    setOpen(false);
                    router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
                  }
                }}
                className="relative flex items-center"
              >
                <i className="ri-search-line absolute left-3.5 text-[#6B7280]"></i>
                <input 
                  type="text" 
                  name="q"
                  placeholder="Search products..." 
                  className="w-full rounded-md border border-[#E5E7EB] bg-[#F9FAFB] py-2.5 pl-10 pr-4 text-sm text-black shadow-sm transition-colors focus:border-black focus:outline-none focus:ring-1 focus:ring-black placeholder:text-[#6B7280]"
                  autoComplete="off"
                />
              </form>
            </div>

            <nav className="flex-1 overflow-y-auto px-5 py-6">
              <ul className="space-y-2">
              {navItems.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block rounded-sm px-4 py-4 font-medium transition-colors border text-center text-sm tracking-wide uppercase',
                      (href === '/' ? pathname === href : (pathname === href || pathname?.startsWith(href))) ? 'bg-[#F9FAFB] border-[#E5E7EB] text-black font-semibold' : 'border-transparent text-[#4B5563] hover:bg-[#F9FAFB]',
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

          </nav>
          </div>
        </div>,
        document.body
      )}

      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
