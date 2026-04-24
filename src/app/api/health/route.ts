import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      site_id: process.env.NEXT_PUBLIC_SITE_ID || 'mobileax',
      store_id: process.env.NEXT_PUBLIC_STORE_ID || '',
      ts: new Date().toISOString(),
    },
    { status: 200 },
  );
}
