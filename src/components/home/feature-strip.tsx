const ITEMS = [
  {
    svg: <svg viewBox="0 0 24 24" fill="none"><rect x="3" y="8" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><path d="M3 8l9-5 9 5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>,
    title: 'Secure Packaging', sub: 'Eco-friendly & safe',
  },
  {
    svg: <svg viewBox="0 0 24 24" fill="none"><path d="M4 4v6h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><path d="M4.5 15a8 8 0 1 0 2-8.5L4 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>,
    title: 'Easy Returns', sub: 'Hassle-free returns',
  },
  {
    svg: <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="8" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.4" /><path d="M14 11h4l3 3v2h-7v-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><circle cx="7" cy="18" r="1.5" stroke="currentColor" strokeWidth="1.3" /><circle cx="18" cy="18" r="1.5" stroke="currentColor" strokeWidth="1.3" /></svg>,
    title: 'Worldwide Shipping', sub: 'Delivered to your door',
  },
  {
    svg: <svg viewBox="0 0 24 24" fill="none"><path d="M4 13a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.4" /><rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" /></svg>,
    title: 'Dedicated Support', sub: "We're here for you",
  },
] as const;

export function FeatureStrip() {
  return (
    <section className="bottom-strip">
      <div className="bottom-grid">
        {ITEMS.map((item, i) => (
          <div key={i} className="bottom-item">
            {item.svg}
            <div>
              <div className="b-title">{item.title}</div>
              <div className="b-sub">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
