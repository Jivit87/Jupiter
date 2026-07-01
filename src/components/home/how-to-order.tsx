import Link from 'next/link';

const STEPS = [
  {
    num: '01',
    title: 'Browse & Fall in Love',
    desc: 'Explore the collection and find the piece that speaks to you.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
        <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Order via WhatsApp',
    desc: 'Tap "Order via WhatsApp" and chat with us directly — no cart, no checkout.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
        <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L4 20l1-4.6A8.5 8.5 0 1 1 21 11.5z" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'We Craft & Deliver',
    desc: 'Your piece is handmade to order and delivered right to your door.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
        <rect x="3" y="8" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 8l9-5 9 5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
] as const;

export function HowToOrder() {
  return (
    <section
      className="insp-section"
      style={{ backgroundColor: 'var(--insp-cream)' }}
    >
      <div className="insp-section-head">
        <span className="insp-label insp-label-center">Simple & Personal</span>
        <h2 style={{
          fontFamily: "'Fraunces', var(--font-display), serif",
          fontSize: '38px',
          marginTop: '14px',
          color: 'var(--insp-indigo)',
        }}>
          How to Order
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '22px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {STEPS.map((step) => (
          <div key={step.num} style={{
            background: 'var(--insp-starlight)',
            border: '1px solid var(--insp-border)',
            borderRadius: '4px',
            padding: '30px 26px',
          }}>
            <div style={{
              color: 'var(--insp-gold)',
              fontSize: '13px',
              letterSpacing: '2px',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{ opacity: 0.35 }}>STEP {step.num}</span>
            </div>

            <p style={{
              fontFamily: "'Cormorant Garamond', var(--font-display), serif",
              fontSize: '18px',
              fontStyle: 'italic',
              lineHeight: '1.55',
              color: 'var(--insp-plum)',
              marginBottom: '20px',
            }}>
              {step.desc}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
                color: 'var(--insp-gold)',
              }}>
                {step.icon}
              </div>
              <div>
                <div style={{
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: 'var(--insp-indigo)',
                  fontFamily: 'var(--font-body)',
                }}>
                  {step.title}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '44px' }}>
        <Link
          href="https://wa.me/9779800000000"
          target="_blank"
          rel="noopener noreferrer"
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
          Order via WhatsApp
          <svg viewBox="0 0 16 16" fill="none" width="11" height="11">
            <path d="M2 8h11M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
