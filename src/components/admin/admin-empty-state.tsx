type AdminEmptyStateProps = {
  title: string;
  description: string;
};

export function AdminEmptyState({ title, description }: AdminEmptyStateProps) {
  return (
    <div className="rounded-md border border-[#E5E7EB] bg-[#F9FAFB] p-8 text-center shadow-sm">
      <p className="font-display text-2xl font-semibold text-black">{title}</p>
      <p className="mt-2 text-sm text-[#6B7280] mx-auto max-w-md">{description}</p>
    </div>
  );
}
