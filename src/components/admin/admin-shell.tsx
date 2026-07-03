'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import { UserButton } from '@clerk/nextjs';
import { Sidebar } from './sidebar';
import { cn } from '@/lib/utils';

type AdminShellProps = {
  children: ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#EFEFEF]">
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/20 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div
        className={cn(
          "flex min-h-screen flex-col transition-all duration-300",
          isCollapsed ? "md:pl-[64px]" : "md:pl-[240px]"
        )}
      >
        <header className="flex h-14 items-center justify-between md:justify-end px-4 md:px-6 border-b border-[#E5E7EB] bg-white sticky top-0 z-20">
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-md text-[#6B7280] hover:bg-[#F9FAFB] hover:text-black"
          >
            <i className="ri-menu-line text-lg" />
          </button>

          <div className="flex items-center gap-3">
            <UserButton appearance={{ elements: { avatarBox: "h-7 w-7 rounded-md" } }} />
          </div>
        </header>
        
        <main className="flex-1 p-4 sm:p-8 md:p-12 overflow-x-hidden">
          <div className="mx-auto max-w-5xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
