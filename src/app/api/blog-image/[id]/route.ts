import { getPublishedBlogPostById } from '@/libs/notion';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const post = await getPublishedBlogPostById(id);
  if (!post?.coverImage) {
    return new NextResponse('Image not found', { status: 404 });
  }

  try {
    const imageResponse = await fetch(post.coverImage, {
      signal: AbortSignal.timeout(8000),
    });
    if (!imageResponse.ok) {
      return new NextResponse('Image is temporarily unavailable', { status: 502 });
    }

    return new NextResponse(await imageResponse.arrayBuffer(), {
      headers: {
        'Content-Type': imageResponse.headers.get('content-type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return new NextResponse('Image is temporarily unavailable', { status: 502 });
  }
}
