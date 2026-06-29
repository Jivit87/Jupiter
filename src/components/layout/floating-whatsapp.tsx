'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useSiteSettings } from '@/components/providers/site-settings-provider';
import { getPublicEnv } from '@/lib/env';

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const footerRef = useRef<Element | null>(null);
  const siteSettings = useSiteSettings();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);

    const footer = document.querySelector('footer');
    if (footer) {
      footerRef.current = footer;
      const observer = new IntersectionObserver(
        ([entry]) => setVisible(!entry.isIntersecting),
        { threshold: 0.1 },
      );
      observer.observe(footer);
      return () => {
        clearTimeout(timer);
        observer.disconnect();
      };
    }

    return () => clearTimeout(timer);
  }, []);

  let phoneNumber: string | undefined = siteSettings?.whatsappNumber;
  try {
    phoneNumber = phoneNumber ?? getPublicEnv().NEXT_PUBLIC_WHATSAPP_NUMBER;
  } catch {
    return null;
  }
  if (!phoneNumber) return null;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hi Jupiter! \uD83E\uDE90 I\u2019d like to know more.')}`;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lift transition-all duration-500 hover:scale-110 hover:shadow-card ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}
    >
      <svg viewBox="0 0 24 24" fill="white" className="h-7 w-7" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.985-1.349A9.952 9.952 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
      </svg>
    </Link>
  );
}
