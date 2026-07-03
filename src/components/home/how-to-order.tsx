import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { HowToOrderFeatures } from './how-to-order-features';

function BrowseIllustration() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.3"
      strokeLinecap="round" strokeLinejoin="round"
      width="118" height="118" overflow="visible" className="text-black">
      <rect x="12" y="21" width="64" height="43" rx="4"/>
      <line x1="12" y1="31" x2="76" y2="31"/>
      <circle cx="18" cy="26" r="1.3" fill="currentColor" stroke="none"/>
      <circle cx="23" cy="26" r="1.3" fill="currentColor" stroke="none"/>
      <circle cx="28" cy="26" r="1.3" fill="currentColor" stroke="none"/>
      <rect x="18" y="38" width="24" height="20" rx="2"/>
      <circle cx="35" cy="44" r="2.2"/>
      <path d="M20 55 L27 46 L32 51 L37 44 L40 55Z"/>
      <rect x="46" y="38" width="24" height="20" rx="2"/>
      <path d="M50 52 Q58 41 66 52"/>
      <line x1="50" y1="52" x2="66" y2="52"/>
      <circle cx="66" cy="62" r="10.5"/>
      <line x1="73.5" y1="69.5" x2="83" y2="79"/>
      <path d="M8 16 l3 3 l-3 3 l-3 -3 Z" strokeWidth="1.6"/>
      <path d="M90 62 l2.5 2.5 l-2.5 2.5 l-2.5 -2.5 Z" strokeWidth="1.6"/>
    </svg>
  );
}

function WhatsAppIllustration() {
  return (
    <svg viewBox="0 0 100 100" width="118" height="118">
      <path d="M50 11 C28.5 11 11 28.5 11 50 C11 57.4 13.1 64.6 17 70.8 L11.5 90.5 L31.7 85.1 C37.7 88.4 43.8 90 50 90 C71.5 90 89 72.5 89 51 C89 29.5 71.5 11 50 11 Z" fill="#25D366"/>
      <path d="M38.5 28.5 c-1 -2.2 -2 -2.2 -3 -2.3 -0.8 0 -1.7 0 -2.6 0 -0.9 0 -2.4 0.3 -3.6 1.7 -1.2 1.3 -4.7 4.6 -4.7 11.2 s4.9 13 5.5 13.9 c0.7 0.9 9.4 15 23 20.5 11.4 4.5 13.7 3.6 16.2 3.4 2.5 -0.2 8 -3.3 9.1 -6.4 1.1 -3.1 1.1 -5.9 0.8 -6.4 -0.3 -0.6 -1.2 -0.9 -2.5 -1.6 -1.3 -0.6 -8 -4 -9.2 -4.4 -1.2 -0.5 -2.1 -0.6 -3 0.7 -0.9 1.3 -3.4 4.3 -4.2 5.2 -0.8 0.9 -1.5 1 -2.8 0.3 -1.3 -0.6 -5.5 -2 -10.5 -6.5 -3.9 -3.4 -6.5 -7.7 -7.3 -9 -0.8 -1.3 -0.1 -2 0.6 -2.7 0.6 -0.6 1.3 -1.5 2 -2.3 0.7 -0.8 0.9 -1.3 1.4 -2.2 0.5 -0.9 0.2 -1.7 -0.1 -2.4 -0.3 -0.6 -2.9 -7.2 -4.1 -9.8 Z" fill="white"/>
    </svg>
  );
}

function DeliverIllustration() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.3"
      strokeLinecap="round" strokeLinejoin="round"
      width="118" height="118" overflow="visible" className="text-black">
      <path d="M28 33 L50 22 L72 33 L72 57 L50 68 L28 57 Z"/>
      <path d="M28 33 L50 44 L72 33"/>
      <line x1="50" y1="44" x2="50" y2="68"/>
      <path d="M44 29 c0 -4.5 6.5 -4.5 6.5 0 c0 -4.5 6.5 -4.5 6.5 0 c0 4.5 -6.5 8.5 -6.5 8.5 c0 0 -6.5 -4 -6.5 -8.5 Z"
        fill="currentColor" stroke="none"/>
      <path d="M13 76 C15 69 22 67 27 70 C30 65 38 67 38 74"/>
      <path d="M13 76 C12 83 18 90 27 91 C31.5 91.5 36 89 38 84.5 L38 74"/>
      <path d="M87 76 C85 69 78 67 73 70 C70 65 62 67 62 74"/>
      <path d="M87 76 C88 83 82 90 73 91 C68.5 91.5 64 89 62 84.5 L62 74"/>
      <path d="M6 40 l3 3 l-3 3 l-3 -3 Z" strokeWidth="1.6"/>
      <path d="M90 24 l2.5 2.5 l-2.5 2.5 l-2.5 -2.5 Z" strokeWidth="1.6"/>
    </svg>
  );
}

