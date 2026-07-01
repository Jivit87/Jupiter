const TRUST_ITEMS = [
  {
    svg: <svg viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.5-9.5-9C.5 8 2 4 6 4c2.4 0 4.2 1.5 6 3.6C13.8 5.5 15.6 4 18 4c4 0 5.5 4 3.5 8-2.5 4.5-9.5 9-9.5 9z" stroke="currentColor" strokeWidth="1.4" /></svg>,
    title: 'Handmade', sub: 'with Love',
  },
  {
    svg: <svg viewBox="0 0 24 24" fill="none"><path d="M3 20l6-11 4 6 3-5 5 10H3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>,
    title: 'Made in', sub: 'Nepal',
  },
  {
    svg: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.4" /><path d="M8.5 13.5L7 21l5-2.5L17 21l-1.5-7.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>,
    title: 'Premium', sub: 'Quality',
  },
  {
    svg: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" /><path d="M3 12h18M12 3c2.5 2.6 4 6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-6-4-9s1.5-6.4 4-9z" stroke="currentColor" strokeWidth="1.4" /></svg>,
    title: 'Worldwide', sub: 'Shipping',
  },
] as const;

export function TrustFeatures() {
  return (
    <section className="trust-strip" id="trust">
      <div className="trust-grid">
        {TRUST_ITEMS.map((item, i) => (
          <div key={i} className="trust-item">
            {item.svg}
            <div>
              <div className="t-title">{item.title}</div>
              <div className="t-sub">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
