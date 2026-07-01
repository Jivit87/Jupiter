import Image from 'next/image';
import Link from 'next/link';

/*
  design_insp.html — "Fresh from the Workshop" section
  .hscroll   { display:flex; gap:20px; overflow-x:auto; max-width:1184px; padding-bottom:14px; }
  .hscroll .p-card { flex:0 0 220px; }
  .new-badge { position:absolute; top:10px; left:10px; background:var(--copper); }
*/

type Arrival = { cat: string; name: string; price: string; slug: string; tbd?: boolean };

const NEW_ARRIVALS: Arrival[] = [
  { cat: 'Moon Lamps',       name: 'Crescent Textured Lamp',     price: 'NPR 3,600',        slug: 'crescent-textured-lamp'    },
  { cat: 'Wire Jewelry',     name: 'Orbit Wrap Bracelet',        price: 'NPR 1,650',        slug: 'orbit-wrap-bracelet'       },
  { cat: 'Home Décor',       name: 'Terracotta Incense Holder',  price: 'NPR 890',          slug: 'terracotta-incense-holder' },
  { cat: 'Customized Gifts', name: 'Initial Constellation Tag',  price: 'Price on request', slug: 'initial-constellation-tag', tbd: true },
  { cat: 'Mandala Art',      name: 'Indigo Night Mandala',       price: 'NPR 5,200',        slug: 'indigo-night-mandala'      },
];

export function FreshWorkshop() {
  return (
    <section
      className="insp-section"
      id="new-arrivals"
      style={{ backgroundColor: 'var(--insp-cream)' }}
    >
      {/* Split header — left aligned, no view-all CTA (matches HTML) */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        maxWidth: '1184px',
        margin: '0 auto 44px',
      }}>
        <div>
          <span className="insp-label">New This Week</span>
          <h2 style={{
            fontFamily: "'Fraunces', var(--font-display), serif",
            fontSize: '38px',
            marginTop: '12px',
            color: 'var(--insp-indigo)',
            fontWeight: 600,
          }}>
            Fresh from the Workshop
          </h2>
        </div>
      </div>

      {/* Horizontal scroll strip */}
      <div style={{
        display: 'flex',
        gap: '20px',
        overflowX: 'auto',
        maxWidth: '1184px',
        margin: '0 auto',
        paddingBottom: '14px',
        scrollbarWidth: 'thin',
      }}>
        {NEW_ARRIVALS.map((item) => (
          <Link
            key={item.slug}
            href={`/shop/${item.slug}`}
            className="insp-p-card"
            style={{ flex: '0 0 220px', textDecoration: 'none' }}
          >
            {/* Image */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1' }}>
              <Image
                src="/dummy_image.png"
                alt={item.name}
                fill
                sizes="220px"
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
              {/* NEW badge */}
              <span style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: 'var(--insp-copper)',
                color: '#fff',
                fontFamily: 'var(--font-body)',
                fontSize: '9.5px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '4px 9px',
                borderRadius: '2px',
                zIndex: 2,
              }}>
                New
              </span>
            </div>

            {/* Card body */}
            <div className="insp-p-body">
              <div className="insp-p-cat">{item.cat}</div>
              <div className="insp-p-name">{item.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className={item.tbd ? 'insp-p-price-tbd' : 'insp-p-price'}>
                  {item.price}
                </span>
                <span className="insp-p-view">View →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
