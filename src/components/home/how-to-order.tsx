import Link from 'next/link';
import { siteConfig } from '@/config/site';

/*
  Exact port of order.html
  ─────────────────────────────────────────────
  --cream:         #fefcf8
  --navy:          #2c2a4a
  --navy-soft:     #403d63
  --gold:          #c8973f
  --gold-soft:     #e4c98a
  --circle-fill:   #f6ede0
  --circle-fill-2: #faf1e4
  --pill-fill:     #f1e4cd
  --line:          #e7ddc8
*/

const T = {
  cream:       '#fefcf8',
  navy:        '#2c2a4a',
  navySoft:    '#403d63',
  gold:        '#c8973f',
  goldSoft:    '#e4c98a',
  circleFill:  '#f6ede0',
  circleFill2: '#faf1e4',
  pillFill:    '#f1e4cd',
  line:        '#e7ddc8',
} as const;

/* ─── Leaf accent (bottom-left inside fill circle) ─────── */
function Leaf() {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke={T.gold} strokeWidth="1.3"
      width="34" height="34"
      style={{ position: 'absolute', bottom: '6px', left: '2px', opacity: 0.85 }}>
      <path d="M4 36 C10 26 8 16 18 6"/>
      <path d="M6 30 C10 27 13 25 16 21"/>
      <path d="M8 24 C12 22 14 20 17 16"/>
      <path d="M10 18 C13 16 15 14 17 11"/>
    </svg>
  );
}

/* ─── Step 1 illustration: browser window + magnifier ──── */
function BrowseIllustration() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke={T.navy} strokeWidth="2.3"
      strokeLinecap="round" strokeLinejoin="round"
      width="118" height="118" overflow="visible">
      <rect x="12" y="21" width="64" height="43" rx="4"/>
      <line x1="12" y1="31" x2="76" y2="31"/>
      <circle cx="18" cy="26" r="1.3" fill={T.navy} stroke="none"/>
      <circle cx="23" cy="26" r="1.3" fill={T.navy} stroke="none"/>
      <circle cx="28" cy="26" r="1.3" fill={T.navy} stroke="none"/>
      <rect x="18" y="38" width="24" height="20" rx="2"/>
      <circle cx="35" cy="44" r="2.2"/>
      <path d="M20 55 L27 46 L32 51 L37 44 L40 55 Z"/>
      <rect x="46" y="38" width="24" height="20" rx="2"/>
      <path d="M50 52 Q58 41 66 52"/>
      <line x1="50" y1="52" x2="66" y2="52"/>
      <circle cx="66" cy="62" r="10.5"/>
      <line x1="73.5" y1="69.5" x2="83" y2="79"/>
      <path d="M8 16 l3 3 l-3 3 l-3 -3 Z" strokeWidth="1.6"/>
      <path d="M90 62 l2.5 2.5 l-2.5 2.5 l-2.5 -2.5 Z" strokeWidth="1.6"/>
    </svg>
  );
}

/* ─── Step 2 illustration: WhatsApp logo ───────────────── */
function WhatsAppIllustration() {
  return (
    <svg viewBox="0 0 100 100" width="118" height="118">
      <path d="M50 11 C28.5 11 11 28.5 11 50 C11 57.4 13.1 64.6 17 70.8 L11.5 90.5 L31.7 85.1 C37.7 88.4 43.8 90 50 90 C71.5 90 89 72.5 89 51 C89 29.5 71.5 11 50 11 Z" fill="#25D366"/>
      <path d="M38.5 28.5 c-1 -2.2 -2 -2.2 -3 -2.3 -0.8 0 -1.7 0 -2.6 0 -0.9 0 -2.4 0.3 -3.6 1.7 -1.2 1.3 -4.7 4.6 -4.7 11.2 s4.9 13 5.5 13.9 c0.7 0.9 9.4 15 23 20.5 11.4 4.5 13.7 3.6 16.2 3.4 2.5 -0.2 8 -3.3 9.1 -6.4 1.1 -3.1 1.1 -5.9 0.8 -6.4 -0.3 -0.6 -1.2 -0.9 -2.5 -1.6 -1.3 -0.6 -8 -4 -9.2 -4.4 -1.2 -0.5 -2.1 -0.6 -3 0.7 -0.9 1.3 -3.4 4.3 -4.2 5.2 -0.8 0.9 -1.5 1 -2.8 0.3 -1.3 -0.6 -5.5 -2 -10.5 -6.5 -3.9 -3.4 -6.5 -7.7 -7.3 -9 -0.8 -1.3 -0.1 -2 0.6 -2.7 0.6 -0.6 1.3 -1.5 2 -2.3 0.7 -0.8 0.9 -1.3 1.4 -2.2 0.5 -0.9 0.2 -1.7 -0.1 -2.4 -0.3 -0.6 -2.9 -7.2 -4.1 -9.8 Z" fill="#ffffff"/>
    </svg>
  );
}

