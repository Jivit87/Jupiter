'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const adminNav = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: 'ri-dashboard-line' },
  { href: '/admin/products', label: 'Products', icon: 'ri-box-3-line' },
  { href: '/admin/categories', label: 'Categories', icon: 'ri-list-check-2' },
  { href: '/admin/reviews', label: 'Reviews', icon: 'ri-star-line' },
  { href: '/admin/custom-orders', label: 'Custom Orders', icon: 'ri-shopping-cart-2-line' },
  { href: '/admin/settings', label: 'Settings', icon: 'ri-settings-3-line' },
] as const;

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
}

export function Sidebar({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex h-screen flex-col border-r border-[#E5E7EB] bg-[#F9FAFB] text-black transition-all duration-300",
        isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        isCollapsed ? "w-[240px] md:w-[64px]" : "w-[240px]"
      )}
    >
      <div className="flex h-14 shrink-0 items-center justify-between px-4 border-b border-[#E5E7EB]">
        {/* Branding */}
        <div className={cn(
          "flex items-center gap-2 overflow-hidden transition-opacity duration-200 whitespace-nowrap",
          isCollapsed ? "md:opacity-0 md:w-0" : "opacity-100 w-auto"
        )}>
          <div className="relative h-6 w-6 shrink-0 rounded-sm overflow-hidden border border-[#E5E7EB]">
            <Image 
              src="/products/img3.jpg"
              alt="Jupiter Admin Logo"
              fill
              className="object-cover scale-110 object-center translate-y-0.5"
            />
          </div>
          <Link href="/admin/dashboard" className="font-sans text-sm font-semibold tracking-tight text-black">
            Jupiter Admin
          </Link>
        </div>
        
        <button
          onClick={() => {
            if (window.innerWidth < 768) {
              setIsMobileOpen(false);
            } else {
              setIsCollapsed(!isCollapsed);
            }
          }}
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#9ca3af] transition-colors hover:bg-[#EFEFEF] hover:text-black",
            isCollapsed && "md:mx-auto"
          )}
          aria-label="Toggle Sidebar"
        >
          <i className={cn("text-base", 
            "md:hidden ri-close-line", 
            "hidden md:block", isCollapsed ? "ri-menu-line" : "ri-menu-fold-line"
          )} />
        </button>
      </div>

      <nav className="flex-1 space-y-[2px] overflow-y-auto px-2 py-3 scrollbar-hide">
        {adminNav.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setIsMobileOpen(false);
                }
              }}
              title={item.label}
              className={cn(
                'group flex h-8 items-center rounded-md transition-colors duration-75',
                isCollapsed ? 'md:justify-center md:px-0 px-2' : 'px-2',
                isActive
                  ? 'bg-[#EFEFEF] font-medium text-black'
                  : 'text-[#6B7280] hover:bg-[#EFEFEF] hover:text-black'
              )}
            >
              <i className={cn(
                "text-[1.1rem] shrink-0", 
                item.icon, 
                isCollapsed ? "md:mr-0 mr-2" : "mr-2", 
                isActive ? "text-black" : "text-[#9ca3af] group-hover:text-black"
              )} />
              
              <span className={cn(
                "whitespace-nowrap text-[13px] transition-all duration-200 overflow-hidden",
                isCollapsed ? "md:opacity-0 md:w-0" : "opacity-100 w-auto"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
