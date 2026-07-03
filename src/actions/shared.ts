import { currentUser } from '@clerk/nextjs/server';

export type ActionResult<T = void> = 
  | { success: true; data?: T }
  | { success: false; error: string };

export async function requireAdmin(): Promise<void> {
  const user = await currentUser();
  if (!user) throw new Error('Unauthorized');
  
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) throw new Error('Server misconfiguration: ADMIN_EMAIL not set');

  const isAuthorized = user.emailAddresses.some(e => e.emailAddress === adminEmail);
  if (!isAuthorized) {
    throw new Error('Forbidden: Admin access required');
  }
}
