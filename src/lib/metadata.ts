import type { Metadata } from 'next';
import { buildMetadata } from './seo';

export function createPageMetadata(title: string, description: string, path?: string): Metadata {
  return buildMetadata({ title, description, path });
}
