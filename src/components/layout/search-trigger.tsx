'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export function SearchTrigger({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input automatically when opened
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
      setOpen(false);
      setQuery('');
    }
  };

  return (
    <div ref={containerRef} className="flex items-center relative">
      <form 
        onSubmit={handleSubmit}
        className={cn(
          "flex items-center overflow-hidden transition-all duration-300 ease-out origin-right",
          open ? "w-36 sm:w-56 opacity-100 mr-2" : "w-0 opacity-0 mr-0"
        )}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full bg-transparent text-sm font-medium border-b border-black/20 focus:border-black outline-none py-1 placeholder:text-black/40 placeholder:font-normal transition-colors"
        />
        {open && query && (
          <button 
            type="button" 
            onClick={() => setQuery('')}
            className="absolute right-8 text-black/40 hover:text-black flex items-center justify-center h-full"
            aria-label="Clear search"
          >
            <i className="ri-close-line text-lg" />
          </button>
        )}
      </form>

      <button
        type="button"
        className={className}
        onClick={() => {
          if (open && query) {
            handleSubmit(new Event('submit') as unknown as React.FormEvent);
          } else {
            setOpen(!open);
          }
        }}
        aria-label="Search"
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
      </button>
    </div>
  );
}
