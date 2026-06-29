import { Card } from '@/components/ui/card';

type SummaryItem = {
  label: string;
  value: string;
  note?: string;
};

type AdminSummaryGridProps = {
  items: ReadonlyArray<SummaryItem>;
};

export function AdminSummaryGrid({ items }: AdminSummaryGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label}>
          <div className="p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted">{item.label}</p>
            <p className="mt-4 font-heading text-4xl text-primary">{item.value}</p>
            {item.note ? <p className="mt-2 text-sm leading-6 text-text-muted">{item.note}</p> : null}
          </div>
        </Card>
      ))}
    </div>
  );
}
