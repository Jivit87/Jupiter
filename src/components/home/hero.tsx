import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import 'remixicon/fonts/remixicon.css';

export function Hero({ tagline }: { tagline?: string }) {
  return (
    <section className="relative w-full bg-gradient-to-b from-amber-50/60 via-white to-white text-black min-h-svh flex items-center pt-16 sm:pt-20 pb-10 sm:pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-12 lg:px-16 flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
        
        {/* Text Content */}
        <div className="flex flex-col items-start text-left max-w-xl z-10 w-full lg:w-1/2">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 sm:mb-8 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] text-[11px] font-semibold uppercase tracking-widest text-[#6B7280]">
            <i className="ri-map-pin-line text-sm"></i> Handcrafted in Nepal
          </div>
          
          <h1 className="font-display text-[clamp(2.5rem,5vw+1rem,4.5rem)] leading-[1.05] tracking-tight mb-4 sm:mb-8">
            {tagline ? tagline : (
              <>Handcrafted with <span className="italic text-[#6B7280]">cosmic intention.</span></>
            )}
          </h1>
          
          <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed mb-6 sm:mb-10 max-w-md">
            Art, jewelry, and meaningful gifts inspired by timeless traditions. Meticulously handcrafted without machines.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Link 
              href={siteConfig.links.shop} 
              className="flex items-center justify-center gap-2 bg-amber-600 text-white px-8 py-4 text-sm font-medium hover:bg-amber-700 transition-colors rounded-sm shadow-sm min-h-[44px]"
            >
              Shop Collection <i className="ri-arrow-right-line"></i>
            </Link>
            <Link 
              href={siteConfig.links.custom} 
              className="flex items-center justify-center gap-2 bg-white text-black border border-[#E5E7EB] px-8 py-4 text-sm font-medium hover:bg-[#F9FAFB] transition-colors rounded-sm min-h-[44px]"
            >
              Custom Orders
            </Link>
          </div>
        </div>

        {/* Visual Content - Stark grid of abstract/placeholder blocks to represent imagery */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[500px]">
            <div className="flex flex-col gap-3 sm:gap-4 pt-8 sm:pt-12">
              <div className="aspect-[4/5] w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-sm relative overflow-hidden group">
                <Image src="/products/img12.jpg" alt="Product" fill sizes="(max-width: 768px) 50vw, 250px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="aspect-square w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-sm relative overflow-hidden group">
                <Image src="/products/img19.webp" alt="Product" fill sizes="(max-width: 768px) 50vw, 250px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="aspect-square w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-sm relative overflow-hidden group">
                <Image src="/products/img10.jpg" alt="Product" fill sizes="(max-width: 768px) 50vw, 250px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="aspect-[4/5] w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-sm relative overflow-hidden group">
                <Image src="/products/img4.jpg" alt="Product" fill sizes="(max-width: 768px) 50vw, 250px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
