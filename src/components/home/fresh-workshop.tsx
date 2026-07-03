import Image from 'next/image';
import Link from 'next/link';

type Arrival = { cat: string; name: string; price: string; slug: string; tbd?: boolean; image: string };

const NEW_ARRIVALS: Arrival[] = [
  { cat: 'Moon Lamps',       name: 'Crescent Textured Lamp',     price: 'NPR 3,600',        slug: 'crescent-textured-lamp',    image: '/products/642458228_17984579045950228_2502309061041822413_n.jpg' },
  { cat: 'Wire Jewelry',     name: 'Orbit Wrap Bracelet',        price: 'NPR 1,650',        slug: 'orbit-wrap-bracelet',       image: '/products/641757644_17984458352950228_6773523526454917524_n.jpg' },
  { cat: 'Home Décor',       name: 'Terracotta Incense Holder',  price: 'NPR 890',          slug: 'terracotta-incense-holder', image: '/products/653929738_17987038052950228_4155596580084070347_n.jpg' },
  { cat: 'Customized Gifts', name: 'Initial Constellation Tag',  price: 'Price on request', slug: 'initial-constellation-tag', tbd: true, image: '/products/657378721_17988004061950228_8155633251410794495_n.jpg' },
  { cat: 'Mandala Art',      name: 'Indigo Night Mandala',       price: 'NPR 5,200',        slug: 'indigo-night-mandala',      image: '/products/683417806_17992733117950228_3135012803392676979_n.jpg' },
];

export function FreshWorkshop() {
  return (
    <section className="bg-white py-24 px-6 sm:px-12 border-b border-[#E5E7EB]" id="new-arrivals">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between max-w-7xl mx-auto mb-12 gap-6">
        <div>
          <span className="inline-block text-[11px] font-semibold tracking-widest text-[#6B7280] uppercase mb-2">
            New This Week
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-black leading-tight tracking-tight">
            Fresh from the Workshop
          </h2>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto max-w-7xl mx-auto pb-4 snap-x snap-mandatory hide-scrollbar">
        {NEW_ARRIVALS.map((item) => (
          <Link
            key={item.slug}
            href={`/shop/${item.slug}`}
            className="flex-none w-[240px] snap-start group border border-[#E5E7EB] rounded-sm bg-white hover:border-black transition-colors"
          >
            <div className="relative w-full aspect-square overflow-hidden bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="240px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-amber-600 text-white text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-sm z-10 shadow-sm">
                New
              </span>
            </div>

            <div className="p-4">
              <div className="text-[10px] text-[#6B7280] uppercase tracking-widest mb-1.5">{item.cat}</div>
              <div className="text-sm font-semibold text-black mb-3 leading-snug">{item.name}</div>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-medium ${item.tbd ? 'text-[#9CA3AF]' : 'text-[#4B5563]'}`}>
                  {item.price}
                </span>
                <span className="text-xs text-black font-semibold uppercase tracking-widest flex items-center gap-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  View <i className="ri-arrow-right-line"></i>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
