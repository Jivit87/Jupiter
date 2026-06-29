insert into categories (name, slug, description, sort_order, is_active)
values
  ('Wire Jewelry', 'wire-jewelry', 'Rings, earrings, pendants, and bracelets shaped from wire.', 0, true),
  ('Brass & Copper Rings', 'rings', 'Statement rings in brass and copper.', 1, true),
  ('Mandala Art', 'mandala-art', 'Hand-drawn mandala framed art.', 2, true),
  ('Moon Lamps', 'moon-lamps', '3D printed moon-textured lamps.', 3, true),
  ('Dried Bouquets', 'dried-bouquets', 'Everlasting dried flower arrangements.', 4, true),
  ('Customized Gifts', 'custom-gifts', 'Personalized, made-to-order gifts.', 5, true),
  ('Home Décor', 'home-decor', 'Decorative items for living spaces.', 6, true),
  ('Keychains & Accessories', 'keychains', 'Small handmade accessories and keepsakes.', 7, true)
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  updated_at = now();

insert into site_settings (key, value)
values
  ('whatsapp_number', '"977XXXXXXXXXX"'),
  ('instagram_handle', '"jupiterrrr_11"'),
  ('hero_tagline', '"Handcrafted with cosmic intention"'),
  ('featured_section_title', '"Pieces Made with Magic"'),
  ('shipping_info', '"Shipping within Nepal only. Kathmandu Valley: 1–2 days. Outside Valley: 3–7 days."'),
  ('announcement_bar', '"✨ Free shipping on orders above NPR 1500 within Kathmandu Valley"'),
  ('announcement_bar_active', 'true')
on conflict (key) do update
set
  value = excluded.value,
  updated_at = now();
