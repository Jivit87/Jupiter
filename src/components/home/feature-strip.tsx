
const ITEMS = [
  {
    icon: 'ri-box-3-line',
    title: 'Secure Packaging',
    sub: 'Eco-friendly & safe',
  },
  {
    icon: 'ri-arrow-go-back-line',
    title: 'Easy Returns',
    sub: 'Hassle-free returns',
  },
  {
    icon: 'ri-plane-line',
    title: 'Worldwide Shipping',
    sub: 'Delivered to your door',
  },
  {
    icon: 'ri-customer-service-2-line',
    title: 'Dedicated Support',
    sub: "We're here for you",
  },
] as const;

export function FeatureStrip() {
  return (
    <section className="bg-white border-y border-[#E5E7EB]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto divide-y sm:divide-y-0 sm:divide-x divide-[#E5E7EB]">
        {ITEMS.map((item, i) => (
          <div key={i} className="flex items-center justify-center lg:justify-start gap-4 px-8 py-8 group hover:bg-[#F9FAFB] transition-colors duration-300">
            <div className="text-black w-10 h-10 flex items-center justify-center border border-[#E5E7EB] rounded-full shrink-0 group-hover:bg-black group-hover:text-white transition-colors duration-300">
              <i className={`${item.icon} text-lg`}></i>
            </div>
            <div>
              <div className="text-[11px] font-bold tracking-widest text-black uppercase mb-0.5">
                {item.title}
              </div>
              <div className="text-[13px] text-[#6B7280]">
                {item.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
