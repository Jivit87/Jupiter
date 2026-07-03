import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <SignUp path="/sign-up" routing="path" signInUrl="/admin/sign-in" />
    </main>
  );
}
