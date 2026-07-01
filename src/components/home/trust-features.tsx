/*
  Trust strip — 3 items (Worldwide Shipping removed per request)
  Icon color: #8B6F4E warm brown, strokeWidth 1.3, size 28px
  Thin vertical divider between items: 1px solid #E0D3B8, height 44px
  Layout: cream background, max-width 1080px centred
*/

import { Fragment } from 'react';

const TRUST_ITEMS = [
  {
    label: 'Handmade with Love',
    title: 'Handmade',
    sub:   'with Love',
    /*
      Open palm hand facing up, with a small heart floating above the centre.
      Hand: curved base arc + two side walls tapering up + finger bumps.
      Heart: small, centred above hand.
    */
    icon: (
      <svg
        viewBox="0 0 28 28"
        fill="none"
        width="28"
        height="28"
        stroke="#8B6F4E"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Heart above hand */}
        <path d="M14 7.5 C14 5.8 12 5 11.5 6.5 C11 5 9 5.8 9 7.5 C9 9.2 11.5 11 14 12.5 C16.5 11 19 9.2 19 7.5 C19 5.8 17 5 16.5 6.5 C16 5 14 5.8 14 7.5 Z"
          strokeWidth="1.15"
        />
        {/* Palm / hand base — open cupped hand */}
        <path d="M6 21 C6 18.5 7.5 17 9.5 17 L18.5 17 C20.5 17 22 18.5 22 21" />
        {/* Left wall */}
        <path d="M6 21 C5.5 22.5 6 24 7.5 24 L20.5 24 C22 24 22.5 22.5 22 21" />
        {/* Fingers — 4 subtle bumps at top of hand */}
        <path d="M9.5 17 C9.5 15.5 10 14.5 11 14.5 C12 14.5 12.5 15.5 12.5 17" />
        <path d="M12.5 17 C12.5 15 13 14 14 14 C15 14 15.5 15 15.5 17" />
        <path d="M15.5 17 C15.5 15.5 16 14.5 17 14.5 C18 14.5 18.5 15.5 18.5 17" />
        {/* Thumb */}
        <path d="M6 21 C5.5 19 6 17.5 7.5 17 L9.5 17" />
      </svg>
    ),
  },
  {
    label: 'Made in Nepal',
    title: 'Made in',
    sub:   'Nepal',
    /*
      Three mountain peaks:
      - Centre peak tallest, two smaller flanking
      - Snow cap on centre peak
      - Simple clean outline triangles
    */
    icon: (
      <svg
        viewBox="0 0 28 28"
        fill="none"
        width="28"
        height="28"
        stroke="#8B6F4E"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Base ground line */}
        <line x1="3" y1="22" x2="25" y2="22" />
        {/* Left smaller mountain */}
        <path d="M3 22 L9 12 L15 22" />
        {/* Right smaller mountain */}
        <path d="M13 22 L19 13 L25 22" />
        {/* Centre tall mountain — drawn last so it overlaps */}
        <path d="M7 22 L14 6 L21 22" />
        {/* Snow cap on centre peak */}
        <path d="M11.5 12.5 L14 6 L16.5 12.5" strokeWidth="1.1" />
      </svg>
    ),
  },
  {
    label: 'Premium Quality',
    title: 'Premium',
    sub:   'Quality',
    /*
      Award ribbon / medal:
      - Circle on top (medal face)
      - Two ribbon tails hanging down from bottom of circle, angled outward
      - Star or simple dot inside circle
    */
    icon: (
      <svg
        viewBox="0 0 28 28"
        fill="none"
        width="28"
        height="28"
        stroke="#8B6F4E"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Medal circle */}
        <circle cx="14" cy="11" r="6.5" />
        {/* Inner ring detail */}
        <circle cx="14" cy="11" r="4" strokeWidth="1" />
        {/* Star inside */}
        <path
          d="M14 7.8 L14.7 9.6 L16.6 9.6 L15.1 10.8 L15.7 12.6 L14 11.5 L12.3 12.6 L12.9 10.8 L11.4 9.6 L13.3 9.6 Z"
          strokeWidth="0.9"
          fill="#8B6F4E"
          stroke="none"
        />
        {/* Left ribbon tail */}
        <path d="M10 17 L8.5 24 L14 21.5" strokeWidth="1.2" />
        {/* Right ribbon tail */}
        <path d="M18 17 L19.5 24 L14 21.5" strokeWidth="1.2" />
        {/* Ribbon connection at bottom of circle */}
        <path d="M10 17 L14 18.5 L18 17" strokeWidth="1.1" />
      </svg>
    ),
  },
] as const;

export function TrustFeatures() {
  return (
    <section
      className="trust-strip"
      id="trust"
      style={{ backgroundColor: 'var(--dc-cream)', borderBottom: '1px solid var(--line)' }}
    >
      <div
        className="trust-grid"
        style={{
          maxWidth:       '860px',
          margin:         '0 auto',
          display:        'flex',
          justifyContent: 'center',
          alignItems:     'center',
          gap:            0,
          padding:        '44px 56px',
        }}
      >
        {TRUST_ITEMS.map((item, i) => (
          <Fragment key={item.label}>
            {/* Item */}
            <div
              style={{
                display:        'flex',
                alignItems:     'center',
                gap:            '13px',
                justifyContent: 'center',
                flex:           1,
                minWidth:       '180px',
              }}
            >
              {/* Icon */}
              <div style={{ flexShrink: 0, color: '#8B6F4E' }}>
                {item.icon}
              </div>
              {/* Text */}
              <div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   '14px',
                  fontWeight: 500,
                  color:      'var(--ink)',
                  lineHeight: 1.3,
                }}>
                  {item.title}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize:   '12.5px',
                  color:      'var(--ink-soft)',
                  lineHeight: 1.3,
                }}>
                  {item.sub}
                </div>
              </div>
            </div>

            {/* Vertical divider between items (not after last) */}
            {i < TRUST_ITEMS.length - 1 && (
              <div
                key={`div-${i}`}
                style={{
                  width:     '1px',
                  height:    '44px',
                  background:'var(--line)',
                  flexShrink: 0,
                }}
              />
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
