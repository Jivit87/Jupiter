'use client';

import { useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

const PRODUCTS = [
  { name: 'Spiral Galaxy Pendant', category: 'Necklace', price: 'Rs. 2,450', slug: 'spiral-galaxy-pendant' },
  { name: 'Amethyst Crystal Holder', category: 'Home Decor', price: 'Rs. 3,200', slug: 'amethyst-crystal-holder' },
  { name: 'Lotus Bloom Painting', category: 'Art & Paintings', price: 'Rs. 4,800', slug: 'lotus-bloom-painting' },
  { name: 'Moon Phase Wall Hanging', category: 'Home Decor', price: 'Rs. 2,950', slug: 'moon-phase-wall-hanging' },
  { name: 'Dreamy Amethyst Ring', category: 'Ring', price: 'Rs. 1,950', slug: 'dreamy-amethyst-ring' },
] as const;

function SpiralPendantSVG() {
  return (
    <svg viewBox="0 0 200 230"><rect width="200" height="230" fill="#291a0d" /><rect width="200" height="230" fill="url(#g1)" /><defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4a3320" stopOpacity=".9" /><stop offset="1" stopColor="#160d06" stopOpacity=".9" /></linearGradient></defs><path d="M100 90C80 92 68 106 68 120a24 24 0 0 0 24 24c11 0 18-6 18-15s-7-13-14-13-11 4-11 9" stroke="#d9ac5f" strokeWidth="3" fill="none" strokeLinecap="round" /><line x1="100" y1="90" x2="100" y2="45" stroke="#d9ac5f" strokeWidth="2" /><line x1="88" y1="50" x2="100" y2="45" stroke="#d9ac5f" strokeWidth="2" /><line x1="112" y1="50" x2="100" y2="45" stroke="#d9ac5f" strokeWidth="2" /></svg>
  );
}
function AmethystHolderSVG() {
  return (
    <svg viewBox="0 0 200 230"><rect width="200" height="230" fill="#231232" /><polygon points="80,230 65,150 95,90 118,150 108,230" fill="#6a4a92" /><polygon points="115,230 100,140 132,75 155,140 145,230" fill="#57397c" /><ellipse cx="100" cy="150" rx="46" ry="14" fill="#3a2555" /><path d="M100 108c8 10 8 17 0 25-8-8-8-15 0-25z" fill="#f2a93b" /><path d="M100 118c4 5 4 8 0 13-4-5-4-8 0-13z" fill="#fff3cf" /></svg>
  );
}
function LotusPaintingSVG() {
  return (
    <svg viewBox="0 0 200 230"><rect width="200" height="230" fill="#182338" /><path d="M100 200 C65 185 55 150 100 118 C145 150 135 185 100 200Z" fill="#c98fb5" /><path d="M100 200 C80 170 80 140 100 118 C120 140 120 170 100 200Z" fill="#e3a9c9" /><path d="M100 200 C90 175 90 150 100 132 C110 150 110 175 100 200Z" fill="#f3c9de" /><circle cx="100" cy="118" r="4" fill="#f2d98f" /></svg>
  );
}
function MoonPhaseHangingSVG() {
  return (
    <svg viewBox="0 0 200 230"><rect width="200" height="230" fill="#e2d6ba" /><line x1="80" y1="40" x2="80" y2="150" stroke="#a3916b" strokeWidth="1.5" /><line x1="100" y1="40" x2="100" y2="170" stroke="#a3916b" strokeWidth="1.5" /><line x1="120" y1="40" x2="120" y2="150" stroke="#a3916b" strokeWidth="1.5" /><circle cx="80" cy="155" r="5" fill="#c3af78" /><circle cx="100" cy="176" r="5" fill="#c3af78" /><circle cx="120" cy="155" r="5" fill="#c3af78" /></svg>
  );
}
function AmethystRingSVG() {
  return (
    <svg viewBox="0 0 200 230"><rect width="200" height="230" fill="#241a12" /><circle cx="100" cy="150" r="30" fill="none" stroke="#c8933f" strokeWidth="7" /><ellipse cx="100" cy="105" rx="18" ry="14" fill="#5f3480" /><ellipse cx="100" cy="101" rx="13" ry="9" fill="#8156a3" /></svg>
  );
}

const PRODUCT_SVGS = [SpiralPendantSVG, AmethystHolderSVG, LotusPaintingSVG, MoonPhaseHangingSVG, AmethystRingSVG];

function WishIcon() {
  return <svg viewBox="0 0 24 24" fill="none"><path d="M12 20s-7.5-4.7-9.8-9.4C.6 6.9 2.6 3 6.4 3c2.1 0 3.7 1.2 4.6 2.7C11.9 4.2 13.5 3 15.6 3c3.8 0 5.8 3.9 4.2 7.6C19.5 15.3 12 20 12 20z" stroke="currentColor" strokeWidth="1.6" /></svg>;
}

export function CuratedCollections() {
  const [activeDot, setActiveDot] = useState(0);

  return (
    <section className="section" id="shop" style={{ paddingTop: '10px' }}>
      <div className="featured-head">
        <div className="section-head left">
          <span className="eyebrow">Handpicked for You</span>
          <h2>Featured Creations</h2>
        </div>
        <Link href={siteConfig.links.shop} className="view-all">
          View All Products
          <svg viewBox="0 0 16 16" fill="none"><path d="M2 8h11M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" /></svg>
        </Link>
      </div>

      <div className="products-grid">
        {PRODUCTS.map((p, i) => {
          const SvgComponent = PRODUCT_SVGS[i];
          return (
            <div key={p.slug} className="product-card">
              <div className="product-media">
                <SvgComponent />
                <button className="wish-btn" aria-label={`Add ${p.name} to wishlist`} onClick={(e) => e.preventDefault()}>
                  <WishIcon />
                </button>
              </div>
              <div className="product-cat">{p.category}</div>
              <h3>{p.name}</h3>
              <div className="product-price">{p.price}</div>
            </div>
          );
        })}
      </div>

      <div className="carousel-dots">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={activeDot === i ? 'active' : ''} onClick={() => setActiveDot(i)} style={{ cursor: 'pointer' }} />
        ))}
      </div>
    </section>
  );
}
