/**
 * @jest-environment node
 */

import { NextRequest, NextResponse } from 'next/server';
import { middleware } from './middleware';
import * as util from './util';
import * as handleFormTypeRewriteModule from './util/handleFormTypeRewrite';

jest.mock('./util');
jest.mock('./util/handleFormTypeRewrite');

const mockFetchData = util.fetchData as jest.Mock;
const mockHandleFormTypeRewrite = handleFormTypeRewriteModule.handleFormTypeRewrite as jest.Mock;

const createMockRequest = (
  options: Partial<{
    pathname: string;
    search: string;
    cookies: Record<string, string>;
    headers: Record<string, string>;
    referer?: string;
  }> = {},
) => {
  const { pathname = '/foo', search = '', cookies = {}, headers = {}, referer } = options;

  const url = `https://example.com${pathname}${search}`;
  const reqHeaders = new Headers(headers);
  if (referer) reqHeaders.set('referer', referer);

  return {
    nextUrl: {
      pathname,
      search,
      href: url,
      clone: () => ({ pathname, search, href: url }),
    },
    url,
    cookies: {
      has: (name: string) => Object.prototype.hasOwnProperty.call(cookies, name),
      get: (name: string) => (cookies[name] ? { value: cookies[name] } : undefined),
      set: jest.fn(),
    },
    headers: reqHeaders,
  } as unknown as NextRequest;
};

beforeEach(() => {
  jest.clearAllMocks();
  mockFetchData.mockResolvedValue({ data: { products: { data: [] } } });
  mockHandleFormTypeRewrite.mockReturnValue(undefined);
});

describe('middleware', () => {
  it('redirects to locale-prefixed path if missing', async () => {
    const req = createMockRequest({ pathname: '/foo' });
    const res = await middleware(req);
    expect(res instanceof NextResponse).toBe(true);
    // Assert that the redirect location matches the expected locale-prefixed path
    const locationHeader = (res as NextResponse).headers.get('location');
    const regex = /^https:\/\/example\.com\/[a-z]{2}\/foo/;
    expect(locationHeader).toMatch(regex);
  });

  it('skips processing for icon and chrome paths', async () => {
    const req = createMockRequest({ pathname: '/icon-192.png' });
    const res = await middleware(req);
    expect(res).toBeInstanceOf(NextResponse);
  });

  it('sets language cookie from referer if present', async () => {
    const req = createMockRequest({
      pathname: '/nl/foo',
      headers: {},
      referer: 'https://example.com/nl/bar',
    });
    const res = await middleware(req);
    expect(res).toBeInstanceOf(NextResponse);
    // Should set cookie to 'nl'
    expect(res.cookies.get('i18next')?.value).toBe('nl');
  });

  it('redirects to new URL if old slug matches', async () => {
    const redirectUrl = new URL('https://example.com/nl/new-slug');
    (util.getRedirectURL as jest.Mock).mockReturnValue(redirectUrl);
    const req = createMockRequest({ pathname: '/nl/old-slug' });
    const res = await middleware(req);
    expect(res).toBeInstanceOf(NextResponse);
    expect((res as NextResponse).status).toBe(308);
    expect((res as NextResponse).headers.get('location')).toBe(redirectUrl.toString());
  });

  it('calls handleFormTypeRewrite and returns its response if present', async () => {
    const fakeResponse = NextResponse.next();
    mockHandleFormTypeRewrite.mockReturnValue(fakeResponse);

    // Ensure this locale is one of your supported locales in `languages`
    const req = createMockRequest({ pathname: '/nl/formulier/demo' });

    // Also ensure getRedirectURL returns undefined
    (util.getRedirectURL as jest.Mock).mockReturnValue(undefined);

    const res = await middleware(req);

    expect(mockHandleFormTypeRewrite).toHaveBeenCalled();
    expect(res).toBe(fakeResponse);
  });

  it('returns NextResponse.next with security headers if no redirect/rewrite', async () => {
    const req = createMockRequest({ pathname: '/nl/foo' });
    const res = await middleware(req);
    const csp = res.headers.get('Content-Security-Policy');
    expect(csp).toBeDefined();
    expect(csp).toContain('default-src');
    expect(csp).toContain('nonce-');
  });

  it('uses locale from cookie if present', async () => {
    const req = createMockRequest({ pathname: '/foo', cookies: { i18next: 'nl' } });
    await middleware(req);
    expect(mockFetchData).toHaveBeenCalledWith(expect.objectContaining({ variables: { locale: 'nl' } }));
  });

  it('uses fallbackLng if no locale detected', async () => {
    const req = createMockRequest({ pathname: '/foo' });
    await middleware(req);
    expect(mockFetchData).toHaveBeenCalledWith(expect.objectContaining({ variables: expect.any(Object) }));
  });
});
