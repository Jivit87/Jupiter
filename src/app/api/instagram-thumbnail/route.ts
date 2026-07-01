import { NextResponse } from 'next/server';

function isAllowedInstagramImageUrl(url: URL) {
  return (
    url.hostname === 'instagram.com' ||
    url.hostname.endsWith('.instagram.com') ||
    url.hostname === 'fbcdn.net' ||
    url.hostname.endsWith('.fbcdn.net')
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const src = searchParams.get('src');

  if (!src) {
    return NextResponse.json({ error: 'Missing src' }, { status: 400 });
  }

  let remoteUrl: URL;
  try {
    remoteUrl = new URL(src);
  } catch {
    return NextResponse.json({ error: 'Invalid src' }, { status: 400 });
  }

  if (!isAllowedInstagramImageUrl(remoteUrl)) {
    return NextResponse.json({ error: 'Unsupported image host' }, { status: 400 });
  }

  try {
    const upstream = await fetch(remoteUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        Accept: 'image/avif,image/webp,image/*,*/*;q=0.8',
        Referer: 'https://www.instagram.com/',
      },
      redirect: 'follow',
    });

    if (!upstream.ok || !upstream.body) {
      return NextResponse.json({ error: 'Image unavailable' }, { status: 404 });
    }

    const contentType = upstream.headers.get('content-type') ?? 'image/jpeg';
    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Image unavailable' }, { status: 404 });
  }
}
