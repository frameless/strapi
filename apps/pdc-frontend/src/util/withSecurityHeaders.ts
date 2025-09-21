import { NextResponse } from 'next/server';

export const withSecurityHeaders = (response: NextResponse, responseHeaders: Record<string, string>): NextResponse => {
  Object.entries(responseHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
};
