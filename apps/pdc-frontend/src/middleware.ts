import acceptLanguage from 'accept-language';
import { NextRequest, NextResponse } from 'next/server';
import { getContentSecurityPolicy } from '@/util/cspConfig';
import { fallbackLng, languages } from './app/i18n/settings';
import { GET_PRODUCTS_OLD_SLUGS } from './query';
import { fetchData, getRedirectURL, getStrapiGraphqlURL } from './util';
import { handleFormTypeRewrite } from './util/handleFormTypeRewrite';
import { withSecurityHeaders } from './util/withSecurityHeaders'; // ✅ Add this line
import { GetProductsOldSlugsQuery } from '../gql/graphql';

acceptLanguage.languages(languages);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
  unstable_allowDynamic: ['**/node_modules/lodash.mergewith/index.js'],
};

const cookieName = 'i18next';
/**
 * 🌐 Global Middleware
 *
 * This middleware handles localization, form rewrites, legacy URL redirects,
 * and security headers for all incoming requests.
 *
 * ⚠️ ORDER MATTERS – Execution is top-down and early returns stop processing.
 *
 * Key Responsibilities:
 * 1. ✅ Set security headers (CSP, Referrer-Policy, etc.) via `withSecurityHeaders`
 * 2. ✅ Skip unnecessary processing for static/icon/chrome-related assets
 * 3. ✅ Redirect to a locale-prefixed path if not present (e.g., /nl, /en)
 * 4. ✅ Rewrite `/form` or `/formulier` URLs to include `formType` query param
 * 5. ✅ Set language cookie from Referer if available
 * 6. ✅ Redirect legacy URLs (e.g., old slugs from CMS)
 * 7. ✅ Return a default response with all security headers applied
 *
 * ⚠️ CRITICAL NOTES:
 * - `NextResponse.redirect()` or `NextResponse.rewrite()` will immediately return a response.
 *   👉 Ensure critical logic like `handleFormTypeRewrite` runs BEFORE any potential redirect.
 *
 * - Always wrap your `NextResponse` with `withSecurityHeaders()` to ensure security headers are applied consistently.
 *   This includes responses returned by `next()`, `rewrite()`, and `redirect()`.
 *
 * - Nonce generation is included to support strict CSP rules for inline styles/scripts.
 *
 * See `withSecurityHeaders.ts` and `handleFormTypeRewrite.ts` for supporting logic.
 */

export async function middleware(req: NextRequest) {
  const locale =
    (req.cookies.has(cookieName) && acceptLanguage.get(req.cookies.get(cookieName)?.value)) ||
    acceptLanguage.get(req.headers.get('Accept-Language')) ||
    fallbackLng;

  const { data } = await fetchData<{ data: GetProductsOldSlugsQuery }>({
    url: getStrapiGraphqlURL(),
    query: GET_PRODUCTS_OLD_SLUGS,
    variables: { locale },
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

  const pathname = req.nextUrl.pathname;

  // Skip icons and Chrome-specific routes
  if (pathname.includes('icon') || pathname.includes('chrome')) {
    return withSecurityHeaders(NextResponse.next(), responseHeaders);
  }

  // Redirect if locale is missing from path
  if (!languages.some((loc) => pathname.startsWith(`/${loc}`)) && !pathname.startsWith('/_next')) {
    const redirectUrl = new URL(`/${locale}${pathname}${req.nextUrl.search}`, req.url);
    return withSecurityHeaders(NextResponse.redirect(redirectUrl), responseHeaders);
  }

  // Handle /form or /formulier rewrite
  const formRewriteResponse = handleFormTypeRewrite(req, headers, responseHeaders);
  if (formRewriteResponse) {
    return withSecurityHeaders(formRewriteResponse, responseHeaders);
  }

  // Set cookie based on referer
  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') as string);
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    const response = withSecurityHeaders(NextResponse.next({ request: { headers } }), responseHeaders);
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  // Redirect legacy slugs
  const redirectUrl = getRedirectURL({
    url: req.nextUrl.clone(),
    currentPathname: pathname,
    data: data.products?.data,
  });

  if (redirectUrl && redirectUrl.toString() !== req.nextUrl.href) {
    return withSecurityHeaders(NextResponse.redirect(redirectUrl, 308), responseHeaders);
  }

  // Default: return regular response with headers
  headers.set('x-pathname', pathname);
  return withSecurityHeaders(NextResponse.next({ request: { headers } }), responseHeaders);
}
