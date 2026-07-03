'use client';

import { Button } from '@/components/ui/button';

export default function GlobalError({
  _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center p-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight">System Error</h1>
            <p className="text-gray-500">A critical error occurred in the application shell.</p>
            <Button onClick={() => reset()} className="mt-4">
              Try again
            </Button>
          </div>
        </main>
      </body>
    </html>
  );
}
