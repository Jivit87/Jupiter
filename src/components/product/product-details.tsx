import { cn } from '@/lib/utils';

type DetailRow = {
  label: string;
  value?: string | null;
};

type ProductDetailsProps = {
  details: ReadonlyArray<DetailRow>;
  className?: string;
};

export function ProductDetails({ details, className }: ProductDetailsProps) {
  return (
    <div className={cn('border-t border-[#E5E7EB] pt-12', className)}>
      <div className="space-y-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#4B5563]">Details</p>
          <h2 className="mt-2 font-heading text-3xl text-black">Product specification</h2>
        </div>
        <dl className="rounded-sm border border-[#E5E7EB] bg-[#F9FAFB] px-5">
          {details.map((detail) => (
            <div key={detail.label} className="flex items-start justify-between gap-4 border-b border-[#E5E7EB] py-3 last:border-b-0">
              <dt className="text-sm font-medium text-black">{detail.label}</dt>
              <dd className="text-right text-sm text-[#4B5563]">{detail.value ?? '—'}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