function ArrowConnector() {
  return (
    <div className="hidden md:flex h-[240px] items-center justify-center">
      <div className="relative w-[150px] flex items-center justify-center">
        <div className="w-full border-t border-dashed border-[#9CA3AF]" />
        <div className="absolute w-[30px] h-[30px] rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
            stroke="black" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

type StepProps = {
  num:          string;
  pill:         string;
  desc:         string;
  illustration: React.ReactNode;
};

function Step({ num, pill, desc, illustration }: StepProps) {
  return (
    <div className="flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-6 md:gap-0 relative z-10 bg-white">
      <div className="flex flex-col items-center shrink-0">
        <div className="w-[32px] md:w-[60px] h-[32px] md:h-[60px] rounded-full bg-white border border-[#E5E7EB] shadow-[0_0_0_3px_white] md:shadow-[0_0_0_6px_white] flex items-center justify-center font-display text-sm md:text-xl text-black -mb-[16px] md:-mb-[30px] relative z-[3]">
          {num}
        </div>

        <div className="w-[72px] md:w-[210px] h-[72px] md:h-[210px] rounded-full border border-[#E5E7EB] flex items-center justify-center relative mt-2 shrink-0 bg-white">
          <div className="w-[60px] md:w-[170px] h-[60px] md:h-[170px] rounded-full bg-[#F9FAFB] flex items-center justify-center relative">
            <div className="scale-[0.4] md:scale-100 origin-center">
              {illustration}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start md:items-center pt-2 md:pt-0">
        <div className="md:-mt-5 z-[3] relative bg-black text-white rounded-sm py-1.5 md:py-2 px-3 md:px-6 font-semibold text-[10px] md:text-xs tracking-widest uppercase">
          {pill}
        </div>

        <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-black mt-5" />

        <p className="mt-2 md:mt-4 text-[13px] md:text-sm leading-relaxed text-[#4B5563] max-w-[230px]">
          {desc}
        </p>
      </div>
    </div>
  );
}
export function HowToOrder() {
  return (
    <section className="bg-white py-16 sm:py-24 px-4 md:px-12 border-b border-[#E5E7EB] flex justify-center">
      <div className="w-full max-w-7xl mx-auto">

        <div className="text-center mb-8 sm:mb-16">
          <span className="inline-block text-[11px] font-semibold tracking-widest text-[#6B7280] uppercase mb-4">
            Simple & Personal
          </span>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-black leading-tight tracking-tight">
            How to Order
          </h2>
        </div>

        <div className="relative flex flex-col md:grid md:grid-cols-[1fr_auto_1fr_auto_1fr] items-start md:items-start gap-y-10 md:gap-x-1 mb-10 md:mb-20">
          {/* Vertical line for mobile */}
          <div className="absolute left-[36px] md:hidden top-[24px] bottom-[24px] w-px border-l border-dashed border-[#9CA3AF] z-0" />

          <Step
            num="01" pill="BROWSE"
            desc="Explore our collection and find the piece that speaks to you."
            illustration={<BrowseIllustration />}
          />
          <ArrowConnector />
          <Step
            num="02" pill="WHATSAPP"
            desc="Message us on WhatsApp — no cart, no checkout, just a simple chat."
            illustration={<WhatsAppIllustration />}
          />
          <ArrowConnector />
          <Step
            num="03" pill="DELIVER"
            desc="We craft your order with care and deliver it right to your door."
            illustration={<DeliverIllustration />}
          />
        </div>

        <HowToOrderFeatures />

        <div className="text-center mt-12">
          <Link
            href={siteConfig.links.custom}
            className="inline-flex items-center gap-3 py-4 px-8 bg-[#25D366] text-white rounded-sm text-sm font-semibold tracking-wide hover:bg-[#20bd5a] transition-colors duration-200"
          >
            <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            Order on WhatsApp
          </Link>
        </div>
      </div>
    </section>
  );
}
