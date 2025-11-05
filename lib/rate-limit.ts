import { NextRequest, NextResponse } from 'next/server';

const rateLimit = new Map<string, number>();
const REQUESTS_PER_MINUTE = 10;

export function checkRateLimit(req: NextRequest) {
  const ip = req.ip ?? '127.0.0.1';
  const now = Date.now();
  const lastRequest = rateLimit.get(ip) ?? 0;
  
  if (now - lastRequest < (60 * 1000) / REQUESTS_PER_MINUTE) {
    return NextResponse.json(
      { message: 'Too many requests' },
      { status: 429 }
    );
  }
  
  rateLimit.set(ip, now);
  return null;
}