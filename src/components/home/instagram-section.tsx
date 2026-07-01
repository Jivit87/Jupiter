import Link from 'next/link';

export function InstagramSection() {
  return (
    <section className="story" id="story">
      <div className="story-left">
        <svg className="flourish-mtn" viewBox="0 0 500 140" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,140 L60,80 L120,120 L180,60 L250,110 L320,50 L400,100 L500,70 L500,140Z" fill="#241d3a" opacity="0.5" />
        </svg>
        <svg className="flourish-swirl" viewBox="0 0 40 40" fill="none" aria-hidden="true">
          <circle cx="20" cy="20" r="18" stroke="#e7cd9c" strokeWidth="1" />
          <path d="M20 28c-4.7 0-8.5-3.1-8.5-6.8s3.7-6.8 8.5-6.8 5.2 1.9 5.2 4.3-2.3 4.3-5.2 4.3-3.4-1.2-3.4-2.6 1.1-2.6 2.6-2.6" stroke="#e7cd9c" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </svg>
        <span className="eyebrow">Our Story</span>
        <h2>Crafted with Purpose.<br />Inspired by <span className="accent-script accent">Everything.</span></h2>
        <p>Every piece from Jupiter is a reflection of our journey, our roots, and our deep connection with the universe and nature. Thank you for being part of our story.</p>
        <Link href="/our-story" className="btn btn-outline" style={{ width: 'fit-content' }}>
          Discover Our Story
          <svg viewBox="0 0 16 16" fill="none"><path d="M2 8h11M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" /></svg>
        </Link>
        <div className="story-signature">
          <svg viewBox="0 0 24 24" fill="none"><path d="M12 20s-7.5-4.7-9.8-9.4C.6 6.9 2.6 3 6.4 3c2.1 0 3.7 1.2 4.6 2.7C11.9 4.2 13.5 3 15.6 3c3.8 0 5.8 3.9 4.2 7.6C19.5 15.3 12 20 12 20z" stroke="currentColor" strokeWidth="1.4" /></svg>
          <span className="sig-text">With love, Jupiter Team</span>
        </div>
      </div>

      <div className="story-right">
        <svg viewBox="0 0 500 430" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="500" height="430" fill="#b49a78" />
          <rect width="500" height="430" fill="url(#storyGrad)" />
          <defs><linearGradient id="storyGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#c9b190" /><stop offset="1" stopColor="#5f4a36" /></linearGradient></defs>
          <ellipse cx="250" cy="330" rx="150" ry="90" fill="#7a6248" opacity=".6" />
          <path d="M180 300 Q250 260 320 300 Q320 340 250 355 Q180 340 180 300Z" fill="#c9ac86" />
          <circle cx="250" cy="290" r="16" fill="none" stroke="#c8933f" strokeWidth="3" />
          <path d="M250 278c5 0 8 4 8 8s-3 6-6 6-5-2-5-4.5 2-4 4-4" stroke="#c8933f" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </svg>
        <button className="play-btn" aria-label="Watch our story">
          <span className="play-circle">
            <svg viewBox="0 0 24 24" fill="none"><path d="M8 5l12 7-12 7V5z" fill="currentColor" /></svg>
          </span>
          <span className="label">Watch Our Story</span>
        </button>
      </div>
    </section>
  );
}
