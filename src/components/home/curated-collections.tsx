'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

const PRODUCTS = [
  { name: 'Spiral Galaxy Pendant', category: 'Necklace', price: 'Rs. 2,450', slug: 'spiral-galaxy-pendant', image: '/products/641709892_17984305259950228_7399867513129634920_n.jpg' },
  { name: 'Amethyst Crystal Holder', category: 'Home Decor', price: 'Rs. 3,200', slug: 'amethyst-crystal-holder', image: '/products/651472726_17986647296950228_3174629027275745618_n.jpg' },
  { name: 'Lotus Bloom Painting', category: 'Art & Paintings', price: 'Rs. 4,800', slug: 'lotus-bloom-painting', image: '/products/654232520_17987358506950228_5679907538051172100_n.jpg' },
  { name: 'Moon Phase Wall Hanging', category: 'Home Decor', price: 'Rs. 2,950', slug: 'moon-phase-wall-hanging', image: '/products/684244165_17993060909950228_3082683601453223140_n.jpg' },
  { name: 'Dreamy Amethyst Ring', category: 'Ring', price: 'Rs. 1,950', slug: 'dreamy-amethyst-ring', image: '/products/642473663_17984583191950228_4941762643303510181_n.jpg' },
] as const;



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
          {PRODUCTS.map((p) => (
            <div key={p.slug} className="product-card">
              <div className="product-media">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width:1160px) 20vw, 200px"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
                <button className="wish-btn" aria-label={`Add ${p.name} to wishlist`} onClick={(e) => e.preventDefault()}>
                  <WishIcon />
                </button>
              </div>
              <div className="product-cat">{p.category}</div>
              <h3>{p.name}</h3>
              <div className="product-price">{p.price}</div>
            </div>
          ))}
        </div>

      <div className="carousel-dots">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={activeDot === i ? 'active' : ''} onClick={() => setActiveDot(i)} style={{ cursor: 'pointer' }} />
        ))}
      </div>
    </section>
  );
}
