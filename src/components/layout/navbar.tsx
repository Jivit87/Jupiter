import Link from 'next/link';
import type { Category } from '@/types';
import { SearchTrigger } from './search-trigger';
import { WishlistNavButton } from './wishlist-nav-button';
import { MobileNav } from './mobile-nav';
import { siteConfig } from '@/config/site';

function JupiterLogoMark() {
  return (
    <Link href={siteConfig.links.home} className="logo" aria-label="Jupiter — Home">
      <svg className="mark" viewBox="0 0 40 40" fill="none" width="30" height="30" aria-hidden="true">
        <circle cx="20" cy="20" r="18.5" stroke="#b8863a" strokeWidth="1" />
        <path d="M20 30c-5.5 0-10-3.6-10-8s4.5-8 10-8 6 2.2 6 5-2.6 5-6 5-4-1.4-4-3 1.3-3 3-3" stroke="#b8863a" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      </svg>
      <span className="logo-text">
        <span className="name">JUPITER</span>
        <span className="sub">MADE IN NEPAL</span>
      </span>
    </Link>
  );
}

const NAV_ITEMS = [
  { label: 'Home', href: '/', active: true },
  { label: 'Shop', href: siteConfig.links.shop },
  { label: 'Collections', href: siteConfig.links.collections, hasDropdown: true },
  { label: 'Custom Orders', href: siteConfig.links.custom },
  { label: 'Our Story', href: siteConfig.links.story },
  { label: 'The Craft', href: siteConfig.links.craft },
  { label: 'Contact', href: siteConfig.links.contact },
];

type NavbarProps = { categories?: Category[]; className?: string };

export function Navbar({ categories, className }: NavbarProps) {
  return (
    <header className={className}>
      <div className="nav-row">
        <JupiterLogoMark />

        <nav className="primary" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={item.active ? 'active' : ''}
            >
              {item.label}
              {item.hasDropdown && (
                <svg viewBox="0 0 10 6" fill="none" aria-hidden="true">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              )}
            </Link>
          ))}
        </nav>

        <div className="nav-icons">
          <SearchTrigger className="icon-btn" />
          <WishlistNavButton className="icon-btn" />
          <MobileNav categories={categories} />
        </div>
      </div>

      <style>{`
        /* Header — matches design_code.html */
        header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(244, 237, 224, 0.94);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--line);
        }
        .nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 56px;
          max-width: 1320px;
          margin: 0 auto;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .logo .mark {
          width: 30px;
          height: 30px;
          flex-shrink: 0;
        }
        .logo-text { line-height: 1; }
        .logo-text .name {
          font-family: 'Marcellus', var(--font-display), serif;
          font-size: 20px;
          letter-spacing: 0.1em;
          color: var(--ink);
        }
        .logo-text .sub {
          font-size: 8.5px;
          letter-spacing: 0.3em;
          color: var(--gold-deep);
          margin-top: 4px;
          display: block;
          font-weight: 500;
        }
        nav.primary {
          display: flex;
          align-items: center;
          gap: 34px;
        }
        nav.primary a {
          font-size: 13.5px;
          letter-spacing: 0.02em;
          color: #4a4238;
          font-weight: 400;
          position: relative;
          padding-bottom: 6px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: color 0.2s ease;
          text-decoration: none;
        }
        nav.primary a:hover { color: var(--ink); }
        nav.primary a.active { color: var(--gold-deep); font-weight: 500; }
        nav.primary a.active::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1.5px;
          background: var(--gold-deep);
        }
        nav.primary a svg { width: 9px; height: 9px; opacity: 0.7; margin-top: 1px; }
        .nav-icons {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .icon-btn {
          width: 19px;
          height: 19px;
          color: var(--ink);
          position: relative;
          display: inline-flex;
        }
        .icon-btn svg { width: 100%; height: 100%; }

        @media (max-width: 720px) {
          .nav-row { padding-left: 22px; padding-right: 22px; }
          nav.primary { display: none; }
        }
      `}</style>
    </header>
  );
}