/* ─── Step 3 illustration: box + heart + hands ─────────── */
function DeliverIllustration() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke={T.navy} strokeWidth="2.3"
      strokeLinecap="round" strokeLinejoin="round"
      width="118" height="118" overflow="visible">
      <path d="M28 33 L50 22 L72 33 L72 57 L50 68 L28 57 Z"/>
      <path d="M28 33 L50 44 L72 33"/>
      <line x1="50" y1="44" x2="50" y2="68"/>
      <path d="M44 29 c0 -4.5 6.5 -4.5 6.5 0 c0 -4.5 6.5 -4.5 6.5 0 c0 4.5 -6.5 8.5 -6.5 8.5 c0 0 -6.5 -4 -6.5 -8.5 Z"
        fill={T.navy} stroke="none"/>
      <path d="M13 76 C15 69 22 67 27 70 C30 65 38 67 38 74"/>
      <path d="M13 76 C12 83 18 90 27 91 C31.5 91.5 36 89 38 84.5 L38 74"/>
      <path d="M87 76 C85 69 78 67 73 70 C70 65 62 67 62 74"/>
      <path d="M87 76 C88 83 82 90 73 91 C68.5 91.5 64 89 62 84.5 L62 74"/>
      <path d="M6 40 l3 3 l-3 3 l-3 -3 Z" strokeWidth="1.6"/>
      <path d="M90 24 l2.5 2.5 l-2.5 2.5 l-2.5 -2.5 Z" strokeWidth="1.6"/>
    </svg>
  );
}

