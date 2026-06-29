import { themeConfig } from './theme';

export const siteConfig = {
  name: themeConfig.brand,
  description:
    'Jupiter is a premium handmade arts and gifts brand rooted in Nepal, shaped by cosmic, earthy, and intentional design.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jupiterhandmade.com',
  locale: 'en_NP',
  language: 'en',
  handles: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? 'jupiterrrr_11',
  },
  links: {
    home: '/',
    shop: '/shop',
    collections: '/collections',
    adminDashboard: '/admin/dashboard',
    adminSignIn: '/admin/sign-in',
    custom: '/custom',
    story: '/our-story',
    craft: '/the-craft',
    reviews: '/reviews',
    careGuide: '/care-guide',
    faq: '/faq',
    giftGuide: '/gift-guide',
    madeInNepal: '/made-in-nepal',
    wishlist: '/wishlist',
    contact: '/contact',
  },
  socials: {
    instagram: `https://www.instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? 'jupiterrrr_11'}/`,
  },
} as const;
