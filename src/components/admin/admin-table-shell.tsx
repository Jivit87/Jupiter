import type { ReactNode } from 'react';

type AdminTableShellProps = {
  columns: ReadonlyArray<string>;
  rows?: ReadonlyArray<ReactNode>;
  emptyState?: string;
};

export function AdminTableShell({ columns, rows, emptyState }: AdminTableShellProps) {
  return (
    <div className="rounded-md border border-[#E5E7EB] bg-white overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-5 py-3 font-medium text-[#6B7280]">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {rows?.length ? (
              rows
            ) : (
              <tr>
                <td className="px-5 py-10 text-center text-sm text-[#9CA3AF]" colSpan={columns.length}>
                  {emptyState ?? 'No data available.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
