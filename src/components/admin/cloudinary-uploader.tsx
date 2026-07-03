'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';

type CloudinaryUploaderProps = {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
};

export function CloudinaryUploader({ images, onChange, maxImages = 8 }: CloudinaryUploaderProps) {
  const [error, setError] = useState('');

  const upload = useCallback(async (files: FileList | null) => {
    if (!files?.length) return;

    setError('');
    const toUpload = Array.from(files).slice(0, maxImages - images.length);
    if (!toUpload.length) return;

    // Get signed params from our API route
    let signParams: { signature: string; timestamp: number; cloudName: string; apiKey: string; folder: string };
    try {
      const res = await fetch('/api/cloudinary-sign', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to get upload signature');
      signParams = await res.json();
    } catch {
      setError('Could not connect to Cloudinary. Check your environment variables.');
      return;
    }

    const uploaded: string[] = [];
    for (const file of toUpload) {
      const form = new FormData();
      form.append('file', file);
      form.append('api_key', signParams.apiKey);
      form.append('timestamp', String(signParams.timestamp));
      form.append('signature', signParams.signature);
      form.append('folder', signParams.folder);

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${signParams.cloudName}/image/upload`,
          { method: 'POST', body: form },
        );
        const data = await res.json();
        if (data.secure_url) uploaded.push(data.secure_url as string);
      } catch {
        setError('One or more images failed to upload. Please try again.');
      }
    }

    if (uploaded.length) onChange([...images, ...uploaded]);
  }, [images, onChange, maxImages]);

  const remove = (url: string) => onChange(images.filter((i) => i !== url));

  return (
    <div className="space-y-3">
      {error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      {/* Thumbnails */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {images.map((url, i) => (
            <div key={url} className="group relative h-20 w-20 overflow-hidden rounded-xl border border-border">
              <Image src={url} alt={`Image ${i + 1}`} fill sizes="80px" className="object-cover" />
              <button
                type="button"
                onClick={() => remove(url)}
                aria-label="Remove image"
                className="absolute inset-0 flex items-center justify-center bg-primary/60 opacity-0 text-white text-lg transition-opacity group-hover:opacity-100"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      {images.length < maxImages && (
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border bg-background px-4 py-3 text-sm text-text-muted hover:border-brand hover:text-brand transition-colors">
          <span><i className="ri-image-add-line mr-2"></i>Upload images ({images.length}/{maxImages})</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => upload(e.target.files)}
          />
        </label>
      )}

      {/* Manual URL fallback */}
      <details className="text-xs">
        <summary className="cursor-pointer text-text-muted hover:text-primary">Or paste URLs manually</summary>
        <textarea
          rows={3}
          placeholder="https://res.cloudinary.com/... (one per line)"
          value={images.join('\n')}
          onChange={(e) => onChange(e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))}
          className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </details>
    </div>
  );
}
