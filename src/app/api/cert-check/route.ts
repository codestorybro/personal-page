import { NextResponse } from 'next/server';
import { certificates } from './certificates';

export function GET(req: Request) {
  const parsedUrl = new URL(req.url);
  const id = parsedUrl.searchParams.get('certId');

  for (const cert of certificates) {
    if (cert.certId === id) {
      return NextResponse.json({
        body: cert,
        status: 200,
      });
    }
  }

  return NextResponse.json({ error: true }, { status: 400 });
}
