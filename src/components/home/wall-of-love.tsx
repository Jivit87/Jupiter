import Link from 'next/link';
import { siteConfig } from '@/config/site';

/*
  design_insp.html — "What They're Saying" section
  .reviews-grid  { grid-template-columns:repeat(3,1fr); gap:22px; max-width:1100px; }
  .review-card   { background:starlight; border:1px solid border; border-radius:4px; padding:30px 26px; }
  .stars         { color:gold; font-size:13px; letter-spacing:2px; margin-bottom:14px; }
  .review-quote  { Cormorant italic 18px; color:plum; margin-bottom:20px; }
  .review-name   { 13.5px weight-600 indigo }
  .review-loc    { 11.5px mauve }
*/

const REVIEWS = [
  {
    stars: 5,
    quote: '"The spiral pendant is even more beautiful in person. You can feel the care that went into making it."',
    name:  'Anjana Bhatt',
    loc:   'Kathmandu',
  },
  {
    stars: 5,
    quote: '"Ordered a custom gift for my sister — the WhatsApp process was so easy and personal. Will order again."',
    name:  'Bimmaya',
    loc:   'Pokhara',
  },
  {
    stars: 5,
    quote: '"My moon lamp glows exactly like the photos. Genuinely feels like a piece of art, not just a product."',
    name:  'Jivit Rana',
    loc:   'Lalitpur',
  },
] as const;

function AvatarPlaceholder() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function WallOfLove() {
  return (
    <section
      className="insp-section"
      style={{ backgroundColor: 'var(--insp-cream)' }}
    >
      {/* Section head — centred */}
      <div className="insp-section-head">
        <span className="insp-label insp-label-center">Wall of Love</span>
        <h2 style={{
          fontFamily: "'Fraunces', var(--font-display), serif",
          fontSize: '38px',
          marginTop: '14px',
          color: 'var(--insp-indigo)',
        }}>
          What They&apos;re Saying
        </h2>
      </div>

      {/* 3-col grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '22px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {REVIEWS.map((r) => (
          <div key={r.name} style={{
            background: 'var(--insp-starlight)',
            border: '1px solid var(--insp-border)',
            borderRadius: '4px',
            padding: '30px 26px',
          }}>
            {/* Stars */}
            <div style={{
              color: 'var(--insp-gold)',
              fontSize: '13px',
              letterSpacing: '2px',
              marginBottom: '14px',
            }}>
              {'★'.repeat(r.stars)}
            </div>

            {/* Quote */}
            <p style={{
              fontFamily: "'Cormorant Garamond', var(--font-display), serif",
              fontSize: '18px',
              fontStyle: 'italic',
              lineHeight: '1.55',
              color: 'var(--insp-plum)',
              marginBottom: '20px',
            }}>
              {r.quote}
            </p>

            {/* Reviewer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Avatar */}
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
                background: 'var(--insp-ivory)',
                border: '1px solid var(--insp-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--insp-mauve)',
              }}>
                <AvatarPlaceholder />
              </div>
              <div>
                <div style={{
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: 'var(--insp-indigo)',
                  fontFamily: 'var(--font-body)',
                }}>
                  {r.name}
                </div>
                <div style={{
                  fontSize: '11.5px',
                  color: 'var(--insp-mauve)',
                  fontFamily: 'var(--font-body)',
                }}>
                  {r.loc}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* See All Reviews CTA */}
      <div style={{ textAlign: 'center', marginTop: '44px' }}>
        <Link
          href={siteConfig.links.reviews}
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
          See All Reviews
          <svg viewBox="0 0 16 16" fill="none" width="11" height="11">
            <path d="M2 8h11M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
