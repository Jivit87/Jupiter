import { z } from 'zod';

export const siteSettingKeySchema = z.enum([
  'whatsapp_number',
  'instagram_handle',
  'hero_tagline',
  'shipping_info',
  'featured_section_title',
  'announcement_bar',
  'announcement_bar_active',
]);

export const siteSettingValueSchema = z.union([z.string(), z.boolean(), z.number(), z.record(z.string(), z.any()), z.array(z.any())]);

export const siteSettingSchema = z.object({
  key: siteSettingKeySchema,
  value: siteSettingValueSchema,
});

export type SiteSettingInput = z.infer<typeof siteSettingSchema>;