/* ─── Arrow connector between steps ────────────────────── */
function ArrowConnector() {
  return (
    /* height matches .icon-wrap = 240px so arrow sits at vertical centre */
    <div style={{
      height: '240px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ position: 'relative', width: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* dotted line */}
        <div style={{ width: '100%', borderTop: `2px dotted ${T.goldSoft}` }} />
        {/* circular chip with chevron */}
        <div style={{
          position: 'absolute',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          border: `1.5px solid ${T.goldSoft}`,
          background: T.cream,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
            stroke={T.gold} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Single step ───────────────────────────────────────── */
type StepProps = {
  num:          string;
  pill:         string;
  desc:         string;
  illustration: React.ReactNode;
  leaf?:        boolean;
};

function Step({ num, pill, desc, illustration, leaf = true }: StepProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

      {/* .icon-wrap — fixed 240px height */}
      <div style={{ height: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* .badge-num */}
        <div style={{
          width: '60px', height: '60px',
          borderRadius: '50%',
          background: T.circleFill2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          color: T.navy,
          marginBottom: '-30px',
          position: 'relative', zIndex: 3,
          boxShadow: `0 0 0 6px ${T.cream}`,
        }}>
          {num}
        </div>

        {/* .illustration-ring */}
        <div style={{
          width: '210px', height: '210px',
          borderRadius: '50%',
          border: `1.5px solid ${T.goldSoft}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          marginTop: '8px',
          flexShrink: 0,
        }}>
          {/* .fill */}
          <div style={{
            width: '170px', height: '170px',
            borderRadius: '50%',
            background: T.circleFill,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            {illustration}
            {leaf && <Leaf />}
          </div>
        </div>

      </div>

      {/* .pill */}
      <div style={{
        marginTop: '-20px',
        zIndex: 3,
        position: 'relative',
        background: T.pillFill,
        borderRadius: '999px',
        padding: '10px 26px',
        fontWeight: 600,
        fontSize: '14px',
        letterSpacing: '0.06em',
        color: T.navy,
        fontFamily: 'var(--font-body)',
      }}>
        {pill}
      </div>

      {/* .step-dot */}
      <div style={{
        width: '6px', height: '6px',
        borderRadius: '50%',
        background: T.gold,
        marginTop: '10px',
      }} />

      {/* .desc */}
      <p style={{
        marginTop: '22px',
        fontSize: '14.5px',
        lineHeight: 1.65,
        color: T.navySoft,
        maxWidth: '230px',
        fontFamily: 'var(--font-body)',
      }}>
        {desc}
      </p>
    </div>
  );
}

/* ─── Footer strip item ─────────────────────────────────── */
function FootItem({ icon, title, text }: {
  icon:  React.ReactNode;
  title: string;
  text:  React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '0 26px' }}>
      <div style={{ width: '34px', height: '34px', flexShrink: 0, color: T.navy, marginTop: '2px' }}>
        {icon}
      </div>
      <div>
        <h3 style={{
          margin: '2px 0 6px',
          fontSize: '13px',
          letterSpacing: '0.05em',
          fontWeight: 600,
          color: T.navy,
          fontFamily: 'var(--font-body)',
        }}>
          {title}
        </h3>
        <p style={{
          margin: 0,
          fontSize: '13.5px',
          lineHeight: 1.5,
          color: T.navySoft,
          fontFamily: 'var(--font-body)',
        }}>
          {text}
        </p>
      </div>
    </div>
  );
}

/* ─── Main export ───────────────────────────────────────── */
export function HowToOrder() {
  return (
    <section style={{
      background: T.cream,
      padding: '48px 20px',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1180px',
        background: T.cream,
        padding: '40px 40px 36px',
      }}>

        {/* eyebrow */}
        <div style={{
          textAlign: 'center',
          letterSpacing: '0.28em',
          fontSize: '12px',
          fontWeight: 600,
          color: T.gold,
          marginBottom: '14px',
          fontFamily: 'var(--font-body)',
        }}>
          SIMPLE &amp; PERSONAL
        </div>

        {/* divider */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '10px',
          marginBottom: '18px',
        }}>
          <span style={{ width: '110px', height: '1px', background: T.goldSoft, display: 'block' }} />
          <svg viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.4" width="14" height="14">
            <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"/>
          </svg>
          <span style={{ width: '110px', height: '1px', background: T.goldSoft, display: 'block' }} />
        </div>

        {/* heading */}
        <h2 style={{
          textAlign: 'center',
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: '56px',
          margin: '0 0 46px',
          color: T.navy,
          lineHeight: 1.1,
        }}>
          How to Order
        </h2>

        {/* steps: 1fr auto 1fr auto 1fr */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr auto 1fr',
          alignItems: 'start',
          columnGap: '6px',
          marginBottom: '44px',
        }}>
          <Step
            num="01" pill="BROWSE"
            desc="Explore our collection and find the piece that speaks to you."
            illustration={<BrowseIllustration />}
          />
          <ArrowConnector />
          <Step
            num="02" pill="WHATSAPP"
            desc="Message us on WhatsApp — no cart, no checkout, just a simple chat."
            illustration={<WhatsAppIllustration />}
          />
          <ArrowConnector />
          <Step
            num="03" pill="DELIVER"
            desc="We craft your order with care and deliver it right to your door."
            illustration={<DeliverIllustration />}
            leaf={false}
          />
        </div>

        {/* footer strip */}
        <div style={{
          border: `1px solid ${T.line}`,
          borderRadius: '14px',
          display: 'grid',
          gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
          padding: '26px 34px',
        }}>
          <FootItem
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                width="34" height="34">
                <path d="M12 3 L20 6 V11 C20 16 16.5 19.5 12 21 C7.5 19.5 4 16 4 11 V6 Z"/>
                <path d="M9 12 l2 2 l4 -5"/>
              </svg>
            }
            title="SAFE & SECURE"
            text={<>Your data and conversations<br/>are always protected.</>}
          />
          <div style={{ background: T.line, width: '1px' }} />
          <FootItem
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                width="34" height="34">
                <path d="M3 13 c2 3 6 4 8 2 l7 -6 c1 -1 2.6 -0.6 2 1 c-0.4 1 -1.4 2 -2.4 2.8 l-4.6 3.7"/>
                <path d="M13 14 l3 -2.4 c1 -0.8 2.4 -0.3 2 1 c-0.3 1 -1.2 1.8 -2.1 2.4 L11 18.5 c-1.4 1 -3 1 -4.4 -0.1 L3 15.8"/>
                <path d="M8.5 6.5 C7 5 4.5 5.3 4.5 8 c0 2.3 3 4.3 4.5 5.4 C10.5 12.3 13.5 10.3 13.5 8 c0 -2.7 -2.5 -3 -4 -1.5 Z"/>
              </svg>
            }
            title="MADE WITH CARE"
            text={<>Every piece is handmade<br/>with love and attention.</>}
          />
          <div style={{ background: T.line, width: '1px' }} />
          <FootItem
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                width="34" height="34">
                <path d="M12 21 C12 21 5 14.5 5 9.5 A7 7 0 0 1 19 9.5 C19 14.5 12 21 12 21 Z"/>
                <circle cx="12" cy="9.5" r="2.5"/>
              </svg>
            }
            title="DELIVERED TO YOU"
            text={<>Pan-Nepal delivery,<br/>straight to your doorstep.</>}
          />
        </div>

        {/* WhatsApp CTA */}
        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <Link
            href={siteConfig.links.custom}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 32px',
              background: '#25D366',
              color: '#fff',
              borderRadius: '4px',
              fontFamily: 'var(--font-body)',
              fontSize: '13.5px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textDecoration: 'none',
            }}
          >
            <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            Order on WhatsApp
          </Link>
        </div>

      </div>
    </section>
  );
}
