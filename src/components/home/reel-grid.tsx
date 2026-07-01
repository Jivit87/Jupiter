'use client';

import { useState } from 'react';
import Link from 'next/link';

type ReelItem = {
  shortcode:       string;
  url:             string;
  thumbnailUrl:    string;
  thumbnailWidth:  number;
  thumbnailHeight: number;
  title:           string;
};

/* ─────────────────────────────────────────────────────────
   SYMMETRIC 5-card collage layout
   
   Visual blueprint (top view):
   
   [L1 portrait -4°]  [L2 square -2°]  [C TALL 0°]  [R1 square +2°]  [R2 portrait +4°]
   
   Centre card is tallest and straight.
   Left pair mirrors right pair exactly (size + tilt direction).
   L2 / R1 sit slightly higher, overlapping C.
   L1 / R2 sit slightly lower and further out.
───────────────────────────────────────────────────────── */

type CardLayout = {
  /* position relative to the collage container */
  top:    number;   /* px from top  */
  left:   number;   /* px from left */
  w:      number;   /* px width     */
  h:      number;   /* px height    */
  rotate: number;   /* degrees      */
  z:      number;
};

/* Container: 1040px × 420px */
const W = 1040;

const LAYOUTS: CardLayout[] = [
  /* [0] L1 — portrait, tilted left */
  { top:  60, left:   0, w: 196, h: 280, rotate: -5, z: 2 },
  /* [1] L2 — slightly taller portrait, less tilt, overlaps centre */
  { top:  10, left: 196, w: 210, h: 310, rotate: -2, z: 3 },
  /* [2] C  — tall hero, perfectly straight */
  { top:   0, left: 415, w: 210, h: 420, rotate:  0, z: 4 },
  /* [3] R1 — mirrors L2 */
  { top:  10, left: 634, w: 210, h: 310, rotate:  2, z: 3 },
  /* [4] R2 — mirrors L1 */
  { top:  60, left: 844, w: 196, h: 280, rotate:  5, z: 2 },
];

/* ── Icons ──────────────────────────────────────────────── */

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" width={size} height={size} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 48 48" width="46" height="46" aria-hidden="true">
      <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.50)" />
      <polygon points="20,14 36,24 20,34" fill="white" />
    </svg>
  );
}

function SparkleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M12 2 L13.4 9.2 L20 10.5 L13.4 11.8 L12 19 L10.6 11.8 L4 10.5 L10.6 9.2 Z" />
    </svg>
  );
}

/* ── Single card ────────────────────────────────────────── */

