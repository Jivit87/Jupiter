import { type ReactNode } from 'react';
import Link from 'next/link';

const COLLECTION_SVGS: Record<string, ReactNode> = {
  jewelry: (
    <svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#4a2f42" /><path d="M60 40C40 42 30 55 30 68a20 20 0 0 0 20 20c9 0 15-5 15-13s-6-11-12-11-9 3-9 8" stroke="#d9ac5f" strokeWidth="2.4" fill="none" strokeLinecap="round" /><line x1="60" y1="40" x2="60" y2="20" stroke="#d9ac5f" strokeWidth="1.6" /></svg>
  ),
  'home-decor': (
    <svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#cabb98" /><polygon points="45,90 35,60 55,25 68,60 60,90" fill="#8a6fa8" /><polygon points="70,90 60,55 82,30 95,60 88,90" fill="#75588f" /></svg>
  ),
  'art-paintings': (
    <svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#233450" /><path d="M60 90 C40 80 34 60 60 45 C86 60 80 80 60 90Z" fill="#c98fb5" /><path d="M60 90 C48 70 48 55 60 45 C72 55 72 70 60 90Z" fill="#e3a9c9" /></svg>
  ),
  gifts: (
    <svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#22190f" /><rect x="35" y="52" width="50" height="38" fill="#3a2a18" /><rect x="35" y="52" width="50" height="8" fill="#c8933f" /><rect x="56" y="52" width="8" height="38" fill="#c8933f" /><path d="M60 52c-8-14 4-18 0-8 -4-10 8-6 0 8Z" fill="#c8933f" /></svg>
  ),
  accessories: (
    <svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#ded1b1" /><line x1="45" y1="20" x2="45" y2="60" stroke="#9c8a63" strokeWidth="1.5" /><line x1="60" y1="20" x2="60" y2="68" stroke="#9c8a63" strokeWidth="1.5" /><line x1="75" y1="20" x2="75" y2="60" stroke="#9c8a63" strokeWidth="1.5" /><circle cx="45" cy="64" r="4" fill="#c3af78" /><circle cx="60" cy="72" r="4" fill="#c3af78" /><circle cx="75" cy="64" r="4" fill="#c3af78" /></svg>
  ),
  wellness: (
    <svg viewBox="0 0 120 120"><rect width="120" height="120" fill="#1c1712" /><ellipse cx="45" cy="88" rx="14" ry="8" fill="#cabf9f" /><rect x="38" y="60" width="14" height="28" fill="#d9cfaf" /><path d="M45 45c5 6 5 10 0 15-5-5-5-9 0-15z" fill="#f2a93b" /><ellipse cx="78" cy="92" rx="16" ry="9" fill="#c3b795" /><rect x="70" y="66" width="16" height="26" fill="#d3c8a5" /><path d="M78 50c5 6 5 10 0 15-5-5-5-9 0-15z" fill="#f2a93b" /></svg>
  ),
};

const COLLECTIONS = [
  { slug: 'jewelry', title: 'Jewelry' },
  { slug: 'home-decor', title: 'Home Decor' },
  { slug: 'art-paintings', title: 'Art & Paintings' },
  { slug: 'gifts', title: 'Gifts' },
  { slug: 'accessories', title: 'Accessories' },
  { slug: 'wellness', title: 'Wellness' },
] as const;

export function BrandStory() {
  return (
    <section className="section" id="collections">
      <svg className="flourish tl" viewBox="0 0 150 150" fill="none" aria-hidden="true"><path d="M10 10 Q80 10 80 80 T140 140" stroke="currentColor" strokeWidth="1" /><circle cx="10" cy="10" r="3" fill="currentColor" /></svg>
      <svg className="flourish tr" viewBox="0 0 150 150" fill="none" aria-hidden="true"><path d="M10 10 Q80 10 80 80 T140 140" stroke="currentColor" strokeWidth="1" /><circle cx="10" cy="10" r="3" fill="currentColor" /></svg>

      <div className="section-head">
        <span className="eyebrow">Explore Our Collections</span>
        <h2>Find What Speaks to You</h2>
      </div>

      <div className="collections-row">
        <button className="carousel-arrow" aria-label="Previous">
          <svg viewBox="0 0 16 16" fill="none"><path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>

        <div className="collections-track">
          {COLLECTIONS.map((col) => (
            <div key={col.slug} className="collection-item">
              <div className="collection-circle">
                {COLLECTION_SVGS[col.slug]}
              </div>
              <h3>{col.title}</h3>
              <Link href={`/collections/${col.slug}`} className="link">
                Shop Now
                <svg viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" /></svg>
              </Link>
            </div>
          ))}
        </div>

        <button className="carousel-arrow" aria-label="Next">
          <svg viewBox="0 0 16 16" fill="none"><path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </section>
  );
}
