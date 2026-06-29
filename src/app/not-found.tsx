import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Container className="py-20 sm:py-28">
        <PageHeader
          eyebrow="404"
          title="Page not found"
          description="The page you requested does not exist. Return to the foundation shell and continue from there."
          actions={
            <Button variant="secondary" asChild>
              <Link href="/">Back to home</Link>
            </Button>
          }
        />
      </Container>
    </main>
  );
}
