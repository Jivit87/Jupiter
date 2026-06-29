import type { ReactNode } from 'react';
import { AnnouncementBar } from '@/components/layout/announcement-bar';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { SiteShell } from '@/components/layout/site-shell';
import { SiteSettingsProvider } from '@/components/providers/site-settings-provider';
import { getSiteSettings } from '@/actions/settings';
import { getCategories } from '@/actions/categories';
import { getCatalogCategories } from '@/lib/catalog';
import { normalizeSiteSettings } from '@/lib/site-settings';
import { isBuildPhase } from '@/lib/supabase/utils';

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const [settings, categories] = isBuildPhase()
    ? [{} as Record<string, unknown>, []]
    : await Promise.all([
        getSiteSettings().catch(() => ({} as Record<string, unknown>)),
        getCategories().catch(() => []),
      ]);
  const catalogCategories = getCatalogCategories(categories);
  const siteSettings = normalizeSiteSettings(settings);

  const announcementText =
    typeof siteSettings.announcementBar === 'string'
      ? siteSettings.announcementBar
      : 'Free shipping on orders above NPR 1500 within Kathmandu Valley';
  const announcementActive = siteSettings.announcementBarActive !== false;

  return (
    <SiteSettingsProvider settings={siteSettings}>
      <SiteShell>
        {announcementActive && <AnnouncementBar text={announcementText} />}
        <Navbar categories={catalogCategories} />
        <main id="main-content" className="relative">
          {children}
        </main>
        <Footer settings={siteSettings} />
        <FloatingWhatsApp />
      </SiteShell>
    </SiteSettingsProvider>
  );
}
