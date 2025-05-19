/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { handleFormTypeRewrite } from './handleFormTypeRewrite'; // Adjust path as needed

describe('handleFormTypeRewrite', () => {
  // Helper to create mock NextRequest with pathname and search params
  const createRequest = (pathname: string, searchParams?: Record<string, string>): NextRequest => {
    const params = new URLSearchParams(searchParams);
    return {
      nextUrl: {
        pathname,
        searchParams: params,
        clone() {
          const url = new URL('http://localhost' + this.pathname);
          url.search = params.toString();
          return url;
        },
      },
    } as unknown as NextRequest;
  };

  it('returns null for invalid formType in path', () => {
    const req = createRequest('/nl/invalid/demo');
    const headers = new Headers();
    const responseHeaders = {};

    const result = handleFormTypeRewrite(req, headers, responseHeaders);
    expect(result).toBeNull();
  });

  it('returns null if pathname is too short', () => {
    const req = createRequest('/nl');
    const headers = new Headers();
    const responseHeaders = {};

    const result = handleFormTypeRewrite(req, headers, responseHeaders);
    expect(result).toBeNull();
  });

  it('rewrites, sets cookie and appends formType when "form" and no query param', () => {
    const req = createRequest('/nl/form/demo');
    const headers = new Headers();
    const responseHeaders = {};

    const response = handleFormTypeRewrite(req, headers, responseHeaders);
    const cookie = response?.cookies.get('formType');
    const rewriteUrl = response?.headers.get('x-middleware-rewrite');

    expect(response).toBeDefined();
    expect(cookie).toBeDefined();
    expect(cookie?.value).toBe('form');
    expect(rewriteUrl).toContain('formType=form');
  });

  it('rewrites and sets cookie when formType is "formulier" and no query param', () => {
    const req = createRequest('/nl/formulier/demo');
    const headers = new Headers();
    const responseHeaders = {};

    const response = handleFormTypeRewrite(req, headers, responseHeaders);
    const cookie = response?.cookies.get('formType');

    expect(response).toBeDefined();
    expect(cookie).toBeDefined();
    expect(cookie?.value).toBe('formulier');
  });

  it('returns NextResponse.next when formType is present as query param', () => {
    const req = createRequest('/nl/form/demo', { formType: 'form' });
    const headers = new Headers();
    const responseHeaders = {};

    const response = handleFormTypeRewrite(req, headers, responseHeaders);

    expect(response).toBeDefined();
    expect(response?.cookies?.get('formType')).toBeUndefined();
    expect(response?.headers.get('x-middleware-rewrite')).toBeNull();
  });

  it('does not set cookie or rewrite if formType query param matches path', () => {
    const req = createRequest('/nl/formulier/demo', { formType: 'formulier' });
    const headers = new Headers();
    const responseHeaders = {};

    const response = handleFormTypeRewrite(req, headers, responseHeaders);

    expect(response).toBeDefined();
    expect(response?.cookies?.get('formType')).toBeUndefined();
    expect(response?.headers.get('x-middleware-rewrite')).toBeNull();
  });

  it('does not set cookie or rewrite if formType query param does not match path', () => {
    const req = createRequest('/nl/formulier/demo', { formType: 'form' });
    const headers = new Headers();
    const responseHeaders = {};

    const response = handleFormTypeRewrite(req, headers, responseHeaders);

    expect(response).toBeDefined();
    expect(response?.cookies?.get('formType')).toBeUndefined();
    expect(response?.headers.get('x-middleware-rewrite')).toBeNull();
  });

  it('passes responseHeaders to NextResponse.rewrite', () => {
    const req = createRequest('/nl/form/demo');
    const headers = new Headers();
    const responseHeaders = { 'x-custom-header': 'abc' };

    const response = handleFormTypeRewrite(req, headers, responseHeaders);

    expect(response).toBeDefined();
    expect(response?.headers.get('x-custom-header')).toBe('abc');
  });
});
