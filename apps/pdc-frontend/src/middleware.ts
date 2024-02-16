import acceptLanguage from 'accept-language';
import { NextRequest, NextResponse } from 'next/server';
import { createOpenFormsApiUrl } from '@/util/openFormsSettings';
import { fallbackLng, languages } from './app/i18n/settings';

acceptLanguage.languages(languages);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};

const cookieName = 'i18next';

const getOpenFormsHost = () => {
  return createOpenFormsApiUrl()?.host || '';
};

const baseCSP = `
  default-src 'self';
  connect-src 'self' ${getOpenFormsHost()};
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  block-all-mixed-content;`;

const cspDevelopmentHeader = () => `
  ${baseCSP}
  script-src 'self' siteimproveanalytics.com ${getOpenFormsHost()} 'unsafe-inline' 'unsafe-eval';
  style-src 'self' localhost:8000 'unsafe-inline';`;

const cspProductionHeader = (nonce: string) => `
  ${baseCSP}
  script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
  style-src 'self' 'nonce-${nonce}';
`;

export function middleware(req: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const cspHeaderRaw = process.env.NODE_ENV === 'production' ? cspProductionHeader(nonce) : cspDevelopmentHeader();
  const cspHeader = cspHeaderRaw.replace(/\s{2,}/g, ' ').trim();

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  if (req.nextUrl.pathname.indexOf('icon') > -1 || req.nextUrl.pathname.indexOf('chrome') > -1)
    return NextResponse.next();
  let lng;
  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url));
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') as any);
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    const response = NextResponse.next({
      request: { headers: requestHeaders },
      headers: { 'content-security-policy': cspHeader },
    });
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }
  requestHeaders.set('x-pathname', req.nextUrl.pathname);

  return NextResponse.next({
    request: { headers: requestHeaders },
    headers: { 'content-security-policy': cspHeader },
  });
}
