'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen">
      <Container className="py-20 sm:py-28">
        <PageHeader
          eyebrow="Error"
          title="Something went wrong"
          description="An unexpected error has occurred. Please try again."
          actions={
            <Button variant="secondary" onClick={() => reset()}>
              Try again
            </Button>
          }
        />
      </Container>
    </main>
  );
}
