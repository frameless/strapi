import { NextResponse } from 'next/server';
import { apiSettings, getImageBaseUrl } from '@/util';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const imagePath = searchParams.get('path');

  if (!imagePath) {
    return new NextResponse('Missing image path', { status: 400 });
  }

  const imageUrl = getImageBaseUrl(imagePath);

  try {
    const imageRes = await fetch(imageUrl);
    if (!imageRes.ok) {
      return new NextResponse('Image not found', { status: 404 });
    }

    const contentType = imageRes.headers.get('content-type');
    if (!contentType) {
      return new NextResponse('Unsupported Media Type', { status: 415 });
    }
    const imageBuffer = await imageRes.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': `public, max-age=${apiSettings.imageCacheMaxAge}`,
      },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error fetching image:', err);
    return new NextResponse('Error fetching image', { status: 500 });
  }
}
