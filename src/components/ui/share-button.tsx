'use client';

import { useState } from 'react';
import { Button } from './button';

type ShareButtonProps = {
  url: string;
  title?: string;
  text?: string;
  label?: string;
};

export function ShareButton({ url, title, text, label = 'Share' }: ShareButtonProps) {
  const [status, setStatus] = useState<'idle' | 'copied'>('idle');

  async function handleShare() {
    if (typeof navigator === 'undefined') {
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({ url, title, text });
        return;
      }

      await navigator.clipboard.writeText(url);
      setStatus('copied');
      window.setTimeout(() => setStatus('idle'), 1500);
    } catch {
      setStatus('idle');
    }
  }

  return (
    <Button type="button" variant="outline" className="flex-1" onClick={handleShare}>
      {status === 'copied' ? (
        <><i className="ri-check-line text-lg -ml-1"></i> Copied</>
      ) : (
        <><i className="ri-share-line text-lg -ml-1"></i> {label}</>
      )}
    </Button>
  );
}
