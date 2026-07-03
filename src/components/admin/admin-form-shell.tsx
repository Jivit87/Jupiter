import type { ReactNode } from 'react';

type AdminFormShellProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function AdminFormShell({ title, description, children }: AdminFormShellProps) {
  return (
    <div className="rounded-md border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <div className="space-y-6">
        <div className="border-b border-[#E5E7EB] pb-4">
          <p className="text-sm font-medium text-[#6B7280] mb-1">Form</p>
          <h3 className="font-display text-3xl font-bold text-black">{title}</h3>
          <p className="mt-2 text-sm text-[#6B7280] max-w-2xl">{description}</p>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
