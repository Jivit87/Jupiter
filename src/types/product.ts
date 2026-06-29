export type ProductStockStatus = 'in_stock' | 'out_of_stock' | 'made_to_order' | 'low_stock';

export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
};

export type ProductColor = string;

export type Product = {
  id: string;
  name: string;
  slug: string;
  price?: number | null;
  categoryId?: string | null;
  category?: ProductCategory | null;
  description?: string | null;
  material?: string | null;
  dimensions?: string | null;
  weight?: string | null;
  colors?: ProductColor[] | null;
  stockStatus?: ProductStockStatus | null;
  images?: string[] | null;
  videoUrl?: string | null;
  sku?: string | null;
  handmadeTime?: string | null;
  isCustomizable?: boolean | null;
  isFeatured?: boolean | null;
  isNew?: boolean | null;
  isBestseller?: boolean | null;
  isPublished?: boolean | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductSummary = Pick<Product, 'id' | 'name' | 'slug' | 'price' | 'images' | 'isFeatured' | 'isNew'>;
