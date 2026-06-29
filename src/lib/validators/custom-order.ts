import { z } from 'zod';

export const customOrderSchema = z.object({
  description: z.string().min(1).max(2000),
  occasion: z.string().max(120).optional(),
  forWhom: z.string().max(120).optional(),
  budgetRange: z.string().max(120).optional(),
  deadline: z.string().date().optional(),
  materials: z.array(z.string().min(1).max(60)).max(10).optional(),
  referenceUrl: z.string().url().optional(),
  customerName: z.string().max(120).optional(),
  customerPhone: z.string().max(30).optional(),
});

export type CustomOrderInput = z.infer<typeof customOrderSchema>;
