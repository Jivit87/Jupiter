import Link from 'next/link';
import { siteConfig } from '@/config/site';
import type { SiteSettingsState } from '@/lib/site-settings';

/*
  design_insp.html — Footer
  footer        { background:indigo; color:#c7bfd9; padding:72px 48px 28px; }
  .footer-grid  { grid-template-columns:1.4fr 1fr 1fr 1.2fr; gap:50px; max-width:1184px; }
  .footer-logo  { display:flex; align-items:center; gap:10px; }
  .footer-col h4{ DM Mono 11px letter-spacing:.12em uppercase gold-light }
  .footer-col a { 13.5px color:#c7bfd9 → gold-light on hover }
  .footer-social{ circles 34px border rgba(255,255,255,.2) }
  .footer-bottom{ flex space-between; font-size:12.5px; color:#8f81ac }
*/

function JupiterMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="18.5" stroke="#E0B860" strokeWidth="1" />
      <path
        d="M20 30c-5.5 0-10-3.6-10-8s4.5-8 10-8 6 2.2 6 5-2.6 5-6 5-4-1.4-4-3 1.3-3 3-3"
        stroke="#E0B860"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="15" height="15">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="15" height="15">
      <path
        d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L4 20l1-4.6A8.5 8.5 0 1 1 21 11.5z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function SocialBtn({ href, label, children, external }: {
  href: string;
  label: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      style={{
        width: '34px',
        height: '34px',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#c7bfd9',
        transition: 'border-color 0.2s, color 0.2s',
      }}
      className="insp-footer-social-btn"
    >
      {children}
    </Link>
  );
}

function FooterCol({ title, links }: {
  title: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
}) {
  return (
    <div className="footer-col">
      <h4 style={{
        fontFamily: 'var(--font-body)',
        fontSize: '11px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase' as const,
        color: 'var(--insp-gold-light)',
        marginBottom: '16px',
        fontWeight: 400,
      }}>
        {title}
      </h4>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="insp-footer-link"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export function Footer({ settings: _settings }: { settings?: SiteSettingsState } = {}) {
  const instagramUrl = siteConfig.socials.instagram;

  return (
    <footer style={{
      backgroundColor: '#17111f',
      color: '#c7bfd9',
      padding: '72px 48px 28px',
    }}>
      {/* Main grid */}
      <div style={{
        maxWidth: '1184px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr',
        gap: '50px',
        paddingBottom: '50px',
        borderBottom: '1px solid rgba(255,255,255,.1)',
      }}>
        {/* Column 1 — Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <JupiterMark />
            <span style={{
              fontFamily: "'Fraunces', var(--font-display), serif",
              fontWeight: 600,
              fontSize: '19px',
              color: '#FDFAF5',
              letterSpacing: '0.06em',
            }}>
              JUPITER
            </span>
          </div>

          <p style={{
            fontSize: '13.5px',
            lineHeight: '1.7',
            maxWidth: '260px',
            color: '#a89ac2',
            marginBottom: '20px',
            fontFamily: 'var(--font-body)',
          }}>
            Handcrafted arts, jewelry &amp; gifts made with cosmic intention in the Kathmandu Valley, Nepal.
          </p>

          <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
            <SocialBtn href={instagramUrl} label="Instagram" external>
              <InstagramIcon />
            </SocialBtn>
            <SocialBtn href={siteConfig.links.custom} label="WhatsApp">
              <WhatsAppIcon />
            </SocialBtn>
          </div>
        </div>

        {/* Column 2 — Shop */}
        <FooterCol
          title="Shop"
          links={[
            { label: 'All Products',  href: siteConfig.links.shop        },
            { label: 'Collections',   href: siteConfig.links.collections },
            { label: 'New Arrivals',  href: siteConfig.links.shop        },
            { label: 'Wishlist',      href: siteConfig.links.wishlist     },
          ]}
        />

        {/* Column 3 — About */}
        <FooterCol
          title="About"
          links={[
            { label: 'Our Story',   href: siteConfig.links.story       },
            { label: 'The Craft',   href: siteConfig.links.craft       },
            { label: 'Made in Nepal', href: siteConfig.links.madeInNepal },
            { label: 'Care Guide',  href: siteConfig.links.careGuide   },
          ]}
        />

        {/* Column 4 — Support */}
        <FooterCol
          title="Support"
          links={[
            { label: 'Custom Orders', href: siteConfig.links.custom    },
            { label: 'FAQs',          href: siteConfig.links.faq       },
            { label: 'Contact',       href: siteConfig.links.contact   },
            { label: 'Gift Guide',    href: siteConfig.links.giftGuide },
          ]}
        />
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: '1184px',
        margin: '0 auto',
        paddingTop: '26px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap' as const,
        gap: '14px',
        fontSize: '12.5px',
        color: '#8f81ac',
        fontFamily: 'var(--font-body)',
      }}>
        <span>© {new Date().getFullYear()} Jupiter. All rights reserved.</span>

        <span style={{ color: 'var(--insp-gold-light)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          🇳🇵 Handmade in Nepal
        </span>

        <Link
          href={siteConfig.links.contact}
          style={{ color: '#8f81ac', textDecoration: 'none' }}
          className="insp-footer-link"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
