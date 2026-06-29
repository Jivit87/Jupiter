import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

type AdminTableShellProps = {
  columns: ReadonlyArray<string>;
  rows?: ReadonlyArray<ReactNode>;
  emptyState?: string;
};

export function AdminTableShell({ columns, rows, emptyState }: AdminTableShellProps) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-background/80">
            <tr>
              {columns.map((column) => (
                <th key={column} className="border-b border-border px-6 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-text-muted">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows?.length ? (
              rows
            ) : (
              <tr>
                <td className="px-6 py-10 text-sm leading-7 text-text-muted" colSpan={columns.length}>
                  {emptyState ?? 'This table shell is ready for future data.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
