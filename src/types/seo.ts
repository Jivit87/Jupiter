import type { Metadata } from 'next';

export type JsonLdGraph = Record<string, unknown> | Record<string, unknown>[];
export type JsonLdProps = {
  data: JsonLdGraph;
};

export type PageMetadataInput = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
};

export type BuildMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export type MetadataResult = Metadata;
