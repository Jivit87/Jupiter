import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type WishlistButtonProps = {
  count?: number;
  className?: string;
};

export function WishlistButton({ count = 0, className }: WishlistButtonProps) {
  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className={cn('relative', className)}
    >
      <Link href="/wishlist" aria-label={`Wishlist${count > 0 ? `, ${count} saved items` : ''}`}>
        <svg
          width="19"
          height="19"
          viewBox="0 0 22 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M11 19s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 18 9c0 5.5-7 10-7 10z" />
        </svg>
        {/* Counter pill — only when items exist */}
        {count > 0 ? (
          <span
            className="absolute top-1.5 right-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-[5px] text-[10px] font-semibold leading-none text-ivory"
            aria-hidden="true"
          >
            {count}
          </span>
        ) : null}
      </Link>
    </Button>
  );
}
