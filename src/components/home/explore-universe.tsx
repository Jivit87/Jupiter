import Link from 'next/link';

const CATEGORIES = [
  {
    icon: 'ri-jewelry-line',
    name: 'Wire Jewelry',
    count: 'Rings · Earrings · Pendants',
    slug: 'jewelry',
    desc: 'Spirals, coils, and sacred forms shaped from wire by hand.',
  },
  {
    icon: 'ri-shape-line',
    name: 'Brass & Copper Rings',
    count: 'Statement pieces',
    slug: 'rings',
    desc: 'Bold, earthy rings forged from raw metals and intention.',
  },
  {
    icon: 'ri-palette-line',
    name: 'Mandala Art',
    count: 'Hand-drawn framed art',
    slug: 'art-paintings',
    desc: 'Intricate mandalas and cosmic paintings, each one-of-a-kind.',
  },
  {
    icon: 'ri-moon-line',
    name: 'Moon Lamps',
    count: '3D textured lighting',
    slug: 'moon-lamps',
    desc: 'Luminous moons that bring a warm, otherworldly glow home.',
  },
  {
    icon: 'ri-flower-line',
    name: 'Dried Bouquets',
    count: 'Everlasting arrangements',
    slug: 'bouquets',
    desc: 'Preserved blooms arranged into lasting, natural beauty.',
  },
  {
    icon: 'ri-gift-line',
    name: 'Customized Gifts',
    count: 'Made-to-order',
    slug: 'gifts',
    desc: 'Personalized gifts crafted with meaning for every occasion.',
  },
  {
    icon: 'ri-home-smile-line',
    name: 'Home Décor',
    count: 'For living spaces',
    slug: 'home-decor',
    desc: 'Handmade accents that turn any space into a sanctuary.',
  },
  {
    icon: 'ri-key-2-line',
    name: 'Keychains & Accessories',
    count: 'Small handmade pieces',
    slug: 'accessories',
    desc: 'Tiny treasures — keychains, charms, and everyday magic.',
  },
] as const;

export function ExploreUniverse() {
  return (
    <section
      className="insp-section"
      id="collections"
      style={{ backgroundColor: 'var(--insp-cream)' }}
    >
      <div className="insp-section-head">
        <span className="insp-label insp-label-center">Find What Speaks to You</span>
        <h2 style={{
          fontFamily: "'Fraunces', var(--font-display), serif",
          fontSize: '38px',
          marginTop: '14px',
          color: 'var(--insp-indigo)',
        }}>
          Explore Our Universe
        </h2>
        <p style={{
          color: 'var(--insp-mauve)',
          marginTop: '14px',
          fontSize: '15px',
          lineHeight: '1.7',
          maxWidth: '520px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Eight worlds of handmade craft, each shaped by Nepali hands and cosmic intention.
        </p>
      </div>

      <div className="insp-cat-grid">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/collections/${cat.slug}`}
            className="insp-cat-card"
          >
            <div style={{
              color: 'var(--insp-gold)',
              fontSize: '28px',
              marginBottom: '18px',
              lineHeight: 1,
            }}>
              <i className={cat.icon}></i>
            </div>

            <h3 style={{
              fontFamily: "'Fraunces', var(--font-display), serif",
              fontSize: '17px',
              fontWeight: 600,
              color: 'var(--insp-indigo)',
              marginBottom: '6px',
            }}>
              {cat.name}
            </h3>

            <p style={{
              fontFamily: "'Cormorant Garamond', var(--font-display), serif",
              fontSize: '15px',
              fontStyle: 'italic',
              lineHeight: '1.5',
              color: 'var(--insp-plum)',
              marginBottom: '16px',
            }}>
              {cat.desc}
            </p>

            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10.5px',
              color: 'var(--insp-gold)',
              letterSpacing: '0.02em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              {cat.count}
              <svg viewBox="0 0 12 12" fill="none" width="10" height="10">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '44px' }}>
        <Link
          href="/shop"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11.5px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--insp-indigo)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            borderBottom: '1px solid var(--insp-indigo)',
            paddingBottom: '3px',
            textDecoration: 'none',
          }}
        >
          View All Collections
          <svg viewBox="0 0 16 16" fill="none" width="11" height="11">
            <path d="M2 8h11M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
