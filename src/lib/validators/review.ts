import { z } from 'zod';

export const reviewSchema = z.object({
  reviewerName: z.string().min(1).max(120),
  reviewText: z.string().min(1).max(2000),
  rating: z.number().int().min(1).max(5).optional(),
  productId: z.string().uuid().optional(),
  reviewerImage: z.string().url().optional(),
  reviewImage: z.string().url().optional(),
  platform: z.enum(['whatsapp', 'instagram', 'in_person', 'other']).optional(),
  isFeatured: z.boolean().optional(),
  reviewDate: z.string().date().optional(),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
