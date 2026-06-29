import { siteConfig } from '@/config/site';

export const routeConstants = {
  home: siteConfig.links.home,
  shop: siteConfig.links.shop,
  collections: siteConfig.links.collections,
  adminDashboard: siteConfig.links.adminDashboard,
  adminSignIn: siteConfig.links.adminSignIn,
  custom: siteConfig.links.custom,
  story: siteConfig.links.story,
  craft: siteConfig.links.craft,
  reviews: siteConfig.links.reviews,
  careGuide: siteConfig.links.careGuide,
  faq: siteConfig.links.faq,
  giftGuide: siteConfig.links.giftGuide,
  madeInNepal: siteConfig.links.madeInNepal,
  wishlist: siteConfig.links.wishlist,
  contact: siteConfig.links.contact,
} as const;

export const publicRoutes = Object.values(routeConstants);
