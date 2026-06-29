import { z } from 'zod';

export const stockStatusSchema = z.enum(['in_stock', 'out_of_stock', 'made_to_order', 'low_stock']);

export const productSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(220),
  price: z.number().positive().optional(),
  categoryId: z.string().uuid().optional(),
  description: z.string().optional(),
  material: z.string().max(200).optional(),
  dimensions: z.string().max(120).optional(),
  weight: z.string().max(120).optional(),
  colors: z.array(z.string().min(1).max(60)).max(20).optional(),
  stockStatus: stockStatusSchema.optional(),
  images: z.array(z.string().url()).max(8).optional(),
  videoUrl: z.string().url().optional(),
  sku: z.string().max(50).optional(),
  handmadeTime: z.string().max(120).optional(),
  isCustomizable: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isNew: z.boolean().optional(),
  isBestseller: z.boolean().optional(),
  isPublished: z.boolean().optional(),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
