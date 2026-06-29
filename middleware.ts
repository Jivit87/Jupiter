import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
]);

const isSignInRoute = createRouteMatcher([
  '/admin/sign-in(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  if (isSignInRoute(request)) {
    return;
  }

  if (isAdminRoute(request)) {
    await auth.protect();
    return;
  }
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)', '/(api|trpc)(.*)'],
};
