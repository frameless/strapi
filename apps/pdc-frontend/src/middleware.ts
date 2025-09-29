import acceptLanguage from 'accept-language';
import { NextRequest, NextResponse } from 'next/server';
import { getContentSecurityPolicy } from '@/util/cspConfig';
import { fallbackLng, languages } from './app/i18n/settings';
import { GET_PRODUCTS_OLD_SLUGS } from './query';
import { fetchData, getRedirectURL, getStrapiGraphqlURL } from './util';
import { GetProductsOldSlugsQuery } from '../gql/graphql';

acceptLanguage.languages(languages);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|.*\\.js$).*)'],
  // https://nextjs.org/docs/messages/edge-dynamic-code-evaluation
  unstable_allowDynamic: ['**/node_modules/lodash.mergewith/index.js'],
};

const cookieName = 'i18next';

export async function middleware(req: NextRequest) {
  let locale;
  if (req.cookies.has(cookieName)) locale = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  if (!locale) locale = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!locale) locale = fallbackLng;

  const { data } = await fetchData<{ data: GetProductsOldSlugsQuery }>({
    url: getStrapiGraphqlURL(),
    query: GET_PRODUCTS_OLD_SLUGS,
    variables: {
      locale,
    },
  });

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const cspHeader = getContentSecurityPolicy({ nonce, node_env: process.env.NODE_ENV });
  const headers = new Headers(req.headers);
  headers.set('X-Nonce', nonce);

  const responseHeaders = {
    'Content-Security-Policy': cspHeader,
    'Referrer-Policy': 'strict-origin',
    'X-Content-Type-Options': 'nosniff',
    'Permissions-Policy': 'geolocation=(self)',
  };

  if (req.nextUrl.pathname.indexOf('icon') > -1 || req.nextUrl.pathname.indexOf('chrome') > -1)
    return NextResponse.next();

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url));
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') as any);
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    const response = NextResponse.next({
      request: { headers },
      headers: responseHeaders,
    });
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  // Fetches the redirect URL for a given request if the current path matches any old slugs.
  const url = getRedirectURL({
    url: req.nextUrl.clone(),
    currentPathname: req.nextUrl.pathname,
    data: data.products?.data,
  });
  // Use 308 for permanent redirects to inform browsers and search engines that the resource has moved permanently.
  if (url && url.toString() !== req.nextUrl.href) return NextResponse.redirect(url, 308);

  headers.set('x-pathname', req.nextUrl.pathname);

  return NextResponse.next({
    request: { headers },
    headers: responseHeaders,
  });
}
