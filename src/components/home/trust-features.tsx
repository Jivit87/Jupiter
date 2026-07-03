
const TRUST_ITEMS = [
  {
    label: 'Handmade with Love',
    title: 'Handmade',
    sub: 'with Love',
    icon: 'ri-hand-heart-line',
  },
  {
    label: 'Made in Nepal',
    title: 'Made in',
    sub: 'Nepal',
    icon: 'ri-map-pin-line',
  },
  {
    label: 'Premium Quality',
    title: 'Premium',
    sub: 'Quality',
    icon: 'ri-medal-line',
  },
  {
    label: 'Worldwide Shipping',
    title: 'Worldwide',
    sub: 'Shipping',
    icon: 'ri-global-line',
  },
] as const;

export function TrustFeatures() {
  return (
    <section className="bg-white border-y border-[#E5E7EB] py-8 md:py-12 px-4 sm:px-12" id="trust">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:flex md:flex-row justify-between items-start md:items-center gap-y-8 sm:gap-y-10 gap-x-4 sm:gap-x-6 md:gap-4 animate-on-scroll">
        {TRUST_ITEMS.map((item, i) => (
          <div key={item.label} className="flex flex-col items-center text-center flex-1 w-full relative">
            <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-[#F9FAFB] border border-[#E5E7EB] text-black">
              <i className={`${item.icon} text-xl`}></i>
            </div>
            <div className="font-sans text-[14px] font-semibold text-black tracking-wide">
              {item.title} {item.sub}
            </div>
            
            {/* Vertical divider on desktop */}
            {i < TRUST_ITEMS.length - 1 && (
              <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-px h-12 bg-[#E5E7EB]" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
