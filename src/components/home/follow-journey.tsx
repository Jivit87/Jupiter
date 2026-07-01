import { ReelGrid } from './reel-grid';
import { siteConfig } from '@/config/site';

const REELS = [
  { shortcode: 'DPI7YQlkhU5' },
  { shortcode: 'DWA-s8ZDPP7' },
  { shortcode: 'DYjjlmsMm7H' },
  { shortcode: 'DYjpVj4sVdl' },
  { shortcode: 'DTadDJXklGW' },
];

type OEmbedData = {
  thumbnail_url:    string;
  thumbnail_width:  number;
  thumbnail_height: number;
  title:            string;
};

type ReelItem = {
  shortcode:       string;
  url:             string;
  thumbnailUrl:    string;
  thumbnailWidth:  number;
  thumbnailHeight: number;
  title:           string;
};

function buildThumbnailProxyUrl(src: string) {
  return `/api/instagram-thumbnail?src=${encodeURIComponent(src)}`;
}

function extractMetaContent(html: string, property: string) {
  const match = html.match(
    new RegExp(`property=["']${property}["'][^>]*content=["']([^"']+)["']`, 'i'),
  );
  return match?.[1] ?? null;
}

async function fetchOEmbed(shortcode: string): Promise<ReelItem | null> {
  const reelUrl = `https://www.instagram.com/reel/${shortcode}/`;
  const apiUrl  = `https://www.instagram.com/api/v1/oembed/?url=${encodeURIComponent(reelUrl)}&maxwidth=480`;

  try {
    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 },
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    if (!res.ok) return null;
    const data: OEmbedData = await res.json();
    if (!data.thumbnail_url) return null;
    return {
      shortcode,
      url:             reelUrl,
      thumbnailUrl:    buildThumbnailProxyUrl(data.thumbnail_url),
      thumbnailWidth:  data.thumbnail_width  ?? 480,
      thumbnailHeight: data.thumbnail_height ?? 852,
      title:           data.title ?? '',
    };
  } catch {
    return null;
  }
}

async function fetchFromPage(shortcode: string): Promise<ReelItem | null> {
  const reelUrl = `https://www.instagram.com/reel/${shortcode}/`;

  try {
    const res = await fetch(reelUrl, {
      next: { revalidate: 3600 },
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    if (!res.ok) return null;

    const html = await res.text();
    const thumbnailUrl = extractMetaContent(html, 'og:image');
    if (!thumbnailUrl) return null;

    const title = extractMetaContent(html, 'og:title') ?? '';

    return {
      shortcode,
      url:             reelUrl,
      thumbnailUrl:    buildThumbnailProxyUrl(thumbnailUrl),
      thumbnailWidth:  480,
      thumbnailHeight: 852,
      title,
    };
  } catch {
    return null;
  }
}

export async function FollowJourney() {
  const results = await Promise.all(
    REELS.map(async ({ shortcode }) => (await fetchOEmbed(shortcode)) ?? fetchFromPage(shortcode)),
  );
  const reels = results.filter((r): r is ReelItem => r !== null);

  return (
    <ReelGrid
      reels={reels}
      handle={siteConfig.handles.instagram}
      profileUrl={siteConfig.socials.instagram}
    />
  );
}