function ReelCard({ reel, layout, index }: {
  reel:   ReelItem;
  layout: CardLayout;
  index:  number;
}) {
  const [hovered, setHovered] = useState(false);
  const caption = reel.title.split('\n')[0] ?? '';

  return (
    <Link
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch: ${caption}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        /* ── Position ── */
        position:  'absolute',
        top:       layout.top,
        left:      layout.left,
        width:     layout.w,
        height:    layout.h,
        zIndex:    hovered ? 10 : layout.z,

        /* ── Appearance ── */
        borderRadius:  '6px',           /* less round — per request */
        overflow:      'hidden',
        textDecoration:'none',
        display:       'block',
        backgroundColor: '#2a1f3e',     /* dark plum fallback while image loads */

        /* ── Shadow ── */
        boxShadow: hovered
          ? '0 22px 52px rgba(26,16,64,0.32), 0 6px 16px rgba(0,0,0,0.22)'
          : '0 6px 24px rgba(26,16,64,0.20), 0 2px 6px rgba(0,0,0,0.12)',

        /* ── Transform: rotate at rest, straighten + lift on hover ── */
        transform: hovered
          ? 'rotate(0deg) translateY(-6px) scale(1.04)'
          : `rotate(${layout.rotate}deg) translateY(0) scale(1)`,

        /* ── Smooth ease-out, no spring bounce ── */
        transition: [
          'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
          'box-shadow 320ms ease',
        ].join(', '),

        cursor: 'pointer',
      }}
    >
      {/* ── Real thumbnail ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={reel.thumbnailUrl}
        alt={caption}
        loading={index > 1 ? 'lazy' : undefined}
        style={{
          display:        'block',
          width:          '100%',
          height:         '100%',
          objectFit:      'cover',
          objectPosition: 'center top',
          transition:     'transform 400ms cubic-bezier(0.22, 1, 0.36, 1)',
          transform:      hovered ? 'scale(1.06)' : 'scale(1)',
        }}
      />

      {/* ── Bottom gradient ── */}
      <div style={{
        position:   'absolute',
        inset:      0,
        background: 'linear-gradient(180deg, transparent 38%, rgba(12,6,28,0.78) 100%)',
        opacity:    hovered ? 1 : 0.55,
        transition: 'opacity 320ms ease',
        zIndex:     1,
        pointerEvents: 'none',
      }} />

      {/* ── Top gradient (makes Reel badge legible) ── */}
      <div style={{
        position:   'absolute',
        top: 0, left: 0, right: 0,
        height:     '72px',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.32) 0%, transparent 100%)',
        zIndex:     1,
        pointerEvents: 'none',
      }} />

      {/* ── Reel badge — top left ── */}
      <div style={{
        position:       'absolute',
        top:            '10px',
        left:           '10px',
        zIndex:         3,
        display:        'flex',
        alignItems:     'center',
        gap:            '4px',
        background:     'rgba(0,0,0,0.40)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        borderRadius:   '20px',
        padding:        '4px 9px 4px 7px',
        color:          '#fff',
        fontFamily:     'var(--font-body)',
        fontSize:       '10px',
        fontWeight:     600,
        letterSpacing:  '0.06em',
        textTransform:  'uppercase',
      }}>
        <svg viewBox="0 0 16 16" fill="none" width="11" height="11">
          <rect x="1" y="2" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/>
          <polygon points="6,5 12,8 6,11" fill="currentColor"/>
        </svg>
        Reel
      </div>

      {/* ── Play button — centre ── */}
      <div style={{
        position:       'absolute',
        inset:          0,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        zIndex:         2,
        opacity:        hovered ? 1 : 0.65,
        transition:     'opacity 300ms ease',
        pointerEvents:  'none',
      }}>
        <div style={{
          transform:  hovered ? 'scale(1.12)' : 'scale(1)',
          transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
          filter:     'drop-shadow(0 2px 10px rgba(0,0,0,0.5))',
        }}>
          <PlayIcon />
        </div>
      </div>

      {/* ── Caption — slides up on hover ── */}
      <div style={{
        position:   'absolute',
        left: 0, right: 0, bottom: 0,
        zIndex:     3,
        padding:    '14px 14px 16px',
        transform:  hovered ? 'translateY(0)' : 'translateY(8px)',
        opacity:    hovered ? 1 : 0,
        transition: 'transform 280ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease',
        pointerEvents: 'none',
      }}>
        <p style={{
          fontFamily:         'var(--font-body)',
          fontSize:           '12px',
          lineHeight:         1.45,
          color:              '#fff',
          margin:             0,
          display:            '-webkit-box',
          WebkitLineClamp:    2,
          WebkitBoxOrient:    'vertical',
          overflow:           'hidden',
          textShadow:         '0 1px 8px rgba(0,0,0,0.8)',
        }}>
          {caption}
        </p>
        <span style={{
          display:        'inline-flex',
          alignItems:     'center',
          gap:            '5px',
          marginTop:      '7px',
          fontFamily:     'var(--font-body)',
          fontSize:       '10px',
          color:          'rgba(255,255,255,0.65)',
          letterSpacing:  '0.04em',
        }}>
          <InstagramIcon size={10} />
          View on Instagram
        </span>
      </div>

      {/* ── Subtle inset border ── */}
      <div style={{
        position:     'absolute',
        inset:        0,
        borderRadius: '6px',
        boxShadow:    'inset 0 0 0 1px rgba(255,255,255,0.10)',
        zIndex:       5,
        pointerEvents:'none',
      }} />
    </Link>
  );
}

/* ── Full section ───────────────────────────────────────── */

type ReelGridProps = {
  reels:      ReelItem[];
  handle:     string;
  profileUrl: string;
};

