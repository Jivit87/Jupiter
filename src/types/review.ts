export type ReviewPlatform = 'whatsapp' | 'instagram' | 'in_person' | 'other';

export type Review = {
  id: string;
  reviewerName: string;
  reviewText: string;
  rating?: number | null;
  productId?: string | null;
  reviewerImage?: string | null;
  location?: string | null;
  instagramUrl?: string | null;
  platform?: ReviewPlatform | null;
  isFeatured?: boolean | null;
  reviewDate?: string | null;
  createdAt?: string;
  updatedAt?: string;
};
