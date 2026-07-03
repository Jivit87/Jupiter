import Link from 'next/link';
import { siteConfig } from '@/config/site';

function JupiterMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M20 30c-5.5 0-10-3.6-10-8s4.5-8 10-8 6 2.2 6 5-2.6 5-6 5-4-1.4-4-3 1.3-3 3-3"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SocialBtn({ href, label, children, external, brandClass }: {
  href: string;
  label: string;
  children: React.ReactNode;
  external?: boolean;
  brandClass?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 ${
        brandClass || 'border-[#E5E7EB] text-black hover:bg-black hover:text-white hover:border-black'
      }`}
    >
      {children}
    </Link>
  );
}

function FooterCol({ title, links }: {
  title: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-[11px] font-bold uppercase tracking-widest text-black mb-1">
        {title}
      </h4>
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="text-sm text-[#4B5563] hover:text-black transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export function Footer() {
  const instagramUrl = siteConfig.socials.instagram;

  return (
    <footer className="bg-[#F9FAFB] border-t border-[#E5E7EB] py-12 lg:py-24 px-6 sm:px-12">
      <div className="mx-auto max-w-7xl grid grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-x-2 sm:gap-x-6 gap-y-10 lg:gap-16 pb-12 lg:pb-16 border-b border-[#E5E7EB]">
        
        <div className="col-span-3 lg:col-span-1">
          <div className="flex items-center gap-3 mb-6 text-black">
            <JupiterMark />
            <span className="font-display text-xl font-semibold tracking-wide">
              JUPITER
            </span>
          </div>

          <p className="text-sm leading-relaxed max-w-[280px] mb-8 text-[#4B5563]">
            Handcrafted arts, jewelry & gifts made with cosmic intention in the Kathmandu Valley, Nepal.
          </p>

          <div className="flex gap-3">
            <SocialBtn 
              href={instagramUrl} 
              label="Instagram" 
              external 
              brandClass="border-[#E1306C]/30 text-[#E1306C] hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C]"
            >
              <i className="ri-instagram-line text-lg"></i>
            </SocialBtn>
            <SocialBtn 
              href={siteConfig.links.custom} 
              label="WhatsApp" 
              brandClass="border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-white hover:border-[#25D366]"
            >
              <i className="ri-whatsapp-line text-lg"></i>
            </SocialBtn>
          </div>
        </div>

        <FooterCol
          title="Shop"
          links={[
            { label: 'All Products',  href: siteConfig.links.shop        },
            { label: 'Collections',   href: siteConfig.links.shop        },
            { label: 'New Arrivals',  href: siteConfig.links.shop        },
            { label: 'Wishlist',      href: siteConfig.links.wishlist     },
          ]}
        />

        <FooterCol
          title="About"
          links={[
            { label: 'Our Story',   href: siteConfig.links.story       },
            { label: 'The Craft',   href: siteConfig.links.craft       },
            { label: 'Made in Nepal', href: siteConfig.links.madeInNepal },
            { label: 'Care Guide',  href: siteConfig.links.careGuide   },
          ]}
        />

        <FooterCol
          title="Support"
          links={[
            { label: 'Custom Orders', href: siteConfig.links.custom    },
            { label: 'FAQs',          href: siteConfig.links.faq       },
            { label: 'Contact',       href: siteConfig.links.contact   },
            { label: 'Gift Guide',    href: siteConfig.links.giftGuide },
          ]}
        />
      </div>

      <div className="mx-auto max-w-7xl pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-[#6B7280]">
        <span>&copy; {new Date().getFullYear()} Jupiter. All rights reserved.</span>

        <span className="flex items-center gap-2 text-black font-semibold tracking-widest uppercase">
          <i className="ri-map-pin-line text-sm"></i> Handmade in Nepal
        </span>

        <Link
          href={siteConfig.links.contact}
          className="hover:text-black transition-colors"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
