'use client';

import { Button } from '@/components/ui/button';

type SearchButtonProps = {
  onClick?: () => void;
  className?: string;
};

export function SearchButton({ onClick, className }: SearchButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={className}
      aria-label="Search products"
      title="Search products"
      onClick={onClick}
    >
      <span aria-hidden className="text-lg leading-none">
        ⌕
      </span>
    </Button>
  );
}
