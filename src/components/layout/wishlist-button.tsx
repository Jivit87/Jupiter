import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type WishlistButtonProps = {
  count?: number;
  className?: string;
};

export function WishlistButton({ count = 0, className }: WishlistButtonProps) {
  return (
    <Button asChild variant="ghost" size="sm" className={cn('relative', className)}>
      <Link href="/wishlist" aria-label={`Wishlist${count > 0 ? `, ${count} saved items` : ''}`}>
        <span aria-hidden className="text-base leading-none">
          ♡
        </span>
        <span>Wishlist</span>
        {count > 0 ? (
          <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5 text-[11px] font-semibold text-starlight">
            {count}
          </span>
        ) : null}
      </Link>
    </Button>
  );
}
