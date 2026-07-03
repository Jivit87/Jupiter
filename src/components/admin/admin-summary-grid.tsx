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
        <div key={item.label} className="rounded-md border border-[#E5E7EB] bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-[#6B7280]">{item.label}</p>
          <p className="mt-2 font-display text-4xl font-bold text-black">{item.value}</p>
          {item.note ? <p className="mt-2 text-[13px] text-[#9CA3AF]">{item.note}</p> : null}
        </div>
      ))}
    </div>
  );
}
