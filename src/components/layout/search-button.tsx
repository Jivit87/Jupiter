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
      <svg
        width="18"
        height="18"
        viewBox="0 0 22 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="6.5" />
        <line x1="15" y1="15" x2="19" y2="19" />
      </svg>
    </Button>
  );
}
