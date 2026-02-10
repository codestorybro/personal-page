import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const dynamic = 'force-dynamic';

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;

    // Fetch the page from Notion to get fresh cover image URL
    const page = await notion.pages.retrieve({ page_id: id }) as PageObjectResponse;

    if (!page.cover) {
      return new NextResponse('No cover image', { status: 404 });
    }

    let imageUrl: string;
    if (page.cover.type === 'external') {
      imageUrl = page.cover.external.url;
    } else if (page.cover.type === 'file') {
      imageUrl = page.cover.file.url;
    } else {
      return new NextResponse('Unknown cover type', { status: 404 });
    }

    // Fetch the actual image
    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok) {
      return new NextResponse('Failed to fetch image', { status: 502 });
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';

    // Return the image with appropriate caching headers
    // Cache for 1 hour on CDN, but allow revalidation
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching blog image:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
