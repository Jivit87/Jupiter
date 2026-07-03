# 🪐 Jupiter — Complete Website Blueprint
> Handmade Arts & Gifts | Made in Nepal | WhatsApp-First Commerce

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Brand Identity](#2-brand-identity)
3. [Recommended Pages](#3-recommended-pages)
4. [Site Architecture](#4-site-architecture)
5. [Feature Specifications](#5-feature-specifications)
6. [Database Schema](#6-database-schema)
7. [Admin Dashboard](#7-admin-dashboard)
8. [UI/UX — Page by Page](#8-uiux--page-by-page)
9. [Component Hierarchy](#9-component-hierarchy)
10. [Folder Structure](#10-folder-structure)
11. [API Design (Server Actions)](#11-api-design-server-actions)
12. [WhatsApp Integration](#12-whatsapp-integration)
13. [Cloudinary Integration](#13-cloudinary-integration)
14. [SEO Strategy](#14-seo-strategy)
15. [Security](#15-security)
16. [Performance Optimizations](#16-performance-optimizations)
17. [Analytics Setup](#17-analytics-setup)
18. [Future Scalability](#18-future-scalability)
19. [Development Roadmap](#19-development-roadmap)
20. [Environment Variables](#20-environment-variables)

---

## 1. Project Overview

| Property | Detail |
|---|---|
| **Brand Name** | Jupiter |
| **Instagram** | @jupiterrrr_11 |
| **Sister Brand** | @amethyst_zenisha |
| **Nature** | Handmade arts, jewelry, and custom gifts — Made in Nepal |
| **Commerce Model** | WhatsApp-first (no payment gateway on site) |
| **Target Market** | Nepal (current), future: India + Worldwide |
| **Admin** | Single super-admin with full control |
| **Tech Stack** | Next.js 15 + TypeScript + Tailwind CSS + Framer Motion |
| **Database** | PostgreSQL via Supabase |
| **Storage** | Cloudinary |
| **Auth** | Clerk (Email/Password) + Strict `ADMIN_EMAIL` Verification |
| **Deployment** | Vercel |
| **Analytics** | Google Analytics 4 + Microsoft Clarity |
| **SEO** | Next.js Metadata API + Schema.org structured data |
| **WhatsApp** | Click-to-Chat API (wa.me) |

### Core Philosophy
> Jupiter is a **premium handcrafted brand experience** with a high-contrast, minimalist aesthetic. Inspired by Notion and ElevenLabs, the design prioritizes clean typography, sharp black-and-white layouts, and subtle warm accents to let the craftsmanship shine. The Admin dashboard is designed to be extremely intuitive and accessible for non-technical users.

---

## 2. Brand Identity

### 2.1 Color Palette

> **Direction:** Minimalist, High-Contrast, Black & White. Deep blacks and stark whites form the foundation, punctuated by vibrant brand colors and warm amber accents to evoke handcrafted warmth without clutter. Cream, purple, and dark blue have been strictly removed.

| Role | Name | Tailwind / Hex | Usage |
|---|---|---|---|
| **Background Primary** | Pure White | `#FFFFFF` | Main page backgrounds, clean space |
| **Surface Off-White** | Subtle Gray | `#F9FAFB` | Alternate sections, soft contrast areas |
| **Text Primary** | Absolute Black | `#000000` | Headings, primary body text, borders |
| **Text Muted** | Slate Gray | `#4B5563` / `#6B7280` | Subtitles, secondary text, captions |
| **Primary Accent** | Artisan Amber | `amber-600` / `#D97706` | CTAs, prominent accents, highlight borders |
| **Soft Glow** | Warm Wash | `amber-50` / `#FFFBEB` | Hover states, subtle gradients behind collections |
| **Brand Colors** | Socials | `#E1306C` / `#25D366` | Instagram pink, WhatsApp green |

**Gradient — "Warm Accent":**
```css
background: bg-gradient-to-b from-amber-50/60 via-white to-white
```

### 2.2 Typography

| Role | Font | Weight | Source |
|---|---|---|---|
| **Display / Hero** | Marcellus / Cormorant Garamond | 400, 600 | Google Fonts |
| **Body / UI** | Jost | 300, 400, 500 | Google Fonts |
| **Handwriting** | Caveat | 400 | Google Fonts |

```css
/* Font Variables */
--font-display: 'Marcellus', serif;
--font-body: 'Jost', sans-serif;
--font-hand: 'Caveat', cursive;
```

### 2.3 Design Principles

- **Stark Contrast & White Space** — Embrace a clean, editorial layout. Deep blacks and absolute whites provide a premium, modern canvas.
- **Subtle Warmth** — Introduce color deliberately. Instead of full colored backgrounds, use warm amber borders, text highlights, and soft gradient washes to emphasize the handmade nature.
- **Crisp Borders & Shadows** — Use fine black or amber borders (`border border-black`) and subtle drop shadows (`shadow-sm`, `shadow-md`) to define structure instead of heavy glassmorphism.
- **Micro-interactions** — Smooth `transform: scale()` on hover, crisp color transitions (black to white, or white to amber), and slide-up fade animations.
- **Non-Technical Admin UX** — Admin panels must be extremely straightforward, favoring clear labels, large click targets, and zero jargon.

### 2.4 Iconography

- **Remix Icon (`remixicon`)** is the sole icon library, replacing all system emojis to maintain a professional, cohesive look.
- Use line variants (`ri-*-line`) for a clean, lightweight aesthetic.
- Social logos (Instagram, WhatsApp) are colorized with their official brand colors (`#E1306C`, `#25D366`) on hover and in active states to break up the monochrome layout naturally.

### 2.5 Logo Guidelines

- Provide logo in: SVG (primary), PNG (transparent background)
- Dark version: on light backgrounds
- Light version: on dark/Cosmic Indigo backgrounds
- Minimum size: 120px wide
- Clear space: equal to the height of the letter "J" in the logo

---

## 3. Recommended Pages

> Researched based on top-performing handmade jewelry and artisan craft brands. Each page serves a distinct purpose in the customer journey.

### Priority 1 — Core (Launch Required)

| Page | Slug | Purpose |
|---|---|---|
| **Home** | `/` | Brand introduction, emotional hook, featured products |
| **Shop (Collections)** | `/shop` | Full catalog, structured by collections |
| **Product Detail** | `/shop/[slug]` | Full product info + WhatsApp order |
| **Custom Orders** | `/custom` | Request custom handmade items |
| **Our Story** | `/our-story` | Brand narrative, artisan story |
| **Contact** | `/contact` | WhatsApp, Instagram, location info |
| **Admin Dashboard** | `/admin/*` | Protected product/content management |

### Priority 2 — Brand Depth (Add within 2 weeks of launch)

| Page | Slug | Purpose |
|---|---|---|
| **The Making Process** | `/the-craft` | Behind-the-scenes, builds trust + SEO |
| **Wall of Love** | `/reviews` | All customer reviews aggregated |
| **Care Guide** | `/care-guide` | How to care for handmade jewelry (SEO goldmine) |
| **FAQs** | `/faq` | Shipping, custom orders, materials |

### Priority 3 — Growth (Add after 1 month)

| Page | Slug | Purpose |
|---|---|---|
| **Wishlist** | `/wishlist` | Saved items (localStorage-based) |
| **Gift Guide** | `/gift-guide` | Curated gift ideas by occasion |
| **About Nepal** | `/made-in-nepal` | Story of Nepali craftsmanship, builds brand prestige |

### Why These Pages (Research Rationale)

- **"Our Story"** is the #1 most-visited page for artisan brands after the shop — customers want to know the maker
- **"The Making Process"** videos/photos on craft sites drive 3-4x longer session times and rank for "handmade [product] Nepal" searches
- **"Care Guide"** is an SEO moat — "how to care for wire jewelry", "copper ring care" are high-intent, low-competition keywords
- **"Wall of Love"** consolidates social proof and can include embedded Instagram posts + admin-curated reviews
- **"Gift Guide"** captures seasonal search traffic ("gifts for her Nepal", "unique handmade gifts")

---

## 4. Site Architecture

```
jupiter.com/
│
├── / (Home)
├── /shop (All Products — organized by collections)
│   └── /shop/[slug] (Product Detail)
│
├── /custom (Custom Order Request)
├── /our-story (Brand Story)
├── /the-craft (Making Process)
├── /reviews (Wall of Love)
├── /care-guide (Product Care)
├── /faq (FAQs)
├── /gift-guide (Gift Curation)
├── /made-in-nepal (Provenance Story)
├── /wishlist (Saved Items)
├── /contact (Contact Page)
│
└── /admin (Protected — Clerk Auth)
    ├── /admin/dashboard
    ├── /admin/products
    │   ├── /admin/products/new
    │   └── /admin/products/[id]/edit
    ├── /admin/categories
    ├── /admin/reviews
    ├── /admin/custom-orders
    └── /admin/settings
```

### Product Categories

| Category | Slug | Icon | Description |
|---|---|---|---|
| Wire Jewelry | `wire-jewelry` | 💍 | Rings, earrings, pendants, bracelets in wire |
| Brass & Copper Rings | `rings` | 🔮 | Statement rings in brass and copper |
| Mandala Art | `mandala-art` | 🌀 | Hand-drawn mandala framed art |
| Moon Lamps | `moon-lamps` | 🌙 | 3D printed moon-textured lamps |
| Dried Bouquets | `dried-bouquets` | 🌸 | Everlasting dried flower arrangements |
| Customized Gifts | `custom-gifts` | 🎁 | Personalized, made-to-order gifts |
| Home Décor | `home-decor` | 🏮 | Decorative items for living spaces |
| Keychains & Accessories | `keychains` | 🗝️ | Small handmade accessories |

---

## 5. Feature Specifications

### 5.1 Product Catalog

**Product Fields (all optional except name):**

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | ✅ | Product title |
| `slug` | string | Auto | Generated from name |
| `price` | number | Optional | In NPR (Nepalese Rupees) |
| `category_id` | UUID | Optional | Foreign key to categories |
| `description` | text | Optional | Rich text description |
| `material` | string | Optional | e.g., "Copper wire, brass" |
| `dimensions` | string | Optional | e.g., "5cm × 3cm" |
| `weight` | string | Optional | e.g., "12g" |
| `colors` | string[] | Optional | Array of color names |
| `stock_status` | enum | Optional | in_stock / out_of_stock / made_to_order |
| `images` | string[] | Optional | Cloudinary URLs (max 8) |
| `video_url` | string | Optional | Cloudinary video URL |
| `sku` | string | Optional | Admin-assigned SKU |
| `handmade_time` | string | Optional | e.g., "3–5 days" |
| `is_customizable` | boolean | Optional | Default: false |
| `is_featured` | boolean | Optional | Shows on homepage |
| `is_new` | boolean | Optional | "New Arrival" badge |
| `is_bestseller` | boolean | Optional | "Bestseller" badge |
| `meta_title` | string | Optional | SEO title override |
| `meta_description` | string | Optional | SEO description override |
| `created_at` | timestamp | Auto | |
| `updated_at` | timestamp | Auto | |

**Display Badges (auto-calculated or admin-set):**
- 🌟 Bestseller
- ✨ New Arrival
- 🎨 Customizable
- ⏰ Made to Order
- ❤️ Last Few Left (when stock_status = low)

### 5.2 WhatsApp Click-to-Chat Integration

When a user clicks **"Order via WhatsApp"** on a product, the link opens WhatsApp with this pre-filled message:

```
https://wa.me/977XXXXXXXXXX?text=[ENCODED_MESSAGE]
```

**Pre-filled message template:**
```
Hi Jupiter! 🪐

I'm interested in ordering:

*Product:* [Product Name]
*SKU:* [SKU if available]
*Price:* NPR [Price]
*Category:* [Category]

*Product Link:* [Full Product URL]
*Product Image:* [First Image URL]

Could you please confirm availability and delivery details? 🌿
```

**Implementation (TypeScript utility):**
```typescript
export function generateWhatsAppURL(product: Product, productUrl: string): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER; // e.g., 977XXXXXXXXXX
  
  const message = `Hi Jupiter! 🪐\n\nI'm interested in ordering:\n\n*Product:* ${product.name}\n${product.sku ? `*SKU:* ${product.sku}\n` : ''}${product.price ? `*Price:* NPR ${product.price.toLocaleString()}\n` : ''}*Category:* ${product.category?.name ?? 'Handmade'}\n\n*Product Link:* ${productUrl}\n${product.images?.[0] ? `*Product Image:* ${product.images[0]}\n` : ''}\nCould you please confirm availability and delivery details? 🌿`;
  
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
```

**Custom Order WhatsApp message:**
```
Hi Jupiter! 🪐

I'd like to place a *Custom Order*:

*What I want:* [User's description]
*For:* [Occasion if specified]
*Budget (approx):* NPR [Budget]
*Reference Image:* [if uploaded, link]
*Deadline:* [if specified]

Looking forward to hearing from you! ✨
```

### 5.3 Admin-Curated Reviews

Reviews are NOT user-submitted. Admin adds them based on real customer feedback (WhatsApp screenshots, DMs, etc.).

| Field | Type | Required |
|---|---|---|
| `reviewer_name` | string | ✅ |
| `review_text` | text | ✅ |
| `rating` | 1–5 | Optional |
| `product_id` | UUID | Optional (link to product) |
| `reviewer_image` | string | Optional (Cloudinary URL) |
| `review_image` | string | Optional (product photo by customer) |
| `platform` | enum | Optional (whatsapp / instagram / in_person) |
| `is_featured` | boolean | Featured on homepage |
| `date` | date | Optional |
| `created_at` | timestamp | Auto |

### 5.4 Wishlist (No Login Required)

Wishlist is stored in **localStorage** — no account needed.

```typescript
// Wishlist utility
interface WishlistItem {
  id: string;
  name: string;
  slug: string;
  price?: number;
  image?: string;
  addedAt: string;
}

// Key: 'jupiter_wishlist'
// Max items: 50
```

- Persists across sessions (localStorage)
- Wishlist icon in navbar shows count badge
- `/wishlist` page renders from localStorage
- "Share Wishlist" button generates shareable URL with product slugs as query params
- Items removed when user explicitly removes them

### 5.5 Search & Filter

**Search:** Full-text search on product name + description + material (Supabase `fts` column)

**Filters:**
- Category (multi-select)
- Price range (slider — only shown when prices are added)
- Stock Status (Available / Made to Order)
- Customizable (Yes/No)
- Material (multi-select — dynamic from database)

**Sort:**
- Newest First (default)
- Featured
- Price: Low to High
- Price: High to Low
- Alphabetical

### 5.6 Custom Order Request

The custom order page has a form that constructs a WhatsApp message. No database storage — goes directly to WhatsApp.

**Form Fields:**
```
- What do you want? (textarea, required)
- Occasion (dropdown: Birthday / Anniversary / Wedding / Festival / Just Because / Other)
- For whom? (text input, optional)
- Budget range (dropdown in NPR ranges, optional)
- Deadline / When do you need it? (date picker, optional)
- Preferred material (checkbox: Wire / Brass / Copper / Mixed, optional)
- Reference image URL (text input, optional)
- Your name (text input, optional)
- Your WhatsApp number (optional — for easier follow-up)
```

On submit → redirect to WhatsApp with encoded message.

### 5.7 Shipping Information

Displayed as a static info component (not a calculator):

```
📦 We currently ship within Nepal only.
🇳🇵 Shipping details confirmed on WhatsApp before placing your order
🎁 Custom orders: [handmade_time] + shipping time
🚚 Shipping via Pathao / Delivery partner
```

---

## 6. Database Schema

> PostgreSQL via Supabase. All tables use UUID primary keys and Row Level Security (RLS).

### 6.1 Entity Relationship Overview

```
categories ──< products >── product_images
                │
                └──< reviews
                └──< custom_order_requests (optional logging)
```

### 6.2 SQL Schema

```sql
-- ============================================================
-- EXTENSIONS
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for fuzzy search

-- ============================================================
-- CATEGORIES
-- ============================================================
CREATE TABLE categories (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url   TEXT,
  sort_order  INTEGER DEFAULT 0,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PRODUCTS
-- ============================================================
CREATE TABLE products (
  id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name             TEXT NOT NULL,
  slug             TEXT UNIQUE NOT NULL,
  description      TEXT,
  price            NUMERIC(10, 2),           -- NPR, nullable
  category_id      UUID REFERENCES categories(id) ON DELETE SET NULL,
  material         TEXT,
  dimensions       TEXT,
  weight           TEXT,
  colors           TEXT[],                   -- array of color names
  stock_status     TEXT DEFAULT 'in_stock'
                   CHECK (stock_status IN ('in_stock','out_of_stock','made_to_order','low_stock')),
  images           TEXT[],                   -- Cloudinary URLs
  video_url        TEXT,                     -- Cloudinary video URL
  sku              TEXT UNIQUE,
  handmade_time    TEXT,                     -- e.g. "3-5 days"
  is_customizable  BOOLEAN DEFAULT false,
  is_featured      BOOLEAN DEFAULT false,
  is_new           BOOLEAN DEFAULT false,
  is_bestseller    BOOLEAN DEFAULT false,
  is_published     BOOLEAN DEFAULT true,
  meta_title       TEXT,
  meta_description TEXT,
  search_vector    TSVECTOR,                 -- full-text search
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Full-text search index
CREATE INDEX products_search_idx ON products USING GIN (search_vector);
CREATE INDEX products_category_idx ON products (category_id);
CREATE INDEX products_slug_idx ON products (slug);
CREATE INDEX products_featured_idx ON products (is_featured) WHERE is_featured = true;
CREATE INDEX products_published_idx ON products (is_published) WHERE is_published = true;

-- Auto-update search_vector
CREATE OR REPLACE FUNCTION update_product_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector := 
    to_tsvector('english', COALESCE(NEW.name, '')) ||
    to_tsvector('english', COALESCE(NEW.description, '')) ||
    to_tsvector('english', COALESCE(NEW.material, ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_search_vector_update
BEFORE INSERT OR UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_product_search_vector();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- REVIEWS
-- ============================================================
CREATE TABLE reviews (
  id             UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  reviewer_name  TEXT NOT NULL,
  review_text    TEXT NOT NULL,
  rating         INTEGER CHECK (rating BETWEEN 1 AND 5),
  product_id     UUID REFERENCES products(id) ON DELETE SET NULL,
  reviewer_image TEXT,                       -- Cloudinary URL
  review_image   TEXT,                       -- JSON string containing `location` and `instagramUrl`
  platform       TEXT DEFAULT 'whatsapp'
                 CHECK (platform IN ('whatsapp','instagram','in_person','other')),
  is_featured    BOOLEAN DEFAULT false,
  review_date    DATE,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX reviews_product_idx ON reviews (product_id);
CREATE INDEX reviews_featured_idx ON reviews (is_featured) WHERE is_featured = true;

-- ============================================================
-- CUSTOM ORDER REQUESTS (optional logging — goes to WhatsApp primarily)
-- ============================================================
CREATE TABLE custom_order_requests (
  id             UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  description    TEXT NOT NULL,
  occasion       TEXT,
  for_whom       TEXT,
  budget_range   TEXT,
  deadline       DATE,
  materials      TEXT[],
  reference_url  TEXT,
  customer_name  TEXT,
  customer_phone TEXT,
  status         TEXT DEFAULT 'pending'
                 CHECK (status IN ('pending','in_progress','completed','declined')),
  admin_notes    TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SITE SETTINGS (key-value store for admin-configurable content)
-- ============================================================
CREATE TABLE site_settings (
  key        TEXT PRIMARY KEY,
  value      JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default settings
INSERT INTO site_settings (key, value) VALUES
  ('whatsapp_number', '"977XXXXXXXXXX"'),
  ('instagram_handle', '"jupiterrrr_11"'),
  ('hero_tagline', '"Handcrafted with cosmic intention"'),
  ('shipping_info', '"Shipping within Nepal only. Kathmandu Valley: 1–2 days. Outside Valley: 3–7 days."'),
  ('featured_section_title', '"Pieces Made with Magic"'),


-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_order_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can read active categories"
  ON categories FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read published products"
  ON products FOR SELECT USING (is_published = true);

CREATE POLICY "Public can read reviews"
  ON reviews FOR SELECT USING (true);

CREATE POLICY "Public can insert custom order requests"
  ON custom_order_requests FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can read site settings"
  ON site_settings FOR SELECT USING (true);

-- Admin full access (via Supabase service role key — used in server actions only)
-- Admin operations use the service role key, bypassing RLS entirely
```

---

## 7. Admin Dashboard

### 7.1 Authentication (Double-Layer Security)

- **Provider:** Clerk
- **Method:** Email + Password (Google Auth disabled)
- **Protected routes:** All `/admin/*` paths
- **Layer 1 (Middleware):** `middleware.ts` forces unauthenticated users to `/admin/sign-in`.
- **Layer 2 (Layout Validation):** `src/app/(admin)/layout.tsx` verifies the authenticated user's email against `process.env.ADMIN_EMAIL`. If it does not match exactly, the user is shown an "Access Denied" screen.
- **Layer 3 (Backend Mutations):** Server actions use a `requireAdmin()` helper to verify the `ADMIN_EMAIL` before executing database writes.

```typescript
// src/app/(admin)/layout.tsx (Email Verification)
const adminEmail = process.env.ADMIN_EMAIL;
const isAuthorized = user.emailAddresses.some(
  (e) => e.emailAddress.toLowerCase() === adminEmail.toLowerCase()
);

if (!isAuthorized) {
  return <AccessDeniedScreen />; // Renders a screen with a SignOutButton
}
```

### 7.2 Dashboard Sections

#### /admin/dashboard (Overview)
- Total products count
- Published / Draft products
- Total reviews
- Pending custom order requests
- Recently added products (last 5)
- Quick action buttons

#### /admin/products
- Paginated table of all products
- Columns: Image thumbnail, Name, Category, Price, Stock Status, Published, Created At, Actions
- Actions: Edit, Duplicate, Toggle Published, Delete
- Search and filter within the table
- **"Add Product"** button → /admin/products/new

#### /admin/products/new & /admin/products/[id]/edit
- **Full product form with sections:**

  **Section 1 — Basic Info**
  - Name (text, required)
  - Slug (auto-generated, editable)
  - Category (dropdown)
  - SKU (text)
  - Price in NPR (number)
  - Stock Status (dropdown)
  - Handmade Time (text)

  **Section 2 — Description & Details**
  - Description (rich text — Tiptap editor)
  - Material (text)
  - Dimensions (text)
  - Weight (text)
  - Colors (tag input — type color name, press Enter)

  **Section 3 — Media**
  - Images (drag-and-drop multi-upload → Cloudinary, max 8)
  - Image reorder (drag to reorder, first image = primary)
  - Video (single upload → Cloudinary)

  **Section 4 — Badges & Settings**
  - Is Customizable? (toggle)
  - Is Featured? (toggle)
  - Mark as New Arrival? (toggle)
  - Mark as Bestseller? (toggle)
  - Published? (toggle)

  **Section 5 — SEO**
  - Meta Title (text, 60 char limit indicator)
  - Meta Description (textarea, 160 char limit indicator)
  - Preview: How it will look on Google

#### /admin/categories
- Add / Edit / Delete / Reorder categories
- Fields: Name, Slug, Description, Image, Sort Order, Active

#### /admin/reviews
- Add / Edit / Delete reviews
- Fields: All review fields as specified in DB schema
- Link review to a specific product (optional)
- Toggle "Featured" for homepage reviews

#### /admin/custom-orders
- View all custom order requests submitted via the website
- Filter by status
- Update status (pending → in_progress → completed / declined)
- Add admin notes

#### /admin/settings
- Edit WhatsApp number (reflected across all buttons)
- Edit hero tagline
- Edit shipping information text
- Social links (Instagram URL)

---

## 8. UI/UX — Page by Page

### 8.1 Home Page `/`

```
[NAVBAR]
  Logo | Collections ▾ | Shop | Our Story | The Craft | Custom Orders | 🔍 | ❤️

[HERO SECTION]
  Full-screen or 90vh
  Left: Large display text — "Handcrafted with intention."
  Sub: "Meaningful jewelry and gifts shaped by hand in the Kathmandu Valley."
  CTA: [Shop Collection] (Amber button)
  Right: Hero image — product flat lay or artisan at work
  Background: Soft amber-to-white gradient wash (`bg-gradient-to-b from-amber-50/60 via-white to-white`)
  Animation: Clean slide-up text, image fades in

[FLOATING MARQUEE]
  Scrolling text: "Wire Jewelry • Mandala Art • Custom Gifts • Made in Nepal •"
  Background: Black, text: White

[SHOP BY CATEGORY]
  Heading: "Explore Our Universe"
  Circular category avatars with warm tinted backgrounds (`bg-amber-50/50`) and gold borders on hover
  Clean grid layout

[NEW ARRIVALS / FEATURED]
  Horizontal scroll of products where is_new = true
  Heading: "Fresh from the Workshop"
  CTA: "View All Arrivals" (Amber text link with underline)

[HOW TO ORDER]
  Clean 3-step process visualization using custom SVG illustrations instead of emojis
  1. Browse & Choose (Magnifying Glass Illustration)
  2. Order on WhatsApp (WhatsApp Logo Illustration)
  3. Crafted & Delivered (Gift Box Illustration)

[WALL OF LOVE (PREVIEW)]
  Heading: "What they're saying"
  Minimalist review cards with a sharp amber top border (`border-t-4 border-t-amber-400`)
  Background features a large, soft warm quote mark (`"`)

[INSTAGRAM FEED]
  Heading: "Follow our journey @jupiterrrr_11"
  Grid of latest Instagram posts
  CTA: [Follow on Instagram] (Styled with official Instagram pink #E1306C)

[FOOTER]
  Minimalist black-and-white grid layout
  Social icons: Instagram and WhatsApp using official brand colors
  Copyright & Privacy Policy
```

### 8.2 Shop Page `/shop`

```
[PAGE HEADER]
  "The Collection" — large, editorial heading
  Short intro text

[FILTER + SORT BAR] (sticky on scroll)
  Left: Category pills (All | Wire Jewelry | Rings | ...)
  Right: Sort dropdown + Filter icon (opens sidebar on mobile)

[FILTER SIDEBAR] (desktop: always visible | mobile: slide-in drawer)
  Category (checkboxes)
  Stock Status (in stock / made to order)
  Customizable Only (toggle)
  Material (dynamic from DB)
  [Clear Filters]

[PRODUCT GRID]
  Pinterest masonry layout (react-masonry-css or CSS columns)
  Infinite scroll (load 12 → load more on scroll)
  Each product card:
    - Image (hover: second image if available)
    - Product Name
    - Category label (pill)
    - Price (if set) — "NPR X,XXX" | "Price on request" if not set
    - Stock badge (Out of Stock / Made to Order)
    - ❤️ Wishlist icon (top right of card)
    - Customizable badge (if applicable)

[EMPTY STATE]
  If no products: illustrated empty state with CTA to custom order

[SEARCH]
  Floating search overlay triggered by 🔍 in navbar
  Real-time search with Supabase FTS
```

### 8.3 Product Detail Page `/shop/[slug]`

```
[BREADCRUMB]
  Home > Shop > [Category] > [Product Name]

[PRODUCT LAYOUT] (2-column on desktop)

LEFT COLUMN — MEDIA
  Main image (large, zoomable on hover/click)
  Thumbnail strip (horizontal scroll on mobile, vertical on desktop)
  Video player (if video_url exists)
  Image count indicator "1 / 5"

RIGHT COLUMN — INFO
  Category pill
  Product Name (Cormorant Garamond, 36px)
  Price (if set) — "NPR X,XXX" | "Contact for price" CTA if not set
  Stock Status badge
  
  ─── Description ───
  Rich text description
  
  ─── Product Details ───
  | Material    | [material]       |
  | Dimensions  | [dimensions]     |
  | Weight      | [weight]         |
  | Colors      | ● ● ● [swatches] |
  | SKU         | [sku]            |
  | Handmade in | [handmade_time]  |
  
  ─── Colors ───
  Color name pills (if colors array has items)
  
  ─── Customizable? ───
  If is_customizable = true:
    "✨ This piece can be customized for you"
    [Request Customization] button → links to /custom page with product pre-filled
  
  ─── CTAs ───
  [🛍️ Order via WhatsApp]  ← PRIMARY CTA, full-width, Jupiter Gold
  [❤️ Add to Wishlist]     ← SECONDARY CTA, outline button
  [📤 Share]               ← icon button, copies link
  
  ─── Shipping ───
  Small info box: "📦 Ships within Nepal"

[PRODUCT REVIEWS SECTION]
  Heading: "What buyers say"
  Cards with reviewer name, review text, rating stars, image (if any)
  Show only reviews linked to this product (product_id match)

[YOU MAY ALSO LIKE]
  Products from same category (4–6 products)
  Horizontal scroll grid
```

### 8.4 Custom Orders Page `/custom`

```
[HERO]
  Heading: "Something Made Just for You"
  Subtext: "Tell us your vision — we'll bring it to life from Nepal ✨"

[HOW IT WORKS]
  4-step timeline:
  1. Fill the form → 2. We discuss on WhatsApp → 3. We create → 4. Delivered to you

[CUSTOM ORDER FORM]
  What do you have in mind? (textarea — "Describe your dream piece...")
  Occasion: (dropdown)
  For whom? (text)
  Budget: (dropdown — "Under NPR 500 / 500–1000 / 1000–2000 / 2000–5000 / 5000+")
  Need it by: (date picker)
  Material preference: (checkboxes)
  Reference image link: (URL input)
  Your name: (text, optional)
  Your WhatsApp: (tel, optional)
  
  [Send via WhatsApp →] button → generates WhatsApp link and opens

[PAST CUSTOM WORK]
  Gallery of previous custom pieces
  "These are some pieces we've made by request ❤️"

[FAQ]
  "How long do custom orders take?"
  "Can I send a reference image?"
  "What materials do you work with?"
```

### 8.5 Our Story Page `/our-story`

```
[FULL-BLEED HERO]
  Large atmospheric image (artisan's hands, copper wire, Nepal landscape)
  Overlay text: "Born from a love of making"

[BRAND NARRATIVE — scroll-animated sections]
  Section 1: "Jupiter was born from..."  (origin story)
  Section 2: "Made in the mountains..."  (Nepal/craft identity)
  Section 3: "Every spiral tells a story..." (design philosophy)
  Section 4: "Handmade means..." (process/values)

[ARTISAN PROFILE]
  Photo + name + short bio
  "Meet the hands behind Jupiter"

[BY THE NUMBERS]
  Counter animation: X+ products | X+ happy customers | X+ years of crafting

[SHOP CTA]
  "Experience the craft for yourself"
  [Browse Collection] button
```

### 8.6 The Craft Page `/the-craft`

```
[HERO]
  "Where Magic Meets Materials"

[PROCESS STEPS — alternating image/text layout]
  Step 1: Gathering materials (image of raw copper/brass wire)
  Step 2: Shaping by hand (close-up of wire being bent)
  Step 3: Detail work (mandala or ring close-up)
  Step 4: Quality check (finished piece)
  Step 5: Wrapped with love (packaging)

[MATERIALS GUIDE]
  Section on each material:
  - Copper wire: color, properties, care
  - Brass: color, durability, origin
  - Mixed metals: combinations

[BEHIND THE SCENES GALLERY]
  Masonry grid of process images
  Caption overlays

[VIDEO SECTION]
  "Watch it come to life" — embedded making-of video
```

### 8.7 Wall of Love Page `/reviews`

```
[HEADER]
  "What Our Community Says 💛"

[STATS BAR]
  Average Rating: ★★★★★ | X reviews | X happy customers

[REVIEWS GRID]
  3-column masonry grid of all review cards
  Each card: quote icon, review text, stars (if rated), reviewer name, 
             platform badge (WhatsApp / Instagram), review image (if any),
             linked product (if any)

[REVIEW IMAGE GALLERY]
  "Spotted in the wild 📸"
  Grid of review_images (photos customers sent)
```

### 8.8 Care Guide Page `/care-guide`

```
[HEADER]
  "Caring for Your Jupiter Piece"
  "Handmade jewelry deserves handmade love"

[MATERIAL SECTIONS]
  For each material (Wire / Brass / Copper / Mixed):
  - Daily care tips
  - Cleaning instructions
  - Storage tips
  - What to avoid

[DO'S AND DON'TS]
  Visual checklist format

[FAQ]
  "Will my copper ring turn my finger green?"
  "Can I wear it in water?"
  "How do I restore shine?"
```

### 8.9 Contact Page `/contact`

```
[HEADER]
  "Let's Talk ✨"

[CONTACT OPTIONS]
  Large WhatsApp button: "Chat with us on WhatsApp →"
    wa.me link with pre-filled "Hi Jupiter, I have a question..."
  Instagram: "DM us @jupiterrrr_11"
  "We typically respond within 2–3 hours"

[FAQ PREVIEW]
  3 most common questions with accordion answers

[LOCATION]
  "Proudly made in Nepal 🇳🇵"
  Map or illustrated Nepal icon (no precise address required)

[HOURS]
  "Available Mon–Sat, 10am–7pm NPT"
```

### 8.10 Wishlist Page `/wishlist`

```
[HEADER]
  "Your Saved Pieces ❤️"

[WISHLIST GRID]
  Same card style as shop page
  Each card has: Remove from wishlist (×), Order via WhatsApp, View Product

[EMPTY STATE]
  "Your wishlist is empty"
  Illustrated heart with "Start adding pieces you love ❤️"
  [Browse Shop] CTA

[SHARE WISHLIST]
  "Share your wishlist" button → copies URL like /wishlist?items=slug1,slug2,slug3
```

---

## 9. Component Hierarchy

```
app/
├── layout.tsx (Root: fonts, providers, Clerk)
│
├── (public)/layout.tsx
│   ├── components/layout/
│   │   ├── Navbar.tsx
│   │   │   ├── NavLogo.tsx
│   │   │   ├── NavLinks.tsx
│   │   │   ├── CollectionsDropdown.tsx
│   │   │   ├── SearchButton.tsx
│   │   │   └── WishlistButton.tsx
│   │   ├── Footer.tsx
│   │
│   ├── components/ui/
│   │   ├── Button.tsx (variants: primary, secondary, ghost, whatsapp)
│   │   ├── Badge.tsx (variants: new, bestseller, customizable, out-of-stock)
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   ├── Modal.tsx
│   │   ├── Drawer.tsx (mobile filter sidebar)
│   │   ├── Skeleton.tsx
│   │   ├── StarRating.tsx
│   │   ├── ShareButton.tsx
│   │   └── ScrollMarquee.tsx
│   │
│   ├── components/home/
│   │   ├── Hero.tsx
│   │   ├── CategoryGrid.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── BrandStoryStrip.tsx
│   │   ├── NewArrivals.tsx
│   │   ├── HowToOrder.tsx
│   │   ├── ReviewsPreview.tsx
│   │   └── InstagramFeed.tsx
│   │
│   ├── components/shop/
│   │   ├── ProductGrid.tsx (masonry)
│   │   ├── ProductCard.tsx
│   │   ├── ProductCardSkeleton.tsx
│   │   ├── FilterSidebar.tsx
│   │   ├── FilterBar.tsx (category pills + sort)
│   │   ├── SearchOverlay.tsx
│   │   └── InfiniteScroll.tsx
│   │
│   ├── components/product/
│   │   ├── ProductImageGallery.tsx
│   │   ├── ProductInfo.tsx
│   │   ├── ProductDetails.tsx (table)
│   │   ├── WhatsAppOrderButton.tsx
│   │   ├── WishlistButton.tsx
│   │   ├── ProductReviews.tsx
│   │   └── RelatedProducts.tsx
│   │
│   ├── components/reviews/
│   │   ├── ReviewCard.tsx
│   │   └── ReviewsGrid.tsx
│   │
│   └── components/motion/
│       ├── FadeInOnScroll.tsx
│       ├── SlideIn.tsx
│       ├── SpiralMotif.tsx (SVG animated spiral)
│       └── CounterAnimation.tsx
│
└── (admin)/layout.tsx
    └── components/admin/
        ├── AdminSidebar.tsx
        ├── AdminHeader.tsx
        ├── ProductForm.tsx
        ├── ImageUploader.tsx (Cloudinary widget)
        ├── RichTextEditor.tsx (Tiptap)
        ├── DataTable.tsx
        ├── ReviewForm.tsx
        └── SettingsForm.tsx
```

---

## 10. Folder Structure

```
jupiter/
├── .env.local                    # Never commit — see Section 20
├── .env.example                  # Template — commit this
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── middleware.ts                 # Clerk auth protection
├── package.json
│
├── public/
│   ├── logo.svg
│   ├── logo-light.svg
│   ├── favicon.ico
│   ├── og-image.jpg             # Open Graph default image
│   └── textures/
│       ├── paper-texture.png
│       └── linen-texture.png
│
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout — fonts, providers
│   │   ├── globals.css          # Tailwind + CSS custom properties
│   │   ├── not-found.tsx
│   │   ├── error.tsx            # Production error boundary
│   │   ├── global-error.tsx     # Catch-all root error boundary
│   │   │
│   │   ├── sign-up/
│   │   │   └── [[...sign-up]]/
│   │   │       └── page.tsx     # Clerk Sign-up route
│   │   │
│   │   ├── (public)/            # Route group — public pages
│   │   │   ├── layout.tsx       # Navbar + Footer
│   │   │   ├── page.tsx         # Home /
│   │   │   ├── shop/
│   │   │   │   ├── page.tsx     # /shop
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx # /shop/[slug]
│   │   │   ├── collections/
│   │   │   │   └── [category]/
│   │   │   │       └── page.tsx # /collections/[category]
│   │   │   ├── custom/
│   │   │   │   └── page.tsx
│   │   │   ├── our-story/
│   │   │   │   └── page.tsx
│   │   │   ├── the-craft/
│   │   │   │   └── page.tsx
│   │   │   ├── reviews/
│   │   │   │   └── page.tsx
│   │   │   ├── care-guide/
│   │   │   │   └── page.tsx
│   │   │   ├── faq/
│   │   │   │   └── page.tsx
│   │   │   ├── gift-guide/
│   │   │   │   └── page.tsx
│   │   │   ├── made-in-nepal/
│   │   │   │   └── page.tsx
│   │   │   ├── wishlist/
│   │   │   │   └── page.tsx     # Client component (localStorage)
│   │   │   └── contact/
│   │   │       └── page.tsx
│   │   │
│   │   └── admin/               # Protected route group
│   │       ├── layout.tsx       # Admin sidebar + header
│   │       ├── sign-in/
│   │       │   └── [[...sign-in]]/
│   │       │       └── page.tsx # Clerk Sign-in route
│   │       ├── dashboard/
│   │       │   └── page.tsx
│   │       ├── products/
│   │       │   ├── page.tsx
│   │       │   ├── new/
│   │       │   │   └── page.tsx
│   │       │   └── [id]/
│   │       │       └── edit/
│   │       │           └── page.tsx
│   │       ├── categories/
│   │       │   └── page.tsx
│   │       ├── reviews/
│   │       │   └── page.tsx
│   │       ├── custom-orders/
│   │       │   └── page.tsx
│   │       └── settings/
│   │           └── page.tsx
│   │
│   ├── components/              # All reusable components (see Section 9)
│   │   ├── layout/
│   │   ├── ui/
│   │   ├── home/
│   │   ├── shop/
│   │   ├── product/
│   │   ├── reviews/
│   │   ├── motion/
│   │   └── admin/
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts        # Browser client
│   │   │   ├── server.ts        # Server client (SSR)
│   │   │   └── admin.ts         # Service role client (server actions only)
│   │   ├── cloudinary.ts        # Cloudinary config + helpers
│   │   ├── whatsapp.ts          # generateWhatsAppURL utility
│   │   ├── wishlist.ts          # localStorage wishlist helpers
│   │   └── utils.ts             # cn(), formatPrice(), generateSlug()
│   │
│   ├── actions/                 # Next.js Server Actions
│   │   ├── products.ts
│   │   ├── categories.ts
│   │   ├── reviews.ts
│   │   ├── custom-orders.ts
│   │   └── settings.ts
│   │
│   ├── hooks/
│   │   ├── useWishlist.ts       # Wishlist CRUD hooks
│   │   ├── useSearch.ts         # Search debounce hook
│   │   └── useInfiniteScroll.ts
│   │
│   ├── types/
│   │   ├── product.ts
│   │   ├── category.ts
│   │   ├── review.ts
│   │   └── supabase.ts          # Auto-generated Supabase types
│   │
│   └── config/
│       ├── categories.ts        # Static category config (slugs, icons, descriptions)
│       └── site.ts              # Site-wide constants
```

---

## 11. API Design (Server Actions)

> Using Next.js 15 Server Actions for all data mutations. No separate API routes needed except for Cloudinary upload signatures.
> **Security Note:** All mutations that modify the database are protected by a `requireAdmin()` helper located in `src/actions/shared.ts` to strictly enforce the `ADMIN_EMAIL` requirement on the server side.

### 11.1 Product Actions (`actions/products.ts`)

```typescript
// Fetch all published products (with optional filters)
export async function getProducts(params: {
  category?: string;
  search?: string;
  sort?: 'newest' | 'featured' | 'price_asc' | 'price_desc' | 'alpha';
  page?: number;
  limit?: number;
  stock_status?: string;
  is_customizable?: boolean;
}): Promise<{ products: Product[]; total: number }>

// Fetch single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null>

// Fetch featured products (for homepage)
export async function getFeaturedProducts(limit?: number): Promise<Product[]>

// Fetch new arrivals
export async function getNewArrivals(limit?: number): Promise<Product[]>

// Fetch related products (same category, excluding current)
export async function getRelatedProducts(productId: string, categoryId: string, limit?: number): Promise<Product[]>

// Admin: Create product
export async function createProduct(data: ProductFormData): Promise<{ success: boolean; product?: Product; error?: string }>

// Admin: Update product
export async function updateProduct(id: string, data: Partial<ProductFormData>): Promise<{ success: boolean; error?: string }>

// Admin: Delete product (soft delete by setting is_published = false, or hard delete)
export async function deleteProduct(id: string): Promise<{ success: boolean; error?: string }>

// Admin: Toggle product published state
export async function toggleProductPublished(id: string, published: boolean): Promise<{ success: boolean }>

// Admin: Duplicate product
export async function duplicateProduct(id: string): Promise<{ success: boolean; newProductId?: string }>
```

### 11.2 Category Actions (`actions/categories.ts`)

```typescript
export async function getCategories(): Promise<Category[]>
export async function getCategoryBySlug(slug: string): Promise<Category | null>
export async function createCategory(data: CategoryFormData): Promise<{ success: boolean }>
export async function updateCategory(id: string, data: Partial<CategoryFormData>): Promise<{ success: boolean }>
export async function deleteCategory(id: string): Promise<{ success: boolean }>
export async function reorderCategories(orderedIds: string[]): Promise<{ success: boolean }>
```

### 11.3 Review Actions (`actions/reviews.ts`)

```typescript
export async function getAllReviews(): Promise<Review[]>
export async function getFeaturedReviews(limit?: number): Promise<Review[]>
export async function getProductReviews(productId: string): Promise<Review[]>
export async function createReview(data: ReviewFormData): Promise<{ success: boolean }>
export async function updateReview(id: string, data: Partial<ReviewFormData>): Promise<{ success: boolean }>
export async function deleteReview(id: string): Promise<{ success: boolean }>
export async function toggleReviewFeatured(id: string): Promise<{ success: boolean }>
```

### 11.4 Settings Actions (`actions/settings.ts`)

```typescript
export async function getSiteSettings(): Promise<Record<string, unknown>>
export async function updateSiteSetting(key: string, value: unknown): Promise<{ success: boolean }>
```

### 11.5 Cloudinary Upload API (`app/api/cloudinary-sign/route.ts`)

```typescript
// POST /api/cloudinary-sign
// Returns signed upload parameters for client-side direct upload
// Admin-only endpoint (check Clerk session)
export async function POST(req: Request) {
  // Verify admin session via Clerk
  // Generate Cloudinary upload signature
  // Return: { signature, timestamp, cloudName, apiKey, folder }
}
```

---

## 12. WhatsApp Integration

### 12.1 Base URL Format

```
https://wa.me/{PHONE_NUMBER}?text={ENCODED_MESSAGE}
```

Where:
- `{PHONE_NUMBER}` = `977XXXXXXXXXX` (Nepal country code, no `+`)
- `{ENCODED_MESSAGE}` = `encodeURIComponent(messageString)`

### 12.2 Order Button Behavior

```typescript
// WhatsAppOrderButton.tsx
'use client';

import { generateWhatsAppURL } from '@/lib/whatsapp';

export function WhatsAppOrderButton({ product }: { product: Product }) {
  const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/shop/${product.slug}`;
  const whatsappUrl = generateWhatsAppURL(product, productUrl);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-whatsapp"
      onClick={() => {
        // Track in GA4
        gtag('event', 'whatsapp_order_click', {
          product_id: product.id,
          product_name: product.name,
          product_category: product.category?.name,
        });
      }}
    >
      <WhatsAppIcon />
      Order via WhatsApp
    </a>
  );
}
```

### 12.3 Floating WhatsApp Button

A persistent floating button appears on all public pages (bottom-right):

```typescript
// FloatingWhatsApp.tsx
// Links to: https://wa.me/977XXXXXXXXXX?text=Hi%20Jupiter!%20I%27d%20like%20to%20know%20more%20%F0%9F%AA%90
// Tooltip on hover: "Chat with us"
// Animates in after 3 seconds on page load
// Hides when footer is visible (IntersectionObserver)
```

---

## 13. Cloudinary Integration

### 13.1 Setup

```typescript
// lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };
```

### 13.2 Folder Structure in Cloudinary

```
jupiter/
├── products/         # Product images
├── reviews/          # Review images (reviewer + product photos)
├── categories/       # Category cover images
└── assets/           # Brand assets, craft process images
```

### 13.3 Image Transformations

```typescript
// Auto-optimize: WebP, quality auto, responsive sizes
const getOptimizedImageUrl = (publicId: string, width: number) =>
  cloudinary.url(publicId, {
    format: 'webp',
    quality: 'auto',
    width,
    crop: 'fill',
    fetch_format: 'auto',
  });

// Sizes used:
// Thumbnail: 200px
// Product card: 400px
// Product detail: 800px
// Hero: 1200px
// OG image: 1200×630px
```

### 13.4 Video Support

Cloudinary handles video encoding automatically. Upload MP4/MOV → serve optimized MP4 + WebM.

---

## 14. SEO Strategy

### 14.1 Metadata (Next.js Metadata API)

```typescript
// app/(public)/shop/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: product.meta_title ?? `${product.name} | Jupiter — Handmade in Nepal`,
    description: product.meta_description ?? product.description?.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160),
      images: [{ url: product.images?.[0] ?? '/og-image.jpg', width: 1200, height: 630 }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      images: [product.images?.[0] ?? '/og-image.jpg'],
    },
  };
}
```

### 14.2 Schema.org Structured Data

**Product pages:**
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[Product Name]",
  "description": "[Description]",
  "image": ["[Image URLs]"],
  "brand": {
    "@type": "Brand",
    "name": "Jupiter"
  },
  "offers": {
    "@type": "Offer",
    "price": "[Price]",
    "priceCurrency": "NPR",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "Jupiter"
    }
  }
}
```

**Organization (site-wide):**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Jupiter",
  "url": "https://jupiterhandmade.com",
  "logo": "https://jupiterhandmade.com/logo.svg",
  "sameAs": ["https://www.instagram.com/jupiterrrr_11/"],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": ["English", "Nepali"]
  }
}
```

### 14.3 Sitemap

Auto-generated via `app/sitemap.ts`:

```typescript
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProductSlugs();
  const categories = await getAllCategorySlugs();
  
  const productUrls = products.map(slug => ({
    url: `${BASE_URL}/shop/${slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  
  const categoryUrls = categories.map(slug => ({
    url: `${BASE_URL}/collections/${slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  
  return [
    { url: BASE_URL, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/shop`, changeFrequency: 'daily', priority: 0.9 },
    ...productUrls,
    ...categoryUrls,
    { url: `${BASE_URL}/our-story`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/custom`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/the-craft`, changeFrequency: 'monthly', priority: 0.5 },
  ];
}
```

### 14.4 Target Keywords

| Keyword | Target Page |
|---|---|
| handmade jewelry Nepal | Home, Our Story |
| wire wrapped ring Nepal | /collections/wire-jewelry |
| mandala art handmade | /collections/mandala-art |
| custom handmade gifts Nepal | /custom |
| copper ring Nepal | /collections/rings |
| moon lamp handmade | /collections/moon-lamps |
| how to care for wire jewelry | /care-guide |
| unique gifts Nepal | /gift-guide |
| made in Nepal jewelry | /made-in-nepal |

### 14.5 robots.txt

```
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://jupiterhandmade.com/sitemap.xml
```

---

## 15. Security

### 15.1 Authentication Security

- Clerk handles all authentication complexity
- Admin routes protected at middleware level
- Session tokens are httpOnly cookies (handled by Clerk)
- No JWT stored in localStorage

### 15.2 Database Security

- Row Level Security (RLS) enabled on all tables
- Public users: read-only access to published content
- All write operations from admin use Supabase service role key
- Service role key only used in Server Actions (never exposed to client)
- Input validation with Zod before all database writes

```typescript
// lib/validations/product.ts
import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().min(1).max(200),
  price: z.number().positive().optional(),
  description: z.string().optional(),
  material: z.string().max(200).optional(),
  sku: z.string().max(50).optional(),
  // ... etc
});
```

### 15.3 API Security

- Cloudinary upload signature generated server-side (never expose API secret client-side)
- Rate limiting on `/api/cloudinary-sign` (10 requests/minute per IP via Vercel Edge)
- All admin server actions verify Clerk session before executing

### 15.4 Content Security Policy

```typescript
// next.config.ts
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
];
```

### 15.5 Image Security

- All user-uploaded images go through Cloudinary (no direct file system access)
- File type validation: images only (JPEG, PNG, WebP, GIF) + video (MP4, MOV)
- Max file size: 10MB images, 100MB videos

---

## 16. Performance Optimizations

### 16.1 Next.js Optimizations

- **ISR (Incremental Static Regeneration):** Product pages revalidate every 60 seconds
- **Static Generation:** Category pages, Our Story, The Craft, FAQ — fully static
- **Streaming:** Homepage sections stream in using React Suspense
- **Image Optimization:** Next.js `<Image>` component for all images (lazy loading, srcset, WebP)
- **Font Optimization:** Google Fonts loaded via `next/font` (no layout shift)

```typescript
// Revalidation strategy
export const revalidate = 60; // ISR — revalidate every 60s

// On admin product update:
import { revalidatePath } from 'next/cache';
revalidatePath('/shop');
revalidatePath(`/shop/${product.slug}`);
revalidatePath('/');
```

### 16.2 Database Optimizations

- Indexed columns: slug, category_id, is_published, is_featured
- Supabase connection pooling via `@supabase/ssr`
- Paginated queries (never `SELECT *` all products)
- Full-text search via PostgreSQL `tsvector` (no external search service needed at this scale)

### 16.3 Image Optimizations

- Cloudinary auto-format (WebP/AVIF for modern browsers)
- Lazy loading all non-above-fold images
- Blurred placeholder while images load
- Product card images: 400px wide (2x for retina)
- Hero image: preloaded with `<link rel="preload">`

### 16.4 Animation Performance

- All Framer Motion animations use `transform` and `opacity` only (GPU-accelerated)
- `will-change: transform` only on actively animating elements
- `prefers-reduced-motion` media query respected

```typescript
// Motion wrapper
const motionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Disable animations for accessibility
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

### 16.5 Target Core Web Vitals

| Metric | Target |
|---|---|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID / INP (Interaction to Next Paint) | < 200ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| FCP (First Contentful Paint) | < 1.8s |

---

## 17. Analytics Setup

### 17.1 Google Analytics 4

```typescript
// Install: npm install @next/third-parties
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google';

<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
```

**Custom Events to Track:**
```typescript
// Track these via gtag('event', eventName, params)

'whatsapp_order_click'       // Product + category
'whatsapp_custom_order'      // Custom order form submit
'product_view'               // Product detail page view
'category_view'              // Category page view
'search_query'               // What users search for
'wishlist_add'               // Item added to wishlist
'wishlist_remove'            // Item removed
'filter_applied'             // Which filter + value
```

### 17.2 Microsoft Clarity

```html
<!-- Install via Clarity snippet in app/layout.tsx -->
<!-- Provides: heatmaps, session recordings, click tracking -->
<!-- Use to identify: rage clicks, scroll depth, dead clicks -->
```

Dashboard focus areas:
- Which product images get the most attention (heatmaps)
- Where users drop off on the order flow
- Mobile vs desktop scroll behavior

---

## 18. Future Scalability

The architecture is designed to accommodate these future features **without major refactoring:**

| Feature | What's Pre-built | Effort to Add |
|---|---|---|
| **Online Payments** | Product price field, order flow structure | Medium — add Khalti/eSewa integration |
| **Inventory Management** | `stock_status` field, `low_stock` status | Low — add quantity field + decrement logic |
| **Coupon/Discount Codes** | — | Medium — add coupons table + validation |
| **Delivery Tracking** | Order status structure in custom_order_requests | Medium — add orders table |
| **Multi-language (EN/NP)** | next-intl compatible routing | Medium — add i18n config |
| **India/Worldwide Shipping** | Shipping info component is static | Low — make shipping dynamic |
| **AI Gift Recommender** | Product tags/categories structured | Medium — add Claude API integration |
| **Multiple Sellers** | — | High — major schema change |
| **Blog** | Routes reserved, no schema needed (use Supabase) | Low |
| **WhatsApp Business API** | Current Click-to-Chat can upgrade | Medium |

---

## 19. Development Roadmap

### Phase 1 — Foundation (Week 1–2)

```
☐ Set up Next.js 15 project with TypeScript + Tailwind
☐ Configure Supabase project + run schema migrations
☐ Configure Clerk (admin auth)
☐ Configure Cloudinary account + folders
☐ Set up Vercel deployment + environment variables
☐ Set up Google Analytics + Clarity
☐ Build design system: colors, typography, base components (Button, Card, Badge)
☐ Build Layout: Navbar, Footer
```

### Phase 2 — Admin Dashboard (Week 2–3)

```
☐ Admin authentication flow (Clerk)
☐ Product CRUD (create, edit, delete, publish/draft)
☐ Cloudinary image uploader in admin
☐ Category management
☐ Review management (add, edit, feature, delete)
☐ Site settings panel (WhatsApp number, hero tagline, shipping info, etc.)
☐ Custom order requests viewer
```

### Phase 3 — Public Shop (Week 3–4)

```
☐ Home page (all sections)
☐ Shop page (masonry grid, filters, sort, search)
☐ Category collection pages
☐ Product detail page (full layout + WhatsApp button)
☐ Wishlist (localStorage implementation)
☐ Search overlay
☐ Floating WhatsApp button
```

### Phase 4 — Content Pages (Week 4–5)

```
☐ Our Story page
☐ Custom Orders page + WhatsApp form
☐ The Craft / Making Process page
☐ Wall of Love / Reviews page
☐ Care Guide page
☐ FAQ page
☐ Contact page
```

### Phase 5 — SEO & Polish (Week 5–6)

```
☐ Metadata for all pages
☐ Schema.org structured data
☐ Sitemap + robots.txt
☐ Open Graph images
☐ Framer Motion animations (all scroll-triggered reveals)
☐ Spiral SVG motifs in sections
☐ Mobile responsiveness audit (375px → 1440px)
☐ Performance audit (Lighthouse ≥ 90)
☐ Cross-browser testing
☐ Accessibility audit (WCAG 2.1 AA)
```

### Phase 6 — Launch & Growth Pages (Week 6–7)

```
☐ Wishlist page
☐ Gift Guide page
☐ Made in Nepal page
☐ Instagram feed embed
☐ Final content population (all products, categories, reviews)
☐ Domain setup + SSL
☐ Soft launch → share with select customers
☐ Public launch
```

### Phase 7 — Post-Launch (Ongoing)

```
☐ Monitor GA4 + Clarity for user behavior
☐ SEO: write Care Guide + Craft content for organic traffic
☐ Add Gift Guide seasonal updates
☐ Regular product additions via admin
☐ Collect customer photos for Wall of Love
☐ Performance monitoring
```

---

## 20. Environment Variables

### `.env.example` (commit this file)

```env
# ─── NEXT.JS ─────────────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=https://jupiterhandmade.com

# ─── SUPABASE ────────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key   # NEVER expose to client

# ─── CLOUDINARY ──────────────────────────────────────────────────
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret                      # NEVER expose to client

# ─── CLERK & AUTH ────────────────────────────────────────────────
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...                               # NEVER expose to client
ADMIN_EMAIL=your_admin_email@gmail.com                     # The ONLY email allowed to access /admin
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/admin/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/admin/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/admin/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin/dashboard

# ─── WHATSAPP ────────────────────────────────────────────────────
NEXT_PUBLIC_WHATSAPP_NUMBER=977XXXXXXXXXX                  # No +, no spaces

# ─── ANALYTICS ───────────────────────────────────────────────────
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
# Clarity is added via script tag in layout.tsx

# ─── INSTAGRAM ───────────────────────────────────────────────────
NEXT_PUBLIC_INSTAGRAM_HANDLE=jupiterrrr_11
```

---

## Quick Reference Card

| What | How |
|---|---|
| Run dev server | `npm run dev` |
| Deploy | Push to `main` → auto-deploys on Vercel |
| Add a product | `/admin/products/new` |
| Add a review | `/admin/reviews` → Add Review |
| Change WhatsApp number | `/admin/settings` |
| Refresh product cache | Auto-revalidates in 60s, or push an update in admin |
| Add a category | `/admin/categories` |
| Add custom order note | `/admin/custom-orders` |

---

*Document version 1.0 — Jupiter Website Specification*
*Prepared for development handoff. All placeholder values marked with `XXXXXXXXXX` must be replaced before deploymen