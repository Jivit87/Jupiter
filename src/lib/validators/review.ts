import { z } from 'zod';

export const reviewSchema = z.object({
  reviewerName: z.string().min(1).max(120),
  reviewText: z.string().min(1).max(2000),
  rating: z.number().int().min(1).max(5).optional(),
  productId: z.string().uuid().optional(),
  reviewerImage: z.string().url().optional(),
  location: z.string().max(120).optional(),
  instagramUrl: z.string().url().optional(),
  isFeatured: z.boolean().optional(),
  reviewDate: z.string().date().optional(),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
