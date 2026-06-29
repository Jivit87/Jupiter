import type { Category, Product, ProductStockStatus, Review } from '@/types';
import type {
  CategoryRecord,
  ProductRecord,
  ReviewRecord,
  SiteSettingRecord,
  CustomOrderRequestRecord,
} from '@/types/database';

export function mapCategoryRecord(record: CategoryRecord): Category {
  return {
    id: record.id,
    name: record.name,
    slug: record.slug,
    description: record.description,
    imageUrl: record.image_url,
    sortOrder: record.sort_order,
    isActive: record.is_active,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  };
}

type ProductRecordWithCategory = ProductRecord & {
  categories?: { id: string; name: string; slug: string } | null;
};

export function mapProductRecord(record: ProductRecordWithCategory): Product {
  return {
    id: record.id,
    name: record.name,
    slug: record.slug,
    price: record.price,
    categoryId: record.category_id,
    category: record.categories ?? null,
    description: record.description,
    material: record.material,
    dimensions: record.dimensions,
    weight: record.weight,
    colors: record.colors,
    stockStatus: record.stock_status as ProductStockStatus,
    images: record.images,
    videoUrl: record.video_url,
    sku: record.sku,
    handmadeTime: record.handmade_time,
    isCustomizable: record.is_customizable,
    isFeatured: record.is_featured,
    isNew: record.is_new,
    isBestseller: record.is_bestseller,
    isPublished: record.is_published,
    metaTitle: record.meta_title,
    metaDescription: record.meta_description,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  };
}

export function mapReviewRecord(record: ReviewRecord): Review {
  return {
    id: record.id,
    reviewerName: record.reviewer_name,
    reviewText: record.review_text,
    rating: record.rating,
    productId: record.product_id,
    reviewerImage: record.reviewer_image,
    reviewImage: record.review_image,
    platform: record.platform,
    isFeatured: record.is_featured,
    reviewDate: record.review_date,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  };
}

export function mapSiteSettingRecord(record: SiteSettingRecord) {
  return {
    key: record.key,
    value: record.value,
    updatedAt: record.updated_at,
  };
}

export function mapCustomOrderRecord(record: CustomOrderRequestRecord) {
  return {
    id: record.id,
    description: record.description,
    occasion: record.occasion,
    forWhom: record.for_whom,
    budgetRange: record.budget_range,
    deadline: record.deadline,
    materials: record.materials,
    referenceUrl: record.reference_url,
    customerName: record.customer_name,
    customerPhone: record.customer_phone,
    status: record.status,
    adminNotes: record.admin_notes,
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  };
}
