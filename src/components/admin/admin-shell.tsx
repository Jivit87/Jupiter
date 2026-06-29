import Link from 'next/link';
import type { ReactNode } from 'react';
import { UserButton } from '@clerk/nextjs';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

const adminNav = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/categories', label: 'Categories' },
  { href: '/admin/reviews', label: 'Reviews' },
  { href: '/admin/custom-orders', label: 'Custom Orders' },
  { href: '/admin/settings', label: 'Settings' },
] as const;

type AdminShellProps = {
  children: ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <div className="border-b border-border/70 bg-primary text-starlight">
        <Container>
          <div className="flex min-h-16 items-center justify-between gap-4 py-3">
            <Link href="/admin/dashboard" className="font-display text-2xl">
              Jupiter Admin
            </Link>
            <UserButton afterSignOutUrl="/admin/sign-in" />
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-2xl border border-border bg-surface/70 p-4 shadow-soft">
            <nav aria-label="Admin" className="space-y-1">
              {adminNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block rounded-xl px-4 py-3 text-sm font-medium text-text-primary transition-colors',
                    'hover:bg-background hover:text-primary',
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          <main className="min-w-0">{children}</main>
        </div>
      </Container>
    </div>
  );
}
