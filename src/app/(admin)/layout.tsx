import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { SignOutButton } from '@clerk/nextjs';
import { AdminShell } from '@/components/admin/admin-shell';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await currentUser();
  
  if (!user) {
    redirect('/admin/sign-in');
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    throw new Error('Server misconfiguration: ADMIN_EMAIL not set in environment.');
  }

  const isAuthorized = user.emailAddresses.some(
    (e) => e.emailAddress.toLowerCase() === adminEmail.toLowerCase()
  );

  console.log('Admin Access Attempt:', {
    userEmails: user.emailAddresses.map((e) => e.emailAddress),
    adminEmail,
    isAuthorized,
  });

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-red-600">Access Denied</h1>
        <p className="mb-8 text-gray-700">
          You are currently signed in as <strong className="text-black">{user.emailAddresses[0]?.emailAddress}</strong>.
          <br />
          This account does not have administrator privileges.
        </p>
        <div className="rounded-md bg-black px-6 py-2 font-medium text-white transition-colors hover:bg-gray-800">
          <SignOutButton redirectUrl="/admin/sign-in" />
        </div>
      </div>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}
