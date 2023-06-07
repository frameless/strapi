import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { i18n } from './i18n-config';
export default async function middleware(request: NextRequest) {
  // Step 1: Use the incoming request
  const defaultLocale = request.headers.get('x-default-locale') || i18n.defaultLocale;

  // Step 2: Create and call the next-intl middleware
  const handleI18nRouting = createIntlMiddleware({
    locales: i18n.locales as any,
    defaultLocale,
    localeDetection: false,
  });
  const response = handleI18nRouting(request);

  // Step 3: Alter the response
  response.headers.set('x-default-locale', defaultLocale);

  const requestHeaders = new Headers(request.headers);

  // Store current request pathname in a custom header
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return response;
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
