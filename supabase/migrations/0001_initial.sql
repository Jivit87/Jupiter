create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

create table if not exists categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  sort_order integer default 0 not null,
  is_active boolean default true not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create table if not exists products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  description text,
  price numeric(10, 2),
  category_id uuid references categories(id) on delete set null,
  material text,
  dimensions text,
  weight text,
  colors text[],
  stock_status text default 'in_stock' not null check (stock_status in ('in_stock', 'out_of_stock', 'made_to_order', 'low_stock')),
  images text[],
  video_url text,
  sku text unique,
  handmade_time text,
  is_customizable boolean default false not null,
  is_featured boolean default false not null,
  is_new boolean default false not null,
  is_bestseller boolean default false not null,
  is_published boolean default true not null,
  meta_title text,
  meta_description text,
  search_vector tsvector,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index if not exists products_search_idx on products using gin (search_vector);
create index if not exists products_category_idx on products (category_id);
create index if not exists products_slug_idx on products (slug);
create index if not exists products_featured_idx on products (is_featured) where is_featured = true;
create index if not exists products_published_idx on products (is_published) where is_published = true;

create table if not exists reviews (
  id uuid default uuid_generate_v4() primary key,
  reviewer_name text not null,
  review_text text not null,
  rating integer check (rating between 1 and 5),
  product_id uuid references products(id) on delete set null,
  reviewer_image text,
  review_image text,
  platform text default 'whatsapp' not null check (platform in ('whatsapp', 'instagram', 'in_person', 'other')),
  is_featured boolean default false not null,
  review_date date,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create index if not exists reviews_product_idx on reviews (product_id);
create index if not exists reviews_featured_idx on reviews (is_featured) where is_featured = true;

create table if not exists custom_order_requests (
  id uuid default uuid_generate_v4() primary key,
  description text not null,
  occasion text,
  for_whom text,
  budget_range text,
  deadline date,
  materials text[],
  reference_url text,
  customer_name text,
  customer_phone text,
  status text default 'pending' not null check (status in ('pending', 'in_progress', 'completed', 'declined')),
  admin_notes text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now() not null
);

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace function update_product_search_vector()
returns trigger as $$
begin
  new.search_vector :=
    to_tsvector('english', coalesce(new.name, '')) ||
    to_tsvector('english', coalesce(new.description, '')) ||
    to_tsvector('english', coalesce(new.material, ''));
  return new;
end;
$$ language plpgsql;

drop trigger if exists categories_updated_at on categories;
create trigger categories_updated_at
before update on categories
for each row execute function update_updated_at();

drop trigger if exists products_updated_at on products;
create trigger products_updated_at
before update on products
for each row execute function update_updated_at();

drop trigger if exists products_search_vector_update on products;
create trigger products_search_vector_update
before insert or update on products
for each row execute function update_product_search_vector();

drop trigger if exists reviews_updated_at on reviews;
create trigger reviews_updated_at
before update on reviews
for each row execute function update_updated_at();

drop trigger if exists custom_order_requests_updated_at on custom_order_requests;
create trigger custom_order_requests_updated_at
before update on custom_order_requests
for each row execute function update_updated_at();

alter table categories enable row level security;
alter table products enable row level security;
alter table reviews enable row level security;
alter table custom_order_requests enable row level security;
alter table site_settings enable row level security;

drop policy if exists "Public can read active categories" on categories;
create policy "Public can read active categories"
  on categories for select using (is_active = true);

drop policy if exists "Public can read published products" on products;
create policy "Public can read published products"
  on products for select using (is_published = true);

drop policy if exists "Public can read reviews" on reviews;
create policy "Public can read reviews"
  on reviews for select using (true);

drop policy if exists "Public can insert custom order requests" on custom_order_requests;
create policy "Public can insert custom order requests"
  on custom_order_requests for insert with check (true);

drop policy if exists "Public can read site settings" on site_settings;
create policy "Public can read site settings"
  on site_settings for select using (true);
