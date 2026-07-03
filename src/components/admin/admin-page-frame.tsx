import type { ReactNode } from 'react';

type AdminPageFrameProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function AdminPageFrame({ eyebrow, title, description, children }: AdminPageFrameProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-[#6B7280] mb-1">{eyebrow}</p>
        <h1 className="text-2xl font-bold text-black">{title}</h1>
        <p className="mt-2 text-sm text-[#6B7280]">{description}</p>
      </div>
      
      <div className="rounded-md border border-[#E5E7EB] bg-[#F9FAFB] p-5 shadow-sm">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-[#9CA3AF]">
          Admin Shell
        </p>
        <div className="mt-2 text-sm text-[#6B7280]">
          Manage products, categories, reviews, custom orders, and site content from this dashboard.
        </div>
      </div>
      
      <div>
        {children}
      </div>
    </div>
  );
}
