import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Hero() {
  return (
    <section className="hero">
      <svg className="stars" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="starfield" width="200" height="200" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="20" r="1.1" fill="#fff" opacity=".7" />
            <circle cx="60" cy="70" r="0.8" fill="#fff" opacity=".5" />
            <circle cx="120" cy="30" r="1.3" fill="#fff" opacity=".75" />
            <circle cx="150" cy="120" r="0.9" fill="#fff" opacity=".55" />
            <circle cx="30" cy="150" r="1" fill="#fff" opacity=".5" />
            <circle cx="90" cy="160" r="1.2" fill="#fff" opacity=".65" />
            <circle cx="175" cy="55" r="0.7" fill="#fff" opacity=".45" />
            <circle cx="45" cy="100" r="0.7" fill="#fff" opacity=".4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#starfield)" />
      </svg>

      <svg className="grain" width="100%" height="100%" aria-hidden="true">
        <filter id="noiseF"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#noiseF)" />
      </svg>
      <div className="photo-vignette" />

      <div className="hero-inner">
        <div className="hero-copy" style={{ textAlign: 'center', maxWidth: '700px', paddingBottom: '120px' }}>
          <span className="eyebrow">Inspired by the Universe</span>
          <h1>
            Handmade<br />with <span className="accent-script accent">Soul.</span><br />Made in Nepal.
          </h1>
          <div className="hero-rule" />
          <p>Art, jewelry and meaningful gifts inspired by the universe, nature and timeless traditions.</p>

          <div className="hero-ctas">
            <Link href={siteConfig.links.shop} className="btn btn-gold">
              Shop All Products
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h11M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
            <Link href={siteConfig.links.custom} className="btn btn-outline">
              Custom Orders
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </Link>
          </div>
        </div>
      </div>

      <Link href="#trust" className="scroll-explore">
        <span className="mouse-ico" />
        Scroll to Explore
      </Link>

      <svg className="hero-swirl-badge" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="18" stroke="#e7cd9c" strokeWidth="1" />
        <path d="M20 28c-4.7 0-8.5-3.1-8.5-6.8s3.7-6.8 8.5-6.8 5.2 1.9 5.2 4.3-2.3 4.3-5.2 4.3-3.4-1.2-3.4-2.6 1.1-2.6 2.6-2.6" stroke="#e7cd9c" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </svg>

      <svg className="hero-wave" viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,50 L1440,90 L0,90 Z" fill="#f4ede0" />
      </svg>
    </section>
  );
}