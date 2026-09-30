import { SignIn } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Admin Sign In',
  description: 'Sign in to access the Jupiter admin dashboard.',
};

export default function AdminSignInPage() {
  return (
    <main className="min-h-screen bg-background">
      <Container className="flex min-h-screen items-center justify-center py-16">
        <div className="w-full max-w-md rounded-[2rem] border border-border bg-surface/80 p-4 shadow-soft">
          <div className="space-y-4 p-4 sm:p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-text-muted">
              Admin access
            </p>
            <h1 className="font-display text-4xl text-primary">Sign in to Jupiter</h1>
            <p className="text-sm leading-7 text-text-muted">
              {siteConfig.name} admin access is restricted to the configured super-admin account.
            </p>
          </div>
          <div className="px-4 pb-4 sm:px-6 sm:pb-6">
            <SignIn routing="path" path={siteConfig.links.adminSignIn} fallbackRedirectUrl={siteConfig.links.adminDashboard} />
          </div>
        </div>
      </Container>
    </main>
  );
}
