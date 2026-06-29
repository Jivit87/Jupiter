import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AdminPageFrame } from '@/components/admin/admin-page-frame';
import { AdminReviewForm } from '@/components/admin/review-form';
import { getAdminReviewById } from '@/actions/reviews';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const review = await getAdminReviewById(id);
  return { title: review ? `Edit Review: ${review.reviewerName} | Jupiter Admin` : 'Edit Review | Jupiter Admin' };
}

export default async function EditReviewPage({ params }: Props) {
  const { id } = await params;
  const review = await getAdminReviewById(id);
  if (!review) notFound();

  return (
    <AdminPageFrame eyebrow="Reviews" title={`Edit review: ${review.reviewerName}`} description="Update the review below.">
      <AdminReviewForm review={review} />
    </AdminPageFrame>
  );
}
