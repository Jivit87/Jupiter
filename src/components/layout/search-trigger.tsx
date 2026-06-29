'use client';

import { useState } from 'react';
import { SearchButton } from './search-button';
import { SearchOverlay } from '@/components/shop/search-overlay';

export function SearchTrigger({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SearchButton onClick={() => setOpen(true)} className={className} />
      <SearchOverlay open={open} onOpenChange={setOpen} />
    </>
  );
}
