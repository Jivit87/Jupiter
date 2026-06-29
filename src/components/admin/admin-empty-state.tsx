import { Card } from '@/components/ui/card';

type AdminEmptyStateProps = {
  title: string;
  description: string;
};

export function AdminEmptyState({ title, description }: AdminEmptyStateProps) {
  return (
    <Card>
      <div className="p-6">
        <p className="font-heading text-2xl text-primary">{title}</p>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-text-muted">{description}</p>
      </div>
    </Card>
  );
}
