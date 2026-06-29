import { Card } from '@/components/ui/card';
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
    <Card className={cn(className)}>
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted">Details</p>
            <h2 className="mt-2 font-heading text-3xl text-primary">Product specification shell</h2>
          </div>
          <dl className="rounded-2xl border border-border bg-background px-5">
            {details.map((detail) => (
              <div key={detail.label} className="flex items-start justify-between gap-4 border-b border-border py-3 last:border-b-0">
                <dt className="text-sm font-medium text-primary">{detail.label}</dt>
                <dd className="text-right text-sm text-text-muted">{detail.value ?? '—'}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Card>
  );
}
