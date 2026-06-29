import { Card } from '@/components/ui/card';

type DetailRowProps = {
  label: string;
  value: string;
};

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border py-3 last:border-b-0">
      <dt className="text-sm font-medium text-primary">{label}</dt>
      <dd className="text-right text-sm text-text-muted">{value}</dd>
    </div>
  );
}

export function ProductDetailShell() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <Card className="overflow-hidden">
        <div className="min-h-[32rem] bg-earthy-cosmos" />
        <div className="border-t border-border p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted">
            Gallery and media slot
          </p>
        </div>
      </Card>

      <Card>
        <div className="space-y-6 p-6">
          <div className="space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted">
              Product detail shell
            </p>
            <h1 className="font-display text-4xl text-primary">Product name goes here</h1>
            <p className="text-sm leading-7 text-text-muted">
              The future product record will drive this layout with price, category, description, badges,
              images, and WhatsApp CTA.
            </p>
          </div>

          <div>
            <p className="mb-3 font-heading text-2xl text-primary">Details</p>
            <dl className="rounded-2xl border border-border bg-background px-5">
              <DetailRow label="Material" value="Copper wire, brass" />
              <DetailRow label="Dimensions" value="5cm × 3cm" />
              <DetailRow label="Weight" value="12g" />
              <DetailRow label="SKU" value="JUP-0001" />
              <DetailRow label="Handmade time" value="3–5 days" />
            </dl>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">Primary CTA</p>
              <p className="mt-2 text-sm text-text-muted">WhatsApp order integration will land later.</p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">Secondary CTA</p>
              <p className="mt-2 text-sm text-text-muted">Wishlist and share actions can attach here later.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
