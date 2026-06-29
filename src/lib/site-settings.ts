export type SiteSettingsState = {
  whatsappNumber?: string;
  instagramHandle?: string;
  heroTagline?: string;
  featuredSectionTitle?: string;
  announcementBar?: string;
  announcementBarActive?: boolean;
  shippingInfo?: string;
};

export function normalizeSiteSettings(settings: Record<string, unknown>): SiteSettingsState {
  return {
    whatsappNumber: typeof settings.whatsapp_number === 'string' ? settings.whatsapp_number : undefined,
    instagramHandle: typeof settings.instagram_handle === 'string' ? settings.instagram_handle : undefined,
    heroTagline: typeof settings.hero_tagline === 'string' ? settings.hero_tagline : undefined,
    featuredSectionTitle:
      typeof settings.featured_section_title === 'string' ? settings.featured_section_title : undefined,
    announcementBar: typeof settings.announcement_bar === 'string' ? settings.announcement_bar : undefined,
    announcementBarActive:
      typeof settings.announcement_bar_active === 'boolean'
        ? settings.announcement_bar_active
        : typeof settings.announcement_bar_active === 'string'
          ? settings.announcement_bar_active === 'true'
          : undefined,
    shippingInfo: typeof settings.shipping_info === 'string' ? settings.shipping_info : undefined,
  };
}