export function ReelGrid({ reels, handle, profileUrl }: ReelGridProps) {
  /* Use up to 5 cards; cycle reels if fewer than 5 */
  const slots = LAYOUTS.slice(0, 5);

  return (
    <section style={{
      backgroundColor: 'var(--insp-cream)',
      padding:         '100px 48px 120px',
      position:        'relative',
      overflow:        'hidden',
    }}>

      {/* Sparkle accents */}
      <SparkleDecor />

      {/* ── Header ── */}
      <div style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto 64px' }}>
        <Link
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display:         'inline-flex',
            alignItems:      'center',
            gap:             '7px',
            padding:         '6px 16px 6px 12px',
            borderRadius:    '999px',
            border:          '1px solid var(--insp-border)',
            backgroundColor: '#fff',
            color:           'var(--insp-indigo)',
            fontFamily:      'var(--font-body)',
            fontSize:        '12.5px',
            fontWeight:      600,
            textDecoration:  'none',
            marginBottom:    '20px',
            boxShadow:       '0 2px 10px rgba(0,0,0,0.06)',
          }}
        >
          <InstagramIcon size={14} />
          @{handle}
        </Link>

        <h2 style={{
          display:    'block',
          fontFamily: "'Fraunces', var(--font-display), serif",
          fontSize:   '44px',
          fontWeight: 600,
          color:      'var(--insp-indigo)',
          lineHeight: 1.1,
          margin:     '0 0 14px',
        }}>
          Follow Our Journey
        </h2>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize:   '15px',
          color:      'var(--insp-mauve)',
          lineHeight: 1.7,
          margin:     0,
        }}>
          Watch us craft, pack and share joy — one reel at a time.
        </p>
      </div>

      {/* ── Collage ── */}
      {reels.length > 0 ? (
        <div style={{
          position: 'relative',
          width:    `${W}px`,
          height:   '420px',
          margin:   '0 auto 72px',
        }}>
          {slots.map((layout, i) => {
            const reel = reels[i % reels.length];
            return (
              <ReelCard
                key={`${reel.shortcode}-${i}`}
                reel={reel}
                layout={layout}
                index={i}
              />
            );
          })}

          {/* Floating "NEW!" label — between L2 and centre */}
          <div aria-hidden="true" style={{
            position:      'absolute',
            top:           '6px',
            left:          '350px',
            zIndex:        6,
            transform:     'rotate(-10deg)',
            fontFamily:    "'Fraunces', var(--font-display), serif",
            fontSize:      '14px',
            fontWeight:    700,
            color:         'var(--insp-indigo)',
            pointerEvents: 'none',
            userSelect:    'none',
            lineHeight:    1.3,
          }}>
            NEW!<br />
            <span style={{ fontSize: '18px' }}>↓</span>
          </div>

          {/* Floating label — between centre and R1 */}
          <div aria-hidden="true" style={{
            position:      'absolute',
            top:           '6px',
            left:          '680px',
            zIndex:        6,
            transform:     'rotate(8deg)',
            fontFamily:    'var(--font-body)',
            fontSize:      '9px',
            fontWeight:    700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'var(--insp-mauve)',
            pointerEvents: 'none',
            userSelect:    'none',
            lineHeight:    1.5,
          }}>
            MADE WITH<br />INTENTION ✦
          </div>
        </div>
      ) : (
        <div style={{
          textAlign:   'center',
          padding:     '60px 20px',
          color:       'var(--insp-mauve)',
          fontFamily:  'var(--font-body)',
          fontSize:    '14px',
          marginBottom:'52px',
        }}>
          <p>
            Visit{' '}
            <Link href={profileUrl} target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--insp-gold)', textDecoration: 'underline' }}>
              @{handle}
            </Link>{' '}
            on Instagram.
          </p>
        </div>
      )}

      {/* ── CTA ── */}
      <div style={{ textAlign: 'center' }}>
        <Link
          href={`${profileUrl}reels/`}
          target="_blank"
          rel="noopener noreferrer"
          className="insp-follow-cta"
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            '10px',
            padding:        '14px 32px',
            borderRadius:   '2px',
            border:         '1.5px solid var(--insp-indigo)',
            color:          'var(--insp-indigo)',
            fontFamily:     'var(--font-body)',
            fontSize:       '13px',
            fontWeight:     600,
            letterSpacing:  '0.04em',
            textDecoration: 'none',
            transition:     'background-color 0.22s, color 0.22s',
          }}
        >
          <InstagramIcon size={14} />
          See All Reels on Instagram
        </Link>
      </div>
    </section>
  );
}

/* ── Sparkle decorations ────────────────────────────────── */

function SparkleDecor() {
  const SPARKS = [
    { top: '7%',  left:  '3%',  size: 18, opacity: 0.32, color: 'var(--insp-gold)'   },
    { top: '15%', left: '92%',  size: 22, opacity: 0.28, color: 'var(--insp-gold)'   },
    { top: '70%', left:  '5%',  size: 13, opacity: 0.22, color: 'var(--insp-mauve)'  },
    { top: '78%', left: '89%',  size: 15, opacity: 0.24, color: 'var(--insp-indigo)' },
    { top: '42%', left: '97%',  size: 11, opacity: 0.18, color: 'var(--insp-gold)'   },
    { top: '50%', left:  '1%',  size: 11, opacity: 0.18, color: 'var(--insp-mauve)'  },
  ];

  return (
    <>
      {SPARKS.map((s, i) => (
        <div key={i} aria-hidden="true" style={{
          position:      'absolute',
          top:           s.top,
          left:          s.left,
          opacity:       s.opacity,
          color:         s.color,
          pointerEvents: 'none',
        }}>
          <SparkleIcon size={s.size} />
        </div>
      ))}
    </>
  );
}
