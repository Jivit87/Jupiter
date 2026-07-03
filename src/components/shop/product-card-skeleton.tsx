import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <div className="relative group animate-on-scroll">
      <div className="relative rounded-sm overflow-hidden aspect-[1/1.18] mb-4 border border-[#E5E7EB]">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      <Skeleton className="h-3 w-16 mb-1" />
      <Skeleton className="h-4 w-3/4 mb-1.5" />
      <div className="mt-1 flex items-center justify-between">
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}
