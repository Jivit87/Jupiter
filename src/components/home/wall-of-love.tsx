import Link from 'next/link';
import { siteConfig } from '@/config/site';

const REVIEWS = [
  {
    stars: 5,
    quote: 'The spiral pendant is even more beautiful in person. You can feel the care that went into making it.',
    name: 'Anjana Bhatt',
    loc: 'Kathmandu',
    initials: 'AB',
  },
  {
    stars: 5,
    quote: 'Ordered a custom gift for my sister — the WhatsApp process was so easy and personal. Will order again.',
    name: 'Bimmaya',
    loc: 'Pokhara',
    initials: 'B',
  },
  {
    stars: 5,
    quote: 'My moon lamp glows exactly like the photos. Genuinely feels like a piece of art, not just a product.',
    name: 'Jivit Rana',
    loc: 'Lalitpur',
    initials: 'JR',
  },
] as const;

export function WallOfLove() {
  return (
    <section className="py-24 px-6 sm:px-12 bg-[#F9FAFB] border-b border-[#E5E7EB]">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-block text-[11px] font-semibold tracking-widest text-[#6B7280] uppercase mb-4">
          Wall of Love
        </span>
        <h2 className="font-display text-4xl sm:text-5xl text-black leading-tight tracking-tight">
          {"What They're Saying"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {REVIEWS.map((r) => (
          <div
            key={r.name}
            className="bg-white border border-[#E5E7EB] border-t-4 border-t-amber-400 rounded-sm p-8 group hover:border-amber-400 transition-all duration-300 relative flex flex-col shadow-sm hover:shadow-md"
          >
            <div
              className="absolute top-4 right-6 font-display text-7xl text-amber-50 select-none pointer-events-none group-hover:text-amber-100 transition-colors"
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <div className="flex gap-1 mb-6 relative z-10">
              {Array.from({ length: r.stars }).map((_, i) => (
                <i key={i} className="ri-star-fill text-amber-400 text-sm drop-shadow-sm"></i>
              ))}
            </div>

            <p className="text-sm leading-relaxed text-[#4B5563] mb-8 relative z-10 flex-grow">
              &ldquo;{r.quote}&rdquo;
            </p>

            <div className="flex items-center gap-4 relative z-10">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F9FAFB] border border-[#E5E7EB] text-black text-xs font-bold tracking-wider shrink-0"
                aria-hidden="true"
              >
                {r.initials}
              </div>
              <div>
                <div className="text-sm font-semibold text-black leading-snug">{r.name}</div>
                <div className="text-xs text-[#6B7280] mt-0.5">{r.loc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <Link
          href={siteConfig.links.reviews}
          className="text-xs font-semibold tracking-widest uppercase text-black flex items-center justify-center gap-2 pb-1 border-b border-black w-fit mx-auto hover:text-[#6B7280] hover:border-[#6B7280] transition-colors duration-200"
        >
          See All Reviews <i className="ri-arrow-right-line text-sm"></i>
        </Link>
      </div>
    </section>
  );
}
